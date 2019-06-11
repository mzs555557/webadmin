import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerTitle from '../../../../components/ContainerTitle';
// eslint-disable-next-line camelcase
import { Admin_Categories } from '../../../../api/request';
// eslint-disable-next-line import/first
import { Message } from '@alifd/next';

export default class RevenueCate extends Component {
  state = {
    data: [],
  }
  componentWillMount() {
    Admin_Categories().then((msg) => {
      if (msg.data.code === 0) {
        const data = msg.data.data.map((value) => {
          return {
            item: value.categoryName,
            count: 100 / 4,
          };
        });
        this.setState({
          data,
        });
      } else {
        Message.error(msg.data.msg);
      }
    });
  }
  render() {
    const { DataView } = DataSet;
    const { data } = this.state;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };

    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="营收类目" />
        <Chart height={300} data={dv} scale={cols} padding={[40]} forceFit>
          <Coord type="theta" radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend position="bottom" offsetY={-30} />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />

          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = `${percent * 100}%`;
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          />
        </Chart>
      </IceContainer>
    );
  }
}

import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceImg from '@icedesign/img';
import IceContainer from '@icedesign/container';
import Filter from '../Filter';
import Overview from '../Overview';
// eslint-disable-next-line camelcase
import { Admin_SelectDetails, Admin_DetailStatistics } from '../../../../api/request';
// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换

const getOverviewData = () => {
  return [
    {
      title: '发货单数',
      value: random(1000, 3000),
      background: '#58ca9a',
    },
    {
      title: '发货商品数',
      value: random(3000, 6000),
      background: '#f7da47',
    },
    {
      title: '总金额',
      value: `￥ ${random(5000, 10000)}`,
      background: '#ee706d',
    },
  ];
};

export default class ReserveTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    overviewData: [],
    filterData: {},
  };

  componentDidMount() {
    this.fetchData();
    Admin_DetailStatistics().then((msg) => {
      if (msg.data.code === 0) {
        const value = [
          {
            title: '发货单数',
            value: random(1000, 3000),
            background: '#58ca9a',
            content: 'countDetail',
          },
          {
            title: '发货商品数',
            value: random(3000, 6000),
            background: '#f7da47',
            content: 'countProduct',
          },
          {
            title: '总金额',
            value: `￥ ${random(5000, 10000)}`,
            background: '#ee706d',
            content: 'countPrice',
          },
        ];
        value.forEach((item) => {
          console.log(item);
          item.value = msg.data.data[item.content];
        });
        this.setState({
          overviewData: value,
        });
      } else {
        this.setState({
          overviewData: getOverviewData(),
        });
      }
    });
  }

  fetchData = (page = 0, data = this.state.filterData) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Admin_SelectDetails(page, data).then((msg) => {
          if (msg.data.code === 0) {
            this.setState({
              isLoading: false,
              data: msg.data.data,
            });
          }
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData(current - 1, this.state);
      }
    );
  };
  handleSubmit = (values) => {
    console.log(values);
    this.setState({
      filterData: values,
    }, () => {
      this.fetchData(this.state.current - 1, values);
    });
  }
  handleReset = () => {
    console.log();
    this.setState({
      filterData: {},
    });
  }

  renderImg = (value) => {
    return (
      <div style={styles.titleCol}>
        <div>
          <IceImg src={value} width={48} height={48} />
        </div>
      </div>
    );
  }
  render() {
    const { isLoading, data, current, overviewData } = this.state;

    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onSubmit={this.handleSubmit} onReset={this.handleReset} />
        </IceContainer>
        <Overview data={overviewData} />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="商品图片" dataIndex="productIcon" cell={this.renderImg} />
            <Table.Column title="流水号" dataIndex="detailId" />
            <Table.Column title="订单号" dataIndex="orderId" />
            <Table.Column title="商品名称" dataIndex="productName" />
            <Table.Column title="商品号" dataIndex="productId" />
            <Table.Column title="商品单价" dataIndex="productPrice" />
            <Table.Column title="订购数量" dataIndex="productQuantity" />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            onChange={this.handlePaginationChange}
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};

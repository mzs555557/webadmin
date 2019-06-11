import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Message } from '@alifd/next';
import IceImg from '@icedesign/img';
import ContainerTitle from '../../../../components/ContainerTitle';
// eslint-disable-next-line camelcase
import { Admin_SelectGoods } from '../../../../api/request';

const STATUS = {
  0: '#447eff',
  1: '#ee706d',
  2: '#ffffff',
};

export default class OrderTrend extends Component {
  state = {
    dataSource: [],
    isLoading: false,

  }
  componentWillMount() {
    this.fetchData();
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

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Admin_SelectGoods().then((msg) => {
          if (msg.data.code === 0) {
            this.setState({
              dataSource: msg.data.data,
              isLoading: false,
            });
          } else {
            Message.error(msg.data.msg);
          }
        });
      }
    );
  };

  renderProductStatus = (status) => {
    return (
      <div style={styles.status}>
        <span style={{ ...styles.dot, background: STATUS[status] }} />
        {status}
      </div>
    );
  };

  render() {
    const { dataSource, isLoading } = this.state;
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="最近的订单" />
        <Table loading={isLoading} dataSource={dataSource} hasBorder={false}>
          <Table.Column
            title="商品图标"
            dataIndex="productIcon"
            cell={this.renderImg}
          />
          <Table.Column title="商品ID" dataIndex="productId" />
          <Table.Column title="商品名称" dataIndex="productName" />
          <Table.Column
            title="商品分类"
            dataIndex="categoryType"
          />
          <Table.Column title="商品剩余" dataIndex="productStock" />
          <Table.Column title="商品价格" dataIndex="productPrice" />
          <Table.Column
            title="商品描述"
            dataIndex="productDescription"
          />
          <Table.Column
            title="商品状态"
            dataIndex="productStatus"
            cell={this.renderStatus}
          />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  status: {
    position: 'relative',
    paddingLeft: '20px',
  },
  dot: {
    width: '10px',
    height: '10px',
    position: 'absolute',
    left: '0',
    top: '2px',
    borderRadius: '50%',
  },
};

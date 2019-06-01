import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Dialog } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import Filter from '../Filter';
// eslint-disable-next-line camelcase
import { Admin_AllGoods, Admin_Type2Name } from '../../../../api/request';

// Random Numbers
// const random = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// MOCK 数据，实际业务按需进行替换
// const getData = (length = 10) => {
//   return Array.from({ length }).map(() => {
//     return {
//       name: ['蓝牙音箱', '天猫精灵', '智能机器人'][random(0, 2)],
//       cate: ['数码', '智能'][random(0, 1)],
//       tag: ['新品', '预售'][random(0, 1)],
//       store: ['余杭店', '滨江店', '西湖店'][random(0, 2)],
//       sales: random(1000, 2000),
//       service: ['可预约', '可体验'][random(0, 1)],
//     };
//   });
// };
@withRouter
export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  // mockApi = (len) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(getData(len));
  //     }, 600);
  //   });
  // };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        // this.mockApi(len).then((data) => {
        //   this.setState({
        //     data,
        //     isLoading: false,
        //   });
        // });
        Admin_AllGoods().then((msg) => {
          if (msg.data.code === 0) {
            this.setState({
              data: msg.data.data,
              isLoading: false,
            });
          } else {
            this.props.history.push('/user/login');
          }
        });
      }
    );
  };

  // handlePaginationChange = (current) => {
  //   this.setState(
  //     {
  //       current,
  //     },
  //     () => {
  //       this.fetchData();
  //     }
  //   );
  // };

  // handleFilterChange = () => {
  //   this.fetchData(5);
  // };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderImg = (value) => {
    return (
      <div style={styles.titleCol}>
        <div>
          <IceImg src={value} width={48} height={48} />
        </div>
      </div>
    );
  }

  renderStatus = (value) => {
    return (
      <div>{value === 0 ? '已上架' : '已下架'}</div>
    );
  }
  renderOper = () => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
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
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
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
  titleCol: {
    display: 'flex',
    flexDirection: 'row',
  },
};

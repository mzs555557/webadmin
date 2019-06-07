import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import Filter from '../Filter';
// eslint-disable-next-line camelcase
import { Admin_AllGoods, Admin_DownGoods, Admin_UpGoods, Admin_SelectGoods } from '../../../../api/request';

@withRouter
export default class GoodsTable extends Component {
  state = {
    page: 1,
    isLoading: false,
    data: [],
    selectData: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
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

  handlePaginationChange = (page) => {
    this.setState(
      {
        page,
      },
      () => {
        if (this.state.selectData == null) {
          Admin_AllGoods(page - 1).then((msg) => {
            if (msg.data.code === 0) {
              this.setState({
                data: msg.data.data,
                isLoading: false,
              });
            } else {
              this.props.history.push('/user/login');
            }
          });
        } else {
          Admin_SelectGoods(page - 1, this.state.selectData).then((msg) => {
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
      }
    );
  };

  handleSubmit = (value) => {
    console.log(value);
    this.setState({
      selectData: value,
      isLoading: true,
    }, () => {
      Admin_SelectGoods(0, value).then((msg) => {
        console.log(msg);
        if (msg.data.code === 0) {
          this.setState({
            data: msg.data.data,
            isLoading: false,
          });
        } else {
          this.props.history.push('/user/login');
        }
      });
    });
  }
  handleReset = () => {
    this.setState({
      selectData: null,
    });
  }

  handleStatus = (values) => {
    Dialog.confirm({
      title: '提示',
      content: `确认${values.productStatus === 0 ? '下架' : '上架'}吗`,
      onOk: () => {
        if (values.productStatus === 0) {
          Admin_DownGoods(values.productId).then((msg) => {
            if (msg.data.code === 0) {
              Message.success(msg.data.msg);
              setTimeout(() => { window.location.reload(); }, 1000);
            } else {
              Message.error(msg.data.msg);
            }
          });
        } else {
          Admin_UpGoods(values.productId).then((msg) => {
            if (msg.data.code === 0) {
              Message.success(msg.data.msg);
              setTimeout(() => { window.location.reload(); }, 1000);
            } else {
              Message.error(msg.data.msg);
            }
          });
        }
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
  renderOper = (value, index, values) => {
    return (
      <div>
        <Button
          type="primary"
          style={{ marginRight: '5px' }}
          onClick={this.handleDetail}
        >
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleStatus.bind(this, values)}>
          {values.productStatus === 0 ? '下架商品' : '上架商品'}
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data, page } = this.state;

    return (
      <div style={styles.container}>
        <IceContainer>
          <Filter onSubmit={this.handleSubmit} onReset={this.handleReset} />
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
              dataIndex="productId"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            current={page}
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

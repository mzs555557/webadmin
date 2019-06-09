import React, { Component } from 'react';
import { Table, Pagination, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './TableFilter';
// eslint-disable-next-line camelcase
import { Admin_SelectACategories } from '../../../../api/request';

export default class ChargeBackTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
    filterData: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (page = 0, data = this.state.filterData) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Admin_SelectACategories(page, data).then((msg) => {
          if (msg.data.code === 0) {
            this.setState({
              data: msg.data.data,
              isLoading: false,
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
        this.fetchData(current - 1, this.state.filterData);
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  renderOper = () => {
    return (
      <div>
        <Button type="normal">
          修改
        </Button>
        <span style={styles.separator} />
        <Button type="normal" warning style={styles.deleteButton}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div>
        <TableFilter onChange={this.handleFilterChange} />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="分类ID" dataIndex="categoryId" />
            <Table.Column title="分类名称" dataIndex="categoryName" />
            <Table.Column title="类型" dataIndex="categoryType" />
            <Table.Column title="操作" dataIndex="price" cell={this.renderOper} />
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
  deleteButton: {
    marginLeft: '10px',
  },
};

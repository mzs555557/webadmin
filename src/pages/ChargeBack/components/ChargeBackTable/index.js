import React, { Component } from 'react';
import { Table, Pagination, Button, Message, Dialog, Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import TableFilter from './TableFilter';
// eslint-disable-next-line camelcase
import { Admin_SelectACategories, Admin_DeleteCategory } from '../../../../api/request';
import FormDialog from './SimpleFormDialog';

const { Row, Col } = Grid;
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

  handleSubmit = (value) => {
    this.setState({
      filterData: value,
      isLoading: true,
    }, () => {
      this.fetchData(0, value);
    });
  }

  handleReset = () => {
    this.setState({
      filterData: {},
    });
  };
  handleDelete = (value) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        Admin_DeleteCategory(value).then((msg) => {
          if (msg.data.code === 0) {
            Message.success(msg.data.msg);
            this.fetchData();
          } else {
            Message.error(msg.data.msg);
          }
        });
      },
    });
  };
  showDialog = () => {
    console.log(1);
  }
  renderOper = (value) => {
    return (
      <Row>
        <Col>
          <FormDialog categoryId={value} />
        </Col>
        <Col >
          <Button type="normal" warning style={styles.deleteButton} onClick={this.handleDelete.bind(this, value)} >
            删除
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    const { isLoading, data, current } = this.state;

    return (
      <div>
        <TableFilter onSubmit={this.handleSubmit} onReset={this.handleReset} />
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="分类ID" dataIndex="categoryId" />
            <Table.Column title="分类名称" dataIndex="categoryName" />
            <Table.Column title="类型" dataIndex="categoryType" />
            <Table.Column title="操作" dataIndex="categoryId" cell={this.renderOper} />
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
  formDialog: {
    width: '50px',
    height: '32px',
  },
};

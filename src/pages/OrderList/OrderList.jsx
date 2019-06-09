import React, { Component } from 'react';
import { Dialog, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import PageHead from '../../components/PageHead';

const defaultSearchQuery = {
  orderId: '',
  userId: '',
  buyerName: '',
  buyerPhone: '',
  buyerAddress: '',
  orderAmount: null,
  orderStatus: null,
  payStatus: null,
  checkbox: 'false',
};

const formConfig = [
  {
    label: '订单编号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入订单编号',
    },
    formBinderProps: {
      name: 'orderId',
      required: false,
      message: '请输入正确的订单编号',
    },
  },
  {
    label: '用户编号',
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户编号',
    },
    formBinderProps: {
      name: 'userId',
      required: false,
      message: '请输入正确的用户编号',
    },
  },
  {
    label: '买家姓名',
    component: 'Input',
    componentProps: {
      placeholder: '请输入买家姓名',
    },
    formBinderProps: {
      name: 'buyerName',
      required: false,
    },
  },
  {
    label: '买家电话',
    component: 'Input',
    componentProps: {
      placeholder: '请输入买家电话',
    },
    formBinderProps: {
      name: 'buyerPhone',
    },
  },
  {
    label: '买家地址',
    component: 'Input',
    componentProps: {
      placeholder: '请输入买家地址',
    },
    formBinderProps: {
      name: 'buyerAddress',
    },
  },
  {
    label: '订单金额',
    component: 'Input',
    advanced: true,
    componentProps: {
      placeholder: '请输入订单金额',
      htmlType: 'number',
    },
    formBinderProps: {
      name: 'orderAmount',
    },
  },
  {
    label: '订单状态',
    component: 'Select',
    advanced: true,
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '新下单', value: 0 },
        { label: '已发货', value: 1 },
        { label: '已退单', value: 2 },
      ],
    },
    formBinderProps: {
      name: 'orderStatus',
    },
  },
  {
    label: '支付状态',
    component: 'Select',
    advanced: true,
    componentProps: {
      placeholder: '请选择',
      dataSource: [
        { label: '未支付', value: 0 },
        { label: '已支付', value: 1 },
        { label: '支付失败', value: 2 },
      ],
    },
    formBinderProps: {
      name: 'payStatus',
    },
  },
  {
    label: '查询我处理过的订单',
    component: 'Checkbox',
    advanced: true,
    componentProps: {},
    formBinderProps: {
      name: 'checkbox',
    },
  },
];

@withRouter
export default class OrderList extends Component {
  handleClick = () => {
    this.props.history.push('add/goods');
  };

  renderState = (value) => {
    const data = {
      0: '新下单',
      1: '已发货',
      2: '已退单',
    };
    return (
      <div style={styles.state}>
        <span style={styles.stateText}>{data[value]}</span>
      </div>
    );
  };
  renderPayStatus = (value) => {
    const data = {
      0: '未支付',
      1: '已支付',
      2: '支付失败',
    };
    return (
      <div style={styles.state}>
        <span style={styles.stateText}>{data[value]}</span>
      </div>
    );
  }
  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '只有管理员才能查看具体的订单信息',
    });
  };

  renderOper = () => {
    return (
      <div>
        <Button text onClick={this.handleDetail}>
          查看
        </Button>
        <span style={styles.separator} />
        <Button text onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  getTableColumns = () => {
    return [
      {
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
        lock: true,
      },
      {
        title: '用户编号',
        dataIndex: 'userId',
        key: 'userId',
        lock: true,
      },
      {
        title: '买家名称',
        dataIndex: 'buyerName',
        key: 'buyerName',
      },
      {
        title: '买家电话',
        dataIndex: 'buyerPhone',
        key: 'buyerPhone',
      },
      {
        title: '买家地址',
        dataIndex: 'buyerAddress',
        key: 'buyerAddress',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '订单金额',
        dataIndex: 'orderAmount',
        key: 'orderAmount',
      },
      {
        title: '支付状态',
        dataIndex: 'payStatus',
        key: 'payStatus',
        cell: this.renderPayStatus,
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        cell: this.renderState,
      },
      {
        title: '操作',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
      },
    ];
  };

  render() {
    return (
      <div>
        <PageHead
          title="订单管理"
          buttonText="添加商品"
          onClick={this.handleClick}
        />
        <IceContainer>
          <CustomTable
            columns={this.getTableColumns()}
            searchQueryHistory={defaultSearchQuery}
            formConfig={formConfig}
            hasAdvance
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  stateText: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#5e83fb',
    background: '#fff',
    border: '1px solid #5e83fb',
    borderRadius: '4px',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
};

  // {
  //   label: '创建时间',
  //   component: 'RangePicker',
  //   advanced: true,
  //   componentProps: {
  //     placeholder: '请选择日期',
  //   },
  //   formBinderProps: {
  //     name: 'createTime',
  //   },
  // },
  // {
  //   label: '下单时间',
  //   component: 'RangePicker',
  //   advanced: true,
  //   componentProps: {
  //     placeholder: '请选择日期',
  //   },
  //   formBinderProps: {
  //     name: 'orderTime',
  //   },
  // },
  // {
  //   label: '退款时间',
  //   component: 'RangePicker',
  //   advanced: true,
  //   componentProps: {
  //     placeholder: '请选择日期',
  //   },
  //   formBinderProps: {
  //     name: 'refundTime',
  //   },
  // },
  // {
  //   label: '付款方式',
  //   component: 'Select',
  //   advanced: true,
  //   componentProps: {
  //     placeholder: '请选择',
  //     dataSource: [
  //       { value: '1', label: '支付宝付款' },
  //       { value: '2', label: '银行卡付款' },
  //       { value: '3', label: '微信付款' },
  //       { value: '4', label: '找人代付' },
  //     ],
  //   },
  //   formBinderProps: {
  //     name: 'payment',
  //   },
  // },
  // {
  //   label: '物流方式',
  //   component: 'Select',
  //   advanced: true,
  //   componentProps: {
  //     placeholder: '请选择',
  //     dataSource: [
  //       { label: '快递发货', value: '1' },
  //       { label: '上门自提', value: '2' },
  //       { label: '同城配送', value: '3' },
  //     ],
  //   },
  //   formBinderProps: {
  //     name: 'transport',
  //   },
  // }

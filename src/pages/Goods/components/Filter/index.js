/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Select, Button } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
// eslint-disable-next-line camelcase
import { Admin_Categories } from '../../../../api/request';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  componentWillMount() {
    Admin_Categories().then((msg) => {
      // console.log(msg);
      if (msg.data.code === 0) {
        const data = msg.data.data.map((item) => {
          return {
            label: item.categoryName,
            value: item.categoryType,
          };
        });
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          categories: data,
        });
      }
    });
  }
  // formChange = (value) => {
  //   this.props.onChange(value);
  // };

  formSubmit = () => {
    this.props.onSubmit(this.state.value);
  }
  formReset = () => {
    this.setState({ value: {} });
  }
  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        // onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" style={styles.formRow}>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品名称：</span>
              <IceFormBinder triggerType="onBlur" name="productName">
                <Input placeholder="请输入" style={{ width: '200px' }} />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="productName" />
              </div>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品状态：</span>
              <IceFormBinder triggerType="onBlur" name="productStatus">
                <Select style={{ width: '200px' }}>
                  <Select.Option value={0}>已上架</Select.Option>
                  <Select.Option value={1}>已下架</Select.Option>
                </Select>
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="productStatus" />
              </div>
            </div>
          </Col>
          <Col l="6">
            <div style={styles.formItem}>
              <span style={styles.formLabel}>商品类型：</span>
              <IceFormBinder triggerType="onBlur" name="categoryType">
                <Select
                  placeholder="请选择"
                  mode="single"
                  style={{ width: '200px' }}
                  dataSource={this.state.categories}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="categoryType" />
              </div>
            </div>
          </Col>
        </Row>
        <Row wrap gutter="40" style={styles.formRow} >
          <Col l="6" />
          <Col l="6">
            <Row l="6" style={styles.formButtonRow}>
              <Button
                type="primary"
                onClick={this.formSubmit}
              >
                提 交
              </Button>
              <Button
                type="primary"
                onClick={this.formReset}
              >
                重置
              </Button>
            </Row>
          </Col>
          <Col l="6" />
        </Row>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  formLabel: {
    minWidth: '80px',
  },
  formButtonRow: {
    justifyContent: 'space-around',
  },
};

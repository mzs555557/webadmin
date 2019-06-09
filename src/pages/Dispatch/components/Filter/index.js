/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Grid, Button } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  formSubmit = () => {
    this.props.onSubmit(this.state.value);
  }
  formReset = () => {
    this.props.onReset();
    this.setState({
      value: {},
    });
  }
  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        ref="form"
      >
        <Row>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>流水号</span>
            <IceFormBinder triggerType="onBlur" name="detailId">
              <Input placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="detailId" />
            </div>
          </Col>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>订单ID</span>
            <IceFormBinder triggerType="onBlur" name="orderId">
              <Input placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="orderId" />
            </div>
          </Col>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>商品名称：</span>
            <IceFormBinder triggerType="onBlur" name="productName">
              <Input placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="productName" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>商品ID</span>
            <IceFormBinder triggerType="onBlur" name="productId">
              <Input placeholder="请输入" style={{ width: '240px' }} />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="productId" />
            </div>
          </Col>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>商品单价：</span>
            <IceFormBinder triggerType="onBlur" name="productPrice">
              <Input placeholder="请输入" style={{ width: '240px' }} htmlType="number" />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="productPrice" />
            </div>
          </Col>
          <Col style={styles.formItem}>
            <span style={styles.formLabel}>订购数量：</span>
            <IceFormBinder triggerType="onBlur" name="productQuantity">
              <Input placeholder="请输入" style={{ width: '240px' }} htmlType="number" />
            </IceFormBinder>
            <div style={styles.formError}>
              <IceFormError name="productQuantity" />
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
                搜 索
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

/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, Input, Button } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  // formChange = (value) => {
  //   this.props.onChange(value);
  // };
  formSubmit = () => {
    this.props.onSubmit(this.state.value);
  }
  formReset = () => {
    this.setState({ value: {} });
    this.props.onReset();
  }
  render() {
    return (
      <IceContainer>
        <IceFormBinderWrapper
          value={this.state.value}
          ref="form"
        >
          <Row wrap gutter="20" style={styles.formRow}>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>分类名称：</span>
                <IceFormBinder triggerType="onBlur" name="categoryName">
                  <Input placeholder="请输入" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="categoryName" />
                </div>
              </div>
            </Col>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>分类Id：</span>
                <IceFormBinder triggerType="onBlur" name="categoryId">
                  <Input placeholder="请输入" />
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="categoryId" />
                </div>
              </div>
            </Col>
            <Col l="8">
              <div style={styles.formItem}>
                <span style={styles.formLabel}>分类类型：</span>
                <IceFormBinder triggerType="onBlur" name="categoryType">
                  <Input placeholder="请输入" />
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
      </IceContainer>
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
    minWidth: '70px',
  },
  formButtonRow: {
    justifyContent: 'space-around',
  },
};

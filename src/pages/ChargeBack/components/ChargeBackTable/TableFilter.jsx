/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Grid, DatePicker, Select, Input } from '@alifd/next';
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
                <span style={styles.formLabel}>下单方式：</span>
                <IceFormBinder triggerType="onBlur" name="orderMethod">
                  <Select style={{ width: '200px' }}>
                    <Select.Option value="1">代下单</Select.Option>
                    <Select.Option value="2">自主下单</Select.Option>
                  </Select>
                </IceFormBinder>
                <div style={styles.formError}>
                  <IceFormError name="orderMethod" />
                </div>
              </div>
            </Col>
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
};

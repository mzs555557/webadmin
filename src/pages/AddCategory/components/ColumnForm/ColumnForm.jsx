import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Message } from '@alifd/next';
// eslint-disable-next-line camelcase
import { Admin_AddCategory } from '../../../../api/request.js';

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 8, s: 6, l: 4 },
  wrapperCol: { s: 12, l: 12 },
};
@withRouter
export default class ColumnForm extends Component {
  static displayName = 'ColumnForm';

  onFormChange = (values, field) => {
    console.log(values, field);
  };

  reset = () => {};

  submit = (values, errors) => {
    // console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
      Admin_AddCategory(values).then((msg) => {
        console.log(msg);
        if (msg.data.code === 0) {
          Message.success(msg.data.msg);
          setTimeout(() => {
            this.props.history.push('/add/goods');
          }, 1000);
        } else {
          Message.error(msg.data.msg);
        }
      });
    } else {
      // 处理表单报错
      Message.error('失败');
    }
  };

  render() {
    return (
      <div className="column-form">
        <IceContainer title="管理员录入" style={styles.container}>
          <Form onChange={this.onFormChange}>
            <div>
              <Row wrap>
                <Col xxs="24" s="12" l="12">
                  <FormItem
                    label="分类名称"
                    {...formItemLayout}
                    required
                    requiredMessage="分类名称必填"
                  >
                    <Input name="categoryName" />
                  </FormItem>
                  {/* <FormItem
                    label="签约运营商："
                    {...formItemLayout}
                    required
                    requiredMessage="签约运营商必须填写"
                  >
                    <Input name="operator" />
                  </FormItem>
                  <FormItem
                    label="计费周期："
                    {...formItemLayout}
                    required
                    requiredMessage="请选择计费周期"
                  >
                    <Select
                      name="period"
                      style={{ width: '100%' }}
                      dataSource={[
                        { label: '按月结算', value: 'month' },
                        { label: '按季度结算', value: 'season' },
                        { label: '按年结算', value: 'year' },
                      ]}
                    />
                  </FormItem> */}
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="8" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Form.Submit type="primary" validate onClick={this.submit}>
                    立即创建
                  </Form.Submit>
                  <Form.Reset style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Form.Reset>
                </Col>
              </Row>
            </div>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};

/* eslint-disable array-callback-return */
/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { withRouter } from 'react-router-dom';
import {
  Input,
  Button,
  Message,
  NumberPicker,
  // DatePicker,
  // Radio,
  Select,
  Upload,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
// eslint-disable-next-line camelcase
import { Admin_AddProduct, Admin_Categories } from '../../../../api/request';
import PageHead from '../../../../components/PageHead';

const { Option } = Select;
// const { Group: RadioGroup } = Radio;
// const { RangePicker } = DatePicker;

@withRouter
export default class GoodsForm extends Component {
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
      // console.log(this.state.categories);
    });
  }
  formChange = (value) => {
    // value.productIcon = value.productIcon[0].response.data;
    console.log('value', value);
  };
  beforeUpload = () => {
    // console.log('beforeUpload callback : ', info);
  };
  onChange = () => {
    // console.log('onChane callback : ', info);
  }
  onSuccess = () => {
    // console.log('onSuccess callback : ', res);
  }
  onError = (file) => {
    Message.error(file);
  }

  validateAllFormField = () => {
    const value = this.state.value;
    value.productIcon = value.productIcon[0].response.data;
    const data = value;
    Admin_AddProduct(data).then((msg) => {
      console.log(msg);
      if (msg.data.code === 0) {
        Message.success(msg.data.data);
        setTimeout(() => {
          this.props.history.push('/goods');
        }, 1000);
      } else {
        Message.error(msg.data.msg);
      }
    });
  };
  formReset = () => {
    this.setState({ value: {} });
  }

  render() {
    return (
      <div>
        <PageHead title="添加商品" />
        <IceContainer style={{ padding: '40px' }}>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品图片</div>
              <IceFormBinder name="productIcon" required message="商品名称必填">
                <Upload.Card
                  listType="card"
                  action="http://localhost:8888/admin/uploadImg"
                  limit={1}
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  beforeUpload={this.beforeUpload}
                  onChange={this.onChange}
                  onSuccess={this.onSuccess}
                  onError={this.onError}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品名称：</div>
              <IceFormBinder name="productName" required message="商品名称必填">
                <Input
                  placeholder="请输入商品名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="productName" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>库存量：</div>
              <IceFormBinder name="productStock" required message="联系方式必填">
                <NumberPicker />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品分类：</div>
              <IceFormBinder name="categoryType">
                <Select
                  placeholder="请选择"
                  mode="single"
                  style={{ width: '400px' }}
                  dataSource={this.state.categories}
                />
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品价格：</div>
              <IceFormBinder name="productPrice" required message="商品价格必填">
                <Input
                  placeholder="请输入商品价格: 199.99"
                  style={{ width: '400px' }}
                  htmlType="number"
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="productPrice" />
              </div>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品状态</div>
              <IceFormBinder name="productStatus">
                <Select
                  placeholder="请选择"
                  mode="single"
                  style={{ width: '400px' }}
                >
                  <Option value={0}>上架</Option>
                  <Option value={1}>下架</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div style={styles.formItem}>
              <div style={styles.formLabel}>商品描述：</div>
              <IceFormBinder name="productDescription" required message="商品价格必填">
                <Input
                  placeholder="描述"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div style={styles.formError}>
                <IceFormError name="productDescription" />
              </div>
            </div>
            <Button
              type="primary"
              onClick={this.validateAllFormField}
            >
              提 交
            </Button>
            <Button
              type="primary"
              onClick={this.formReset}
              style={styles.resetSubmit}
            >
              重 置
            </Button>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: '450',
    width: '80px',
  },
  formError: {
    marginTop: '10px',
  },
  button: {
    marginLeft: '100px',
  },
  resetSubmit: {
    marginLeft: '50px',
  },
};

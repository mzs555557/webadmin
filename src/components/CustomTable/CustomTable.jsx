/* eslint no-prototype-builtins:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination, Message } from '@alifd/next';
import SearchFilter from './SearchFilter';
// eslint-disable-next-line camelcase
import { Admin_SelectOrders } from '../../api/request';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {
    enableFilter: PropTypes.bool,
    searchQueryHistory: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    dataSource: PropTypes.array,
  };

  static defaultProps = {
    enableFilter: true,
    searchQueryHistory: null,
    dataSource: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: cloneDeep(this.props.searchQueryHistory),
      page: 1,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchDataSource();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('searchQueryHistory')) {
      this.setState(
        {
          searchQuery: Object.assign(
            cloneDeep(this.props.searchQueryHistory),
            nextProps.searchQueryHistory
          ),
          page: 1,
        },
        this.fetchDataSource
      );
    }
  }

  fetchDataSource = (page = 0, data = {}) => {
    this.setState({
      loading: true,
    }, () => {
      Admin_SelectOrders(page, data).then((msg) => {
        console.log(msg);
        if (msg.data.code === 0) {
          this.setState({
            loading: false,
            dataSource: msg.data.data,
          });
        } else {
          Message.error(msg.data.msg);
        }
      });
    });
  };

  onSearchChange = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  };

  onSearchSubmit = (searchQuery) => {
    console.log(searchQuery);
    this.setState({
      searchQuery,
      page: 1,
      loading: true,
    }, () => {
      this.fetchDataSource(this.state.page - 1, searchQuery);
    });
  };

  onSearchReset = () => {
    this.setState({
      searchQuery: cloneDeep(this.props.searchQueryHistory),
    });
  };

  onPaginationChange = (page) => {
    this.setState(
      {
        page,
      },
      this.fetchDataSource(page - 1, this.state.searchQuery)
    );
  };

  render() {
    const { enableFilter, columns, formConfig, hasAdvance } = this.props;
    const { searchQuery, dataSource, loading, page } = this.state;

    return (
      <div>
        {enableFilter && (
          <SearchFilter
            formConfig={formConfig}
            value={searchQuery}
            onChange={this.onSeacrhChange}
            onSubmit={this.onSearchSubmit}
            onReset={this.onSearchReset}
            hasAdvance={hasAdvance}
          />
        )}
        <Table dataSource={dataSource} hasBorder={false} loading={loading}>
          {columns.map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell}
                width={item.width || 'auto'}
                lock={item.lock}
              />
            );
          })}
        </Table>
        <Pagination
          style={styles.pagination}
          current={page}
          onChange={this.onPaginationChange}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};

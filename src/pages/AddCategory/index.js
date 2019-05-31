import React, { Component } from 'react';
import ColumnForm from './components/ColumnForm';

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="add-category-page">
        <ColumnForm />
      </div>
    );
  }
}

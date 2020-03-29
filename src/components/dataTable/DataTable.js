import React, {Component} from 'react';
import DataTableComponent from './DataTableComponent';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: []
    }
  }

  render() {
    return(
      <DataTableComponent {...this.props} />
    )
  }
}

export default DataTable;
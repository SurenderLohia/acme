import React, {Component} from 'react';
import DataTableComponent from './DataTableComponent';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: []
    }

    this.onRowClick = this.onRowClick.bind(this);
  };

  onRowClick(rowData, rowIndex) {
    this.props.onRowClick(rowData, rowIndex)
  }

  render() {
    return(
      <DataTableComponent
        rows={this.props.rows}
        columns={this.props.columns}
        onRowClick={this.onRowClick}
      />
    )
  }
}

export default DataTable;
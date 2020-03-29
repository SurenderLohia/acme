import React, {Component} from 'react';
import DataTableComponent from './DataTableComponent';

import columnDefinition from './columnDefinition';

class DataTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [],
      rows: []
    }

    this.getData = this.getData.bind(this);
  }

  getColumns(row) {
    const columns = Object.keys(row);
    const allColumnDefinition = [];
    let itemColumnDefinition;

    columns.forEach((item) => {
      itemColumnDefinition = columnDefinition.find((columnDefinition_item) => columnDefinition_item.id === item);
      if(itemColumnDefinition) {
        allColumnDefinition.push(itemColumnDefinition);
      }
    });

    return allColumnDefinition;
  }

  getData() {
    async function fetchData() {
      const result = await (await fetch(this.props.dataUrl)).json();
      const columns = this.getColumns(result[0]);

      this.setState({rows: result.slice(0, 10)});
      this.setState({columns});
      this.setState({isLoading: false});
    }
    
    fetchData.bind(this)();
  }

  render() {
    return(
      <DataTableComponent {...this.state} getData={this.getData} />
    )
  }
}

export default DataTableContainer;
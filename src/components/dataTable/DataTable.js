import React, {useState, useEffect} from 'react';
import { FixedSizeList as List } from 'react-window';
import './data-table.css';

import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableBodyRow from './DataTableBodyRow';

function DataTable(props) {
  const [ selectedRows, setSelectedRows ] = useState();

  const {
    rows,
    columns,
    onRowClick,
    onSelectionChange
  } = props;
  
  const onChangeTableRowCheckbox = (e) => {
    const value = e.target.value;
    if(value === 'All') {
      setSelectedRows(value);
    } else {
      if (selectedRows instanceof Set) {
        if(selectedRows.has(value)) {
          let newSelectedRows = new Set(selectedRows);
          newSelectedRows.delete(value);
          setSelectedRows(newSelectedRows);
        } else {
          let newSelectedRows = new Set(selectedRows);
          newSelectedRows.add(value);
          setSelectedRows(newSelectedRows);
        }
      } else {
        setSelectedRows(new Set(value));
      }
    }
  }

  useEffect(() => {
    props.onSelectionChange(selectedRows);
  }, [props, selectedRows]);

  const outterPadding = 40;
  const tableHeaderHeight = 50 + outterPadding;

  return(
    <div className="Rtable">
      <DataTableHeaderRow
        columns={props.columns}
        onChangeTableRowCheckbox={onChangeTableRowCheckbox}
      />
        <List
          itemData={{
            rows,
            columns,  
            onRowClick,
            onChangeTableRowCheckbox,
            onSelectionChange
          }}
          className="List"
          height={window.innerHeight - tableHeaderHeight}
          itemCount={50000}
          itemSize={80}
        >
         {DataTableBodyRow}
        </List>
    </div>
  )
};

export default DataTable;
import React, {useState, useEffect} from 'react';
import { FixedSizeList as List } from 'react-window';
import './data-table.css';

import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableBodyRow from './DataTableBodyRow';

const getRowsInitialState = function(rows) {
  const rowsInitialState = {};
  rows.forEach(row => {
    const rowId = row.id;
    const minimalRow = { isChecked: false }
    rowsInitialState[rowId] = minimalRow;
  });

  return rowsInitialState;
}

function DataTable(props) {
  const [ rowsState,  setRowsState ] = useState(getRowsInitialState(props.rows));

  const {
    rows,
    columns,
    onRowClick
  } = props;

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const newRowsState = {};
    Object.keys(rowsState).forEach(id => {
      const row = rowsState[id];
      row.isChecked = isChecked;
      newRowsState[id] = row;
    }); 

    setRowsState(newRowsState);
  }

  const handleRowCheckboxChange = (e, id) => {
    const isChecked = e.target.checked;
    const newRowsState = {...rowsState};

    newRowsState[id].isChecked = isChecked;

    setRowsState(newRowsState);
  }

  //Todo: Need to remove
  // const onChangeTableRowCheckbox = (e) => {
  //   const value = e.target.value;
  //   if(value === 'All') {
  //     if(selectedRows === 'All') {
  //       setSelectedRows('');
  //     } else {
  //       setSelectedRows(value);
  //     }
      
  //   } else {
  //     if (selectedRows instanceof Set) {
  //       if(selectedRows.has(value)) {
  //         let newSelectedRows = new Set(selectedRows);
  //         newSelectedRows.delete(value);
  //         setSelectedRows(newSelectedRows);
  //       } else {
  //         let newSelectedRows = new Set(selectedRows);
  //         newSelectedRows.add(value);
  //         setSelectedRows(newSelectedRows);
  //       }
  //     } else {
  //       setSelectedRows(new Set(value));
  //     }
  //   }
  // }
  
  const getSelctedRows = (rows) => {
    const selectedRows = [];
    const all = 'All';

    Object.keys(rows).forEach(id => {
      const row = rows[id];

      if(row.isChecked) {
        selectedRows.push(id)
      }
    });

    // To check select all is checked
    if(Object.keys(rows).length === selectedRows.length) {
      return all;
    }

    return selectedRows;
  }

  useEffect(() => {
    const selectedRows = getSelctedRows(rowsState);
    props.onSelectionChange(selectedRows);
  }, [props, rowsState]);

  const outterPadding = 40;
  const tableHeaderHeight = 50 + outterPadding;

  return(
    <div className="Rtable">
      <DataTableHeaderRow
        columns={props.columns}
        handleSelectAllChange={handleSelectAllChange}
      />
        <List
          itemData={{
            rows,
            columns,  
            onRowClick,
            rowsState,
            handleRowCheckboxChange
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
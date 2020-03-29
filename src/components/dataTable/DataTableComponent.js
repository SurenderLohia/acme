import React from 'react';
import './data-table.css';

function TableHeader(props) {
  return (
    <div className="data-table-header flex-row">
      {props.columns.map((column) => (
        <div className="data-table-header-cell flex-item" key={column.id}>
          {column.label}
        </div>
      ))}
    </div>
  )
}


function DataTableComponent(props) {
  return(
    <div className="data-table">
      <TableHeader columns={props.columns} />
    </div>
  )
};



export default DataTableComponent;
import React from 'react';
import './data-table.css';

const TableHeaderRow = function(props) {
  return (
    <div className="divTableRow">
      <div className="divTableHead">
        <input type="checkbox" />
      </div> 
      {props.columns.map((column) => (
        <div className="divTableHead" key={column.id}>
          {column.label}
        </div>
      ))}
    </div>
  )
}

const TableBodyRow = function(props) {
  const { row } = props;
  return (
    <div className="divTableRow" key={row.id}>
      <div className="divTableCell">
        <input type="checkbox" />
      </div>
      {props.columns.map((column) => (
        <div className="divTableCell" key={column.id}>
          {props.row[column.id]}
        </div>
      ))}
  </div>
  )
}

const TableBodyRows = function(props) {
  return (
    props.rows.map((row) => (
      <TableBodyRow row={row} columns={props.columns} key={row.id} />
    ))
  )
}

function DataTableComponent(props) {
  return(
    <div className="divTable">
      <div className="divTableBody">
        <TableHeaderRow columns={props.columns} />
        <TableBodyRows columns={props.columns} rows={props.rows} />
      </div>
    </div>
  )
};

export default DataTableComponent;
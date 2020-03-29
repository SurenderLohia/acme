import React from 'react';
import './data-table.css';

const TableHeader = function(props) {
  return (
    <div className="divTableRow">
      {props.columns.map((column) => (
        <div className="divTableHead" key={column.id}>
          {column.label}
        </div>
      ))}
    </div>
  )
}

const TableRowCells = function(props) {
  return (
      props.columns.map((column) => (
        <div className="divTableCell" key={column.id}>
          {props.row[column.id]}
        </div>
      ))
  )
}

const TableRows = function(props) {
  return (
    props.rows.map((row) => (
      <div className="divTableRow" key={row.id}>
        <TableRowCells columns={props.columns} row={row} />
      </div>
    ))
  )
}


function DataTableComponent(props) {
  return(
    <div className="divTable">
      <div className="divTableBody">
        <TableHeader columns={props.columns} />
        <TableRows columns={props.columns} rows={props.rows} />
      </div>
    </div>
  )
};

export default DataTableComponent;
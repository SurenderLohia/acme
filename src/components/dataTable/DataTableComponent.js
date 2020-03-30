import React from 'react';
import './data-table.css';

const TableHeaderRow = function(props) {
  return (
    <div className="divTableRow">
      <div className="divTableHead">
        <input type="checkbox" />
      </div> 
      {props.columns.map((column) => (
        <div 
          className={
            'divTableHead' +
            (column.textAlign ? ` text-align-${column.textAlign}` : '') } key={column.id}
          style={{width: column.width? column.width: 'auto' }}
        >
          {column.label}
        </div>
      ))}
    </div>
  )
}

const TableBodyRow = function(props) {
  const { 
    row, 
    index,
    onRowClick,
    columns
   } = props;
  return (
    <div 
      className="divTableRow"
      key={row.id} 
      onClick={() => onClickTableBodyRow(row, index, onRowClick)}
    >
      <div className="divTableCell">
        <input type="checkbox" />
      </div>
      {columns.map((column) => (
        <div 
          className={
            'divTableCell' + 
            (column.textAlign ? ` text-align-${column.textAlign}` : '') +
            (column.wordWrap ? ' word-wrap': '')
          }
          key={column.id}>
            {props.row[column.id]}
        </div>
      ))}
  </div>
  )
}

const TableBodyRows = function(props) {
  return (
    props.rows.map((row, i) => (
      <TableBodyRow 
        row={row} 
        columns={props.columns} 
        key={row.id} 
        onRowClick={props.onRowClick}
        index={i}
      />
    ))
  )
}

function onClickTableBodyRow(rowData, rowIndex, onRowClick) {
  onRowClick(rowData, rowIndex);
}

function DataTableComponent(props) {
  return(
    <div className="divTable">
      <div className="divTableBody">
        <TableHeaderRow columns={props.columns} />
        <TableBodyRows
          columns={props.columns}
          rows={props.rows}
          onRowClick={props.onRowClick} 
        />
      </div>
    </div>
  )
};

export default DataTableComponent;
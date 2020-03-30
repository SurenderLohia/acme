import React from 'react';
import './data-table.css';
import { valueTypes } from './constants';

const TableRowCellWithText = function(props) {
  console.log('TableRowCellWithText');
  const { column, row } = props;
  return (
    <div 
      className={
        'divTableCell' + 
        (column.textAlign ? ` text-align-${column.textAlign}` : '') +
        (column.wordWrap ? ' word-wrap': '')
      }
    >
        {row[column.id]}
    </div>
  )
}

const TableRowCellWithHtmlElement = function(props) {
  console.log('TableRowCellWithHtmlElement');
  const { column, row } = props;
  return (
    <div 
      className={
        'divTableCell' + 
        (column.textAlign ? ` text-align-${column.textAlign}` : '') +
        (column.wordWrap ? ' word-wrap': '')
      }
      dangerouslySetInnerHTML={{__html: row[column.id]}}
    >
    </div>
  )
}

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
          (column.textAlign ? ` text-align-${column.textAlign}` : '') }
        style={{width: column.width? column.width: 'auto' }}
        key={column.id}
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
        column.valueType === valueTypes.htmlElement ?
          (<TableRowCellWithHtmlElement column={column} row={row} key={column.id} />) :
          (<TableRowCellWithText column={column} row={row} key={column.id} />)
        )
      )}
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
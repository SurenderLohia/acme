import React from 'react';
import './data-table.css';
import { valueTypes } from './constants';

const TableRowCellWithText = function(props) {
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

const TableRowCellWithImg = function(props) {
  const { column, row } = props;
  return (
    <div 
      className={
        'divTableCell' + 
        (column.textAlign ? ` text-align-${column.textAlign}` : '') +
        (column.wordWrap ? ' word-wrap': '')
      }
    >
      <img className="table-cell-thumbnail-image" src={row[column.id]} alt={row[column.id]} />
    </div>
  )
}

const TableRowCellWithHtmlElement = function(props) {
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
      {columns.map((column) => {
        let RenderElement;
        switch (column.valueType) {
          case valueTypes.htmlElement: {
            RenderElement = <TableRowCellWithHtmlElement column={column} row={row} key={column.id} />
            break;
          }

          case valueTypes.image: {
            RenderElement = <TableRowCellWithImg column={column} row={row} key={column.id} />
            break;
          }
        
          default:
            RenderElement = <TableRowCellWithText column={column} row={row} key={column.id} />
            break;
        }
        return RenderElement
      }
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
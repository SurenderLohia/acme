import React from 'react';
import { valueTypes, columnClasses } from './constants';

const TableRowCellWithText = function(props) {
  const { column, row } = props;
  return (
    <div 
      className={
        'Rtable-cell' + 
        (column.textAlign ? ` text-align-${column.textAlign}` : '') +
        (column.wordWrap ? ' word-wrap': '') +
        ` ${columnClasses[column.id]}`
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
        'Rtable-cell' + 
        (column.textAlign ? ` text-align-${column.textAlign}` : '') +
        (column.wordWrap ? ' word-wrap': '') +
        ` ${columnClasses[column.id]}`
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
        'Rtable-cell' + 
        (column.textAlign ? ` text-align-${column.textAlign}` : '') +
        (column.wordWrap ? ' word-wrap': '') +
        ` ${columnClasses[column.id]}`
      }
      dangerouslySetInnerHTML={{__html: row[column.id]}}
    >
    </div>
  )
}

const onClickTableBodyRow = function(e, rowData, rowIndex, onRowClick) {
  const isClickedOnRowCheckbox = e.target.getAttribute('class').includes('js-row-checkbox');
  if(!isClickedOnRowCheckbox) {
    onRowClick(rowData, rowIndex);
  }
}

const onRowCheckboxChange = (e, rowId, handleRowCheckboxChange) => {
  handleRowCheckboxChange(e, rowId);
}

const DataTableBodyRow = function(props) {
  const { 
    index,
    style
   } = props;

   const {
    rows,
    onRowClick,
    columns,
    rowsState,
    handleRowCheckboxChange,
    isItemLoaded
   } = props.data;

  const row = rows[index] || {};

  const Loader = (props) => {
    return (
      <div style={props.style}>
        <div className="loader flex-row flex-center">
          <div>
            Loading...
          </div>
        </div>
      </div>
    )
  }

  return (
    !isItemLoaded(index) ? <Loader style={style} /> :
    <div 
      key={row.id} 
      onClick={(e) => onClickTableBodyRow(e, row, index, onRowClick)}
      style={style}
    >
      <div className={'Rtable-row' + (index % 2 !== 0 ? ' is-striped' : '') }>
      <div className="Rtable-cell select-item-cell">
        <input 
          type="checkbox" 
          onChange={(e) => onRowCheckboxChange(e, row.id, handleRowCheckboxChange)}
          value={row.id}
          checked={rowsState[row.id] && rowsState[row.id].isChecked}
          className="js-row-checkbox"
        />
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
  </div>
  )
}

export default DataTableBodyRow;
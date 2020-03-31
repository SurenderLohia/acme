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

const DataTableBodyRow = function(props) {
  const { 
    index,
    style
   } = props;

   const {
    rows,
    onRowClick,
    columns,
    onChangeTableRowCheckbox,
    onSelectionChange
   } = props.data;

   const row = rows[index];

  return (
    <div 
      key={row.id} 
      onClick={() => onClickTableBodyRow(row, index, onRowClick)}
      style={style}
    >
      <div className={'Rtable-row' + (index % 2 !== 0 ? ' is-striped' : '') }>
      <div className="Rtable-cell select-item-cell">
        <input type="checkbox" onChange={(e) => onChangeTableRowCheckbox(e, onSelectionChange)} value={row.id} />
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

const onClickTableBodyRow = function(rowData, rowIndex, onRowClick) {
  onRowClick(rowData, rowIndex);
}

export default DataTableBodyRow;
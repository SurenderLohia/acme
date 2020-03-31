import React, {useState, useEffect} from 'react';
import { FixedSizeList as List } from 'react-window';
import './data-table.css';
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

const TableHeaderRow = function(props) {
  return (
    <div className="Rtable-row Rtable-row--head">
      <div className="Rtable-cell select-item-cell column-heading">
        <input type="checkbox"
          value="All"
          onChange={(e) => props.onChangeTableRowCheckbox(e, props.onSelectionChange)}
         />
      </div> 
      {props.columns.map((column) => (
        <div 
        className={
          'Rtable-cell column-heading' +
          (column.textAlign ? ` text-align-${column.textAlign}` : '') +
          ` ${columnClasses[column.id]}`
        }
        // Todo: need to fix
        //style={{width: column.width? column.width: 'auto' }}
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

function onClickTableBodyRow(rowData, rowIndex, onRowClick) {
  onRowClick(rowData, rowIndex);
}

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
      <TableHeaderRow
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
         {TableBodyRow}
        </List>
    </div>
  )
};

export default DataTable;
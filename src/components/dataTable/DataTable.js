import React, {useState, useEffect} from 'react';
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
        <input type="checkbox"
          value="All"
          onChange={(e) => props.onChangeTableRowCheckbox(e, props.onSelectionChange)}
         />
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
    columns,
    onChangeTableRowCheckbox,
    onSelectionChange
   } = props;
  return (
    <div 
      className="divTableRow"
      key={row.id} 
      onClick={() => onClickTableBodyRow(row, index, onRowClick)}
    >
      <div className="divTableCell">
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
        onChangeTableRowCheckbox={props.onChangeTableRowCheckbox}
        onSelectionChange={props.onSelectionChange}
      />
    ))
  )
}

function onClickTableBodyRow(rowData, rowIndex, onRowClick) {
  onRowClick(rowData, rowIndex);
}

function DataTable(props) {
  const [ selectedRows, setSelectedRows ] = useState();

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

  return(
    <div className="divTable">
      <div className="divTableBody">
        <TableHeaderRow 
          columns={props.columns}
          onChangeTableRowCheckbox={onChangeTableRowCheckbox}
        />
        <TableBodyRows
          columns={props.columns}
          rows={props.rows}
          onRowClick={props.onRowClick}
          onSelectionChange={props.onSelectionChange}
          onChangeTableRowCheckbox={onChangeTableRowCheckbox}
        />
      </div>
    </div>
  )
};

export default DataTable;
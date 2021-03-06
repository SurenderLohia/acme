import React from 'react';
import { columnClasses } from './constants';

const onSelectAllChange = (e, handleSelectAllChange) => {
  handleSelectAllChange(e)
}

const DataTableHeaderRow = function(props) {
  return (
    <div className="Rtable-row Rtable-row--head">
      <div className="Rtable-cell select-item-cell column-heading">
        <input type="checkbox"
          value="All"
          onChange={(e) => onSelectAllChange(e, props.handleSelectAllChange)}
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

export default DataTableHeaderRow;
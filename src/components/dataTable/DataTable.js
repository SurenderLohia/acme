import React, {useState, useEffect} from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

import './data-table.css';

import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableBodyRow from './DataTableBodyRow';

const getRowsInitialState = function(rows = []) {
  const rowsInitialState = {};
  rows.forEach(row => {
    const rowId = row.id;
    const minimalRow = { isChecked: false }
    rowsInitialState[rowId] = minimalRow;
  });

  return rowsInitialState;
}

function DataTable(props) {
  const [ rowsState,  setRowsState ] = useState(getRowsInitialState(props.rows));
  const [ page, setPage ] = useState(props.page);
  const [ searchText, setSearchText ] = useState('');

  const {
    rows,
    columns,
    onRowClick,
    hasNextPage,
    isNextPageLoading,
    loadNextPage
  } = props;

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const newRowsState = {};
    Object.keys(rowsState).forEach(id => {
      const row = rowsState[id];
      row.isChecked = isChecked;
      newRowsState[id] = row;
    }); 

    setRowsState(newRowsState);
  }

  const handleRowCheckboxChange = (e, id) => {
    const isChecked = e.target.checked;
    const newRowsState = {...rowsState};

    newRowsState[id].isChecked = isChecked;

    setRowsState(newRowsState);
  }

  const getSelctedRows = (rows) => {
    const selectedRows = [];
    const all = 'All';

    Object.keys(rows).forEach(id => {
      const row = rows[id];

      if(row.isChecked) {
        selectedRows.push(id)
      }
    });

    // To check select all is checked
    if(Object.keys(rows).length === selectedRows.length) {
      return all;
    }

    return selectedRows;
  }

  useEffect(() => {
    const selectedRows = getSelctedRows(rowsState);
    props.onSelectionChange(selectedRows);
  }, [props, rowsState]);

  const outterPadding = 40;
  const tableHeaderHeight = 50 + outterPadding;

  // Infinity Loader

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? rows.length + 1 : rows.length;
  console.log('itemCount', itemCount);

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  console.log('isNextPageLoading', isNextPageLoading);
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < rows.length;
  //console.log('isItemLoaded', isItemLoaded(index));

  const onLoadMoreItems = (query) => {
    if(!isNextPageLoading) {
      if(!query.isSearchQuery) {
        query.page += 1;
        setPage(query.page);
      }
    }
    
    console.log('page', query.page);
    loadMoreItems(query);
  }

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const serachQuery = {
      isSearchQuery: true,
      searchText,
      page: 1
    }
    
    setPage(2);
    onLoadMoreItems(serachQuery);
  }

  return(
    <div className="data-table">
      <form className="search-filter-container flex-row" onSubmit={onSearchSubmit}>
        <div>
          <select className="search-filter-type">
            <option value="">Filter</option>
            {columns.map((column) => {
              return <option value={column.id} key={column.id}>{column.label}</option>
            })}
          </select>
        </div>
        <div className="flex-item">
          <input 
            className="search-filter-input" 
            type="text" 
            placeholder="Search photos"
            onChange={onSearchTextChange}
          />
        </div>
      </form>
      <div className="Rtable">
        <DataTableHeaderRow
          columns={props.columns}
          handleSelectAllChange={handleSelectAllChange}
        />
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={() => onLoadMoreItems({page: page})}
        >
          {({ onItemsRendered, ref }) => (
          <List
            itemData={{
              rows,
              columns,  
              onRowClick,
              rowsState,
              handleRowCheckboxChange,
              isItemLoaded
            }}
            className="List"
            height={window.innerHeight - tableHeaderHeight}
            itemCount={itemCount}
            itemSize={80}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
          {DataTableBodyRow}
          </List>
          )}
        </InfiniteLoader>
      </div>
    </div>
  )
};

DataTable.defaultProps = {
  page: 1
}

export default DataTable;
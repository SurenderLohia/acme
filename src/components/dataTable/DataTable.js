import React, {useState, useEffect, useRef} from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

import './data-table.css';

import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableBodyRow from './DataTableBodyRow';

const formatRowsState = function(rowsState, rows = []) {
  const formatedRowState = {};

  rows.forEach(row => {
    const rowId = row.id;
    if(!rowsState[rowId]) {
      const newProps = { isChecked: false }
      formatedRowState[rowId] = Object.assign({}, row, newProps);
    } else {
      formatedRowState[rowId] = rowsState[rowId];
    }
  });
  
  return formatedRowState;
}

function DataTable(props) {
  const [ rowsState,  setRowsState ] = useState({});
  const [ searchText, setSearchText ] = useState('');
  const [ searchType, setSearchType ] = useState('');

  const infiniteLoaderRef = useRef(null);
  const hasMountedRef = useRef(false);

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
    const newRowsState = Object.assign({}, rowsState);

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
    setRowsState(formatRowsState(rowsState, props.rows));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rows]);

  useEffect(() => {
    const selectedRows = getSelctedRows(rowsState);
    props.onSelectionChange(selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsState]);


  // Each time searchText or searchType changed we called the method resetloadMoreItemsCache to clear the cache
  useEffect(() => {
    // We only need to reset cached items when "searchText" changes.
    // This effect will run on mount too; there's no need to reset in that case.
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache();
      }
    }
    hasMountedRef.current = true;
  }, [searchText, searchType]);

  const outterPadding = 40;
  const searchBoxheight = 56;
  const tableHeaderHeight = 50;

  const tableHeight = (window.innerHeight - (outterPadding + searchBoxheight + tableHeaderHeight));

  // Infinity Loader

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? rows.length + 1 : rows.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < rows.length;

  const onLoadMoreItems = (args) => {
    const query = {
      searchText,
      searchType
    }
    
    loadMoreItems(args, query);
  }

  const onChangeSearchType = (e) => {
    setSearchType(e.target.value);
  }

  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const onSearchSubmit = (e) => {
    e.preventDefault();

    const query = {
      searchText
    }

    loadMoreItems([], query);
  }

  return(
    <div className="data-table">
      <form className="search-filter-container flex-row" onSubmit={onSearchSubmit}>
        <div>
          <select 
            className="search-filter-type" 
            value={searchType}
            onChange={onChangeSearchType}
          >
            <option value="">Filter</option>
            {columns.map((column) => {
              if(column.id !== 'thumbnailUrl') {
                return <option value={column.id} key={column.id}>{column.label}</option>
              }
              return '';
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
          ref={infiniteLoaderRef}
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={(args) => onLoadMoreItems(args)}
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
            height={tableHeight}
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

export default DataTable;
import React, {useEffect, useState} from 'react';
import DataTable from './components/dataTable/DataTable';
import './App.css';

import columnDefinition from './columnDefinition';

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const TOTAL_ROWS = 5000;

function App() {
  const [rows, setRows] = useState([]);

  const [hasNextPage, setHasNextPage] = useState([]);
  const [isNextPageLoading, setIsNextPageLoading] = useState([]);
  
  async function fetchData(...args) {
    const limit = 10;
    const page = args.length === 0 ? 1 : ((args[0] + limit) / 10);
    const argQuery = args[1];
    const searchText = argQuery && argQuery.searchText;
    const searchType = argQuery && argQuery.searchType;

    let query = `?_page=${page}&_limit=${limit}`;

    setHasNextPage(rows.length < TOTAL_ROWS);

    if(searchType && searchText) {
      query +=`&${searchType}=${searchText}`
    } else if(searchText) {
      query += `&q=${searchText}`;
    }

    const result = await fetch((PHOTOS_URL + query));
    const json = await result.json();

    if(json.length < limit) {
      setHasNextPage(false);
    }

    setIsNextPageLoading(false);

    // If: It's a first page while init or on searchFiter then replase rows with current result
    if(page === 1) {
      setRows(json);  
    } else {
      setRows([...rows, ...json]);
    }
  }
  
  const _loadNextPage = (...args) => {
    fetchData(...args);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="wrapper App">
      <DataTable
        columns={columnDefinition}
        rows={rows}
        onRowClick={(rowData, rowIndex) => {
          console.log('rowData', rowData);
          console.log('rowIndex', rowIndex);
        }}
        onSelectionChange={(selectedRows) => {
          console.log('selectedRows', selectedRows);
        }}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        loadNextPage={_loadNextPage}
      />
    </div>
  );
}

export default App;

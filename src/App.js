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
  
  async function fetchData({page = 1, limit = 12} = {}) {
    const query = `?_page=${page}&_limit=${limit}`;
    const result = await fetch((PHOTOS_URL + query));
    const json = await result.json();

    setHasNextPage(rows.length < TOTAL_ROWS);
    setIsNextPageLoading(false);
    setRows([...rows, ...json]);
  }

  const _loadNextPage = (query) => {
    fetchData(query);
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

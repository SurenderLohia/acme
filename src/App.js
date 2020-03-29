import React, {useEffect, useState} from 'react';
import DataTable from './components/dataTable/DataTable';
import './App.css';

import columnDefinition from './columnDefinition';

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

const getColumns = function(row) {
  const columns = Object.keys(row);
  const allColumnDefinition = [];
  let itemColumnDefinition;

  columns.forEach((item) => {
    itemColumnDefinition = columnDefinition.find((columnDefinition_item) => columnDefinition_item.id === item);
    if(itemColumnDefinition) {
      allColumnDefinition.push(itemColumnDefinition);
    }
  });

  return allColumnDefinition;
}

function App() {
  const [colums, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await (await fetch(PHOTOS_URL)).json();
      const columns = getColumns(result[0]);
  
      setColumns({columns});
      setRows({rows: result.slice(0, 10)});
      setIsLoading({isLoading});
    }
    
    fetchData.bind(this)();
  }, []);
  return (
    <div className="wrapper App">
      <DataTable
        columns={colums}
        rows={rows}
       />
    </div>
  );
}

export default App;

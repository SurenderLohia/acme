import React, {useEffect, useState} from 'react';
import DataTable from './components/dataTable/DataTable';
import './App.css';

import columnDefinition from './columnDefinition';

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

function App() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await (await fetch(PHOTOS_URL)).json();
      
      setRows(result.slice(0, 10));
      setIsLoading(false);
    }
    
    fetchData.bind(this)();
  }, []);
  return (
    <div className="wrapper App pt2">
      { isLoading ? 
        <div>Loading...</div>:
        <DataTable
          columns={columnDefinition}
          rows={rows}
        />
      }
      
    </div>
  );
}

export default App;

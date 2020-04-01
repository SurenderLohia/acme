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

      // to check valueType htmlElement option:
      const rowWithHtmlElement = {
        "albumId": 0,
        "id": 0,
        "title": '<div style="color: #7B1FA2">This is a html element. Set valueType 4 to render html elemenet</div>',
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952",
      }

      const rowsWithHhtmlElement = [rowWithHtmlElement, ...result.slice(0, 5000)];

      //: To test 50k
      // const rowsWithHhtmlElement = [
      //   rowWithHtmlElement, ...result, ...result,
      //   ...result, ...result,
      //   ...result, ...result,
      //   ...result, ...result,
      //   ...result, ...result
      // ];
      
      setRows(rowsWithHhtmlElement);
      setIsLoading(false);
    }
    
    fetchData.bind(this)();
  }, []);
  return (
    <div className="wrapper App">
      { isLoading ? 
        <div>Loading...</div>:
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
        />
      }
      
    </div>
  );
}

export default App;

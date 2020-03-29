import React from 'react';
import DataTableContainer from './components/dataTable/DataTableContainer';
import './App.css';

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

function App() {
  return (
    <div className="wrapper App">
      <DataTableContainer dataUrl={PHOTOS_URL} />
    </div>
  );
}

export default App;

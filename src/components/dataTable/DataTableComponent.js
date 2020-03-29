import React, { useEffect } from 'react';

function DataTableComponent(props) {
  useEffect(() => {
    props.getData();
  }, []);
  return(
    <div>
      <h2>Data Table Component</h2>
    </div>
  )
};

export default DataTableComponent;
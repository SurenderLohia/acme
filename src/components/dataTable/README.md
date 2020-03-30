## How to use DataTable component

### First Import the component (Path depends on where you kept the component)
```
import DataTable from './components/dataTable/DataTable';
```

### Add the component
```
<DataTable
  columns={columnDefinition}
  rows={rows}
  onRowClick={(rowData, rowIndex) => cb}
/>
```
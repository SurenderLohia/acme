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

### Column Options:

Column options are optional, if required you have to add column option in column item.

#### valueType:
valueType option is used to set the column data type. 
- By default it's a string data type

valueType possible values are: 1 | 2 | 3

eg: change typeType to number
```
 valueType: 2
```

```
  1 - string
  2 - number
  3 - element
```


#### textAlign:
textAlign option is used to set the column text alignment.
- By default textAlign is left

textAlign possible values are: 'left' | 'right' | 'center'

eg: change alignment to right
```
 textAlign: 'right'
```
Note: I am using this approach, because in future we use can this to any column not only to numberic column

### wordWrap
wordWrap option is used to set the column word wrap
- By default it false

wordWrap possible values are: true | false

eg: to set wordWrap true
```
wordWrap: true
```
Note: This option will be useful when a cell contains a url.


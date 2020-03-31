import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import DataTable from '../DataTable';
import MockDataTableBodyRow from '../DataTableBodyRow';

jest.mock('../DataTableBodyRow', () => {
  return function DummyDataTableRow() {
    return (
      <div>DataTableBodyRow</div>
    )
  }
});

let container = null;
let component = null;
let onRowClickMock;
let onSelectionChangeMock;

const columnDefinition = [
  {
    id: 'thumbnailUrl',
    label: 'Thumbnail',
    valueType: 3,
    wordWrap: true
  },
  {
    id: 'id',
    label: 'ID',
    valueType: 2,
    textAlign: 'right'
  },
  {
    id: 'albumId',
    label: 'Album Id',
    valueType: 2,
    textAlign: 'right'
  },
  {
    id: 'title',
    label: 'Title',
    valueType: 4,
    width: '370px'
  },
  {
    id: 'url',
    label: 'URL',
    valueType: 1,
    wordWrap: true
  }
];

const rows = [
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
  {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
  {
    "albumId": 1,
    "id": 5,
    "title": "natus nisi omnis corporis facere molestiae rerum in",
    "url": "https://via.placeholder.com/600/f66b97",
    "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  },
  {
    "albumId": 1,
    "id": 6,
    "title": "accusamus ea aliquid et amet sequi nemo",
    "url": "https://via.placeholder.com/600/56a8c2",
    "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
  },
  {
    "albumId": 1,
    "id": 7,
    "title": "officia delectus consequatur vero aut veniam explicabo molestias",
    "url": "https://via.placeholder.com/600/b0f7cc",
    "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
  },
  {
    "albumId": 1,
    "id": 8,
    "title": "aut porro officiis laborum odit ea laudantium corporis",
    "url": "https://via.placeholder.com/600/54176f",
    "thumbnailUrl": "https://via.placeholder.com/150/54176f"
  },
  {
    "albumId": 1,
    "id": 9,
    "title": "qui eius qui autem sed",
    "url": "https://via.placeholder.com/600/51aa97",
    "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
  },
  {
    "albumId": 1,
    "id": 10,
    "title": "beatae et provident et ut vel",
    "url": "https://via.placeholder.com/600/810b14",
    "thumbnailUrl": "https://via.placeholder.com/150/810b14"
  }
]

describe('DataTable', function() {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    onRowClickMock = jest.fn();
    onSelectionChangeMock = jest.fn();

    component = (<DataTable 
      columns={columnDefinition}
      rows={rows}
      onRowClick={onRowClickMock}
      onSelectionChange={onSelectionChangeMock}/>)
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    component = null;
    
  });

  it("should render Table", () => {
    act(() => {
      render(component, container);
    });

    expect(container.querySelector('.Rtable')).toBeTruthy();
  });
});
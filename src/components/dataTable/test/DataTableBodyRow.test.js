import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import DataTableBodyRow from '../DataTableBodyRow';

let container = null;
let component = null;
let onChangeTableRowCheckboxMock;
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
]

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
  }
]

describe('DataTableBodyRow', function() {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    onRowClickMock = jest.fn();
    onChangeTableRowCheckboxMock = jest.fn();
    onSelectionChangeMock = jest.fn();

    const data = {
      rows,
      columns: columnDefinition,
      onRowClick: onRowClickMock,
      onChangeTableRowCheckbox: onChangeTableRowCheckboxMock,
      onSelectionChange: onSelectionChangeMock
    }

    component = (<DataTableBodyRow 
      index={1}
      style={{}}
      data={data}
    />)
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    component = null;
    onRowClickMock = null;
    onChangeTableRowCheckboxMock = null;
    onSelectionChangeMock = null;
  });

  it("should render Row", () => {
    act(() => {
      render(component, container);
    });

    expect(container.querySelector('.Rtable-row')).toBeTruthy();
  });

  it("should render Cells", () => {
    act(() => {
      render(component, container);
    });

    expect(container.querySelectorAll('.Rtable-cell').length).toBe(columnDefinition.length + 1);
  });

  it("should call onChangeTableRowCheckbox method on change of checkbox", () => {
    act(() => {
      render(component, container);
      const checkbox = document.querySelector('input[type="checkbox"]');
      checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onChangeTableRowCheckboxMock).toHaveBeenCalledTimes(1);
  });

  describe('Text Align', function() {
    it("should set text align right class when a column has textAlign:right option", () => {
      act(() => {
        render(component, container);
      });
  
      expect(container.querySelector('.id-cell.text-align-right')).toBeTruthy();
    });

    it("should not set text-align classes when a cloum does not have textAlign option", () => {
      act(() => {
        render(component, container);
      });
  
      expect(container.querySelector('.Rtable-title.text-align-right')).toBeFalsy();
      expect(container.querySelector('.Rtable-title.text-align-center')).toBeFalsy();
    });
  });
});
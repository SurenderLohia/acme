import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import DataTableHeaderRow from '../DataTableHeaderRow';

let container = null;
let component = null;
let onChangeTableRowCheckboxMock;

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

describe('DataTableHeaderRow', function() {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    onChangeTableRowCheckboxMock = jest.fn();

    component = (<DataTableHeaderRow 
      columns={columnDefinition}
      onChangeTableRowCheckbox={onChangeTableRowCheckboxMock}/>)
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    component = null;
    onChangeTableRowCheckboxMock = null;
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
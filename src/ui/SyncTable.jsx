import { createContext, useContext, useEffect, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import styled, { css } from 'styled-components';
// import { FaAngleDown } from 'react-icons/fa';
// import { FaAngleUp } from 'react-icons/fa';

import {
  HiMiniChevronUpDown,
  HiMiniChevronDown,
  HiMiniChevronUp,
} from 'react-icons/hi2';

const SyncTableContext = createContext(null);
const SyncTableDispatchContext = createContext(null);

// ** REDUCER **

// Initial State of the SyncTable
const initialState = {
  metadata: [],
  defColSortId: 0,
  // 0: None, 1: Ascending, 2: Descending
  currSortCol: { id: 0, sort: 0, colname: '' },
  data: [],
};

function tableReducer(state, action) {
  switch (action.type) {
    case 'init':
      state.metadata = action.payload.metadata;
      state.defColSortId = action.payload.defColSortId;
      state.data = action.payload.data;
      break;

    case 'sortcol':
      state.currSortCol = action.payload;
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

// Overall Component Wrapper
const TableComponent = styled.div`
  margin: 2rem;
`;

// Table Styling
const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  font-size: 1.6rem;
`;

// TODO: Reduce size of the font for tablet and mobile devices
// ** MAIN PARENT COMPONENT **
function SyncTable({ children, metadata, defColSortId, data }) {
  const [state, dispatch] = useImmerReducer(tableReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: {
        metadata: metadata || [],
        defColSortId: defColSortId || 0,
        data: data || [],
      },
    });
  }, [data, defColSortId, dispatch, metadata]);

  return (
    <SyncTableContext.Provider value={state}>
      <SyncTableDispatchContext.Provider value={dispatch}>
        {children}
      </SyncTableDispatchContext.Provider>
    </SyncTableContext.Provider>
  );
}

/**
 * Component to display and handle filtering
 */
function Filter() {
  console.log('Render Filter:');
  return <div>TableFilter</div>;
}

// ** STYLED COMPONENTS **

// Style header - th to dynamically assign style based on the metadata
const TableHeaderCell = styled.th.attrs((props) => ({
  $align: props.$align || 'center',
  $bgColor: props.$bgColor || 'var(--table-header-bg-color)',
  $textColor: props.$textColor || 'var(--table-header-text-color)',
}))`
  width: ${(props) => props.$width};
  text-align: ${(props) => props.$align};
  padding: 1.6rem 1.8rem;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  line-height: 1;
  vertical-align: middle;
  /* Disable quick succession clicks causing selects  */
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const SpanTitle = styled.span.attrs((props) => ({
  $align: props.$align || 'center',
}))`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$align === 'left'
      ? 'flex-start'
      : props.$align === 'right'
      ? 'flex-end'
      : 'center'};
  gap: 0.5rem;
  height: 3.2rem;
  font-size: 1.6rem;
`;

const SpanName = styled.span`
  font-size: 1em;
`;

// TODO: Change the Size based on Sort
const SpanSort = styled.span`
  /* 
  display: flex;
  gap: 0;
  flex-direction: column;
  */
  font-size: 1.4em;

  cursor: pointer;

  & svg {
    stroke-width: 0.1rem;
  }
`;

// Table Cell Styling

const TableCell = styled.td.attrs((props) => ({}))`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${(props) => props.$align};
  padding: 1rem 1rem;
`;

// ** DATA COMPONENT **

function Data() {
  console.log('Render Data:');
  const { metadata, currSortCol, data } = useTableState();
  const dispatch = useTableDispatch();

  // ** EVENT HANDLERS **

  // Handle the clicking of the sort Icon
  function handleColSort(e, item, currSortCol) {
    if (currSortCol.id !== item.id) {
      dispatch({
        type: 'sortcol',
        payload: { id: item.id, colname: item.colname, sort: 1 },
      });
    } else {
      dispatch({
        type: 'sortcol',
        payload: {
          id: currSortCol.id,
          colname: item.colname,
          sort: (currSortCol.sort + 1) % 3,
        },
      });
    }
  }

  // If metadata and currentSortCol is null and not initialized do to render
  if (!metadata || metadata.length === 0 || !currSortCol) return null;

  // Assign the correct sort icon based on 2 attributes
  function sortIcon(metaItem, currSortCol) {
    return (
      <>
        <SpanName>{metaItem.title}</SpanName>
        <SpanSort onClick={(e) => handleColSort(e, metaItem, currSortCol)}>
          {metaItem.sort ? (
            currSortCol.id === metaItem.id ? (
              currSortCol.sort === 1 ? (
                <HiMiniChevronUp />
              ) : currSortCol.sort === 2 ? (
                <HiMiniChevronDown />
              ) : (
                <HiMiniChevronUpDown />
              )
            ) : (
              <HiMiniChevronUpDown />
            )
          ) : (
            ''
          )}
        </SpanSort>
      </>
    );

    // if (item.sort) {

    //   if (currSortCol.id === item.id) {
    //     console.log('if ', item, currSortCol);
    //     return (
    //       <SpanSort onClick={(e) => handleColSort(e, item.id, currSortCol)}>
    //         {currSortCol.sort === 1 ? (
    //           <HiMiniChevronUp />
    //         ) : currSortCol.sort === 2 ? (
    //           <HiMiniChevronDown />
    //         ) : (
    //           <HiMiniChevronUpDown />
    //         )}
    //       </SpanSort>
    //     );
    //   } else {
    //     console.log('else ', item, currSortCol);
    //     return (
    //       <SpanSort onClick={(e) => handleColSort(e, item.id, currSortCol)}>
    //         <HiMiniChevronUpDown />
    //       </SpanSort>
    //     );
    //   }
    // } else {
    //   return '';
    // }
  }

  // ** CREATE TABLE HEADER **

  // Create table header
  const tableHeader = metadata.map((metaItem) => {
    return (
      <TableHeaderCell
        key={metaItem.id}
        $width={metaItem.width}
      >
        <SpanTitle $align={metaItem.hAlign}>
          {sortIcon(metaItem, currSortCol)}
        </SpanTitle>
      </TableHeaderCell>
    );
  });

  // ** CREATE TABLE BODY **
  let tableBody;

  // Create sort function for sorting
  function sortFn(currSortCol) {
    const key = currSortCol.colname;
    const sortFactor =
      currSortCol.sort === 1 ? 1 : currSortCol.sort === 2 ? -1 : 0;
    // sortBy = currSortCol.
    return (a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (typeof a[key] === 'string') {
        valueA = a[key].toLowerCase();
        valueB = b[key].toLowerCase();
      }

      return valueA < valueB
        ? -1 * sortFactor
        : valueA > valueB
        ? 1 * sortFactor
        : 0;
    };
  }

  // Create the rows only if the data is present
  if (!data || data.length === 0) {
    tableBody = (
      <tr>
        <TableCell
          $align='center'
          colSpan={metadata.length}
        >
          No records returned
        </TableCell>
      </tr>
    );
  } else {
    // Shallow Copy before sort
    // const sortedData = [...data];
    const sortedData = Array.from(data);

    // Only sort after the sort has been clicked
    if (!(currSortCol.id === 0 || currSortCol.name === '')) {
      sortedData.sort(sortFn(currSortCol));
    }

    // Sort table data for the body
    tableBody = sortedData.map((dataItem) => {
      return (
        <tr key={dataItem.id}>
          {metadata.map((metaItem) => (
            <TableCell
              $align={metaItem.dAlign}
              key={metaItem.colname}
            >
              {dataItem[metaItem.colname]}
            </TableCell>
          ))}
        </tr>
      );
    });
  }

  // Return the rendered Data component
  return (
    <TableComponent>
      <Table>
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </TableComponent>
  );
}

// ** PAGINATION **

function Pagination() {
  console.log('Render Pagination:');
  return <div>Pagination</div>;
}

function useTableState() {
  return useContext(SyncTableContext);
}

function useTableDispatch() {
  return useContext(SyncTableDispatchContext);
}

SyncTable.Filter = Filter;
SyncTable.Data = Data;
SyncTable.Pagination = Pagination;

export default SyncTable;

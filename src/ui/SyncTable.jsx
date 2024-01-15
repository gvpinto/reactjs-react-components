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

// Initial State of the SyncTable
const initialState = {
  metadata: [],
  defColSortId: 0,
  // 0: None, 1: Ascending, 2: Descending
  currSortCol: { id: 0, sort: 0 },
  data: [],
};

function tableReducer(state, action) {
  switch (action.type) {
    case 'init':
      state.metadata = action.payload.metadata;
      state.defColSortId = action.payload.defColSortId;
      break;

    case 'sortcol':
      console.log('action.payload: ', action.payload);
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

/**
 * Main Parent Component
 */
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
        <TableComponent>
          <Table>{children}</Table>
        </TableComponent>
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

// Style header - th to dynamically assign style based on the metadata
const TableHeader = styled.th.attrs((props) => ({
  $hAlign: props.$hAlign || 'center',
  $bgColor: props.$bgColor || '#0a2d4e',
  $textColor: props.$textColor || '#fff',
}))`
  width: ${(props) => props.$width};
  text-align: ${(props) => props.$hAlign};
  padding: 1.6rem 1.8rem;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  line-height: 1;
`;

const SpanTitle = styled.span`
  display: flex;
  align-items: center;
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
`;

function Data() {
  console.log('Render Data:');
  const { metadata, currSortCol, data } = useTableState();
  const dispatch = useTableDispatch();

  console.log('currSortCol: ', currSortCol);

  // Handle the clicking of the sort Icon
  function handleColSort(e, itemId, currSortCol) {
    if (currSortCol.id !== itemId) {
      dispatch({ type: 'sortcol', payload: { id: itemId, sort: 1 } });
    } else {
      dispatch({
        type: 'sortcol',
        payload: { id: currSortCol.id, sort: (currSortCol.sort + 1) % 3 },
      });
    }
  }

  // If metadata and currentSortCol is null and not initialized do to render
  if (!metadata || metadata.length === 0 || !currSortCol) return null;

  function sortIcon(item, currSortCol) {
    return (
      <>
        <SpanName>{item.name}</SpanName>
        <SpanSort onClick={(e) => handleColSort(e, item.id, currSortCol)}>
          {item.sort ? (
            currSortCol.id === item.id ? (
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

  const tableHeader = metadata.map((item) => {
    return (
      <TableHeader
        key={item.id}
        $width={item.width}
        $hAlign={item.hAlign}
      >
        <SpanTitle>{sortIcon(item, currSortCol)}</SpanTitle>
      </TableHeader>
    );
  });

  const tableBody = data.map((item) => {
    return (
      <tr key={item.id}>
        {Object.keys(item).forEach((key, index) => (
          <td key={index}> </td>
        ))}
      </tr>
    );
  });

  return (
    <>
      <thead>
        <tr>{tableHeader}</tr>
      </thead>

      <tbody>{tableBody}</tbody>
    </>
  );
}

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

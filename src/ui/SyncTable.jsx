import { createContext, useContext, useEffect, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import styled, { css } from 'styled-components';

const SyncTableContext = createContext(null);
const SyncTableDispatchContext = createContext(null);

const initialState = {
  metadata: [],
  defColSortId: 0,
};

function tableReducer(state, action) {
  switch (action.type) {
    case 'init':
      state.metadata = action.payload.metadata;
      state.defColSortId = action.payload.defColSortId;
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

// Overall Component Wrapper
const StyledTableComponent = styled.div`
  margin: 2rem;
`;

// Table Styling
const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  font-size: 1.6rem;
`;

/**
 * Main Parent Component
 */
function SyncTable({ children, metadata, defColSortId }) {
  const [state, dispatch] = useImmerReducer(tableReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: {
        metadata: metadata || [],
        defColSortId: defColSortId || 0,
      },
    });
  }, [defColSortId, dispatch, metadata]);

  return (
    <SyncTableContext.Provider value={state}>
      <SyncTableDispatchContext.Provider value={dispatch}>
        <StyledTableComponent>
          <StyledTable>{children}</StyledTable>
        </StyledTableComponent>
      </SyncTableDispatchContext.Provider>
    </SyncTableContext.Provider>
  );
}

/**
 * Component to display and handle filtering
 */
function Filter() {
  return <div>TableFilter</div>;
}

// Style header - th to dynamically assign style based on the metadata
const StyledTh = styled.th.attrs((props) => ({
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

const StyleTd = styled.td.attrs((props) => ({}))`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Data() {
  const { metadata } = useTableState();

  if (!metadata || metadata.length === 0) return null;

  const tableHeader = metadata.map((item) => {
    return (
      <StyledTh
        key={item.id}
        $width={item.width}
        $hAlign={item.hAlign}
      >
        {item.name}
      </StyledTh>
    );
  });

  return (
    <thead>
      <tr>{tableHeader}</tr>
    </thead>
  );
}

function Pagination() {
  return <div>Pagination</div>;
}

function useTableState() {
  return useContext(SyncTableContext);
}

function useTableDispatch() {
  return useContext(SyncTableContext);
}

SyncTable.Filter = Filter;
SyncTable.Data = Data;
SyncTable.Pagination = Pagination;

export default SyncTable;

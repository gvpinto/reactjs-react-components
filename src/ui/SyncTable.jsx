import { createContext, useContext, useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import styled, { css } from 'styled-components';
// import { FaAngleDown } from 'react-icons/fa';
// import { FaAngleUp } from 'react-icons/fa';

import {
  HiMiniChevronUpDown,
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMagnifyingGlass,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi2';

// *** CONTEXT DEFINITION ***
const SyncTableContext = createContext(null);
const SyncTableDispatchContext = createContext(null);

// *** Initial State ***

// Initial State of the SyncTable
const initialState = {
  metadata: [],
  defColSortId: 0,
  // 0: None, 1: Ascending, 2: Descending
  currSortCol: { id: 0, sort: 0, colname: '' },
  data: [],
  filter: { colname: '', value: '' },
  pagination: {
    totalRows: 0,
    rowsPerPage: 10,
    totalPages: 0,
    spread: 1,
    currentPage: 1,
  },
};

function calcTotalPages(totalRows, rowsPerPage) {
  return Math.floor(totalRows / rowsPerPage) + 1;
}

function calcSpread(totalPages) {
  if (totalPages <= 5) return 1;
  else if (totalPages > 5 && totalPages <= 15) return 2;
  else return 3;
}

function pageShift(currentPage, totalPages, direction) {
  console.log(
    'currentPage: ',
    currentPage,
    'totalPages: ',
    totalPages,
    'direction: ',
    direction,
  );
  const shiftVal = direction === 'next' ? 1 : -1;
  if (
    (direction === 'next' && currentPage === totalPages) ||
    (direction === 'prev' && currentPage === 1)
  )
    return currentPage;
  return currentPage + shiftVal;
}

// *** Reducer ***
function tableReducer(state, action) {
  switch (action.type) {
    case 'init':
      state.metadata = action.payload.metadata;
      state.defColSortId = action.payload.defColSortId;
      state.data = action.payload.data;
      state.pagination.totalRows = action.payload.data.length;
      state.pagination.totalPages = calcTotalPages(
        state.pagination.totalRows,
        state.pagination.rowsPerPage,
      );
      state.pagination.spread = calcSpread(state.pagination.totalPages);
      break;

    case 'sort-column':
      state.currSortCol = action.payload;
      break;

    case 'filter-column':
      state.filter.colname = action.payload;
      break;

    case 'filter-value':
      state.filter.value = action.payload;
      break;

    case 'rows-per-page':
      state.pagination.rowsPerPage = action.payload;
      state.pagination.totalPages = calcTotalPages(
        state.pagination.totalRows,
        state.pagination.rowsPerPage,
      );
      state.pagination.spread = calcSpread(state.pagination.totalPages);
      state.pagination.currentPage = 1;
      break;

    case 'next-page':
      state.pagination.currentPage = pageShift(
        state.pagination.currentPage,
        state.pagination.totalPages,
        'next',
      );
      break;

    case 'prev-page':
      state.pagination.currentPage = pageShift(
        state.pagination.currentPage,
        state.pagination.totalPages,
        'prev',
      );
      break;

    case 'page-num':
      state.pagination.currentPage = action.payload;
      break;

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

// Overall Component Wrapper
const TableComponent = styled.div`
  margin: 1rem;
`;

// Table Styling
const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  font-size: 1.6rem;
`;

// TODO: Reduce size of the font for tablet and mobile devices
// ******************** PARENT COMPONENT ********************
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

// ******************** TABLE FILTER ********************

// ** TABLE FILTER **

// Styled Components

const TableFilter = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin: 2rem 1rem 1rem;
  font-size: 1.6rem;
`;

const commonStyles = css`
  padding: 1rem;
  outline: none;
  border: none;
  border-radius: 6px;
  /* border: 1px solid var(--color-grey-3); */
  /* outline: 1px solid var(--input-outline); */
  box-shadow: 0 0 0 1px var(--input-outline);
  height: 3.8rem;
  min-width: 20rem;
  transition: box-shadow 0.3s ease-in;
  font-size: inherit;

  &:focus,
  &:hover {
    /* outline: 1px solid var(--input-outline-focus); */
    box-shadow: 0 0 0 1px var(--input-outline-focus);
  }

  /* border: none;
  background-color: #fdf2e9;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); */
`;

const FilterInput = styled.input`
  ${commonStyles}
`;

const FilterSelect = styled.select`
  ${commonStyles}
`;

const FilterIcon = styled.span`
  position: absolute;
  right: 1rem;
  transform: translateY(35%);

  & svg {
    color: var(--search-icon-color);
    height: 1.2em;
    width: 1.2em;
  }
`;

// Table Filter Component
function Filter() {
  console.log('Render Filter:');
  const { filter } = useTableState();

  //   const [filterValue, setFilterValue] = useState('');

  const { metadata } = useTableState();
  const dispatch = useTableDispatch();

  // Events
  // Handle filter by column
  function handleOnSelect(e) {
    dispatch({ type: 'filter-column', payload: e.target.value });
  }

  // Handle filter value change
  function handleOnChange(e) {
    // setFilterValue(() => e.target.value);
    dispatch({ type: 'filter-value', payload: e.target.value });
  }

  // Rendering
  return (
    <TableFilter>
      <FilterSelect
        className='filter-column'
        id='filter-column'
        onChange={handleOnSelect}
      >
        <option
          key='all'
          value=''
        >
          All
        </option>
        {metadata.map((metaItem) =>
          metaItem.filter ? (
            <option
              key={metaItem.colname}
              value={metaItem.colname}
            >
              {metaItem.title}
            </option>
          ) : (
            ''
          ),
        )}
      </FilterSelect>
      <span>
        <FilterInput
          type='text'
          value={filter.value}
          onChange={handleOnChange}
        />
        <FilterIcon>
          <HiMagnifyingGlass />
        </FilterIcon>
      </span>
    </TableFilter>
  );
}

// ******************** DATA COMPONENT ********************

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
  &:hover {
    overflow: visible;
    white-space: unset;
  }
`;

function Data() {
  console.log('Render Data:');
  const {
    metadata,
    currSortCol,
    data,
    filter,
    pagination: { totalPages, rowsPerPage, currentPage },
  } = useTableState();
  const dispatch = useTableDispatch();

  // *** CREATE TABLE HEADER ***

  // Event: Handle the clicking of the sort Icon
  function handleColSort(e, item, currSortCol) {
    if (currSortCol.id !== item.id) {
      dispatch({
        type: 'sort-column',
        payload: { id: item.id, colname: item.colname, sort: 1 },
      });
    } else {
      dispatch({
        type: 'sort-column',
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

  // *** CREATE TABLE BODY ***
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

  // Filter: match across all filterable columns
  function checkForMatchAll(obj, query) {
    let match = false;
    Object.values(obj).forEach((value) => {
      match |= checkForMatch(value, query);
    });
    return match;
  }

  // Filter: match a single column
  function checkForMatch(value, query) {
    let match;
    typeof value === 'string'
      ? (match |= value.toLowerCase().includes(query.toLowerCase()))
      : typeof value === 'number'
      ? (match |= value === Number(query))
      : (match |= false);
    return match;
  }

  function filterItems(arr, colname, query) {
    return arr.filter((obj) => {
      if (colname === '') return checkForMatchAll(obj, query);
      else return checkForMatch(obj[colname], query);
    });
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
    // const dataCopy = Array.from(data);

    // 1. Filter the data
    let displayData;
    if (filter.value !== '' && filter.value) {
      displayData = filterItems(data, filter.colname, filter.value);
    } else {
      displayData = Array.from(data);
    }

    // 2. Sort the data

    // Only sort after the sort has been clicked
    if (!(currSortCol.id === 0 || currSortCol.name === '')) {
      displayData.sort(sortFn(currSortCol));
    }

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    displayData = displayData.slice(start, end);

    // Sort table data for the body
    tableBody = displayData.map((dataItem) => {
      return (
        <tr key={dataItem.id}>
          {metadata.map((metaItem) => (
            <TableCell
              $align={metaItem.dAlign}
              key={metaItem.colname}
            >
              {metaItem.formatFn
                ? metaItem.formatFn(dataItem[metaItem.colname])
                : dataItem[metaItem.colname]}
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

// ******************** PAGINATION ********************

// *** STYLED COMPONENTS ***

const TablePagination = styled.div`
  width: 100%;
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.8rem auto 1.4rem;
  font-size: 1.8rem;
  gap: 1rem;
`;

const RowsPerPage = styled.div`
  flex: 0 1 35%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const SelectRowsPerPage = styled.select`
  display: inline-block;
  padding: 0.8rem;
  border: 1px solid var(--input-outline);
  border-radius: 6px;

  &:focus,
  &:hover {
    border: 1px solid var(--input-outline-focus);
  }
`;

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 34%;
`;

const PageNumber = styled.a`
  &:link,
  &:visited {
    text-decoration: none;
    color: var(--pagination-bg-color);
    display: inline-block;
    display: flex;
    width: 3.2rem;
    height: 3.2rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 1.4rem;
    font-weight: 600;
    ${(props) =>
      props.$selected
        ? css`
            background-color: var(--pagination-bg-color);
            color: #fff;
          `
        : ''};
  }

  &:hover,
  &:active {
    background-color: var(--pagination-bg-color);
    color: #fff;
  }
`;

const OtherSpacer = styled.div`
  flex: 0 1 33%;
`;

const Arrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid var(--pagination-bg-color);
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
  background-color: var(--pagination-active-color);
  cursor: pointer;

  & svg {
    stroke: var(--pagination-bg-color);
    stroke-width: 2px;
    width: 2.4rem;
    height: 2.4rem;
  }

  ${(props) =>
    !props.disabled
      ? css`
          &:hover {
            background-color: var(--pagination-bg-color);
          }
          &:hover svg {
            stroke: var(--pagination-active-color);
          }
        `
      : css`
          cursor: not-allowed;
          border-color: var(--pagination-disabled-color);
          & svg {
            stroke: var(--pagination-disabled-color);
          }
        `}
`;

// *** Pagination ***

function Pagination() {
  console.log('Render Pagination:');
  const {
    metadata,
    currSortCol,
    data,
    filter,
    pagination: { totalPages, totalRows, currentPage },
  } = useTableState();

  const dispatch = useTableDispatch();

  // Events
  function handleOnChange(e) {
    dispatch({ type: 'rows-per-page', payload: Number(e.target.value) });
  }

  function handleOnClickPrevPage(e) {
    dispatch({ type: 'prev-page' });
  }

  function handleOnClickNextPage(e) {
    dispatch({ type: 'next-page' });
  }

  function handleOnClickPageNum(e, pageNum) {
    dispatch({ type: 'page-num', payload: Number(pageNum) });
  }

  const pageNums = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNums.push(
      <PageNumber
        key={i}
        href='#'
        $selected={i === currentPage ? true : false}
        onClick={(e) => handleOnClickPageNum(e, i)}
      >
        <span>{i}</span>
      </PageNumber>,
    );
  }

  return (
    <TablePagination>
      <RowsPerPage>
        <span>Rows per page:</span>
        <SelectRowsPerPage
          name='rows-per-page'
          id='rows-per-page'
          onChange={handleOnChange}
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='0'>All</option>
        </SelectRowsPerPage>
      </RowsPerPage>
      <PageNumbers>
        <Arrow
          onClick={handleOnClickPrevPage}
          disabled={currentPage === 1}
        >
          <HiOutlineChevronLeft />
        </Arrow>
        {pageNums}
        <Arrow
          onClick={handleOnClickNextPage}
          disabled={currentPage === totalPages}
        >
          <HiOutlineChevronRight />
        </Arrow>
      </PageNumbers>
      <OtherSpacer>&nbsp;</OtherSpacer>
    </TablePagination>
  );
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

import styled, { css } from 'styled-components';
import { useState } from 'react';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { createContext } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
import { useEscape } from '../hooks/useEscape';
import InputBox from '../components/InputBox';
// import { useImmer } from 'use-immer';
// import { useImmerReducer } from 'use-immer';

const StyledDropdown = styled.div`
  position: relative;
  width: 100%;
`;

const StyledDropdownSelect = styled.div`
  position: relative;
`;

const StyledDropdownSelectIcon = styled.span.attrs((props) => ({
  $size: 2,
}))`
  display: inline-block;
  position: absolute;
  pointer-events: auto;
  top: 55%;
  /* left: 50%; */
  transform: translate(-50%, -50%);
  right: 1rem;
  cursor: pointer;
  /* top: 35%; */
  pointer-events: auto;

  & svg {
    height: ${(props) => props.$size + 'rem'};
    width: ${(props) => props.$size + 'rem'};
  }
`;

const StyledDropdownMenu = styled.div.attrs((props) => ({
  $menuheight: props.$menuheight ?? 32,
}))`
  position: absolute;

  /* display: flex; */
  /* flex-direction: column; */
  border: 1px solid #dee2e6;
  left: 0;
  width: 100%;
  background: white;
  height: ${(props) => props.$menuheight + 'rem'};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: scroll;
  z-index: 1000;

  &.hide {
    display: none;
  }
`;

const StyledDropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
`;

const StyledDropdownContentItem = styled.a`
  display: inline-block;
  text-decoration: none;
  padding: 1rem;
  color: #495057;
  transition: background-color 0.4s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover,
  &:active,
  &:focus {
    background-color: #f1f3f5;
    border: none;
    outline: none;
  }

  &.active {
    background-color: #228be6;
    color: #f8f9fa;
  }
`;

const DropdownContext = createContext(null);

/**
 * Parent Component Tag
 * @param {children, id, getSelectedItem} param0
 * @returns
 */
function Dropdown({ children, id, getSelectedItem }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (getSelectedItem) getSelectedItem(selectedItem);
  }, [getSelectedItem, selectedItem]);

  const [searchFilter, setSearchFilter] = useState('');

  const isActive = showMenu ? 'is-active' : '';

  return (
    <DropdownContext.Provider
      value={{
        showMenu,
        setShowMenu,
        selectedItem,
        setSelectedItem,
        searchFilter,
        setSearchFilter,
        id,
      }}
    >
      <StyledDropdown
      // className={`dropdown ${isActive}`}
      // onBlur={() => setShowMenu(false)}
      >
        {children}
      </StyledDropdown>
    </DropdownContext.Provider>
  );
}

/**
 * This function renders the Select input box
 * @returns UI
 */

function DropdownSelect() {
  //   console.log('Rendering DropdownSelect');
  const { setShowMenu, selectedItem, setSearchFilter, searchFilter, id } =
    useContext(DropdownContext);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(() => selectedItem?.value ?? '');
    // setSearchFilter(() => selectedItem?.value ?? '');
  }, [selectedItem]);

  // Click on this the first time
  function handleOnClick(e) {
    e.target.select();
    setSearchFilter(() => '');
    setShowMenu(true);
  }

  // Search the list
  function handleOnChange(e) {
    setSearchFilter(() => e.target.value);
    setSearchValue(() => e.target.value);
    // e.stopPropogation();
  }

  return (
    <StyledDropdownSelect>
      <InputBox
        name={`${id}-display`}
        id={`${id}-display`}
        placeholder='Select or Search'
        value={searchValue}
        onClick={handleOnClick}
        onChange={handleOnChange}
        $variation='select'
      />

      <input
        name={id}
        id={id}
        type='hidden'
        value={selectedItem?.value ?? ''}
        //   onBlur={() => setShowMenu(() => false)}
      />
      <StyledDropdownSelectIcon>
        <FaAngleDown aria-hidden='true' />
      </StyledDropdownSelectIcon>
    </StyledDropdownSelect>
  );
}

/**
 * DropdownMenu - Is the Dropdown list box
 * @param {items} item list to be displayed
 * @returns
 */
function DropdownMenu({ items }) {
  //   console.log('Rendering DropdownMenu');

  const { selectedItem, setSelectedItem, setShowMenu, searchFilter, showMenu } =
    useContext(DropdownContext);

  // Handle Outside Click
  const menuRef = useRef(null);

  // Handle click outside of the Dropdown control to close the dropdown box
  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  // Handle Escape key to close the dropdown box
  useEscape(
    useRef,
    useCallback(
      (e) => {
        setShowMenu(false);
      },
      [setShowMenu],
    ),
  );

  function handleSelect({ id, value }) {
    setSelectedItem(() => ({ id, value }));
    setShowMenu(false);
  }

  let dropdownList;

  dropdownList = items
    .filter((item) =>
      item.value.toLowerCase().includes(searchFilter.toLowerCase()),
    )
    .map((item) => {
      const isActive = item.id === selectedItem?.id ? 'active' : '';

      return (
        <StyledDropdownContentItem
          key={item.id}
          className={isActive}
          onClick={() => handleSelect(item)}
        >
          {item.value}
        </StyledDropdownContentItem>
      );
    });

  const numOfItems = dropdownList?.length ?? 0;
  const menuheight = (numOfItems > 10 ? 10 : numOfItems) * 4.5;

  const hide = !showMenu ? 'hide' : '';
  //   console.log('Dropdown list: ', dropdownList.length);
  return (
    <StyledDropdownMenu
      className={hide}
      id='dropdown-menu'
      role='menu'
      $menuheight={menuheight}
      ref={menuRef}
    >
      <StyledDropdownContent>{dropdownList}</StyledDropdownContent>
    </StyledDropdownMenu>
  );
}

export default Dropdown;
export { DropdownMenu, DropdownSelect };

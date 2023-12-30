import { useState } from 'react';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { createContext } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
import { useEscape } from '../hooks/useEscape';
// import { useImmer } from 'use-immer';
// import { useImmerReducer } from 'use-immer';

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
      <div
        className={`dropdown ${isActive}`}
        // onBlur={() => setShowMenu(false)}
      >
        {children}
      </div>
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

  function handleOnClick(e) {
    e.target.select();
    setSearchFilter(() => '');
    setShowMenu(true);
  }

  function handleOnChange(e) {
    setSearchFilter(() => e.target.value);
    setSearchValue(() => e.target.value);
    // e.stopPropogation();
  }

  return (
    <div className='dropdown-trigger'>
      <p className='control has-icons-right'>
        <input
          name={`${id}-display`}
          id={`${id}-display`}
          className='input'
          type='text'
          placeholder='Select or Search'
          aria-haspopup='true'
          aria-controls='dropdown-menu'
          value={searchValue}
          //   value={searchFilter}
          onClick={handleOnClick}
          onChange={handleOnChange}
          //   onBlur={() => setShowMenu(() => false)}
        />
        <input
          name={id}
          id={id}
          className='input'
          type='hidden'
          value={selectedItem?.value ?? ''}
          //   onBlur={() => setShowMenu(() => false)}
        />
        <span className='icon is-right'>
          <FaAngleDown aria-hidden='true' />
        </span>
      </p>
    </div>
  );
}

/**
 * DropdownOptions - Is the Dropdown list box
 * @param {items} item list to be displayed
 * @returns
 */
function DropdownOptions({ items }) {
  //   console.log('Rendering DropdownOptions');

  const { selectedItem, setSelectedItem, setShowMenu, searchFilter } =
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
      const isSelected = item.key === selectedItem?.id ? 'is-active' : '';

      return (
        <a
          href='#'
          key={item.id}
          className={`dropdown-item ${isSelected}`}
          onClick={() => handleSelect(item)}
        >
          {item.value}
        </a>
      );
    });
  console.log('Dropdown list: ', dropdownList.length);
  return (
    <div
      className='dropdown-menu'
      id='dropdown-menu'
      role='menu'
      ref={menuRef}
    >
      <div className='dropdown-content'>{dropdownList}</div>
    </div>
  );
}

export default Dropdown;
export { DropdownOptions, DropdownSelect };

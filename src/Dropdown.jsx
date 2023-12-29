import { useCallback, useContext, useEffect, useRef } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import { useImmer } from 'use-immer';
import useClickOutside from './useClickOutside';
import { useEscape } from './useEscape';
// import { useImmer } from 'use-immer';
// import { useImmerReducer } from 'use-immer';

const DropdownContext = createContext(null);

function Dropdown({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(() => ({
    value: '',
    name: '',
  }));

  const [filter, setFilter] = useState('');

  const isActive = showMenu ? 'is-active' : '';

  return (
    <DropdownContext.Provider
      value={{
        showMenu,
        setShowMenu,
        selectedItem,
        setSelectedItem,
        filter,
        setFilter,
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

function DropdownSelect({ children, id }) {
  //   console.log('Rendering DropdownSelect');
  const { setShowMenu, selectedItem, setSelectedItem, setFilter } =
    useContext(DropdownContext);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(() => selectedItem.name);
  }, [setSearchValue, selectedItem]);

  function handleOnClick(e) {
    e.target.select();
    setFilter(() => '');
    setShowMenu(true);
  }

  function handleOnChange(e) {
    setFilter(() => e.target.value);
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
          onClick={handleOnClick}
          onChange={handleOnChange}
          //   onBlur={() => setShowMenu(() => false)}
        />
        <input
          name={id}
          id={id}
          className='input'
          type='hidden'
          value={selectedItem.value}
          //   onBlur={() => setShowMenu(() => false)}
        />
        <span className='icon is-right'>
          <FaAngleDown aria-hidden='true' />
        </span>
      </p>
    </div>
  );
}

function DropdownOptions({ children, itemlist }) {
  //   console.log('Rendering DropdownOptions');
  const { selectedItem, setSelectedItem, setShowMenu, filter } =
    useContext(DropdownContext);

  // Handle Outside Click
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  useEscape(
    useRef,
    useCallback(
      (e) => {
        setShowMenu(false);
      },
      [setShowMenu],
    ),
  );

  function handleSelect({ value, name }) {
    // TODO: Remove
    console.log(`${value}: ${name}`);
    setSelectedItem(() => ({ value, name }));
    setShowMenu(false);
  }

  const dropdownList = itemlist
    .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    .map((item) => {
      const isSelected = item.value === selectedItem.value ? 'is-active' : '';

      return (
        <a
          href='#'
          key={item.value}
          className={`dropdown-item ${isSelected}`}
          onClick={() => handleSelect(item)}
        >
          {item.name}
        </a>
      );
    });

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

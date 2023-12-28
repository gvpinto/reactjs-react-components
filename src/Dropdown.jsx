import { useContext, useRef } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import { useImmer } from 'use-immer';
import useClickOutside from './useClickOutside';
// import { useImmer } from 'use-immer';
// import { useImmerReducer } from 'use-immer';

const DropdownContext = createContext(null);

function Dropdown({ children }) {
  const [showMenu, setShowMenu] = useImmer(false);
  const [selectedItem, setSelectedItem] = useImmer(() => ({
    value: '',
    name: '',
  }));
  const isActive = showMenu ? 'is-active' : '';
  return (
    <DropdownContext.Provider
      value={{ showMenu, setShowMenu, selectedItem, setSelectedItem }}
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

function DropdownTrigger({ children }) {
  const { setShowMenu, selectedItem } = useContext(DropdownContext);

  function handleOnFocus(e) {
    e.target.select();
    setShowMenu(true);
  }

  return (
    <div className='dropdown-trigger'>
      <p className='control has-icons-right'>
        <input
          className='input'
          type='text'
          placeholder='Select or Search'
          aria-haspopup='true'
          aria-controls='dropdown-menu'
          defaultValue={selectedItem.name}
          onFocus={handleOnFocus}
          //   onBlur={() => setShowMenu(() => false)}
        />
        <span className='icon is-right'>
          <FaAngleDown aria-hidden='true' />
        </span>
      </p>
    </div>
  );
}

function DropdownMenu({ children, itemlist }) {
  const { selectedItem, setSelectedItem, setShowMenu } =
    useContext(DropdownContext);

  // Handle Outside Click
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  console.log(`[${selectedItem}]`);
  const dropdownList = itemlist.map((item) => {
    const isSelected = item.value === selectedItem.value ? 'is-active' : '';
    function handleSelect() {
      setSelectedItem({ value: item.value, name: item.name });
      setShowMenu(false);
    }
    return (
      <a
        href='#'
        key={item.value}
        className={`dropdown-item ${isSelected}`}
        onClick={handleSelect}
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
export { DropdownMenu, DropdownTrigger };

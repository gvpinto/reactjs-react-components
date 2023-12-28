import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

const DropdownContext = createContext(null);

function Dropdown({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const isActive = showMenu ? 'is-active' : '';
  return (
    <DropdownContext.Provider value={{ showMenu, setShowMenu }}>
      <div className={`dropdown ${isActive}`}>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ children }) {
  const { setShowMenu } = useContext(DropdownContext);
  console.log(setShowMenu);

  return (
    <div className='dropdown-trigger'>
      <p className='control has-icons-left'>
        <input
          className='input'
          type='text'
          placeholder='Search'
          aria-haspopup='true'
          aria-controls='dropdown-menu'
          onFocus={() => setShowMenu(() => true)}
          onBlur={() => setShowMenu(() => false)}
        />
        <span className='icon is-left'>
          <i
            className='fas fa-search'
            aria-hidden='true'
          ></i>
        </span>
      </p>
    </div>
  );
}

function DropdownMenu({ children }) {
  return (
    <div
      className='dropdown-menu'
      id='dropdown-menu'
      role='menu'
    >
      <div className='dropdown-content'>
        <a
          href='#'
          className='dropdown-item'
        >
          Dropdown item
        </a>
        <a className='dropdown-item'>Other dropdown item</a>
        <a
          href='#'
          className='dropdown-item is-active'
        >
          Active dropdown item
        </a>
        <a
          href='#'
          className='dropdown-item'
        >
          Other dropdown item
        </a>
        <hr className='dropdown-divider' />
        <a
          href='#'
          className='dropdown-item'
        >
          With a divider
        </a>
      </div>
    </div>
  );
}

export default Dropdown;
export { DropdownMenu, DropdownTrigger };

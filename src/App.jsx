import 'bulma/css/bulma.min.css';
import './App.css';
import Dropdown, { DropdownMenu, DropdownTrigger } from './Dropdown';

function App() {
  return (
    <>
      <Dropdown>
        <DropdownTrigger />
        <DropdownMenu />
      </Dropdown>
      <div>
        <button>Hello</button>
      </div>
    </>
  );
}

export default App;

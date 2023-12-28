import 'bulma/css/bulma.min.css';
import Dropdown, { DropdownMenu, DropdownTrigger } from './Dropdown';
import Container from './Container';

function App() {
  const itemList = [
    { value: 'first', name: 'First Item' },
    { value: 'second', name: 'Second Item' },
    { value: 'third', name: 'Third Item' },
    { value: 'fourth', name: 'Fourth Item' },
    { value: 'fifth', name: 'Fifth Item' },
  ];
  return (
    <>
      <Dropdown>
        <DropdownTrigger />
        <DropdownMenu itemlist={itemList} />
      </Dropdown>
      <Container />
    </>
  );
}

export default App;

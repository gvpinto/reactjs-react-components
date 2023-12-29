import 'bulma/css/bulma.min.css';
import Dropdown, { DropdownOptions, DropdownSelect } from './Dropdown';
import Container from './Container';

function App() {
  const itemList = [
    { value: 'one', name: 'one Item' },
    { value: 'two', name: 'two Item' },
    { value: 'three', name: 'three Item' },
    { value: 'four', name: 'four Item' },
    { value: 'five', name: 'five Item' },
    { value: 'six', name: 'six Item' },
    { value: 'seven', name: 'seven Item' },
    { value: 'eight', name: 'eigth Item' },
    { value: 'nine', name: 'nine Item' },
    { value: 'ten', name: 'ten Item' },
    { value: 'eleven', name: 'eleven Item' },
    { value: 'twelve', name: 'twelve Item' },
    { value: 'thirteen', name: 'thirteen Item' },
    { value: 'fourteen', name: 'fourteen Item' },
    { value: 'fifteen', name: 'fifteen Item' },
    { value: 'sixteen', name: 'sixteen Item' },
    { value: 'seventeen', name: 'seventeen Item' },
    { value: 'eighteen', name: 'eighteen Item' },
    { value: 'nineteen', name: 'nineteen Item' },
    { value: 'twenty', name: 'twenty Item' },
  ];
  return (
    <>
      <Dropdown>
        <DropdownSelect id='country' />
        <DropdownOptions itemlist={itemList} />
      </Dropdown>
      <Container />
    </>
  );
}

export default App;

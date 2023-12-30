import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../api/countriesApi';
import {
  selectAppState,
  updateSelectedCountry,
  updateSelectedState,
} from '../store/slices/appSlice';

import Dropdown, {
  DropdownOptions,
  DropdownSelect,
} from '../components/Dropdown';

// ALT
// import { AppConstants, useAppDispatch } from '../ contexts/AppContext';

/**
 * Main Function
 * @returns
 */
function DropdownTest() {
  // ALT
  //   const dispatch = useAppDispatch();
  const { selectedCountry } = useSelector(selectAppState);
  console.log(`selectedCountry: ${selectedCountry}`);

  const dispatch = useDispatch();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  const countriesList = data.map((country) => ({
    value: country.code,
    name: country.value,
  }));

  //   const itemList = [
  //     { value: 'one', name: 'one Item' },
  //     { value: 'two', name: 'two Item' },
  //     { value: 'three', name: 'three Item' },
  //     { value: 'four', name: 'four Item' },
  //     { value: 'five', name: 'five Item' },
  //     { value: 'six', name: 'six Item' },
  //     { value: 'seven', name: 'seven Item' },
  //     { value: 'eight', name: 'eigth Item' },
  //     { value: 'nine', name: 'nine Item' },
  //     { value: 'ten', name: 'ten Item' },
  //     { value: 'eleven', name: 'eleven Item' },
  //     { value: 'twelve', name: 'twelve Item' },
  //     { value: 'thirteen', name: 'thirteen Item' },
  //     { value: 'fourteen', name: 'fourteen Item' },
  //     { value: 'fifteen', name: 'fifteen Item' },
  //     { value: 'sixteen', name: 'sixteen Item' },
  //     { value: 'seventeen', name: 'seventeen Item' },
  //     { value: 'eighteen', name: 'eighteen Item' },
  //     { value: 'nineteen', name: 'nineteen Item' },
  //     { value: 'twenty', name: 'twenty Item' },
  //   ];

  function updateSelectedItem(selectedItem) {
    // ALT:
    // dispatch({
    //   type: AppConstants.UPDATE_SELECTED_COUNTRY,
    //   payload: selectedItem,
    // });

    dispatch(updateSelectedCountry(selectedItem));
  }

  return (
    <>
      <Dropdown
        id='country'
        getSelectedItem={updateSelectedItem}
      >
        <DropdownSelect id='country' />
        <DropdownOptions itemlist={countriesList} />
      </Dropdown>
    </>
  );
}

export default DropdownTest;

import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../api/refDataApi';
import {
  selectApplState,
  updateSelectedCountry,
} from '../store/slices/applSlice';

import Dropdown, { DropdownOptions, DropdownSelect } from '../ui/Dropdown';

// ALT
// import { AppConstants, useAppDispatch } from '../ contexts/AppContext';

/**
 * Main Function
 * @returns
 */
function CountryDropdown() {
  // ALT
  //   const dispatch = useAppDispatch();
  const { selectedCountry } = useSelector(selectApplState);
  console.log('selectedCountry: ', selectedCountry);

  const dispatch = useDispatch();

  const {
    isPending,
    error,
    data: countries,
    // isFetching,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 5 * 1000,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  //   console.log(countries);

  //   const countriesList = data.map((country) => ({
  //     id: country.id,
  //     key: country.key,
  //     value: country.value,
  //   }));

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
        <DropdownOptions items={countries} />
      </Dropdown>
    </>
  );
}

export default CountryDropdown;

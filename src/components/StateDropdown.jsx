import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getStates } from '../api/refDataApi';
import {
  selectApplState,
  updateSelectedState,
} from '../store/slices/applSlice';

import Dropdown from '../ui/Dropdown';

/**
 * Main Function
 * @returns
 */
function StateDropdown() {
  // ALT
  //   const dispatch = useAppDispatch();
  const { selectedState, selectedCountry } = useSelector(selectApplState);
  console.log('selectedCountry: ', selectedCountry);
  console.log('selectedState: ', selectedState);

  const countryId = selectedCountry?.id ?? 0;
  const dispatch = useDispatch();

  const {
    isPending,
    error,
    data: states,
    // isFetching,
  } = useQuery({
    queryKey: ['states', { countryId: countryId }],
    queryFn: () => getStates(countryId),
    staleTime: 5 * 1000,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  function updateSelectedItem(selectedItem) {
    dispatch(updateSelectedState(selectedItem));
  }

  return (
    <>
      <Dropdown
        id='country'
        getSelectedItem={updateSelectedItem}
      >
        <Dropdown.Select id='state' />
        <Dropdown.Menu items={states} />
      </Dropdown>
    </>
  );
}

export default StateDropdown;

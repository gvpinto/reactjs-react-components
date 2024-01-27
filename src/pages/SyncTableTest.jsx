import SyncTable from '../ui/SyncTable';
import { useQuery } from '@tanstack/react-query';
import { metadata } from '../../db/metadata';
import { getUsers } from '../api/refDataApi';

function SyncTableTest() {
  // Read the data from the database
  const {
    isPending,
    error,
    data: users,
    // isFetching,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 50 * 1000,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <SyncTable
      metadata={metadata}
      defColSortId={1}
      data={users}
    >
      <SyncTable.Filter />
      <SyncTable.Data />
      <SyncTable.Pagination />
    </SyncTable>
  );
}

export default SyncTableTest;

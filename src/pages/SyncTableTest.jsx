import SyncTable from '../ui/SyncTable';

function SyncTableTest() {
  const metadata = [
    {
      id: 1,
      name: 'Name',
      hAlign: 'left',
      dAlign: 'left',
      width: '15%',
      textColor: '#FFF',
      bgColor: '',
      sort: true,
      filter: true,
    },
    {
      id: 2,
      name: 'Street Address',
      hAlign: 'left',
      dAlign: 'left',
      width: '20%',
      textColor: '#FFF',
      bgColor: '',
      sort: false,
      filter: true,
    },
    {
      id: 3,
      name: 'City',
      hAlign: 'left',
      dAlign: 'left',
      width: '10%',
      textColor: '#FFF',
      bgColor: '',
      sort: false,
      filter: true,
    },
    {
      id: 4,
      name: 'State',
      hAlign: 'left',
      dAlign: 'left',
      width: '10%',
      textColor: '#FFF',
      bgColor: '',
      sort: true,
      filter: true,
    },
    {
      id: 5,
      name: 'Zip Code',
      hAlign: 'left',
      dAlign: 'left',
      width: '10%',
      textColor: '#FFF',
      bgColor: '',
      sort: false,
      filter: true,
    },
    {
      id: 6,
      name: 'Age',
      hAlign: 'center',
      dAlign: 'center',
      width: '15%',
      textColor: '#FFF',
      bgColor: '',
      sort: true,
      filter: true,
    },
    {
      id: 7,
      name: 'Salary',
      hAlign: 'right',
      dAlign: 'right',
      width: '15%',
      textColor: '#FFF',
      bgColor: '',
      sort: true,
      filter: true,
    },
    {
      id: 8,
      name: 'Hire Date',
      hAlign: 'left',
      dAlign: 'left',
      width: '15%',
      textColor: '#FFF',
      bgColor: '',
      sort: true,
      filter: true,
    },
  ];
  return (
    <SyncTable
      metadata={metadata}
      defColSortId={1}
    >
      {/* <SyncTable.Filter /> */}
      <SyncTable.Data />
      {/* <SyncTable.Pagination /> */}
    </SyncTable>
  );
}

export default SyncTableTest;

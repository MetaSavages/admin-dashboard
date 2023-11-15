import CheckBox from '../../layouts/blacklists/components/CheckBox';

const dataTableBlacklistCountries = {
  columns: [
    {
      Header: 'Blacklisted',
      accessor: 'blacklisted',
      width: 150,
      Cell: ({ row }) => <CheckBox row={row} />
    },
    {
      Header: 'Country',
      accessor: 'country',
      width: 200
    },
    {
      Header: 'Casino',
      accessor: 'casino',
      width: 300
    },
    {
      Header: 'Last updated by',
      accessor: 'email',
      width: 300
    },
    {
      Header: 'Last updated',
      accessor: 'timestamp',
      width: 300
    }
  ],
  rows: [
    {
      id: 1,
      blacklisted: true,
      country: 'Brazil',
      casino: 'Casino 1',
      timestamp: '2021/10/01 12:00:00',
      email: 'email@email.com'
    },
    {
      id: 2,
      blacklisted: true,
      country: 'Serbia',
      casino: 'Casino 2',
      timestamp: '2022/10/01 12:00:00',
      email: 'email123@email.com'
    },
    {
      id: 3,
      blacklisted: false,
      country: 'USA',
      casino: 'Casino 3',
      timestamp: '2021/10/01 12:00:00',
      email: 'tset12@email.com'
    },
    {
      id: 4,
      blacklisted: true,
      country: 'Canada',
      casino: 'Casino 4',
      timestamp: '2020/10/01 12:00:00',
      email: 'email@email.com'
    },
    {
      id: 5,
      blacklisted: false,
      country: 'Hungary',
      casino: 'Casino 1',
      timestamp: '2021/10/01 12:00:00',
      email: 'email@email.com'
    },
    {
      id: 6,
      blacklisted: true,
      country: 'Netherlands',
      casino: 'Casino 3',
      timestamp: '2021/11/01 12:00:00',
      email: 'email@email.com'
    },
    {
      id: 7,
      blacklisted: true,
      country: 'Brazil',
      casino: 'Casino 4',
      timestamp: '2021/10/01 12:00:00',
      email: 'email@email.com'
    },
    {
      id: 8,
      blacklisted: true,
      country: 'Brazil',
      casino: 'Casino 2',
      timestamp: '2021/10/01 12:00:00',
      email: 'email@email.com'
    }
  ]
};

export default dataTableBlacklistCountries;

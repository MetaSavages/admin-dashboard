import CheckBox from 'layouts/blacklists/components/CheckBox';

const blacklistsColumnData = [
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
];
export default blacklistsColumnData;

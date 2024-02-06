import { Icon } from '@mui/material';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

const eventHistoryColumnData = [
  {
    width: 5,
    Header: () => null,
    id: 'expander',
    Cell: ({ row }) =>
      (row.original.event_type === 'game_bet' ||
        row.original.event_type === 'game_win' ||
        row.original.event_type === 'game_lose') && (
        <Icon {...row.getToggleRowExpandedProps()}>{row.isExpanded ? 'expand_less' : 'expand_more'}</Icon>
      ),
    // We can override the cell renderer with a SubCell to be used with an expanded row
    SubCell: () => null
  },
  {
    Header: 'Username',
    accessor: 'username',

    SubCell: (cellProps) => <>{cellProps.value}</>
  },
  {
    Header: 'Event type',
    accessor: 'event_type',
    Cell: ({ row }) => (
      <MDTypography fontSize='0.875rem'>
        {row.original.event_type
          .replace(/_/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </MDTypography>
    ),

    SubCell: (cellProps) => <>{cellProps.value}</>
  },
  {
    Header: 'Casino',
    accessor: 'casino'
  },
  {
    Header: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Timestamp',
    accessor: 'timestamp',
    Cell: ({ row }) => {
      return (
        <MDTypography fontSize='0.875rem' sx={{ paddingRight: '20px' }}>
          {row.original.timestamp}
        </MDTypography>
      );
    }
  }
];

export default eventHistoryColumnData;

import queryString from 'query-string';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';

export const eventsColumnData = [
  {
    Header: 'Event type',
    accessor: 'event_type',
    Cell: ({ row }) => {
      const filters = {
        eventType: row.original.id
      };
      const queryStringParams = queryString.stringify(filters);
      return (
        <NavLink to={`/analytics/event-history?${queryStringParams}`}>
          <MDTypography fontSize='0.875rem'>
            {' '}
            {row.original.event_type
              .replace(/_/g, ' ')
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </MDTypography>
        </NavLink>
      );
    }
  },
  {
    Header: 'Times called',
    accessor: 'calls'
  },
  {
    Header: 'Users called',
    accessor: 'user_calls'
  },
  {
    Header: 'Average daily calls',
    accessor: 'avg_daily_calls'
  }
];

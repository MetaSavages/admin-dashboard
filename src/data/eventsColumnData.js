import queryString from 'query-string';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';

export const eventsColumnData = [
  {
    Header: 'Event type',
    accessor: 'event_type',
    Cell: ({ row }) => {
      const filters = {
        event_types: [row.original.event_type]
      };
      const queryStringParams = queryString.stringify(filters);
      return (
        <NavLink to={`/analytics/event-history?${queryStringParams}`}>
          <MDTypography fontSize='0.875rem'> {row.original.event_type}</MDTypography>
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

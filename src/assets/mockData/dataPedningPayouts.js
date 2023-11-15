import MDBox from 'components/MDBox';
import { IconButton, Icon, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import MDTypography from 'components/MDTypography';
const dataPendingPayouts = {
  columns: [
    {
      Header: 'Username',
      accessor: 'username'
    },
    {
      Header: 'Amount',
      accessor: 'amount'
    },
    {
      Header: 'Casino',
      accessor: 'casino'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      sorted: false,
      Cell: ({ row }) => {
        const filters = {
          users: [row.original.player_id],
          casinos: [row.original.casino_id]
        };
        const queryStringParams = queryString.stringify(filters);
        console.log(row);
        return (
          <MDBox
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Tooltip title='Approve'>
              <IconButton
                variant='determinate'
                size='small'
                color='success'
                onClick={() => {
                  console.log('row', row);
                }}
              >
                <Icon>check</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title='Reject'>
              <IconButton
                variant='determinate'
                size='small'
                color='error'
                onClick={() => {
                  console.log('row', row);
                }}
              >
                <Icon>close</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title='View history'>
              <IconButton variant='determinate' size='small' color='info'>
                <NavLink
                  to={`/analytics/event-history?${queryStringParams}`}
                  style={{
                    height: '16px',
                    width: '18px'
                  }}
                >
                  <MDTypography
                    variant='body2'
                    fontWeight='light'
                    color='info'
                    sx={{
                      height: '18px',
                      width: '18px'
                    }}
                  >
                    <Icon
                      sx={{
                        height: '18px',
                        width: '18px'
                      }}
                    >
                      history
                    </Icon>
                  </MDTypography>
                </NavLink>
              </IconButton>
            </Tooltip>
          </MDBox>
        );
      }
    }
  ],
  rows: [
    {
      username: 'user1',
      amount: '$100',
      casino: 'Casino 1',
      date: '2021/10/01 12:00:00',
      player_id: 1,
      casino_id: 1
    },
    {
      username: 'user2',
      amount: '$100',
      casino: 'Casino 2',
      date: '2021/10/01 12:00:00',
      player_id: 2,
      casino_id: 2
    },
    {
      username: 'user3',
      amount: '$100',
      casino: 'Casino 3',
      date: '2021/10/01 12:00:00',
      player_id: 3,
      casino_id: 3
    },
    {
      username: 'user4',
      amount: '$100',
      casino: 'Casino 4',
      date: '2021/10/01 12:00:00',
      player_id: 4,
      casino_id: 4
    }
  ]
};

export default dataPendingPayouts;

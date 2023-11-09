import { Icon, IconButton, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { NavLink } from 'react-router-dom';

let casinoId = window.location.pathname.split('/')[2];

const baccaratSessionsColumnData = [
  {
    Header: 'Table Id',
    accessor: 'id'
  },
  {
    Header: 'Min Bet',
    accessor: 'min_bet'
  },
  {
    Header: 'Max Bet',
    accessor: 'max_bet'
  },
  {
    Header: 'Bets Amount ($)',
    accessor: 'bet_amounts'
  },
  {
    Header: 'Wins Amount ($)',
    accessor: 'win_amounts'
  },
  {
    Header: 'Losses Amount ($)',
    accessor: 'lose_amounts'
  },
  {
    Header: 'Total sessions started',
    accessor: 'sessions_started'
  },
  {
    Header: 'Total sessions ended',
    accessor: 'sessions_ended'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Tooltip title='Edit'>
              <NavLink to={`/baccarat-sessions/${window.location.pathname.split('/')[2]}/edit/${row.original.id}`}>
                <MDTypography fontSize='0.875rem'>
                  <IconButton size='small' color='info'>
                    <Icon fontSize='small'>edit</Icon>
                  </IconButton>
                </MDTypography>
              </NavLink>
            </Tooltip>
          </MDBox>
        </>
      );
    }
  }
];
export default baccaratSessionsColumnData;

import { Icon, IconButton, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { NavLink } from "react-router-dom";

let casinoId = window.location.pathname.split('/')[2];

const slotsSessionsColumnData = [
  {
    Header: 'Table Id',
    accessor: 'id'
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
  }
];
export default slotsSessionsColumnData;

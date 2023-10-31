/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import colors from '../base/colors';
import rgba from '../functions/rgba';

const { black } = colors;
const buttonBase = {
  defaultProps: {
    disableRipple: false
  },
  styleOverrides: {
    root: {
      '&.MuiPickersDay-root.Mui-selected': {
        '&:hover': {
          backgroundColor: rgba(black.main, 0.2)
        },
        '&:focus': {
          backgroundColor: rgba(black.main, 0.2)
        }
      },
      '&:hover': {
        backgroundColor: rgba(black.main, 0.2)
      }
    }
  }
};

export default buttonBase;

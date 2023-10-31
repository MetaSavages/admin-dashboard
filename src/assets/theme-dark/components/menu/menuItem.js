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

// Material Dashboard 2 PRO React base styles
import colors from 'assets/theme-dark/base/colors';
import borders from 'assets/theme-dark/base/borders';
import typography from 'assets/theme-dark/base/typography';

// Material Dashboard 2 PRO React helper functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import rgba from 'assets/theme-dark/functions/rgba';

const { dark, white, black } = colors;
const { borderRadius } = borders;
const { size } = typography;

const menuItem = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.md,
      fontSize: size.sm,
      color: rgba(white.main, 0.8),
      transition: 'background-color 300ms ease, color 300ms ease',

      '&.Mui-selected': {
        color: white.main,
        backgroundColor: `${rgba(black.main, 0.2)} !important`,
        '&:hover': {
          backgroundColor: `${rgba(black.main, 0.4)} !important`
        }
      },
      '&:hover': {
        backgroundColor: `${rgba(black.main, 0.15)} !important`
      }
    }
  }
};

export default menuItem;

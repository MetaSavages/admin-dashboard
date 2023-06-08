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

// Material Dashboard 2 PRO React Base Styles
import typography from 'assets/theme-dark/base/typography';
import borders from 'assets/theme-dark/base/borders';

// Material Dashboard 2 PRO React Helper Functions
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import rgba from 'assets/theme-dark/functions/rgba';
import colors from 'assets/theme-dark/base/colors';
const { fontWeightBold, size } = typography;
const { borderRadius } = borders;
const { text } = colors;

const root = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: size.xs,
  fontWeight: fontWeightBold,
  borderRadius: borderRadius.lg,
  padding: `${pxToRem(6.302)} ${pxToRem(16.604)}`,
  lineHeight: 1.4,
  textAlign: 'center',
  textTransform: 'uppercase',
  userSelect: 'none',
  backgroundSize: '150% !important',
  backgroundPositionX: '25% !important',
  transition: 'all 150ms ease-in',

  '&:disabled': {
    pointerEvent: 'none',
    opacity: 0.65
  },

  '& .material-icons': {
    fontSize: pxToRem(15),
    marginTop: pxToRem(-2)
  },
  '&.Mui-disabled': {
    color: rgba(text.main, 0.26)
  }
};

export default root;

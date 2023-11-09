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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';

function PlayerDataTableBodyCell({ noBorder, align, children, expanded = false }) {
  return (
    <MDBox
      component='td'
      textAlign={align}
      py={1.5}
      px={children?.props?.column?.id === 'expander' ? 0 : 3}
      pr={children?.props?.column?.id === 'expander' && 0}
      pl={children?.props?.column?.id === 'expander' && 2}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
        fontSize: size.sm,
        fontWeight: expanded ? 600 : 400,
        borderBottom: noBorder ? 'none' : `${borderWidth[1]} solid ${light.main}`
      })}
    >
      <MDBox
        display='inline-block'
        width='max-content'
        color='text'
        sx={{
          verticalAlign: 'middle',
          textDecoration: expanded && children?.props?.column?.id === 'username' ? 'underline' : 'none'
        }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
PlayerDataTableBodyCell.defaultProps = {
  noBorder: false,
  align: 'left'
};

// Typechecking props for the DataTableBodyCell
PlayerDataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right', 'center'])
};

export default PlayerDataTableBodyCell;

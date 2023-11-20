import { navbarIconButton } from 'components/DashboardNavbar/styles';
import { Icon, IconButton } from '@mui/material';
import MDBadge from 'components/MDBadge';

const Notifications = ({ light, darkMode, transparentNavbar, handleOpenMenu, notificationCount }) => {
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    }
  });

  return (
    <>
      <IconButton
        size='small'
        disableRipple
        color='inherit'
        sx={navbarIconButton}
        aria-controls='notification-menu'
        aria-haspopup='true'
        variant='contained'
        onClick={handleOpenMenu}
      >
        <MDBadge badgeContent={notificationCount} color='error' size='xs' circular>
          <Icon sx={iconsStyle}>notifications</Icon>
        </MDBadge>
      </IconButton>
    </>
  );
};

export default Notifications;

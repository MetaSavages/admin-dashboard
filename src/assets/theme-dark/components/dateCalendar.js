import colors from 'assets/theme-dark/base/colors';

// Material Dashboard 2 PRO React helper functions
import rgba from 'assets/theme/functions/rgba';
const { background, white, transparent, black } = colors;
const dateCalendar = {
  styleOverrides: {
    root: {
      color: white.main,
      backgroundColor: transparent.main,
      '.MuiDayCalendar-weekDayLabel': {
        color: white.main
      },
      '.MuiPickersDay-root': {
        color: white.main,
        '&:not(.Mui-selected)': {
          backgroundColor: transparent.main
        },
        '&.Mui-selected ': {
          backgroundColor: rgba(black.main, 0.2),
          '&:not(.Mui-selected)': {
            backgroundColor: transparent.main
          }
        },
        '&:hover': {
          backgroundColor: rgba(black.main, 0.15)
        }
      }
    }
  }
};

export default dateCalendar;

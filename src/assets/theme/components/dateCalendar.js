import colors from 'assets/theme/base/colors';

// Material Dashboard 2 PRO React helper functions
import rgba from 'assets/theme/functions/rgba';
const { black, transparent, white } = colors;
const dateCalendar = {
  styleOverrides: {
    root: {
      color: black.main,
      backgroundColor: transparent.main,
      '.MuiDayCalendar-weekDayLabel': {
        color: black.main
      },
      '.MuiPickersDay-root': {
        color: black.main,
        '&:not(.Mui-selected)': {
          backgroundColor: transparent.main
        },
        '&.Mui-selected ': {
          backgroundColor: rgba(black.main, 0.3),
          color: white.main,
          '&:not(.Mui-selected)': {
            backgroundColor: transparent.main
          }
        },
        '&:hover': {
          backgroundColor: rgba(black.main, 0.2)
        }
      }
    }
  }
};

export default dateCalendar;

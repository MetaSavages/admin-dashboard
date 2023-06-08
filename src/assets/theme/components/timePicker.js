import colors from '../base/colors';

const { background } = colors;

const timePicker = {
  styleOverrides: {
    root: {
      '& .MuiMultiSectionDigitalClock': {
        backgroundColor: background.card
      }
    }
  }
};

export default timePicker;

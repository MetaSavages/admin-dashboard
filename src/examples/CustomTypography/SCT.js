import MDTypography from 'components/MDTypography';

// Small Custom Typography
function SCT({ children }) {
  return (
    <MDTypography
      sx={{
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400, 
        fontSize: '16px' 
      }}
    >
      {children}
    </MDTypography>
  );
}

export default SCT;

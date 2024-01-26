import React, { useEffect, useRef } from 'react';
import MDBox from 'components/MDBox';
import MDTextarea from 'components/MDTextarea';
import MDTypography from 'components/MDTypography';

const CodePreview = ({ htmlContent, handleInputChange, htmlError, disableFields }) => {
  return (
    <>
      <MDTypography fontSize='0.875rem'>HTML Code</MDTypography>
      <MDTextarea
        value={htmlContent}
        onChange={handleInputChange}
        placeholder='Enter HTML content here'
        sx={{
          width: '100%'
        }}
        disabled={disableFields}
      />
      {htmlError && <div style={{ color: 'red' }}>{htmlError}</div>}
      <MDBox
        className='email-iframe'
        sx={{
          width: '100%',
          height: '500px',
          marginTop: '20px',
          border: '1px solid gray',
          background: 'white !important'
        }}
      >
        <iframe
          srcDoc={htmlContent}
          // style={{ width: '100%', height: '100%' }}
          style={{ width: '100%', height: '500px', overflow: 'hidden' }}
          sandbox='allow-scripts' // Removed allow-same-origin for enhanced security
        ></iframe>
        {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
      </MDBox>
    </>
  );
};

export default CodePreview;

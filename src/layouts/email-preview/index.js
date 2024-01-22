import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import { sendCustomEmail } from 'services/email';
import MDTextarea from 'components/MDTextarea';
import MDTypography from 'components/MDTypography';

const EmailPreview = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState('');
  const [subject, setSubject] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (htmlContent.length > 0 && htmlError.length <= 0 && subject.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [htmlContent, htmlError, subject]);

  function resetState() {
    setHtmlContent('');
    setHtmlError('');
    setSubject('');
    setDisabledButton(true);
  }

  const handleInputChange = (event) => {
    const content = event.target.value;
    setHtmlContent(content);
    validateHtml(content);
  };

  const validateHtml = (html) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      console.log('DOMParser', doc);
      const errors = doc.querySelectorAll('parsererror');
      console.log('errors', errors);
      if (errors.length > 0) {
        setHtmlError('Invalid HTML content.');
      } else {
        setHtmlError('');
      }
    } catch (error) {
      setHtmlError('An error occurred while parsing HTML.');
    }
  };

  async function sendEmail(e) {
    e.preventDefault();
    if (disabledButton) {
      return;
    }
    const result = confirm('Are you sure you want to send this email?');

    if (result) {
      sendCustomEmail('anton121896@gmail.com', htmlContent, subject)
        .then(() => {
          resetState();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  return (
    <>
      <Can I='read' a='player'>
        <DashboardLayout>
          <DashboardNavbar />

          <MDBox display='flex' justifyContent='center' width='100%' marginTop='3%'>
            <Card
              className='aaaaaa'
              sx={{
                borderRadius: '12px',
                boxShadow: (theme) => theme.shadows[4],
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px'
              }}
            >
              <MDBox mb={4} width='100%'>
                <MDInput
                  type='text'
                  label='Subject'
                  variant='standard'
                  fullWidth
                  value={subject}
                  onChange={(e) => setSubject(event.target.value)}
                />
              </MDBox>
              <MDTypography fontSize='0.875rem'> HTML Code</MDTypography>
              <MDTextarea
                value={htmlContent}
                onChange={handleInputChange}
                placeholder='Enter HTML content here'
                sx={{
                  width: '100%'
                }}
              />
              {htmlError && <div style={{ color: 'red' }}>{htmlError}</div>}
              <MDBox
                sx={{
                  width: '100%',
                  marginTop: '20px',
                  border: '1px solid gray',
                  padding: '50px',
                  background: 'white !important'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </MDBox>
              <MDBox ml={2} mt={2} width='100%' display='flex' justifyContent='space-between'>
                <MDButton type='submit' variant='gradient' color='info' onClick={sendEmail} disabled={disabledButton}>
                  Send
                </MDButton>
              </MDBox>
            </Card>
          </MDBox>
        </DashboardLayout>
      </Can>
      <Can not I='read' a='player'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default EmailPreview;

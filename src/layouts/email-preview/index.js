import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { Navigate } from 'react-router-dom';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import {
  creteTemplate,
  deleteTemplate,
  editTemplate,
  getAllTemplates,
  getTemplate,
  sendCustomEmail,
  sendTemplateEmails
} from 'services/email';
import CodePreview from './components/code-preview';
import { Autocomplete, TextField } from '@mui/material';
import { useEmails } from 'context/emailContext';
import MDTypography from 'components/MDTypography';
import { useMaterialUIController } from 'context';

const EmailPreview = () => {  
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState('');
  const [subject, setSubject] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [disableFields, setDisableFields] = useState(false);
  const [emailInteraction, setEmailInteraction] = useState('send-template-email');

  const [open, setOpen] = useState(false);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [template, setTemplate] = useState('');
  const loading = open && templateOptions.length === 0;

  const { selectedEmails, setSelectedEmails } = useEmails();
  const [selectedName, setSelectedName] = useState('');
  const [selectedData, setSelectedData] = useState([]);

  const handleNameChange = (event) => {
    const name = event.target.value;
    setSelectedName(name);
    const selectedEmail = selectedEmails.find(email => email.name === name);
    if (!selectedEmail) {
      setSelectedData([]);
    }
    setSelectedData(selectedEmail ? selectedEmail.emails : null);
  };

  useEffect(() => {
    fetchAllTemplates();
  }, []);

  function fetchAllTemplates() {
    getAllTemplates()
      .then((res) => {
        if (Array.isArray(res?.data)) {
          setTemplateOptions(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (emailInteraction == 'send-template-email') {
      setDisableFields(true);
    } else if (emailInteraction == 'delete-email') {
      setDisableFields(true);
    } else {
      setDisableFields(false);
    }
  }, [emailInteraction]);

  useEffect(() => {
    if (template) {
      getTemplate(template.template_id)
        .then((res) => {
          if (Array.isArray(res?.data)) {
            const templateData = res.data[0];
            const versions = templateData.body.versions;

            if (versions.length > 0) {
              const htmlCode = versions[0].html_content;
              setTemplateName(templateData.body.name);
              setSubject(templateData.body.versions[0].subject);
              setHtmlContent(htmlCode.replace(/\\n/g, '').replace(/\\"/g, '"'));
            } else {
              setSubject('');
              setHtmlContent('');
            }
          }
        })
        .catch((error) => {});
    }
  }, [template, emailInteraction]);

  function resetState() {
    setHtmlContent('');
    setHtmlError('');
    setSubject('');
    setTemplate('');
    setTemplateName('');
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
      const errors = doc.querySelectorAll('parsererror');

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
    const result = confirm('Are you sure you want to send this email?');

    if (!result) {
      return;
    }
    if (emailInteraction == 'send-custom-email') {
      if (disabledSendButton()) {
        return;
      }
      sendCustomEmail(selectedData, htmlContent, subject)
        .then(() => {
          resetState();
          const updatedSelectedEmails = selectedEmails.filter(email => email.name !== selectedName);
          setSelectedEmails(updatedSelectedEmails);
          setSelectedName('');
          setSelectedData([]);
          alert('You successfully sent emails.');
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (emailInteraction == 'send-template-email') {
      if (!template || !template.template_id) {
        return;
      }
      sendTemplateEmails(selectedData, template.template_id)
        .then(() => {
          resetState();
          const updatedSelectedEmails = selectedEmails.filter(email => email.name !== selectedName);
          setSelectedEmails(updatedSelectedEmails);
          setSelectedName('');
          setSelectedData([]);
          alert('You successfully sent emails.');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
  function disabledSendButton() {
    let result = false;
    if (emailInteraction == 'send-template-email') {
      if (htmlContent.length <= 0 || subject.length <= 0 || !template || selectedEmails.length <= 0) {
        result = true;
      } else {
        result = false;
      }
    } else {
      if (htmlContent.length <= 0 || subject.length <= 0 || selectedEmails.length <= 0) {
        result = true;
      } else {
        result = false;
      }
    }
    if (!selectedName || !selectedData || selectedData.length <= 0) {
      result = true;
    }
    return result;
  }

  function disabledCreateButton() {
    let result = false;
    if (emailInteraction == 'create-email') {
      if (htmlContent.length <= 0 || subject.length <= 0 || templateName <= 0) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }

  function disabledEditButton() {
    let result = false;
    if (emailInteraction == 'edit-email') {
      if (htmlContent.length <= 0 || subject.length <= 0 || templateName <= 0 || !template || !template.template_id) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }

  function createTemplate(e) {
    e.preventDefault();
    creteTemplate(templateName, htmlContent, subject)
      .then(() => {
        resetState();
        fetchAllTemplates();
        alert('You created successfully template.');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function handleEditTemplate(e) {
    e.preventDefault();

    const result = confirm('Are you sure you want to edit this template?');
    if (!result) {
      return;
    }
    editTemplate(template.template_id, templateName, htmlContent, subject)
      .then(() => {
        resetState();
        fetchAllTemplates();
        alert('You successfully edited template.');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  async function handleDeleteTemplate(e) {
    e.preventDefault();

    const result = confirm('Are you sure you want to delete this template?');

    if (!result) {
      return;
    }
    deleteTemplate(template.template_id)
      .then(() => {
        resetState();
        fetchAllTemplates();
        alert('You successfully deleted template.');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function buttonsConfirm() {
    if (emailInteraction == 'send-template-email' || emailInteraction == 'send-custom-email') {
      return (
        <MDButton type='submit' variant='gradient' color='success' onClick={sendEmail} disabled={disabledSendButton()}>
          Send
        </MDButton>
      );
    } else if (emailInteraction == 'create-email') {
      return (
        <MDButton
          type='submit'
          variant='gradient'
          color='success'
          onClick={createTemplate}
          disabled={disabledCreateButton()}
        >
          Create Template
        </MDButton>
      );
    } else if (emailInteraction == 'edit-email') {
      return (
        <MDButton
          type='submit'
          variant='gradient'
          color='warning'
          onClick={handleEditTemplate}
          disabled={disabledEditButton()}
        >
          Edit Template
        </MDButton>
      );
    } else if (emailInteraction == 'delete-email') {
      return (
        <MDButton
          type='submit'
          variant='gradient'
          color='error'
          onClick={handleDeleteTemplate}
          disabled={template.template_id ? false : true}
        >
          Delete Template
        </MDButton>
      );
    }
  }

  return (
    <>
      <Can I='create' a='email'>
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
              <MDBox ml={2} mt={2} mb={3} width='100%' display='flex' sx={{justifyContent:'space-between'}}>
                <MDTypography>Groups: {selectedEmails.length} </MDTypography>
                <select value={selectedName} onChange={handleNameChange} 
                  style={{
                    appearance: 'none',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 16px',
                    fontSize: '16px',
                    border: '1px solid rgba(128, 128, 128, 0.5)',
                    outline: 'none',
                    width: '50%',
                    color: darkMode ? 'white' : 'black',
                    textAlign: 'center',
                  }}>
                <option value={selectedEmails.name}>Select an Email Group</option>
                {selectedEmails.map(email => (
                  <option key={email.name} value={email.name}>{email.name}</option>
                ))}
              </select>
              <MDTypography sx={{paddingRight:'1%'}}>{selectedData ? selectedData.length : '0'}: Emails  </MDTypography>
              </MDBox>

              <MDBox ml={2} mt={2} mb={3} width='100%' display='flex' sx={{justifyContent:'space-between'}}>
                <MDButton
                  sx={{ marginRight: '10px', marginBottom: '10px' }}
                  type='submit'
                  variant='gradient'
                  color={emailInteraction == 'send-template-email' ? 'primary' : 'secondary'}
                  onClick={() => setEmailInteraction('send-template-email')}
                >
                  Send template emails
                </MDButton>
                <MDButton
                  sx={{ marginRight: '10px', marginBottom: '10px' }}
                  type='submit'
                  variant='gradient'
                  color={emailInteraction == 'send-custom-email' ? 'primary' : 'secondary'}
                  onClick={() => setEmailInteraction('send-custom-email')}
                >
                  Send custom emails
                </MDButton>
                <MDButton
                  sx={{ marginRight: '10px', marginBottom: '10px' }}
                  type='submit'
                  variant='gradient'
                  color={emailInteraction == 'create-email' ? 'success' : 'secondary'}
                  onClick={() => setEmailInteraction('create-email')}
                >
                  Create template
                </MDButton>
                <Can I='update' a='email'>
                <MDButton
                  I='update' a='email'
                  sx={{ marginRight: '10px', marginBottom: '10px' }}
                  type='submit'
                  variant='gradient'
                  color={emailInteraction == 'edit-email' ? 'warning' : 'secondary'}
                  onClick={() => setEmailInteraction('edit-email')}
                >
                  Edit template
                </MDButton>
                </Can>
                <Can I='delete' a='email'>
                <MDButton 
                  sx={{ marginRight: '10px', marginBottom: '10px' }}
                  type='submit'
                  variant='gradient'
                  color={emailInteraction == 'delete-email' ? 'error' : 'secondary'}
                  onClick={() => setEmailInteraction('delete-email')}
                >
                  Delete template
                </MDButton>
                </Can>
              </MDBox>
              {emailInteraction == 'send-custom-email' || emailInteraction == 'create-email' ? (
                ''
              ) : (
                <MDBox mb={1.5} width='100%'>
                  <Autocomplete
                    loading={loading}
                    open={open}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    options={templateOptions}
                    value={template}
                    onChange={(e, value) => {
                      if (!value) {
                        setTemplate('');
                        return;
                      }
                      setTemplate(value);
                    }}
                    getOptionLabel={(option) => option.template_name ?? ''}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label='Template' />}
                  />
                </MDBox>
              )}

              {emailInteraction == 'create-email' || emailInteraction == 'edit-email' ? (
                <MDBox mb={4} width='100%'>
                  <MDInput
                    type='text'
                    label='Template name'
                    fullWidth
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </MDBox>
              ) : (
                ''
              )}

              <MDBox mb={4} width='100%'>
                <MDInput
                  type='text'
                  label='Subject'
                  fullWidth
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={disableFields}
                />
              </MDBox>
              <CodePreview
                htmlContent={htmlContent}
                handleInputChange={handleInputChange}
                htmlError={htmlError}
                disableFields={disableFields}
              />
              <MDBox ml={2} mt={2} width='100%' display='flex' justifyContent='space-between'>
                {buttonsConfirm()}
              </MDBox>
            </Card>
          </MDBox>
        </DashboardLayout>
      </Can>
      <Can not I='create' a='email'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default EmailPreview;

import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDAlert from 'components/MDAlert';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Can, useMaterialUIController } from 'context';
import { Formik, Form } from 'formik';
import { Dialog, DialogTitle, DialogContent, Card } from '@mui/material';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';

import { getPlayersEmails, getPlayersWithEmails } from 'services/email';
import emailColumnData from 'data/emailColumnData';
import Filters from './components/Filters';
import { useEmails } from 'context/emailContext';

import validations from 'layouts/email/components/schemas/validations';
import form from 'layouts/email/components/schemas/form';
import initialValues from 'layouts/email/components/schemas/initialValues';
import GroupInfo from 'layouts/email/components/GroupInfo';

function EmailSender() {

  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { formId, formField } = form;
  const currentValidation = validations[0];

  const [filters, setFilters] = useState({});
  const [headerCheck, setHeaderCheck] = useState(false);
  const [arrayOfEmails, setArrayOfEmails] = useState([]);
  const { selectedEmails, setSelectedEmails } = useEmails();

  const [queryPageIndex, setQueryPageIndex] = useState(0);
  const [queryPageSize, setQueryPageSize] = useState(0);
  const [emailsPerPage, setEmailsPerPage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [allMail, setAllMail] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleOpenModalAll = () => {
    setShowModal(true);
    setAllMail(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAlertVisible(false);
  };

  useEffect(() => {
    setArrayOfEmails([]);
  }, [filters]);

  useEffect(() => {
    handleGetEmails();
  }, [queryPageIndex, queryPageSize, filters]);

  useEffect(() => {
    checkHeaderCheckToRowChecks();
  }, [emailsPerPage, arrayOfEmails]);

  function checkHeaderCheckToRowChecks() {
    let isAllEmailsIncluded = false;
    if (emailsPerPage?.length > 0) {
      isAllEmailsIncluded = emailsPerPage.every((obj) => arrayOfEmails.includes(obj.email));
    }
    setHeaderCheck(isAllEmailsIncluded);
  }

  function handleGetEmails() {
    const nextPage = queryPageIndex + 1;
    getPlayersWithEmails(queryPageSize, nextPage, filters)
      .then((result) => {
        if (result?.data?.length > 0) {
          setEmailsPerPage(result.data);
        }
      })
      .catch(() => {});
  }

  const saveAllEmails = async () => {
    try {
      const emails = await getPlayersEmails(filters);
      setSelectedEmails(emails.data.data);
      alert('Emails saved successfully');
      setAlertVisible(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const onSaveAll = async (values) => {
    try {
      setGroupName(values.groupName);
      const emails = await getPlayersEmails(filters);
      const emailObject = {name: values.groupName, emails: emails.data.data};
      setSelectedEmails([...selectedEmails, emailObject]);
      setAlertVisible(true);
      setAllMail(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const onSave = async (values) => {
    if (arrayOfEmails.length != 0) {
      try {
        setGroupName(values.groupName);
        const emailObject = {name: values.groupName, emails: arrayOfEmails};
        setSelectedEmails([...selectedEmails, emailObject]);
        setArrayOfEmails([]);
        setAlertVisible(true);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Can I='read' a='email'>
        <DataTablePage
          title='Email Sender'
          createButton={
            <Can I='create' a='email'>
              <MDButton variant='contained' color='success' onClick={() => handleOpenModalAll()}>
                Save All Emails For Current Filters
              </MDButton>
              <MDButton variant='contained' color='primary' onClick={() => navigate('/email/email-preview')}>
                Go to templates
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getPlayersWithEmails}
          queryKey='players'
          columnData={emailColumnData}
          object={'email'}
          filters={filters}
          filtersComponent={
            <Filters
              filters={filters}
              setFilters={setFilters}
              arrayOfEmails={arrayOfEmails}
              setArrayOfEmails={setArrayOfEmails}
              setHeaderCheck={setHeaderCheck}
              onSave={handleOpenModal}
            />
          }
          noActions
          additionalData={{
            arrayOfEmails: arrayOfEmails,
            setArrayOfEmails: (e) => setArrayOfEmails(e),
            headerCheck: headerCheck,
            setHeaderCheck,
            setQueryPageIndex,
            setQueryPageSize,
            setEmailsPerPage
          }}
        />
      </Can>
        {/* Pop-up for group names  */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle>
          <MDBox lineHeight={0} display='flex' justifyContent='center'>
            <MDTypography variant='h5' sx={{ width: '100%' }} display='flex' justifyContent='center'>
              Create a Group of Emails
              <button
                onClick={handleCloseModal}
                className='close'
                type='button'
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '15px',
                  background: 'transparent',
                  border: 'none',
                  color: darkMode ? '#ffffff' : '#344767',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                &#x2715;
              </button>
            </MDTypography>
          </MDBox>
        </DialogTitle>
        <DialogContent height='65vh' sx={{ padding: 0, background: 'transparent', width: '500px' }}>
          <Formik initialValues={initialValues} validationSchema={currentValidation} 
          onSubmit={allMail ? onSaveAll : onSave} >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form id={formId} autoComplete='off'>
                <Card sx={{ height: '100%', borderRadius: '0px 0px 4px 4px' }}>
                  <MDBox py={3} px={6}>
                    <MDBox>
                      {!isAlertVisible && (
                        <GroupInfo
                          formData={{
                            values,
                            touched,
                            formField,
                            errors,
                            setFieldValue,
                            isSubmitting
                          }}
                        />
                      )}
                      {isAlertVisible && (
                        <>
                          <DialogTitle
                            style={{
                              paddingTop: 0,
                              display: 'flex',
                              justifyContent: 'center',
                              paddingBottom: '0',
                              lineHeight: 'normal'
                            }}
                          >
                            Your Group of Emails was Created
                          </DialogTitle>
                          <DialogTitle
                            style={{
                              paddingTop: 0,
                              display: 'flex',
                              justifyContent: 'center',
                              paddingTop: '15px',
                              paddingBottom: '15px',
                              fontSize: '12px',
                              letterSpacing: 0.2
                            }}
                          >
                            You can use this group of emails to send a template!<br></br>
                            Once you send an email to this group, the group will be deleted.
                          </DialogTitle>
                          <MDAlert color={darkMode ? 'dark' : 'info'} sx={{justifyContent:'center'}}>
                            <div style={{ color: darkMode ? '#56a2f5' : '#ffffff', textDecoration: 'none'}}>
                              {groupName}
                            </div>
                          </MDAlert>
                        </>
                      )}
                      {!isAlertVisible && (
                        <MDBox mt={2} width='100%' display='flex' justifyContent='center'>
                          <MDButton disabled={isSubmitting} type='submit' variant='gradient' color='info'>
                            Create
                          </MDButton>
                        </MDBox>
                      )}
                    </MDBox>
                  </MDBox>
                </Card>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Can not I='read' a='email'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EmailSender;

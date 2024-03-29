import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';

import { Formik, Form } from 'formik';
import Card from '@mui/material/Card';

import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import validations from 'layouts/player-management/components/schemas/validations';
import form from 'layouts/player-management/components/schemas/form';
import initialValues from 'layouts/player-management/components/schemas/initialValues';

import PlayerInfo from 'layouts/player-management/components/PlayerInfo';
import CopyToClipboardButton from 'layouts/player-management/components/CopyToClipboardButton';

import { Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';

import MDAlert from 'components/MDAlert';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { getPlayers, getPlayerAggregated } from 'services/players';
import { playerColumnData } from 'data/playerColumnData';
import Filters from './components/Filters';
import { useEffect, useState } from 'react';
import { deletePlayer } from 'services/players';
import { Can } from 'context';
import useAxios from 'hooks/useAxios';

import { useMaterialUIController } from 'context';

function PlayerManagement() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const [deleteRoleId, setDeleteRoleId] = useState(null);

  const [filters, setFilters] = useState({});
  const [cols, setCols] = useState(null);

  useEffect(() => {
    playerColumnData(navigate).then((res) => {
      setCols(res);
    });
  }, [filters]);

  const axiosInstance = useAxios();
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setAlertVisible(false);
  };

  const link = process.env.REACT_APP_FRONTEND_URL + '?demoUser=';

  const submitForm = async (values, actions) => {
    try {
      const response = await axiosInstance.post('admin/users/create-demo-user', values);
      setFilters({
        ...filters,
        refresh: filters?.refresh ? !filters.refresh : true
      });
      const data = response.data;
      console.log(data);
      if (data) {
        setUserNickname(data.nickname);
        setUserId(data.walletId);
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  if (!cols) return <></>;
  return (
    <>
      <Can I='read' a='player'>
        <DataTablePage
          title='Player Management'
          createButton={
            <Can I='create' a='player'>
              <MDButton variant='contained' color='info' onClick={() => handleOpenModal()}>
                Create Demo Player
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getPlayers}
          queryKey='players'
          columnData={cols}
          object={'player'}
          onDelete={(id) => {
            setDeleteRoleId(id);
            handleOpenDeleteModal();
          }}
          subrowFetchData={getPlayerAggregated}
          filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
          filters={filters}
          noActions={filters?.isDemo == null || filters?.isDemo == false ? true : false}
        />{' '}
      </Can>
      <Can not I='read' a='player'>
        <Navigate to='/dashboard' replace />
      </Can>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle>
          <MDBox lineHeight={0} display='flex' justifyContent='center'>
            <MDTypography variant='h5' sx={{ width: '100%' }} display='flex' justifyContent='center'>
              Create demo player
              <button
                onClick={handleCloseModal}
                class='close'
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
          <Formik initialValues={initialValues} validationSchema={currentValidation} onSubmit={handleSubmit}>
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form id={formId} autoComplete='off'>
                <Card sx={{ height: '100%', borderRadius: '0px 0px 4px 4px' }}>
                  <MDBox py={3} px={6}>
                    <MDBox>
                      {!isAlertVisible && (
                        <PlayerInfo
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
                            Your demo player {userNickname} was created
                          </DialogTitle>
                          <DialogTitle
                            style={{
                              paddingTop: 0,
                              display: 'flex',
                              justifyContent: 'center',
                              paddingBottom: '15px',
                              fontSize: '12px',
                              letterSpacing: 0.2
                            }}
                          >
                            The link below is your direct access into the player's account
                          </DialogTitle>
                          <MDAlert color={darkMode ? 'dark' : 'info'}>
                            <a
                              style={{ color: darkMode ? '#56a2f5' : '#ffffff', textDecoration: 'none' }}
                              href={link + userId}
                            >
                              {link + userId}
                            </a>
                          </MDAlert>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CopyToClipboardButton text={`${link}` + `${userId}`} />
                          </div>
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
      <Dialog
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this user?'}</DialogTitle>
        <DialogActions>
          <Button
            onClick={async () => {
              try {
                await deletePlayer(deleteRoleId);
                setFilters({
                  ...filters,
                  isDemo: true,
                  refresh: filters?.refresh ? !filters.refresh : true
                });
              } catch (error) {
                alert(`Error deleting user: ${error.message}`);
              }

              handleCloseDeleteModal();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseDeleteModal}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PlayerManagement;

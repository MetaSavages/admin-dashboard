import useAxios from 'hooks/useAxios';

export const sendCustomEmail = async (email, customEmailTemplate, subject) => {
  const api = useAxios();
  try {
    return await api.post('/admin/users/send-user-custom-email', {
      email: email,
      customEmailTemplate,
      subject
    });
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

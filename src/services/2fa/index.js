import useAxios from 'hooks/useAxios';
export const generateQrCode = async () => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/2fa-generate');
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const turnOn2Fa = async (code) => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/2fa-turn-on', { twoFactorAuthenticationCode: code.toString() });
  } catch (err) {
    console.log(err);

    throw new Error(err.response.data.message);
  }
};

export const login2Fa = async (code, email, password) => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/2fa-login', {
      twoFactorAuthenticationCode: code.toString(),
      email: email,
      password: password
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const remove2Fa = async (code) => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/remove-2fa', { twoFactorAuthenticationCode: code.toString() });
  } catch (err) {
    console.log(err);

    throw new Error(err.response.data.message);
  }
};

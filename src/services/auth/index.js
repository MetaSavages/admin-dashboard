import useAxios from 'hooks/useAxios';
export const login = async (email, password) => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/login', { email, password });
  } catch (err) {
    console.log(err);
    return {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        role: {
          id: '',
          name: ''
        }
      }
    };
  }
};

export const getCurrentUser = async () => {
  const api = useAxios();
  try {
    return (await api.get('/admin/users/me')).data;
  } catch (err) {
    console.log(err);
    return {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        role: {
          id: '',
          name: ''
        }
      }
    };
  }
};

export const logout = async () => {
  const api = useAxios();
  try {
    return await api.post('/admin/auth/logout');
  } catch (err) {
    console.log(err);
    return {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        role: {
          id: '',
          name: ''
        }
      }
    };
  }
};

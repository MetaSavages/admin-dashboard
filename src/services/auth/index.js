import useAxios from 'hooks/useAxios';
export const login = async (email, password) => {
  const api = useAxios();
  try {
    return await api.post('/auth/login', { email, password });
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
    return await api.get('/users/me');
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
    return await api.post('/auth/logout');
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

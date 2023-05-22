import axios from 'axios';
export const login = async (email, password) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
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
  try {
    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {
      withCredentials: true
    });
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
  try {
    return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
      withCredentials: true
    });
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

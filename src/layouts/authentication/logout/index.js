import { logout } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import { setUser, setRole, useMaterialUIController } from 'context';
import { useEffect } from 'react';
function Logout() {
  const navigate = useNavigate();
  const [, dispatch] = useMaterialUIController();
  useEffect(() => {
    logout().then(() => {
      setUser(dispatch, '');
      setRole(dispatch, '');

      // document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/authentication/sign-in/basic');
    });
  }, []);
  return <></>;
}

export default Logout;

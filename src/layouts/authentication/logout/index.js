import { logout } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import { setUser, setRole, useMaterialUIController } from 'context';
function Logout() {
  const navigate = useNavigate();
  const [, dispatch] = useMaterialUIController();
  logout().then(() => {
    setUser(dispatch, '');
    setRole(dispatch, '');
    navigate('/authentication/sign-in/basic');
  });

  return <></>;
}

export default Logout;

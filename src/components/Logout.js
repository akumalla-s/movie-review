import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import HelperService from '../services/HelperService';

export default function Logout() {
  const user = HelperService.getCurrentUserData();
  
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.removeItem("userData");
      navigate("/");
      window.location.reload();
    }
  }, [navigate, user]);

  return null;
}

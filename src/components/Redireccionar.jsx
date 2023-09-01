import { useNavigate } from "react-router-dom";

const Redireccionar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      const payloadBase64 = storedToken.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      const currentTime = Date.now();
      
      if (payload.exp * 1000 > currentTime) {
        navigate('/auth/');
      }
    }
  }, [navigate]);

  return null;
};

export default Redireccionar;

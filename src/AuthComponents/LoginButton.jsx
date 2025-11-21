import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button size="lg" className="my-4 px-5 py-3 fs-4 shadow-lg" onClick={() => loginWithRedirect()} >
      Iniciar Sesión
    </Button>
  );
};

export default LoginButton;

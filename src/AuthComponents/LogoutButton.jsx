import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button size="lg" className="button logout my-3 px-5 py-3 fs-4 shadow-lg"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;

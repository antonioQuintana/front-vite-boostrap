import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <span className="mx-3"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar Sesión
    </  span>
  );
};

export default LogoutButton;

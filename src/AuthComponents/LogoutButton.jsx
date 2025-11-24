import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { closeSession } from "../redux/actions";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  return (
    <span className="mx-3"
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } })
        dispatch(closeSession());
      }}
    >
      Cerrar Sesión
    </  span>
  );
};

export default LogoutButton;

import { Link } from "react-router-dom"
import './NotFoundPage.css'
import { Button } from "react-bootstrap"

function NotFound() {
    return (
        <div className="notFound mt-5">
            <h2>Página no encontrada</h2>
            <img style={{ width: "60%" }} src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW4weGwwOXFhZm56dHNybmhodWlzbGVhNG55c2Z2MjNmMG9uZmd3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14uQ3cOFteDaU/giphy.gif" alt="404notFound" />
            <br />
            <Button as={Link} to="/" variant="dark" className="my-3">Volver a la página principal</Button>
        </div>
    )
}

export default NotFound
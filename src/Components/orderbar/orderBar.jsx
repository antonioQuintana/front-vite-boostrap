import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { sortProducts } from "../../redux/actions"

function orderBar() {
    const dispatch = useDispatch();
    const handleSort = (eventKey) => {
        dispatch(sortProducts(eventKey))
    }
    return (
        <Dropdown className="mb-3">
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Ordenar
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSort('asc')}>Precio - menor a mayor</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('desc')}>Precio - mayor a menor</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    )
}

export default orderBar

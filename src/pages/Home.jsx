import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function Home() {
  return (
    <div
      className="container text-center mt-5 mx-auto"
      style={{ maxWidth: "900px" }}
    >
      <h2>Bienvenido a </h2>
      <h1 className="text-warning">Gestión de inventarios</h1>
      <div
        className="mt-4 d-flex flex-wrap justify-content-center"
        style={{ gap: "20px" }}
      >
        <Card border="info" style={{ width: "20rem" }}>
          <Card.Header>Movimientos</Card.Header>
          <Card.Body>
            <Card.Title>Ingresar nuevo movimientos</Card.Title>
            <Card.Text>
              <p>Realizar movimientos de entrada y salida de articulos</p>
              <NavLink className="btn btn-info" to="/movimientos">
                Ir a movimientos
              </NavLink>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="success" style={{ width: "20rem" }}>
          <Card.Header>Stock</Card.Header>
          <Card.Body>
            <Card.Title>Consultar stock</Card.Title>
            <Card.Text>
              <p>Realizar consultas de stock</p>
              <NavLink className="btn btn-success" to="/stock">
                Ir a Stock
              </NavLink>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="warning" style={{ width: "20rem" }}>
          <Card.Header>Consultas</Card.Header>
          <Card.Body>
            <Card.Title>Consultas de movimientos</Card.Title>
            <Card.Text>
              <p>Realizar consultas de movimientos</p>
              <NavLink className="btn btn-warning" to="/consultas">
                Ir a Consultas
              </NavLink>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

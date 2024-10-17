import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { supabase } from "../API/client";
import { Table, Form, Col, Row } from "react-bootstrap";
function ModalStock({
  show,
  handleClose,
  settingStok,
  product,
  clearMov,
  theme,
}) {
  const [mov, setMov] = useState([]);
  useEffect(() => {
    clearMov && setMov([]);
    const fetchMovimientos = async () => {
      try {
        const response = await supabase
          .from("view_movimientos")
          .select("*")
          .eq("id_product", product.id_product);

        if (response.error) {
          throw response.error;
        }
        const data = response.data;
        setMov(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    product.id_product && fetchMovimientos();
  }, [product]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="modal-rodar"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <p style={{ fontSize: "1rem", marginBottom: ".15rem" }}>Artículo</p>
          <p style={{ fontSize: "1.1rem", marginBottom: ".15rem" }}>
            📦 {product.name_product}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table style={{ fontSize: "0.95rem" }}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Área</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {mov.map((item, index) => (
              <tr key={`mov-${index}`}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.areas}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form>
          <Row className="g-1">
            <Col>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Ingrese la cantidad real"
                id="newStock"
              />
            </Col>
            <Col sm={"auto"}>
              <Button
                as="input"
                type="button"
                value="Ajustar Stock"
                size="sm"
                variant={theme === "dark" ? "light" : "dark"}
                onClick={() => {
                  const newStock = document.getElementById('newStock').value;
                  const valueAjuste = Number(newStock) - product.stock;
                  settingStok(valueAjuste)
                }}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalStock;

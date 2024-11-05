import { Button, Col, Modal, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { supabase } from "../API/client";
export default function ModalComponent({
  onSelectProducts,
  register,
  watch,
  theme,
}) {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const handleCloseProduts = () => setShow(false);
  const handleShowProduts = () => setShow(true);
  const handleSelectProduct = async (e) => {
    const id = e.target.id;
    const product = products.find((item) => item.id_product == id);
    onSelectProducts({ ...product });
    handleCloseProduts();
  };
  const filterProducts = () => {
    return products.filter((item) =>
      item.name_product.toLowerCase().includes(valueSearch?.toLowerCase() || "")
    );
  };

  useEffect(() => {
    setValueSearch(watch("search"));
  }, [watch("search")]);

  useEffect(() => {
    const fetchProductStockSummary = async () => {
      try {
        const response = await supabase
          .from("product_stock_summary")
          .select("*");
        if (response.error) {
          throw response.error;
        }
        const data = response.data;
        setProducts(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchProductStockSummary();
  }, []);

  return (
    <Col className="mt-3">
      <Button
        className="w-100"
        variant={theme==='dark'?'light':'dark'}
        type="button"
        onClick={handleShowProduts}
        style={{fontWeight: '600'}}
      >
        Seleccionar productos
      </Button>
      <Modal
        show={show}
        onHide={handleCloseProduts}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Listado de productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="search"
            placeholder="Ingrese un nombre para filtrar"
            className="mb-3"
            {...register("search")}
          />
          {filterProducts().map((product) => (
            <Row key={`${product.id_product}-${product.name_product}`}>
              <Col className="mt-2">
                <Button
                  as="input"
                  type="button"
                  value={product.name_product}
                  onClick={handleSelectProduct}
                  id={product.id_product}
                  variant={`outline-${theme === "dark" ? "light" : "dark"}`}
                  style={{border: 'none'}}
                />
              </Col>
              <Col className="mt-2 col-2">
                <span><i className="bi bi-box-seam-fill me-2"></i>{product.stock}</span>
              </Col>
            </Row>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProduts}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

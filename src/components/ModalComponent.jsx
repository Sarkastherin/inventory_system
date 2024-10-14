import { Button, Col, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function ModalComponent({ data }) {
  const [show, setShow] = useState(false);
  const handleCloseProduts = () => setShow(false);
  const handleShowProduts = () => setShow(true);
     const getPickedProducts = () => {
        const listProducts = []
        const products =  watch();
        for (let item in products) {
            if(products[item] === true) {
                listProducts.pus
                console.log(item)
            }  
        }
     }
  const { watch, register } = useForm();
  return (
    <Col className="mt-3">
      <Button
        className="w-100"
        variant="warning"
        type="button"
        onClick={handleShowProduts}
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
          />
          {data.map((product) => (
            <div className="form-check" key={`${product.id}-${product.name}`}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={product.id}
                
                {...register(`id-${product.id}`,{required:true})}
              />
              <label className="form-check-label" htmlFor={product.id}>
                {product.name}
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProduts}>
            Close
          </Button>
          <Button variant="primary" onClick={getPickedProducts}>Understood</Button>
          
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
import { Button, Col, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { supabase } from "../API/client";
import { LabelRadio } from "./TypeRadioGroup";
export default function ModalComponent({ onSelectProducts, deleteProducts, register, watch }) {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
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
        variant="bd-rodar"
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
            {...register("search")}
          />
          {filterProducts().map((product) => (
            <Col key={`${product.id}-${product.name}`} className="mt-2">
              <input
                type="radio"
                className="btn-check"
                name="optionsP"
                id={product.id}
                value={product.name}
                {...register("selectProduct")}
                onClick={handleSelectProduct}
              />
              <LabelRadio
                variant="outline-light"
                controlId={product.id}
                nameLabel={product.name}
              />
              {/* <Button
                size="sm"
                as="input"
                type="submit"
                value={product.name}
                variant="outline-light"
                id={product.id}
                {...register(`select-${product.id}`)}
                onClick={handleSubmit((data)=>console.log(data))}
              /> */}
            </Col>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProduts}>
            Cerrar
          </Button>
          {/* <Button variant="primary" onClick={getPickedProducts}>
            Seleccionar
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

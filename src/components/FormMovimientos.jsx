import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
  Alert,
  Modal,
} from "react-bootstrap";
import { supabase } from "../API/client";
import { useForm } from "react-hook-form";
import GroupButtons from "./GroupButtons";
import ModalComponent from "./ModalComponent";

function FormMovimientos() {
  const [dataAreas, setDataAreas] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await supabase.from("areas").select("id, name");
        if (response.error) {
          throw response.error;
        }
        setDataAreas(response.data);
      } catch (e) {
        setError(e.message);
      }
    };
    const fetchProductos = async () => {
      try {
        const response = await supabase.from("productos").select("id, name");
        if (response.error) {
          throw response.error;
        }
        //console.log(response.data);
        setDataProductos(response.data);
      } catch (e) {
        setError(e.message);
      }
    };
    fetchAreas();
    fetchProductos();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //console.warn(errors);
  const onSubmit = handleSubmit((data, errors) => {
    console.log(data);
  });
  return (
    <Form onSubmit={onSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      <GroupButtons/>
      <Form.Group className="mt-3" controlId="id">
        <Form.Label>Área</Form.Label>
        <Form.Select
          {...register("area", {
            required: true,
          })}
        >
          <option value="">Seleccione un área</option>
          {dataAreas.map((area) => (
            <option key={area.id + "-" + area.name} value={area.id}>
              {area.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <ModalComponent data={dataProductos}/>
      <Row className="g-1 mt-4">
        <h5>Productos seleccionados</h5>
        <Col>
          <Form.Control
            type="text"
            placeholder="Nombre del producto"
            readOnly
            {...register('product_1', {
                required: true
            })}
          />
        </Col>
        <Col className="col-2">
          <Form.Control
            type="number"
            placeholder="Cant"
            {...register('cant_product_1', {
                required: true
            })}
          />
        </Col>
        <Col className="col-auto">
        <Button variant="outline-danger" type="button"><i className="bi bi-trash3-fill"></i></Button>
        </Col>
        {/* <Col className="col-auto">
        <Button variant="success" type="button" onClick={handleAddRow}><i className="bi bi-plus-lg"></i></Button>
        </Col> */}
      </Row>

      <Button className="mt-4" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormMovimientos;

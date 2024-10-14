import { Form } from "react-bootstrap";
import { supabase } from "../API/client";
import { useState, useEffect } from "react";
export default function SelectComponentArea({ register, errors, setValue }) {
  const [dataAreas, setDataAreas] = useState([]);
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
    }
    fetchAreas();
  }, []);
  return (
    <Form.Group className="mt-3" controlId="id">
        <Form.Label>Área</Form.Label>
        <Form.Select
          {...register("area", {
            required: {
              value: true,
              message: "Debe seleccionar un área",
            },
          })}
        >
          <option value="">Seleccione un área</option>
          {dataAreas.map((area) => (
            <option key={area.id + "-" + area.name} value={area.id}>
              {area.name}
            </option>
          ))}
        </Form.Select>
        {errors.area && (
          <div className="form-text text-danger">{errors.area.message}</div>
        )}
      </Form.Group>
  )
} 
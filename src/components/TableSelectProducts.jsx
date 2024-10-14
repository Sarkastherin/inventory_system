import { Form, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
export default function TableSelectProducts({ data, register, watch, handleDeleteRow, fields, remove, append }) {
  useEffect(() => {
   append(data)
  },[data])
  return (
    <Table>
        <thead>
          <tr>
            <th>Descripción del producto</th>
            <th  style={{ width: "80px" }}>Stock</th>
            <th  style={{ width: "80px" }}>Cant</th>
            <th  style={{ width: "50px" }}>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.name}>
              <td>
              <Form.Control
                  type="text"
                  placeholder="Descripción"
                  readOnly
                  {...register(`products.${index}.name`)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="Cant"
                  readOnly
                  {...register(`products.${index}.stock`)}
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="Cant"
                  {...register(`products.${index}.quantity`, {
                    required: {
                      value: true,
                      message: "Debe ingresar una cantidad",
                    },
                    min: {
                      value: 1,
                      message: "Debe ser un numero positivo",
                    },
                    validate: (value) => {
                      const stock = watch(`stock_${item.id}`);
                      const isOutStock = watch("type") === "Salida";
                      if (isOutStock) {
                        return (
                          Number(value) <= Number(stock) ||
                          "La cantidad no puede ser mayor al stock"
                        );
                      }
                      return true;
                    },
                  })}
                />
              </td>
              <td>
                <Button variant="outline-danger" type="button" onClick={() => remove(index)}>
                  <i
                    className="bi bi-trash3-fill"
                    
                  ></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  )
}
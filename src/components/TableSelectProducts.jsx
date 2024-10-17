import { Form, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
export default function TableSelectProducts({
  selectProducts,
  register,
  watch,
  errors,
  fields,
  remove,
  append,
  theme
}) {
  useEffect(() => {
    const productsSelected = watch("products");
    const isExist =
      productsSelected &&
      productsSelected.some(
        (item) => item.id_product == selectProducts.id_product
      );
    !isExist && append(selectProducts);
  }, [selectProducts]);
  return (
    <Table>
      {errors.products && (
        <caption>
          <ul>
            {errors.products.map(
              (item, index) =>
                item && (
                  <li
                    className="form-text text-danger"
                    key={`messageError${index}`}
                  >
                    {item.quantity.message}
                  </li>
                )
            )}
          </ul>
        </caption>
      )}
      <thead>
        <tr>
          <th className="py-1">Descripción del producto</th>
          <th className="py-1" style={{ width: "60px" }}>Uni</th>
          <th className="py-1" style={{ width: "50px" }}>Stock</th>
          <th className="py-1" style={{ width: "68px" }}>Cant</th>
          <th className="py-1" style={{ width: "40px" }}></th>
        </tr>
      </thead>
      <tbody>
        {fields.map((item, index) => (
          <tr key={item.name_product}>
            <td>
              <Form.Control
                type="text"
                placeholder="Descripción"
                readOnly
                size="sm"
                style={{border:'none'}}
                className="px-0"
                {...register(`products.${index}.name_product`)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Uni"
                readOnly
                size="sm"
                style={{border:'none'}}
                className="px-0"
                {...register(`products.${index}.units`)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                placeholder="Cant"
                readOnly
                size="sm"
                style={{border:'none'}}
                className="px-0 text-end"
                {...register(`products.${index}.stock`)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                placeholder="Cant"
                size="sm"
                {...register(`products.${index}.quantity`, {
                  required: {
                    value: true,
                    message: `Debe ingresar una cantidad [Prod: ${fields[index].name_product} ]`,
                  },
                  min: {
                    value: 1,
                    message: `Debe ser un numero positivo [Prod: ${fields[index].name_product} ]`,
                  },
                  validate: (value) => {
                    const stock = watch(`products.${index}.stock`);
                    const isOutStock = watch("type") === "Salida";
                    if (isOutStock) {
                      return (
                        Number(value) <= Number(stock) ||
                        `La cantidad no puede ser mayor al stock [Prod: ${fields[index].name_product} ]`
                      );
                    }
                    return true;
                  },
                })}
              />
            </td>
            <td className="text-end">
              <Button
                variant="outline-danger"
                type="button"
                size="sm"
                onClick={() => remove(index)}
              >
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

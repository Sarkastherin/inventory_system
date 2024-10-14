import { useState, useEffect } from "react";
import { Form, Button, Alert, Table, ButtonGroup } from "react-bootstrap";
import { supabase } from "../API/client";
import { useForm, useFieldArray } from "react-hook-form";
import ModalComponent from "./ModalComponent";

import {TypeRadioGroup} from "./TypeRadioGroup";
import SelectComponentArea from "./SelectComponentArea";
import TableSelectProducts from "./TableSelectProducts";

function FormMovimientos() {
  const [selectProducts, setSelectProducts] = useState([]);
  const [deleteProducts, setDeleteProducts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    defaultValues : {
      products: [{name:'', stock:'',quantity: ''}]
    }
  });
  const {fields, append, remove, replace} =useFieldArray({
    control, name: "products"
  })

  const onError = (errors, e) => console.log("No enviado", errors, e);
  const onSubmit = (data, e) => console.log("Enviado", data, e);

  const handleSelectProducts = (data) => {
    console.log(data)
    setSelectProducts(data);
  };

  const handleDeleteRow = (e) => {
    const row = e.target.closest("button").parentNode.parentNode;
    const idProduct = row.firstChild.title;
    setDeleteProducts([...deleteProducts, idProduct]);
    setSelectProducts([...selectProducts].filter(elem => elem.id != idProduct))
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <TypeRadioGroup register={register} errors={errors} />
      <SelectComponentArea
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <ModalComponent
        onSelectProducts={handleSelectProducts}
        deleteProducts={deleteProducts}
        register={register}
        handleSubmit={handleSubmit}
        watch={watch}
      />
      {errors.button && (
        <div className="form-text text-danger">{errors.button.message}</div>
      )}
      <h5 className="mt-4">Productos seleccionados</h5>
      <TableSelectProducts
        data={selectProducts}
        register={register}
        errors={errors}
        handleDeleteRow={handleDeleteRow}
        watch={watch}
        fields={fields}
        remove={remove}
        append={append}
        replace={replace}
      />
      <Button
        className="mt-4"
        variant="primary"
        type="submit"
        {...register("button", {
          validate: () => {
            console.log(watch('products'))
            return selectProducts.length > 0 || "No ha seleccionado productos";
          },
        })}
      >
        Guardar
      </Button>
    </Form>
  );
}

export default FormMovimientos;

import { useState} from "react";
import { Form, Button } from "react-bootstrap";
import { supabase } from "../API/client";
import { useForm, useFieldArray } from "react-hook-form";
import ModalComponent from "./ModalComponent";

import { TypeRadioGroup } from "./TypeRadioGroup";
import SelectComponentArea from "./SelectComponentArea";
import TableSelectProducts from "./TableSelectProducts";
import ModalAlert from "./ModalAlert";
import ModalLoading from "./ModalLoading";
import ModalSuccess from "./ModalSuccess";

function FormMovimientos({ theme }) {
  const [dataForm, setDataForm] = useState({});
  const [selectProducts, setSelectProducts] = useState([]);
  /* Modal Alert */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* Modal Loading */
  const [showLoading, setShowLoading] = useState(false);
  const handleCloseLoading = () => setShowLoading(false);
  const handleShowLoading = () => setShowLoading(true)
  /* Modal Success */
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    replace([])
    reset()
    setShowSuccess(false)
  };
  const handleShowSuccess = () => setShowSuccess(true)
  /* React Hook Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    reset,
    resetField
  } = useForm({});
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "products",
  });
  const onError = (errors, e) => console.log("No enviado", errors, e);
  const confirmData = (data, e) => {
    setDataForm(data);
    handleShow();
  };
  const onSubmit = async () => {
    handleClose();
    const dataOnSubmit = dataForm.products.map((item) => {
      return {
        id_area: dataForm.area,
        type: dataForm.type,
        id_product: item.id_product,
        quantity: dataForm.type === 'Salida' ? (item.quantity * -1) : item.quantity
      };
    });
    try {
      handleShowLoading()
      const response = await postData(dataOnSubmit);
      if(response.status >= 200 && response.status <= 299) {
        handleCloseLoading()
        handleShowSuccess()
      }
      console.log(response)
    } catch (e) {
      console.log(e);
    }
  };
  /*  */
  const postData = async (data) => {
    const response = await supabase.from("movimientos").insert(data);
    return response;
  };
  const handleSelectProducts = (data) => {
    setSelectProducts(data);
  };
  
  return (
    <Form
      onSubmit={handleSubmit(confirmData, onError)}
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <TypeRadioGroup register={register} errors={errors} />
      <SelectComponentArea
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <ModalComponent
        onSelectProducts={handleSelectProducts}
        register={register}
        watch={watch}
        theme={theme}
      />
      {errors.button && (
        <div className="form-text text-danger">{errors.button.message}</div>
      )}
      <h5 className="mt-4 mb-3">Productos seleccionados</h5>
      <TableSelectProducts
        selectProducts={selectProducts}
        register={register}
        watch={watch}
        errors={errors}
        fields={fields}
        remove={remove}
        append={append}
        theme={theme}
      />
      <Button
        className="mt-4"
        variant="primary"
        type="submit"
        {...register("button", {
          validate: () => {
            const arrProducts = watch("products");
            return (
              (arrProducts && arrProducts.length > 0) ||
              "No ha seleccionado productos"
            );
          },
        })}
      >
        Guardar
      </Button>
      <ModalAlert
        show={show}
        handleClose={handleClose}
        dataForm={dataForm}
        onSubmit={onSubmit}
      />
      <ModalLoading
        showLoading={showLoading}
        theme={theme}
      />
      <ModalSuccess
        showSuccess={showSuccess}
        theme={theme}
        handleCloseSuccess={handleCloseSuccess}
        valueButton={'Volver'}
        message={'Volver al formulario'}
      />
    </Form>
  );
}

export default FormMovimientos;

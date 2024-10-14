// TypeRadioGroup.js
import React from "react";
import { ButtonGroup } from "react-bootstrap";
const LabelRadio = ({ variant, controlId, nameLabel }) => {
  return (
    <label className={`btn btn-${variant}`} htmlFor={controlId}>
      {nameLabel}
    </label>
  );
};
const TypeRadioGroup = ({ register, errors }) => (
  <>
    <ButtonGroup className="w-100">
      <input
        type="radio"
        className="btn-check"
        name="options"
        id="entrada"
        value="Entrada"
        {...register("type", {
          required: {
            value: true,
            message: "Debe seleccionar un tipo de movimiento",
          },
        })}
      />
      <LabelRadio
        variant="outline-success"
        controlId="entrada"
        nameLabel="Entrada"
      />
      <input
        type="radio"
        className="btn-check"
        name="options"
        id="salida"
        value="Salida"
        {...register("type", {
          required: {
            value: true,
            message: "Debe seleccionar un tipo de movimiento",
          },
        })}
      />
      <LabelRadio
        variant="outline-danger"
        controlId="salida"
        nameLabel="Salida"
      />
    </ButtonGroup>
    {errors.type && (
      <div className="form-text text-danger">{errors.type.message}</div>
    )}
  </>
);

export {TypeRadioGroup, LabelRadio};

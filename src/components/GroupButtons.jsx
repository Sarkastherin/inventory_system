import { useForm } from "react-hook-form";

export default function GroupButtons() {
    const {register} = useForm();
    return (
        <div className="btn-group w-100" role="group">
        <input
          type="radio"
          className="btn-check"
          name="options"
          id="entrada"
          value="Entrada"
          {...register("type", {
            required: true,
          })}
        />
        <label className="btn btn-outline-success" htmlFor="entrada">
          Entrada
        </label>
        <input
          type="radio"
          className="btn-check"
          name="options"
          id="salida"
          value="Salida"
          {...register("type", {
            required: true,
          })}
        />
        <label className="btn btn-outline-danger" htmlFor="salida">
          Salida
        </label>
      </div>
    )
}
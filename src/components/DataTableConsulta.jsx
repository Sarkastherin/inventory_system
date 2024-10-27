import DataTable from "react-data-table-component";
import { supabase } from "../API/client";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useForm } from "react-hook-form";
import SelectComponentArea from "./SelectComponentArea";
import { CSVLink } from "react-csv";

const columns = [
  {
    name: "Id",
    selector: (row) => row.id_product,
    sortable: true,
    width: "60px",
  },
  {
    name: "Fecha",
    selector: (row) => row.date,
    sortable: true,
    width: "120px",
  },
  {
    name: "Descripción",
    selector: (row) => row.name_product,
    sortable: true,
  },
  {
    name: "Area",
    selector: (row) => row.names_areas,
    sortable: true,
  },
  {
    name: "Tipo",
    selector: (row) => row.type,
    sortable: true,
    width: "120px",
  },
  {
    name: "Cantidad",
    selector: (row) => row.quantity,
    sortable: true,
    width: "100px",
  },
];

export default function DataTableConsulta({ theme }) {
  const headers = [
    { label: "Id", key: "id_movimiento" },
    { label: "Fecha", key: "date" },
    { label: "Descripción", key: "name_product" },
    { label: "Area", key: "names_areas" },
    { label: "Tipo", key: "type" },
    { label: "Cantidad", key: "quantity" },
  ];
  const { register, handleSubmit } = useForm();
  const [records, setRecords] = useState([]);
  const [nameFile, setnameFile] = useState('movimientos')
  const handleFilter = (data) => {
    console.log(data)
    const nameFile_area = data.area!='' ? `area(${data.area}) ` : '';
    const nameFile_dates_start = data.desde != "" ? data.desde : "2000-01-01"
    const nameFile_dates_end = data.hasta != "" ? data.hasta : dayjs(new Date()).format("YYYY-MM-DD")
    const name = `movimientos_${nameFile_area}${nameFile_dates_start}-${nameFile_dates_end}`
    setnameFile(name)
    const fetchProductStockSummary = async () => {
      try {
        let query = supabase
          .from("view_movimientos")
          .select("*")
          .ilike("name_product", `%${data.description}%`)
          .gte("date", data.desde != "" ? data.desde : "2000-01-01")
          .lte(
            "date",
            data.hasta != ""
              ? data.hasta
              : dayjs(new Date()).format("YYYY-MM-DD")
          )
          
          .order("date")
          .limit(1100);
        if(data.area != "") {
          query =  query.eq('id_areas', data.area)
        }
        if(!data.area_otro) {
          query = query.neq('id_areas', 11)
        }
        const response = await query
        if (response.error) {
          throw response.error;
        }
        const result = response.data;
        const newResult = result.map(item => {
          item.date = dayjs(item.date).format("DD/MM/YYYY");
          return item
        })
        //console.log(newResult)
        setRecords(newResult);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchProductStockSummary();
  };
  const paginationComponentOptions = {
    rowsPerPageText: "Productos por página",
    rangeSeparatorText: "de",
  };

  return (
    <>
      <Form className="mb-3 align" onSubmit={handleSubmit(handleFilter)}>
        <Row className="g-1 align-items-end">
          <Form.Group as={Col} controlId="filterDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="search"
              placeholder="Buscar por descripción"
              size="sm"
              {...register("description")}
            />
          </Form.Group>
          <SelectComponentArea register={register} />
          <Form.Group as={Col} sm={"auto"} controlId="filterStartDate">
            <Form.Label>Desde</Form.Label>
            <Form.Control type="date" size="sm" {...register("desde")} />
          </Form.Group>
          <Form.Group as={Col} sm={"auto"} controlId="filterEndDate">
            <Form.Label>Hasta</Form.Label>
            <Form.Control type="date" size="sm" {...register("hasta")} />
          </Form.Group>
          <Col sm={"auto"}>
            <Button
              size="sm"
              type="submit"
              onSubmit={handleSubmit(handleFilter)}
            >
              <i className="bi bi-funnel-fill"></i> Filtrar
            </Button>
          </Col>
          <Col sm={"auto"}>
            <CSVLink
              className="btn btn-success btn-sm"
              role="button"
              data={records}
              headers={headers}
              filename={nameFile}
            >
              <i className="bi bi-file-excel"></i> Exportar
            </CSVLink>
          </Col>
        </Row>
        <Form.Check className="mt-2"// prettier-ignore
        type="switch"
        label="Agregar área 'Otro'"
        {...register('area_otro')}
      />
      </Form>
      <DataTable
        columns={columns}
        data={records}
        pagination
        highlightOnHover
        dense
        theme={theme}
        pointerOnHover
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  );
}

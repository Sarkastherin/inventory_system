import DataTable from "react-data-table-component";
import { supabase } from "../API/client";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useForm } from "react-hook-form";

const columns = [
  {
    name: "Id",
    selector: (row) => row.id_product,
    sortable: true,
    width: "60px",
  },
  {
    name: "Fecha",
    selector: (row) => dayjs(row.date).format("DD/MM/YYYY"),
    sortable: true,
    width: "120px",
  },
  {
    name: "Descripción",
    selector: (row) => row.name_product,
    sortable: true
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
  const { register, handleSubmit } = useForm();
  const [records, setRecords] = useState([]);
  const handleFilter = (data) => {
    console.log(data);
    const fetchProductStockSummary = async () => {
      try {
        const response = await supabase
        .from("view_movimientos")
        .select("*")
        .ilike('name_product',`%${data.description}%`)
        .gte('date', data.desde!='' ? data.desde : '2000-01-01')
        .lte('date', data.hasta!='' ? data.hasta : dayjs(new Date()).format("YYYY-MM-DD"))
        .order('date')
        .limit(1100)
        if (response.error) {
          throw response.error;
        }
        const result = response.data;
        setRecords(result);
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
          
        </Row>
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

import DataTable from "react-data-table-component";
import { supabase } from "../API/client";
import { useState, useEffect } from "react";
import ModalStock from "./ModalStock";
import { Form } from "react-bootstrap";
import ModalLoading from "./ModalLoading";
import ModalSuccess from "./ModalSuccess";


const columns = [
  {
    name: "Id",
    selector: (row) => row.id_product,
    sortable: true,
    width: "60px",
  },
  {
    name: "Descripción",
    selector: (row) => row.name_product,
    sortable: true,
  },
  {
    name: "Stock",
    selector: (row) => row.stock,
    sortable: true,
    width: "80px",
  },
];

export default function DataTableStock({ theme }) {
  
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({});
  const [clearMov, setClearMov] = useState(false);
  const handleClose = () => {
    setClearMov(true);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  /* Modal Loading */
  const [showLoading, setShowLoading] = useState(false);
  const handleCloseLoading = () => setShowLoading(false);
  const handleShowLoading = () => setShowLoading(true)
  /* Modal Success */
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setShowSuccess(false)
  };
  const handleShowSuccess = () => setShowSuccess(true)
  const [records, setRecords] = useState([]);
  const handleSearchValue = (e) => {
    const value = e.target.value;
    const dataFiltered = products.filter((item) =>
      item.name_product.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setRecords(dataFiltered);
  };
  useEffect(() => {
    const fetchProductStockSummary = async () => {
      try {
        const response = await supabase
          .from("product_stock_summary")
          .select("*");
        if (response.error) {
          throw response.error;
        }
        const data = response.data;
        setProducts(data);
        setRecords(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchProductStockSummary();
  }, []);
  const handleChange = (data) => {
    setProduct(data);
    handleShow();
  };
  const paginationComponentOptions = {
    rowsPerPageText: "Productos por página",
    rangeSeparatorText: "de",
  };
  const postData = async (data) => {
    const response = await supabase.from("movimientos").insert(data);
    return response;
  };
  const settingStok = async (value) => {
    handleClose()
    const dataAjuste = {
      id_area: '12',
        type: 'Ajuste',
        id_product: product.id_product,
        quantity: value
    }
    try {
      handleShowLoading()
      const response = await postData(dataAjuste);
      if(response.status >= 200 && response.status <= 299) {
        handleCloseLoading()
        handleShowSuccess()
        
      }
      console.log(response)
    } catch (e) {
      console.log(e);
    }
    console.log(dataAjuste)
  }
  
  return (
    <>
      <Form.Control
        className="mb-3"
        type="search"
        placeholder="Productos por descripción"
        onInput={handleSearchValue}
      />
      <DataTable
        columns={columns}
        data={records}
        pagination
        highlightOnHover
        dense
        theme={theme}
        pointerOnHover
        onRowClicked={handleChange}
        paginationComponentOptions={paginationComponentOptions}
      />
      <ModalStock
        show={show}
        handleClose={handleClose}
        product={product}
        clearMov={clearMov}
        theme={theme}
        settingStok={settingStok}
      />
      <ModalLoading
        showLoading={showLoading}
        theme={theme}
      />
      <ModalSuccess
        showSuccess={showSuccess}
        theme={theme}
        handleCloseSuccess={handleCloseSuccess}
        valueButton={'Refrescat'}
        message={'Refresque para ver los cambios'}
      />
    </>
  );
}

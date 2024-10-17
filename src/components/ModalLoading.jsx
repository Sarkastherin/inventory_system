import Modal from "react-bootstrap/Modal";
import LoadingComponent from "./Loader";

function ModalLoading({ showLoading, theme}) {
  return (
    <Modal show={showLoading} backdrop="static" keyboard={false} className="modal-loading">
      <Modal.Body className="text-center">
        <p className="lead">Procesando requerimiento</p>
        <LoadingComponent fill={theme === "dark" ? "#ddd" : "#444"}/>
      </Modal.Body>
    </Modal>
  );
}
export default ModalLoading;

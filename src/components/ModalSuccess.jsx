import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function ModalSuccess({
  showSuccess,
  handleCloseSuccess,
  valueButton,
  message,
}) {
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(0); // Simula una recarga suave
  };
  return (
    <Modal
      show={showSuccess}
      onHide={handleCloseSuccess}
      backdrop="static"
      keyboard={false}
      className="modal-success"
    >
      <Modal.Header closeButton>
        <Modal.Title>✅ Envío exitoso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Los datos han sido guardados exitosamente</p>
        <div className="text-center">
          <p>{message}</p>
          <Button variant="success" onClick={handleRefresh}>
            {valueButton}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSuccess}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalSuccess;


import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAlert({ show, handleClose, dataForm,onSubmit}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="modal-alert">
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Confirme que desea realizar el siguiente movimiento de stock
        <ul className="mt-2">
            <li><strong>Tipo de movimiento:</strong> {dataForm.type}</li>
            <li><strong>Productos seleccionados: </strong>
                <ul>
                    {dataForm.products && dataForm.products.map((item, index) => (
                        <li key={`confirm-${index}`}><strong>{item.name_product}</strong> <em>Cantidad:</em> <strong>{item.quantity}</strong></li>
                    ))}
                </ul>
            </li>
        </ul>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Dejame pensarlo
        </Button>
        <Button variant="warning" onClick={onSubmit}>Sí, Continuar</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAlert;

import FormMovimientos from "../components/FormMovimientos";
import Container from "react-bootstrap/Container";
export default function Movimientos({theme}) {
  return (
    <Container className="mt-4">
        <h2 className="text-center mb-5">Ingreso de Movimientos</h2>
      <FormMovimientos theme={theme}/>
    </Container>
  );
}

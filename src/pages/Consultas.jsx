import Container from "react-bootstrap/Container";
import DataTableConsulta from "../components/DataTableConsulta";
export default function Consultas({theme}) {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-5">Consultas</h2>
      <DataTableConsulta theme={theme} />
    </Container>
  );
}

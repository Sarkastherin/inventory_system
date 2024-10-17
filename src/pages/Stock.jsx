import Container from "react-bootstrap/Container";
import DataTableStock from "../components/DataTableStock";
export default function Stock({theme}) {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-5">Stock</h2>
      <DataTableStock theme={theme} />
    </Container>
  );
}

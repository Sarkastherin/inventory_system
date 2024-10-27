import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { supabase } from "../API/client";

function Login() {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://sarkastherin.github.io/inventory_system/#", // Asegúrate de que esto esté correcto
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getNameUser = () => {
    console.log(supabase.auth.user());
  };
  return (
    <>
    <div className="text-center mt-5">
      <h2>Bienvenido a </h2>
      <h1 className="text-warning">Gestión de inventarios</h1>
      <p className="lead">Ingresa con tu cuneta de Google</p>

    </div>
      
      <Form
        onSubmit={handleSubmit}
        className="mt-5 mx-auto"
        style={{ maxWidth: "350px" }}
      >
        <Button className="w-100" variant="danger" type="submit">
          <i className="bi bi-google"></i> Entrar con Google
        </Button>
      </Form>
    </>
  );
}

export default Login;

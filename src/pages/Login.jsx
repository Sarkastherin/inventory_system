import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { supabase } from "../API/client";

function Login() {
const [email, setEmail] = useState("")
const handleChange = (e) => {
    setEmail(e.target.value)
}
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                emailRedirectTo: "/inventory_system/"
              }
          })
          console.log(response)
    } catch (error) {
        console.log(error)
    }
}
const getNameUser = () => {
    console.log(supabase.auth.user())
}
  return (
    <Form onSubmit={handleSubmit} className="mt-5 mx-auto" style={{maxWidth: '500px'}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Correo electronio</Form.Label>
        <Form.Control onChange={handleChange} type="email" placeholder="name@example.com" />
      </Form.Group>
      <Col>
        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
}

export default Login;

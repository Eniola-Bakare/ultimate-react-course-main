import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import CabinTable from "../cabins/CabinTable";

function LoginForm() {
  const { login, isLogingIn } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div
        style={{
          height: "50dvh",

          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label htmlFor="email">Email address</label>
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            disabled={isLogingIn}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isLogingIn}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button disabled={isLogingIn} size="large">
          {!isLogingIn ? "Login" : <SpinnerMini />}
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;

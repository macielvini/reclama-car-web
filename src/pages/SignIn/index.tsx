import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignForm from "../../components/Form/SignForm";
import Input from "../../components/Form/Input";
import Container from "../../components/Container";

import { authApi } from "../../services/api/authApi";

import illustration from "../../assets/illustrations/online-review-rafiki.svg";
import logo from "../../assets/LOGO.svg";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function formSubmit(e: FormEvent) {
    e.preventDefault();

    await authApi.signIn({ email, password });
    setEmail("");
    setPassword("");
    navigate("/");
  }

  return (
    <>
      <Container>
        <img src={logo} alt="imagem do logo" className="h-7" />
        <SignForm
          onSubmit={formSubmit}
          button="Cadastrar"
          title="Entrar na minha conta"
          imagePath={illustration}
          redirect={{
            path: "/sign-up",
            text: "Não tem uma conta? Crie agora!",
          }}
        >
          <Input
            required
            setState={setEmail}
            value={email}
            type="text"
            placeholder="E-mail"
          />
          <Input
            required
            setState={setPassword}
            value={password}
            type="password"
            placeholder="Senha"
            minLength={6}
          />
        </SignForm>
      </Container>
    </>
  );
};

export default SignIn;

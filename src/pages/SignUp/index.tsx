import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponseError } from "../../protocols";

import SignForm from "../../components/Form/SignForm";
import Input from "../../components/Form/Input";
import Container from "../../components/Container";

import { authApi } from "../../services/api/authApi";

import illustration from "../../assets/illustrations/mobile-login-rafiki.svg";
import logo from "../../assets/LOGO.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [image, setImage] = useState<string>("");

  async function formSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await authApi.signUp({ email, image, name, password });
      navigate("/");
    } catch (error) {
      const apiError = error as ApiResponseError;
      if (apiError.response.data) {
        console.log(apiError.response.data);
      }

      console.log(apiError.response.status);
    }
  }

  return (
    <>
      <Container>
        <img src={logo} alt="imagem do logo" className="h-7" />
        <SignForm
          onSubmit={formSubmit}
          button="Cadastrar"
          title="Criar minha conta"
          imagePath={illustration}
          redirect={{ path: "/sign-in", text: "Já tem uma conta? Fazer login" }}
        >
          <Input
            required
            setState={setName}
            value={name}
            type="text"
            placeholder="Nome"
          />
          <Input
            required
            setState={setImage}
            value={image}
            type="url"
            placeholder="URL da imagem de perfil"
          />
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
          <Input
            required
            setState={setConfirmPassword}
            value={confirmPassword}
            type="password"
            placeholder="Confirmar senha"
            minLength={6}
            error={
              password != confirmPassword
                ? "As senhas devem ser iguais!"
                : undefined
            }
          />
        </SignForm>
      </Container>
    </>
  );
};

export default SignUp;

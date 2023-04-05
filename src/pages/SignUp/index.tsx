import { FormEvent, useState } from "react";
import logo from "../../assets/LOGO.svg";
import illustration from "../../assets/illustrations/online-review-rafiki.svg";
import SignForm from "../../components/Form/SignForm";
import Input from "../../components/Form/Input";
import Container from "../../components/Container";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function formSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("form submitted");
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
          redirect={{ path: "/", text: "Já tem uma conta? Fazer login" }}
        >
          <Input
            setState={setName}
            value={name}
            type="text"
            placeholder="Nome"
          />
          <Input
            setState={setName}
            value={name}
            type="url"
            placeholder="URL da imagem de perfil"
          />
          <Input
            setState={setEmail}
            value={email}
            type="text"
            placeholder="E-mail"
          />
          <Input
            setState={setPassword}
            value={password}
            type="password"
            placeholder="Senha"
          />
          <Input
            setState={setConfirmPassword}
            value={confirmPassword}
            type="password"
            placeholder="Confirmar senha"
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

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignForm from "../../components/Form/SignForm";
import Input from "../../components/Form/Input";
import Container from "../../components/Container";

import illustration from "../../assets/illustrations/online-review-rafiki.svg";
import logo from "../../assets/LOGO.svg";
import { useAuth } from "../../hooks/useAuth";
import { IconArrowLeft } from "@tabler/icons-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function formSubmit(e: FormEvent) {
    e.preventDefault();

    await signIn({ email, password });
    setEmail("");
    setPassword("");
    navigate("/");
  }

  return (
    <>
      <div className="flex flex-col gap-no-relation bg-background px-body-padding pb-14 pt-8 leading-tight text-text-dark antialiased">
        <IconArrowLeft size={30} onClick={() => navigate("/")} />
        <img src={logo} alt="imagem do logo" className="h-7" />
        <SignForm
          onSubmit={formSubmit}
          button="Entrar"
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
      </div>
    </>
  );
};

export default SignIn;

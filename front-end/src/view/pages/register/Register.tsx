import { Link } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useRegister from "./use-Register";

export default function Register() {
  const { nameRef, emailRef, passwordRef, confirmPasswordRef, handleRegister } =
    useRegister();

    document.title = "Registro"

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        method="POST"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md mx-auto flex items-center 
							justify-center flex-col gap-4 p-5"
      >
        <div className="text-center mb-2">
          <h1 className="font-inter font-semibold text-3xl tracking-wide text-white mb-3">
            Faça seu cadastro
          </h1>
          <p className="text-white font-normal">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-primary-color hover:text-primary-color-hover transition-colors duration-150 ease-linear"
            >
              Faça Login
            </Link>
          </p>
        </div>

        <Input ref={nameRef} placeholder="Nome" type="text" />
        <Input ref={emailRef} placeholder="E-mail" type="e-mail" />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input ref={passwordRef} placeholder="Senha" type="password" />
          <Input
            ref={confirmPasswordRef}
            placeholder="Confirmar senha"
            type="password"
          />
        </div>
        <div className="w-full flex justify-center sm:justify-end">
          <Button
            type="button"
            name="Cadastrar"
            icon="register"
            onClick={handleRegister}
          />
        </div>
      </form>
    </div>
  );
}

import { Link } from "react-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useLogin from "./use-Login";

export default function Login() {
  const { emailRef, passwordRef, handleLogin } = useLogin();

  document.title = "Login"

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <form className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md mx-auto flex flex-col items-center justify-center gap-3 p-4">
          <div className="text-center mb-2">
            <h1 className="text-white tracking-wide text-3xl font-inter font-semibold mb-3">
              Acesse sua conta
            </h1>
            <p className="text-color-font font-normal">
              Não tem conta?{" "}
              <Link
                to="/register"
                className="text-primary-color hover:text-primary-color-hover transition-colors duration-150 ease-linear"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
          <Input ref={emailRef} placeholder="E-mail" type="e-mail" />
          <Input ref={passwordRef} placeholder="Senha" type="password" />
          <div className="w-full flex justify-end ">
            <Button
              type="button"
              name="Entrar"
              icon="login"
              onClick={handleLogin}
            />
          </div>
        </form>
      </div>
    </>
  );
}

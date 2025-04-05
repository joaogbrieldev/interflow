import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { api } from "../../../api/baseRequest";
import useAuth from "../../../hooks/useAuth";

enum STATUS_CODE {
  OK = 200,
}

export default function useLogin() {
  const { handleSetLoggedUserInfo } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleLogin(): Promise<void> {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await api.post("sign-in", {
        email,
        password,
      });
      if (response.status === STATUS_CODE.OK) {
        localStorage.setItem("token", response.data.data.token);
        const { id, name, email } = response.data.data.user;
        handleSetLoggedUserInfo({ id, name, email });
        localStorage.setItem("userName", name);

        toast.success("Bem vindo!");
        navigate("/dashboard");
        return;
      }

      toast.error("Erro no login. Por favor, tente novamente");
    } catch (error) {
      toast.error("Erro no login. Por favor, tente novamente");
      console.error(error);
    }
  }

  return {
    emailRef,
    passwordRef,
    handleLogin,
  };
}

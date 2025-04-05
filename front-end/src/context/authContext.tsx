import { createContext, ReactNode, useState } from "react";

interface PropsAuthContextProvider {
  children: ReactNode;
}

interface Loggeduser {
  id: string;
  name: string;
  email: string;
}

interface LoggeduserUserContext {
  loggedUserInfo: Loggeduser;
  handleSetLoggedUserInfo: (userInfo: Loggeduser) => void;
  handleGetLoggedUserInfo: () => Loggeduser;
}

export const AuthContext = createContext({} as LoggeduserUserContext);

export default function AuthContextProvider({
  children,
}: PropsAuthContextProvider) {
  const [loggedUserInfo, setLoggedUserInfo] = useState<Loggeduser>(
    {} as Loggeduser
  );

  function handleSetLoggedUserInfo(userInfo: Loggeduser): void {
    setLoggedUserInfo(userInfo);
  }

  function handleGetLoggedUserInfo(): Loggeduser {
    return loggedUserInfo;
  }

  return (
    <AuthContext.Provider
      value={{
        handleSetLoggedUserInfo,
        handleGetLoggedUserInfo,
        loggedUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

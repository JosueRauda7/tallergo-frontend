import { createContext, useState } from "react";
import { useNavigation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export interface LoginContextType {
  isLoggedIn: boolean;
  user: null | { id: string; name: string };
  userType: null | string;
  login: () => void;
  logout: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  user: null,
  userType: null,
  login: () => {},
  logout: () => {},
});

export const LoginContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<null | { id: string; name: string }>(null);
  const [userType, setUserType] = useState<null | string>(null);

  const login = () => {
    setIsLoggedIn(true);
    setUser({ id: "123", name: "John Doe" }); // Example user data
    setUserType("admin"); // Example user type
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserType(null);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, user, userType, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
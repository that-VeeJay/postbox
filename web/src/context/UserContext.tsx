import { createContext, useEffect, useState, type ReactNode } from "react";

type UserContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
  user: {},
  setUser: () => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<string | null>(null);

  // get authenticated and authorized user
  const getUser = async () => {
    const response = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setUser(data);
  };

  // run if token state changes
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

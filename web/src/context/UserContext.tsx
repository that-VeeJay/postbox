import { createContext, useEffect, useState, type ReactNode } from "react";

type UserContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
};

export const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
  user: {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState(null);

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
    <UserContext.Provider value={{ token, setToken, user }}>
      {children}
    </UserContext.Provider>
  );
}

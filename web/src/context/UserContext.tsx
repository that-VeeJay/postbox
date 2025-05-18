import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect, type ReactNode } from "react";

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
  const fetchUser = async () => {
    const response = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error fetching the data");
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

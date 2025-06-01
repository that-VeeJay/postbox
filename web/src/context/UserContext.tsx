import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

type UserContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<any>(null);

  const { data } = useQuery({
    queryKey: ["user", token],
    queryFn: async () => {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error fetching user");
      return response.json();
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  // ✅ Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ token, setToken, user, setUser }),
    [token, user],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

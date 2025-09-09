import { createContext, useContext, useState, type ReactNode } from "react";
import { USERS, type User } from "./consts";

type UserContextType = {
  users: User[];
  user: User;
  selectUser: (id: User["id"]) => void;
};
const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children?: ReactNode;
};
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(USERS[0]);

  const handleSelectUser = (id: number) => {
    setUser((state) => {
      const newUser = USERS.find((user) => user.id === id);

      if (!newUser) return state;

      return newUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        users: USERS,
        user,
        selectUser: handleSelectUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);

  if (!context) throw new Error("UserContext was not provided");

  return context;
}

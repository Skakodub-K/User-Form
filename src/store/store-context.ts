import { createContext, useContext } from "react";
import UserStore from "./store";

export const UserStoreContext = createContext<UserStore | null>(null)
export const useStore = () => {
  const context = useContext(UserStoreContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with TaskStoreContext"
    );
  }
  return context;
};
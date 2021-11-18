import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/users/checkUser");
      if (!data.user) {
        setUser("");
        return;
      }
      console.log("Checking");
      setUser(data.user);
    })();
  }, [location]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [UserToken, setUserToken] = useState(localStorage.getItem("userToken")); //local stotage is in the userToken, when the usertoken changed the use effect will run
  const [userName, setUserName] = useState(null);

  const getUserData = () => {
    if (UserToken != null) {
      //if the userToken is not empty, return .. / if the userToken null so the user is not logged in
      const decoded = jwtDecode(UserToken); // jwt decode is a library to decode the usertoken
     console.log(decoded.userName);
      setUserName(decoded);
    }
  };

  useEffect(() => {
   getUserData();
  }, [UserToken]); // the userToken will work as whats between brackets, the useEfect will run when the project run, and when the userToken changed

  return (
    <UserContext.Provider
      value={{
        UserToken,
        setUserToken,
        getUserData,
        userName,
        setUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

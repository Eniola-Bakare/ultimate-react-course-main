import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducerFunc(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payLoad,
        isAuthenticated: true,
      };
    case "logOut":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducerFunc,
    initialState
  );

  function loginFunc(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payLoad: FAKE_USER });
      console.log("You successfully logged in");
    }
  }
  function logout() {
    console.log("You logged out");
    dispatch({ type: "logOut" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginFunc, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const values = useContext(AuthContext);
  if (values === undefined)
    throw new Error("Context has been used outside of the context provider");
  return values;
}

export { AuthProvider, useAuthContext };

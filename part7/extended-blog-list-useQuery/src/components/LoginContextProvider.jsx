import { createContext, useContext, useReducer } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state, action) => {
  switch (action.type) {
  case "LOGIN":
    return action.payload;
  case "LOGOUT":
    return null;
  }
};

const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(loginReducer, null);

  return (
    <LoginContext.Provider value={[user, dispatchUser]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export const useLoginValue = () => {
  const loginAndSet = useContext(LoginContext);
  return loginAndSet[0];
};

export const useLoginDispatch = () => {
  const loginAndSet = useContext(LoginContext);
  return loginAndSet[1];
};

export const logIn = async (dispatch, credentials) => {
  try {
    const user = await loginService.login(credentials);

    dispatch({
      type: "LOGIN",
      payload: user,
    });

    window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
    await blogService.setToken(user.token);

    return true

  } catch (e) {
    return e.response.data.error;
  }
};

export const logOut = (dispatch) => {
  window.localStorage.removeItem("loggedBlogUser");
  dispatch({
    type: "LOGOUT",
  });
};

export const setLoggedInUser = async (dispatch, loggedUser) => {
  await blogService.setToken(loggedUser.token);
  dispatch({
    type: "LOGIN",
    payload: loggedUser,
  });
};

export default LoginContextProvider;

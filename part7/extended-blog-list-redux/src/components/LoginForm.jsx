import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userCredentials = {
      username,
      password,
    };

    dispatch(logIn(userCredentials));

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <fieldset style={styles.fieldset}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-testid="username"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-testid="password"
          />
          <br />
          <button type="submit">Log in</button>
        </fieldset>
      </form>
    </>
  );
};

const styles = {
  fieldset: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
};

export default LoginForm;

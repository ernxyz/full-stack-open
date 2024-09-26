import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import { useLoginValue } from "./LoginContextProvider";

const TogglableLoginForm = () => {
  const user = useLoginValue();

  if (!user) {
    return (
      <Togglable btnLabel="Login">
        <LoginForm />
      </Togglable>
    );
  }
};

export default TogglableLoginForm;

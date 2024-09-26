import Togglable from "./Togglable";
import LoginForm from "./LoginForm";

const TogglableLoginForm = ({ user }) => {
  if (!user) {
    return (
      <Togglable btnLabel="Login">
        <LoginForm />
      </Togglable>
    );
  }
};

export default TogglableLoginForm;

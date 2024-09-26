import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../reducers/userReducer";

const Greeting = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
  };

  if (!user) {
    return;
  }

  return (
    <p>
      Hey welcome, {user.name} <button onClick={logout}>Logout</button>
    </p>
  );
};

export default Greeting;

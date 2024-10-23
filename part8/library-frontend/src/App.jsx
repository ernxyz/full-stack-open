import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommended from "./components/Recommended";

const App = () => {

  const navigate = useNavigate()
  const client = useApolloClient()

  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("library-user-token")

    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const styles = {
    navStyle: {
      marginLeft: 5,
    },
    container: {
      marginTop: 15,
    },
  }

  return (
    <div>
      <div>
        <button style={styles.navStyle} onClick={() => navigate("/")}>authors</button>
        <button style={styles.navStyle} onClick={() => navigate("/books")}>books</button>

        {token &&
          <>
            <button style={styles.navStyle} onClick={() => navigate("/recommended")}>recommended</button>
            <button style={styles.navStyle} onClick={() => navigate("/newbook")}>add book</button>
          </>
        }
        {!token 
          ? <button style={styles.navStyle} onClick={() => navigate("/login")}>login</button>
          : <button style={styles.navStyle} onClick={logout}>logout</button>
        }
      </div>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Authors token={token} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/newbook" element={<NewBook />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

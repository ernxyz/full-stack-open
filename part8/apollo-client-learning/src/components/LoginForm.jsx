import { useState, useEffect } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value

      setToken(token)

      localStorage.setItem("phonenumbers-user-token", token)
    }
  }, [result.data])

  const submit = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })

    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username: <br />
          <input 
            value={username}
            onChange={({ target }) => {setUsername(target.value)}}
          />
        </div>
        <div>
          password: <br />
            <input 
            type="password"
              value={password}
              onChange={({ target }) => {setPassword(target.value)}}
            />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
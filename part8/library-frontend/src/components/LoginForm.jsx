import { useEffect, useState } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setToken }) => {

  const navigate = useNavigate()

  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value

      setToken(token)

      localStorage.setItem("library-user-token", token)

      navigate("/")
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
      <form onSubmit={submit}>
        <div>
          username <br />
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <br />
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
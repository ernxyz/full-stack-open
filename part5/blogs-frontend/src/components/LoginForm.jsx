import PropTypes from "prop-types"

const LoginForm = ({
  handleSubmit,
  handleUsername,
  handlePassword,
  username,
  password
}) => {

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
            onChange={handleUsername}
            data-testid="username"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
            data-testid="password"
          />
          <br />
          <button type="submit">Log in</button>
        </fieldset>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

const styles = {
  "fieldset": {
    "display": "flex",
    "flexDirection": "column",
    "width": "300px"
  },
}

export default LoginForm
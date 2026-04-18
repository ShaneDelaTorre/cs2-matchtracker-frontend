export default function Login() {
  return (
    <>
      <div className="form-container">
        <div className="form-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>
        <form action="" className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="leon_kennedy"/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </form>
        <p className="sign-up-">No account? Sign up</p>
      </div>
    </>
  );
}

export default function Signup() {
  return (
    <>
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create account</h1>
          <p>Start tracking your matches</p>
        </div>
        <form action="" className="signup-form">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="leon_kennedy"/>
          <br />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <br />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" id="confirm-password" />
        </form>
      </div>
    </>
  );
}

import Link from "next/link"
import styles from "../auth.module.css"

export default function SignupPage() {
  return (
    <>
      <div className={styles.logo}>
        <span className={styles.logoDot} />
        CS2 Tracker
      </div>
      <h1 className={styles.title}>Create account</h1>
      <p className={styles.subtitle}>Start tracking your matches</p>
      <form className={styles.form} >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">Username</label>
          <input className={styles.input} type="text" id="username" name="username" placeholder="leon_kennedy" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} type="email" id="email" name="email" placeholder="leon@gmail.com" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input className={styles.input} type="password" id="password" name="password" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="confirm-password">Confirm password</label>
          <input className={styles.input} type="password" id="confirm-password" name="confirm-password" />
        </div>
        <button className={styles.submitBtn} type="submit">Create account</button>
      </form>
      <p className={styles.footer}>
        Have an account?{" "}
        <Link href="/login" className={styles.footerLink}>Sign in</Link>
      </p>
    </>
  )
}
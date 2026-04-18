import Link from "next/link"
import styles from "../auth.module.css"

export default function LoginPage() {
  return (
    <>
      <div className={styles.logo}>
        <span className={styles.logoDot} />
        CS2 Tracker
      </div>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Sign in to your account</p>
      <form className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">Username</label>
          <input className={styles.input} type="text" id="username" name="username" placeholder="leon_kennedy" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input className={styles.input} type="password" id="password" name="password" />
        </div>
        <button className={styles.submitBtn} type="submit">Sign in</button>
      </form>
      <p className={styles.footer}>
        No account?{" "}
        <Link href="/signup" className={styles.footerLink}>Sign up</Link>
      </p>
    </>
  )
}
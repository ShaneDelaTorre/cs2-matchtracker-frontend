"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import styles from "../auth.module.css"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const form = e.currentTarget
    const username = (
      form.elements.namedItem("username") as HTMLInputElement
    ).value
    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value
    try {
      await login(username, password)
      router.push("/dashboard")
    } catch {
      setError("Invalid username or password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.logo}>
        <span className={styles.logoDot} />
        CS2 Tracker
      </div>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Sign in to your account</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            placeholder="leon_kennedy"
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className={styles.footer}>
        No account?{" "}
        <Link href="/signup" className={styles.footerLink}>
          Sign up
        </Link>
      </p>
    </>
  )
}
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { apiRequest } from "@/lib/api"
import styles from "../auth.module.css"

const RANK_CHOICES = [
  { value: "Unranked", label: "Unranked" },
  { value: "Below 5000", label: "Below 5000" },
  { value: "5000-9999", label: "5000 – 9999" },
  { value: "10000-14999", label: "10000 – 14999" },
  { value: "15000-19999", label: "15000 – 19999" },
  { value: "20000-24999", label: "20000 – 24999" },
  { value: "25000-29999", label: "25000 – 29999" },
  { value: "30000+", label: "30000+" },
]

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const form = e.currentTarget
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value

    try {
      await apiRequest("/auth/register/", {
        method: "POST",
        body: {
          username: getValue("username"),
          email: getValue("email"),
          rank: getValue("rank"),
          password: getValue("password"),
          password_confirm: getValue("confirm-password"),
        },
        requiresAuth: false,
      })


      router.push("/login")
    } catch (err: unknown) {
      console.log(err)
      setError(err instanceof Error ? err.message : "Registration failed.")
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
      <h1 className={styles.title}>Create account</h1>
      <p className={styles.subtitle}>Start tracking your matches</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">Username</label>
          <input className={styles.input} type="text" id="username" name="username" placeholder="leon_kennedy" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} type="email" id="email" name="email" placeholder="leon@gmail.com" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="rank">Rank</label>
          <select className={styles.input} id="rank" name="rank" required>
            <option value="">Select your rank...</option>
            {RANK_CHOICES.map((rank) => (
              <option key={rank.value} value={rank.value}>
                {rank.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input className={styles.input} type="password" id="password" name="password" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="confirm-password">Confirm password</label>
          <input className={styles.input} type="password" id="confirm-password" name="confirm-password" required />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className={styles.footer}>
        Have an account?{" "}
        <Link href="/login" className={styles.footerLink}>Sign in</Link>
      </p>
    </>
  )
}
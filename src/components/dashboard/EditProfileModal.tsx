"use client"
import { useState } from "react"
import { User } from "@/types"
import { apiRequest } from "@/lib/api"
import styles from "./EditProfileModal.module.css"

type Props = {
  user: User
  onClose: () => void
  onSuccess: (updatedUser: User) => void
}

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

export default function EditProfileModal({ user, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [changePassword, setChangePassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const form = e.currentTarget
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value

    const body: Record<string, string> = {
      username: getValue("username"),
      email: getValue("email"),
      rank: getValue("rank"),
      password: "",
      password_confirm: ""
    }

    if (changePassword) {
      const password = getValue("password")
      const password_confirm = getValue("password_confirm")
      if (password) {
        body.password = password
        body.password_confirm = password_confirm
      }
    }

    try {
      const updated = await apiRequest<User>(
        "/users/me/", 
        { method: "PATCH", body }
      )
      onSuccess(updated)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit profile</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              name="username"
              defaultValue={user.username}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="rank">Rank</label>
            <select
              className={styles.input}
              id="rank"
              name="rank"
              defaultValue={user.rank}
              required
            >
              {RANK_CHOICES.map((rank) => (
                <option key={rank.value} value={rank.value}>
                  {rank.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.passwordToggleRow}>
            <span className={styles.label}>Password</span>
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setChangePassword((prev) => !prev)}
            >
              {changePassword ? "Cancel password change" : "Change password"}
            </button>
          </div>

          {changePassword && (
            <div className={styles.passwordFields}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  New password
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password_confirm">
                  Confirm new password
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  required
                />
              </div>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
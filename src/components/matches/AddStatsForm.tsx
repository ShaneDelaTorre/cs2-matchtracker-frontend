"use client"
import { useState } from "react"
import { apiRequest } from "@/lib/api"
import styles from "./AddStatsForm.module.css"

type Props = {
  matchId: number
  onSuccess: () => void
}

const STAT_FIELDS = [
  { name: "kills", label: "Kills" },
  { name: "deaths", label: "Deaths" },
  { name: "assists", label: "Assists" },
  { name: "mvp_rounds", label: "MVP rounds" },
  { name: "score", label: "Score" },
]

export default function AddStatsForm({ matchId, onSuccess }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const getValue = (name: string) =>
      Number((form.elements.namedItem(name) as HTMLInputElement).value)

    try {
      await apiRequest("/match-stats/", {
        method: "POST",
        body: {
          match: matchId,
          kills: getValue("kills"),
          deaths: getValue("deaths"),
          assists: getValue("assists"),
          mvp_rounds: getValue("mvp_rounds"),
          score: getValue("score"),
        },
      })
      onSuccess()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save stats.")
    } finally {
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No stats logged for this match yet.</p>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          + Add match stats
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {STAT_FIELDS.map((field) => (
          <div key={field.name} className={styles.field}>
            <label className={styles.label}>{field.label}</label>
            <input
              className={styles.input}
              type="number"
              name={field.name}
              min="0"
              defaultValue="0"
              required
            />
          </div>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save stats"}
        </button>
      </div>
    </form>
  )
}
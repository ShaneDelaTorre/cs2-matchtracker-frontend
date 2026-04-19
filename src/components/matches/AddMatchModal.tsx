"use client"
import { useState, useEffect } from "react"
import { Map } from "@/types"
import { apiRequest } from "@/lib/api"
import styles from "./AddMatchModal.module.css"

type Props = {
  onClose: () => void
  onSuccess: () => void
}

export default function AddMatchModal({ onClose, onSuccess }: Props) {
  const [maps, setMaps] = useState<Map[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    apiRequest<Map[]>("/maps/").then(setMaps)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const form = e.currentTarget
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value
    console.log(getValue("map_played"))
    console.log(maps)
    try {
      await apiRequest("/user-matches/", {
        method: "POST",
        body: {
          map_played: Number(getValue("map_played")),
          result: getValue("result"),
          team_score: Number(getValue("team_score")),
          opponent_score: Number(getValue("opponent_score")),
        },
      })
      onSuccess()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add match.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Log a match</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Map</label>
            <select className={styles.input} name="map_played" required>
              <option value="">Select a map...</option>
              {maps.map((map) => (
                <option key={map.id} value={map.id}>
                  {map.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Result</label>
            <select className={styles.input} name="result" required>
              <option value="">Select result...</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="Draw">Draw</option>
            </select>
          </div>
          <div className={styles.scoreRow}>
            <div className={styles.field}>
              <label className={styles.label}>Your score</label>
              <input
                className={styles.input}
                type="number"
                name="team_score"
                min="0"
                max="13"
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Opponent score</label>
              <input
                className={styles.input}
                type="number"
                name="opponent_score"
                min="0"
                max="13"
                required
              />
            </div>
          </div>
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
              {loading ? "Saving..." : "Save match"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
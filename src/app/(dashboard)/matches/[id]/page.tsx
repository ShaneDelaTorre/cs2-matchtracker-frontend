"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { MatchDetail, UserMatchStat } from "@/types"
import { apiRequest } from "@/lib/api"
import AddStatsForm from "@/components/matches/AddStatsForm"
import styles from "./page.module.css"

export default function MatchDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [match, setMatch] = useState<MatchDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMatch = useCallback(async () => {
    const data = await apiRequest<MatchDetail>(
      `/user-matches/${id}/` 
    )
    setMatch(data)
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchMatch()
  }, [fetchMatch])

  async function handleDelete() {
    if (!confirm("Delete this match? This cannot be undone.")) return
    await apiRequest(`/user-matches/${id}/`, { method: "DELETE" })
    router.push("/matches")
  }

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
      </div>
    )
  }

  if (!match) return <p>Match not found.</p>

  const formattedDate = new Date(match.date_played).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )

  const hasStats = match.user_stats.length > 0
  const stats: UserMatchStat | undefined = match.user_stats[0]

  const kd =
    stats && stats.deaths > 0
      ? (stats.kills / stats.deaths).toFixed(2)
      : stats?.kills ?? 0

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => router.push("/matches")}>
        ← Back to matches
      </button>

      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{match.map_name}</h1>
            <span
              className={`${styles.badge} ${styles[match.result.toLowerCase()]}`}
            >
              {match.result}
            </span>
          </div>
          <p className={styles.meta}>
            {formattedDate} · {match.team_score} – {match.opponent_score}
          </p>
        </div>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          Delete match
        </button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Match stats</h2>
        {!hasStats ? (
          <AddStatsForm matchId={Number(id)} onSuccess={fetchMatch} />
        ) : (
          <>
            <div className={styles.statsGrid}>
              {[
                { label: "Kills", value: stats.kills },
                { label: "Deaths", value: stats.deaths },
                { label: "Assists", value: stats.assists },
                { label: "K/D", value: kd },
                { label: "Score", value: stats.score },
                { label: "MVP rounds", value: stats.mvp_rounds },
              ].map((s) => (
                <div key={s.label} className={styles.statCell}>
                  <p className={styles.statLabel}>{s.label}</p>
                  <p className={styles.statValue}>{s.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
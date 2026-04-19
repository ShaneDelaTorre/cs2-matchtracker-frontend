"use client"
import { useRouter } from "next/navigation"
import { Match } from "@/types"
import styles from "./MatchRow.module.css"

type Props = {
  match: Match
}

export default function MatchRow({ match }: Props) {
  const router = useRouter()

  const formattedDate = new Date(match.date_played).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  )

  return (
    <div
      className={styles.row}
      onClick={() => router.push(`/matches/${match.id}`)}
    >
      <div className={`${styles.result} ${styles[match.result.toLowerCase()]}`}>
        {match.result[0]}
      </div>
      <div className={styles.info}>
        <p className={styles.map}>{match.map_name}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <div className={styles.score}>
        {match.team_score} – {match.opponent_score}
      </div>
      <span className={styles.chevron}>›</span>
    </div>
  )
}
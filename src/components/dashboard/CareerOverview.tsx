"use client"
import { CareerOverview } from "@/types"
import styles from "./CareerOverview.module.css"

type Props = {
  careerOverview: CareerOverview | null
}

export default function CareerOverviewComponent({ careerOverview }: Props) {
  if (!careerOverview) return <div className={styles.skeleton} />

  const stats = [
    { label: "Total matches", value: careerOverview.totalMatches },
    { label: "Win rate", value: `${Math.round(careerOverview.win_rate)}%` },
    { label: "K/D ratio", value: careerOverview.kill_death_ratio.toFixed(2) },
  ]

  return (
    <section>
      <h2 className={styles.heading}>Career overview</h2>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.card}>
            <p className={styles.label}>{stat.label}</p>
            <p className={styles.value}>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
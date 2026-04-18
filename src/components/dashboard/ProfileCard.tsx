"use client"
import { User } from "@/types"
import styles from "./ProfileCard.module.css"

type Props = {
  user: User | null
}

export default function ProfileCard({ user }: Props) {
  if (!user) return <div className={styles.skeleton} />

  const initials = user.username
    .split("_")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const formattedDate = new Date(user.date_joined).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.avatar}>{initials}</div>
        <div>
          <p className={styles.username}>{user.username}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.meta}>
          <span className={styles.rankBadge}>{user.rank}</span>
          <span className={styles.since}>Member since {formattedDate}</span>
        </div>
        <button className={styles.editBtn}>Edit profile</button>
      </div>
    </div>
  )
}
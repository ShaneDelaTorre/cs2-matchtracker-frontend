"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>
            <span className={styles.logoDot} />
            CS2 Tracker
          </span>
          <div className={styles.links}>
            <Link
              href="/dashboard"
              className={`${styles.link} ${pathname === "/dashboard" ? styles.active : ""}`}
            >
              Dashboard
            </Link>
            <Link
              href="/matches"
              className={`${styles.link} ${pathname === "/matches" ? styles.active : ""}`}
            >
              Matches
            </Link>
          </div>
        </div>
        <button className={styles.logout}>Log out</button>
      </div>
    </nav>
  )
}
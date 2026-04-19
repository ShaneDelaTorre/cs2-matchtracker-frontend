"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push("/login")
  }

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
        <div className={styles.right}>
          {user && <span className={styles.username}>{user.username}</span>}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}
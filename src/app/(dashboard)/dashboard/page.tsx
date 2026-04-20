"use client"
import { useState, useEffect } from "react"
import { CareerStats, MapWinRate } from "@/types"
import { useAuth } from "@/context/AuthContext"
import { apiRequest } from "@/lib/api"
import ProfileCard from "@/components/dashboard/ProfileCard"
import CareerOverviewComponent from "@/components/dashboard/CareerOverview"
import WinRateByMap from "@/components/dashboard/WinRateByMap"
import styles from "./page.module.css"

export default function DashboardPage() {
  const { user, updateUser } = useAuth()
  const [careerStats, setCareerStats] = useState<CareerStats | null>(null)

  useEffect(() => {
    if(!user) return

    async function fetchStats() {
      const data = await apiRequest<CareerStats>(`/user-stats-summary/${user?.id}`)
      setCareerStats(data)
    }
    fetchStats()
  }, [user])

  const mapWinRates: MapWinRate[] = Object.entries(
    careerStats?.win_rate_by_map ?? {}
  ).map(([mapName, winRate]) => ({ mapName, winRate }))

  const careerOverview = careerStats
    ? {
        totalMatches: careerStats.total_matches,
        kill_death_ratio: careerStats.kill_death_ratio,
        win_rate: careerStats.win_rate,
      }
    : null

  return (
    <div className={styles.page}>
      <ProfileCard user={user} onUserUpdate={updateUser}/>
      <CareerOverviewComponent careerOverview={careerOverview} />
      <WinRateByMap maps={mapWinRates} />
    </div>
  )
}
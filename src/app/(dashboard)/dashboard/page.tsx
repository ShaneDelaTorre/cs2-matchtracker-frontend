"use client"
import { useState } from "react";
import { User, CareerStats, MapWinRate } from "@/types";
import ProfileCard from "@/components/dashboard/ProfileCard";
import CareerOverviewComponent from "@/components/dashboard/CareerOverview";
import WinRateByMapComponent from "@/components/dashboard/WinRateByMap";
import styles from "./page.module.css"


export default function Dashboard() {
  const [user, setUser] = useState<User | null>({
    id: 1,
    username: 'Leon_Kennedy',
    email: "leon@gmail.com",
    rank: "Unranked",
    date_joined: "2026-04-07T06:57:04.996732Z"
  });

  const [careerStats, setCareerStats] = useState< CareerStats| null>({
    id: 1,
    total_matches: 14,
    kill_death_ratio: 1.27,
    win_rate: 85.71,
    win_rate_by_map: {
      "Dust II": 100.0,
      "Vertigo": 50.0,
      "Office": 0.0,
      "Cache": 100.0,
      "Nuke": 100.0,
      "Cobblestone": 100.0,
      "Canals": 100.0,
    },
    favorite_weapon: "AK-47"
  })

  const win_rate_by_map: MapWinRate[] = Object.entries(careerStats?.win_rate_by_map ?? {}).map(([mapName, winRate] : [string, number]) => ({
    mapName,
    winRate,
  }))

  const careerOverview = careerStats ? {
    totalMatches: careerStats.total_matches,
    kill_death_ratio: careerStats.kill_death_ratio,
    win_rate: careerStats.win_rate
  } : null

  return (
    <section className="dashboard-container">
      <ProfileCard user={user}/>
      <CareerOverviewComponent careerOverview={careerOverview} />
      <WinRateByMapComponent maps={win_rate_by_map}/>
    </section>
  );
}

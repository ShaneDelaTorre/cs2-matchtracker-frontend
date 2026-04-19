import { MapWinRate } from "@/types"
import styles from "./WinRateByMap.module.css"

type Props = {
  maps: MapWinRate[]
}

export default function WinRateByMap({ maps }: Props) {
  if (!maps.length) return null

  return (
    <section>
      <h2 className={styles.heading}>Win rate by map</h2>
      <div className={styles.container}>
        {maps.map((map) => (
          <div key={map.mapName} className={styles.row}>
            <span className={styles.label}>{map.mapName}</span>
            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{ width: `${map.winRate}%` }}
              />
            </div>
            <span className={styles.pct}>{Math.round(map.winRate)}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
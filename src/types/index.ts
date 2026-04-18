export type User = {
  id: number
  username: string
  email: string
  rank: string
  date_joined: string
}

export type Map = {
  id: number
  name: string
}

export type Weapon = {
  id: number
  name: string
  weapon_type: string
}

export type WeaponStat = {
  id: number
  weapon: number       // FK id
  weapon_name: string  // from WeaponStatViewSerializer
  kills: number
}

export type UserMatchStat = {
  id: number
  kills: number
  deaths: number
  assists: number
  mvp_rounds: number
  score: number
  weapon_stats: WeaponStat[]
}

export type Match = {
  id: number
  map_played: number   // FK id
  map_name: string     // from MatchSerializer source="map_played.name"
  date_played: string
  result: "Win" | "Loss" | "Draw"
  team_score: number
  opponent_score: number
}

export type MatchDetail = Match & {
  user_stats: UserMatchStat[]
}

export type WinRateByMap = {
  [mapName: string]: number
}

export type CareerStats = {
  id: number
  total_matches: number
  kill_death_ratio: number
  win_rate: number
  win_rate_by_map: WinRateByMap
  favorite_weapon: string | null
}

export type CareerOverview = {
  totalMatches: number
  kill_death_ratio: number
  win_rate: number
}

export type MapWinRate = {
  mapName: string
  winRate: number
}

export type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

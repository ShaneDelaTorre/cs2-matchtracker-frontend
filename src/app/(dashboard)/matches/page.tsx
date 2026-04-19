"use client"
import { useState, useEffect, useCallback } from "react"
import { Match, PaginatedResponse } from "@/types"
import { apiRequest } from "@/lib/api"
import MatchRow from "@/components/matches/MatchRow"
import AddMatchModal from "@/components/matches/AddMatchModal"
import styles from "./page.module.css"

export default function MatchesPage() {
  const [data, setData] = useState<PaginatedResponse<Match> | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [mapFilter, setMapFilter] = useState("")
  const [resultFilter, setResultFilter] = useState("")
  const [showModal, setShowModal] = useState(false)

  const fetchMatches = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set("page", String(currentPage))
    if (mapFilter) params.set("map_played", mapFilter)
    if (resultFilter) params.set("result", resultFilter)
    const json = await apiRequest<PaginatedResponse<Match>>(
      `/user-matches/?${params.toString()}`
    )
    setData(json)
    setLoading(false)
  }, [currentPage, mapFilter, resultFilter])

  useEffect(() => {
    setCurrentPage(1)
  }, [mapFilter, resultFilter])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  const totalPages = data ? Math.ceil(data.count / 5) : 0
  const hasFilters = mapFilter || resultFilter

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Matches</h1>
          {data && (
            <p className={styles.subtitle}>{data.count} total matches</p>
          )}
        </div>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          + Add match
        </button>
      </div>

      <div className={styles.filters}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="Filter by map..."
          value={mapFilter}
          onChange={(e) => setMapFilter(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
        >
          <option value="">All results</option>
          <option value="Win">Win</option>
          <option value="Loss">Loss</option>
          <option value="Draw">Draw</option>
        </select>
        {hasFilters && (
          <button
            className={styles.clearBtn}
            onClick={() => {
              setMapFilter("")
              setResultFilter("")
            }}
          >
            Clear
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
        </div>
      )}

      {!loading && data?.results.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No matches found</p>
          <p className={styles.emptySub}>
            {hasFilters
              ? "Try adjusting your filters"
              : "Log your first match to get started"}
          </p>
          {!hasFilters && (
            <button
              className={styles.addBtn}
              onClick={() => setShowModal(true)}
            >
              + Add match
            </button>
          )}
        </div>
      )}

      {!loading && data && data.results.length > 0 && (
        <>
          <div className={styles.list}>
            {data.results.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={!data.previous}
            >
              ← Prev
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!data.next}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {showModal && (
        <AddMatchModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            fetchMatches()
          }}
        />
      )}
    </div>
  )
}
"use client"

type Props = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <div style={{ padding: "60px 24px", textAlign: "center" }}>
      <p style={{ fontSize: "14px", color: "#a32d2d", marginBottom: "8px" }}>
        Something went wrong
      </p>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>
        {error.message}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "8px 18px",
          fontSize: "13px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          background: "white",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  )
}
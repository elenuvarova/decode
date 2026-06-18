import { useState, useEffect } from "react";

function useApiFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default function App() {
  const hello = useApiFetch("/api/hello");
  const health = useApiFetch("/api/health");

  return (
    <div className="container">
      <h1>Full-Stack Template</h1>

      <div className="card">
        <h2>/api/hello</h2>
        {hello.loading && <p className="muted">Loading…</p>}
        {hello.error && <p className="error">Error: {hello.error}</p>}
        {hello.data && <p>{hello.data.message}</p>}
      </div>

      <div className="card">
        <h2>/api/health</h2>
        {health.loading && <p className="muted">Loading…</p>}
        {health.error && <p className="error">Error: {health.error}</p>}
        {health.data && (
          <p>
            Status: <strong>{health.data.status}</strong> &mdash; db:{" "}
            <strong>{health.data.db}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

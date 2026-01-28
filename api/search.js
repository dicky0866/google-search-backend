export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) {
    return res.status(400).json({ error: "Parameter q wajib ada" });
  }

  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(q)}&engine=google&api_key=demo`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Gagal fetch SERPAPI",
      detail: err.message
    });
  }
}
export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Parameter q wajib ada" });
  }

  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
      q
    )}&format=json&no_redirect=1&no_html=1`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal fetch DuckDuckGo" });
  }
}
export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Parameter q wajib ada" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    q
  )}&key=${apiKey}&cx=${cx}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal fetch Google Search" });
  }
}

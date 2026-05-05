export default async function handler(req, res) {

  const { query } = JSON.parse(req.body);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.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}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: query }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.choices[0].message.content
  });
}
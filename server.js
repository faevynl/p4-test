const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const WEBHOOK_URL = "https://discord.com/api/webhooks/1487192982082949120/sVQ2wN2UB1oHlbqRtpjaOYUd6itFrHZe6dIbp1ireheQQYCnb4wQEPtHdmAf35UXKUPb";

app.post('/submit', async (req, res) => {
  const { answers } = req.body;

  const embed = {
    title: "TMP Phase 4 Examination Submission",
    color: 0xff69b4,
    fields: answers.map(a => ({ name: a.question, value: a.answer }))
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });
    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

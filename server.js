import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/quote', async (req, res) => {
  try {
    // Try multiple APIs
    let response;
    let data;
    
    // Try API 1
    try {
      response = await fetch('https://api.quotable.io/random');
      if (response.ok) {
        data = await response.json();
        return res.json({ content: data.content, author: data.author });
      }
    } catch (e) {
      console.log('API 1 failed, trying next...');
    }
    
    // Try API 2
    try {
      response = await fetch('https://zenquotes.io/api/random');
      if (response.ok) {
        data = await response.json();
        return res.json({ content: data[0].q, author: data[0].a });
      }
    } catch (e) {
      console.log('API 2 failed, trying next...');
    }
    
    // Try API 3
    try {
      response = await fetch('https://dummyjson.com/quotes/random');
      if (response.ok) {
        data = await response.json();
        return res.json({ content: data.quote, author: data.author });
      }
    } catch (e) {
      console.log('API 3 failed');
    }
    
    throw new Error('All APIs failed');
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch quote from all sources' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
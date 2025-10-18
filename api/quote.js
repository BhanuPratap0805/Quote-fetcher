export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    // Try multiple APIs
    let response;
    let data;
    
    // Try API 1
    try {
      response = await fetch('https://api.quotable.io/random');
      if (response.ok) {
        data = await response.json();
        return res.status(200).json({ content: data.content, author: data.author });
      }
    } catch (e) {
      console.log('API 1 failed');
    }
    
    // Try API 2
    try {
      response = await fetch('https://zenquotes.io/api/random');
      if (response.ok) {
        data = await response.json();
        return res.status(200).json({ content: data[0].q, author: data[0].a });
      }
    } catch (e) {
      console.log('API 2 failed');
    }
    
    // Try API 3
    try {
      response = await fetch('https://dummyjson.com/quotes/random');
      if (response.ok) {
        data = await response.json();
        return res.status(200).json({ content: data.quote, author: data.author });
      }
    } catch (e) {
      console.log('API 3 failed');
    }
    
    throw new Error('All APIs failed');
    
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch quote' });
  }
}
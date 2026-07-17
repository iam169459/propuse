const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Store responses
const responsesFile = path.join(__dirname, 'responses.json');

function loadResponses() {
  try {
    if (fs.existsSync(responsesFile)) {
      return JSON.parse(fs.readFileSync(responsesFile, 'utf8'));
    }
  } catch (e) {}
  return { responses: [] };
}

function saveResponse(response) {
  const data = loadResponses();
  data.responses.push(response);
  fs.writeFileSync(responsesFile, JSON.stringify(data, null, 2));
}

// Get user's IP info
async function getIPInfo(ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    return await res.json();
  } catch (e) {
    return null;
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to save response
app.post('/api/respond', async (req, res) => {
  const { answer, webData } = req.body;
  
  let locationData = null;
  if (req.ip && req.ip !== '127.0.0.1' && req.ip !== '::1') {
    locationData = await getIPInfo(req.ip);
  }
  
  const response = {
    answer,
    timestamp: new Date().toISOString(),
    ip: req.ip,
    webData: webData || {},
    location: locationData ? {
      city: locationData.city,
      region: locationData.region,
      country: locationData.country_name,
      timezone: locationData.timezone
    } : null
  };
  
  saveResponse(response);
  res.json({ success: true, responseId: Date.now() });
});

// Admin page to view responses
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API to get all responses
app.get('/api/responses', (req, res) => {
  const data = loadResponses();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

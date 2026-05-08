/**
 * API helper functions.
 */

const ISS_BASE = '/api/iss';
const NEWS_BASE = 'https://gnews.io/api/v4';
const GEOCODE_BASE = 'https://nominatim.openstreetmap.org';
const HF_BASE = '/api/ai/models';

// ─── ISS APIs ────────────────────────────────────────────
export async function fetchISSPosition() {
  const res = await fetch(`${ISS_BASE}/iss-now.json`);
  if (!res.ok) throw new Error('Failed to fetch ISS position');
  const data = await res.json();
  return {
    lat: parseFloat(data.iss_position.latitude),
    lon: parseFloat(data.iss_position.longitude),
    timestamp: data.timestamp * 1000, // convert to ms
  };
}

export async function fetchPeopleInSpace() {
  const res = await fetch(`${ISS_BASE}/astros.json`);
  if (!res.ok) throw new Error('Failed to fetch astronauts');
  return res.json();
}

// ─── Reverse Geocoding ──────────────────────────────────
export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `${GEOCODE_BASE}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=5&accept-language=en`,
      { headers: { 'User-Agent': 'ISS-Dashboard/1.0' } }
    );
    if (!res.ok) return 'Unknown Location';
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.state ||
      data.address?.country ||
      data.display_name ||
      'Over Ocean'
    );
  } catch {
    return 'Unknown Location';
  }
}
// ─── News API (GNews) ───────────────────────────────────
export async function fetchNews(category = 'general', query = '') {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  
  if (!apiKey) {
    console.warn('VITE_NEWS_API_KEY is missing or empty in .env');
    throw new Error('News API key missing. Please add VITE_NEWS_API_KEY to your .env file and restart the server.');
  }

  console.log('News API Key found (length):', apiKey.length);

  let url;
  if (query) {
    url = `${NEWS_BASE}/search?q=${encodeURIComponent(query)}&max=10&lang=en&apikey=${apiKey}`;
  } else {
    // GNews categories: general, world, nation, business, technology, entertainment, sports, science, health
    url = `${NEWS_BASE}/top-headlines?category=${category}&max=5&lang=en&apikey=${apiKey}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error('GNews Error:', data);
      throw new Error(data.errors?.[0] || data.message || `GNews Error ${res.status}`);
    }

    // Normalize GNews fields to match our NewsCard expectations
    return (data.articles || []).map(article => ({
      ...article,
      urlToImage: article.image, // GNews uses 'image' instead of 'urlToImage'
      source: { name: article.source?.name } // Ensure source object matches
    }));
  } catch (err) {
    console.error('Fetch News Failed:', err);
    throw err;
  }
}

// ─── AI Chatbot (Hugging Face) ──────────────────────────
export async function chatWithAI(messages, dashboardContext) {
  const token = import.meta.env.VITE_AI_TOKEN;
  
  if (!token) {
    console.warn('VITE_AI_TOKEN is missing or empty in .env');
    throw new Error('AI Token missing. Please add VITE_AI_TOKEN to your .env file.');
  }

  console.log('AI Token found (length):', token.length);

  const systemPrompt = `You are an AI assistant for a dashboard application. You can ONLY answer questions based on the following dashboard data. Do NOT use any external knowledge. If you don't have the information in the data below, say "I don't have that information in the current dashboard data."

DASHBOARD DATA:
${dashboardContext}

RULES:
- Only answer based on the dashboard data above
- Never make up information
- Be concise and helpful
- If asked about something not in the data, politely decline`;

  const formattedPrompt = `<s>[INST] ${systemPrompt}\n\nUser: ${messages[messages.length - 1].content} [/INST]`;

  const res = await fetch(
    `${HF_BASE}/mistralai/Mistral-7B-Instruct-v0.2`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.3,
          return_full_text: false,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'AI model request failed');
  }

  const data = await res.json();
  return data[0]?.generated_text?.trim() || 'I could not generate a response.';
}

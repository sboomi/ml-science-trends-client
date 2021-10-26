const BASE_URL = 'http://localhost:8000/';

export const sendXTest = async (request: string, username: string) => {
  const url = `${BASE_URL}predictTopic/`;

  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const body = {
    request: request,
    user: username,
  };

  try {
    const res = await fetch(url, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const results = await res.json();
      return results;
    } else {
      console.error(`Status ${res.status}: ${res.statusText}`);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

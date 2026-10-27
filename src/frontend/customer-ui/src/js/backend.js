// Real email/password accounts through Supabase Auth. No passwords are saved locally.
window.GSpotBackend = (() => {
  let session = null;
  const config = () => window.GSPOT_BACKEND || {};
  const enabled = () => Boolean(config().url && config().publishableKey);
  async function request(path, body, method = 'POST') {
    const { url, publishableKey } = config();
    if (!enabled()) throw new Error('Configure your Supabase project URL and public key first.');
    const response = await fetch(url.replace(/\/$/, '') + '/auth/v1/' + path, {
      method,
      headers: { apikey: publishableKey, 'Content-Type': 'application/json', ...(session?.access_token ? { Authorization: 'Bearer ' + session.access_token } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.msg || result.message || result.error_description || result.error || 'Account request failed.');
    return result;
  }
  const customer = user => ({ id: user.id, email: user.email, name: user.user_metadata?.name || user.email.split('@')[0] });
  return {
    enabled,
    async signup(name, email, password) {
      try {
        if (!name.trim() || password.length < 8) throw new Error('Enter your name and a password of at least 8 characters.');
        const result = await request('signup', { email: email.trim().toLowerCase(), password, data: { name: name.trim() } });
        if (!result.access_token) return { success: false, error: 'Check your email to confirm your account, then log in. If you already have an account, use Log In.' };
        session = result;
        return { success: true, customer: customer(result.user) };
      } catch (error) { return { success: false, error: error.message }; }
    },
    async login(email, password) {
      try {
        session = await request('token?grant_type=password', { email: email.trim().toLowerCase(), password });
        return { success: true, customer: customer(session.user) };
      } catch (error) { return { success: false, error: error.message }; }
    },
    async logout() {
      try { if (session) await request('logout'); } finally { session = null; }
    }
  };
})();

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// ── STORAGE API SHIM ───────────────────────────────────────────────
// Provides window.storage backed by localStorage so the app works
// identically whether running on Claude.ai or your Azure Static Web App.
// All data is stored locally in the browser — no backend required.

const STORAGE_PREFIX = 'tps_app_';

window.storage = {
  async get(key, shared = false) {
    try {
      const storageKey = STORAGE_PREFIX + (shared ? 'shared_' : 'user_') + key;
      const value = localStorage.getItem(storageKey);
      if (value === null) throw new Error('Key not found');
      return { key, value, shared };
    } catch {
      throw new Error('Key not found: ' + key);
    }
  },

  async set(key, value, shared = false) {
    try {
      const storageKey = STORAGE_PREFIX + (shared ? 'shared_' : 'user_') + key;
      localStorage.setItem(storageKey, typeof value === 'string' ? value : JSON.stringify(value));
      return { key, value, shared };
    } catch {
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      const storageKey = STORAGE_PREFIX + (shared ? 'shared_' : 'user_') + key;
      localStorage.removeItem(storageKey);
      return { key, deleted: true, shared };
    } catch {
      return null;
    }
  },

  async list(prefix = '', shared = false) {
    try {
      const fullPrefix = STORAGE_PREFIX + (shared ? 'shared_' : 'user_') + prefix;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(fullPrefix)) {
          keys.push(k.slice(STORAGE_PREFIX.length + (shared ? 7 : 5)));
        }
      }
      return { keys, prefix, shared };
    } catch {
      return null;
    }
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

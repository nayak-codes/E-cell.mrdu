const SESSION_KEY = 'mru-ecell-admin-session';

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'MRUEcell@2026';

export function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function loginAdmin(username, password) {
  const userOk = username.trim().toLowerCase() === ADMIN_USERNAME;
  const passOk = password === ADMIN_PASSWORD;
  if (!userOk || !passOk) return false;
  sessionStorage.setItem(SESSION_KEY, '1');
  return true;
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}

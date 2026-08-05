/**
 * EchoTic API Client
 * Centralized API service layer for all backend communication
 */

const API_BASE_URL = "/api";

/**
 * Core fetch wrapper with JWT auto-injection and token refresh
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Auto-inject access token if available
  const accessToken = getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    let response = await fetch(url, { ...options, headers });

    // If token expired, try to refresh
    if (response.status === 401) {
      try {
        const clone = response.clone();
        const data = await clone.json();
        if (data.code === "TOKEN_EXPIRED") {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            // Retry the original request with new token
            headers["Authorization"] = `Bearer ${getAccessToken()}`;
            response = await fetch(url, { ...options, headers });
          } else {
            // Refresh failed — logout
            clearTokens();
            window.dispatchEvent(new Event("authChange"));
            throw new Error("Session expired. Please login again.");
          }
        }
      } catch (cloneErr) {
        // If clone parsing failed, fall through to main error handler
      }
    }

    const result = await response.json().catch(() => ({ success: false, error: "Server response format invalid." }));

    if (!response.ok) {
      throw { status: response.status, ...result };
    }

    return result;
  } catch (error) {
    if (error.status) throw error;
    console.error("API Error:", error);
    throw { success: false, error: error.message || "Network error" };
  }
}

// ────────────────────────────────────
// Token Management
// ────────────────────────────────────

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("echotic_access_token");
}

function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("echotic_refresh_token");
}

function saveTokens(accessToken, refreshToken) {
  localStorage.setItem("echotic_access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("echotic_refresh_token", refreshToken);
  }
}

function clearTokens() {
  localStorage.removeItem("echotic_access_token");
  localStorage.removeItem("echotic_refresh_token");
  localStorage.removeItem("echotic_user");
}

function saveUserData(user) {
  localStorage.setItem("echotic_user", JSON.stringify(user));
}

function getUserData() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("echotic_user");
  return data ? JSON.parse(data) : null;
}

function isAuthenticated() {
  return !!getAccessToken() && !!getUserData();
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    const result = await response.json();
    if (result.success && result.data.accessToken) {
      localStorage.setItem("echotic_access_token", result.data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ────────────────────────────────────
// AUTH API
// ────────────────────────────────────

export async function apiLogin(email, password) {
  const result = await fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (result.success) {
    saveTokens(result.data.accessToken, result.data.refreshToken);
    saveUserData(result.data.user);
  }

  return result;
}

export async function apiRegister(username, email, password) {
  const result = await fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });

  if (result.success) {
    saveTokens(result.data.accessToken, result.data.refreshToken);
    saveUserData(result.data.user);
  }

  return result;
}

export async function apiLogout() {
  try {
    const refreshToken = getRefreshToken();
    await fetchAPI("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  } catch {
    // Logout even if API call fails
  }
  clearTokens();
}

// ────────────────────────────────────
// EVENTS API
// ────────────────────────────────────

export async function apiGetEvents(params = {}) {
  const queryParams = new URLSearchParams();

  if (params.search) queryParams.set("search", params.search);
  if (params.genre && params.genre !== "all") queryParams.set("genre", params.genre);
  if (params.city && params.city !== "all") queryParams.set("city", params.city);
  if (params.sort && params.sort !== "default") queryParams.set("sort", params.sort);
  if (params.featured) queryParams.set("featured", "true");
  if (params.trending) queryParams.set("trending", "true");

  const qs = queryParams.toString();
  return fetchAPI(`/events${qs ? `?${qs}` : ""}`);
}

export async function apiGetEvent(id) {
  return fetchAPI(`/events/${id}`);
}

export async function apiGetSeats(eventId) {
  return fetchAPI(`/events/${eventId}/seats`);
}

// ────────────────────────────────────
// ORDERS API
// ────────────────────────────────────

export async function apiCreateOrder(orderData) {
  return fetchAPI("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export async function apiGetMyOrders() {
  return fetchAPI("/orders/my");
}

export async function apiGetOrder(orderId) {
  return fetchAPI(`/orders/${orderId}`);
}

// ────────────────────────────────────
// USERS API
// ────────────────────────────────────

export async function apiGetProfile() {
  return fetchAPI("/users/me");
}

export async function apiUpdateProfile(data) {
  return fetchAPI("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ────────────────────────────────────
// MISC API
// ────────────────────────────────────

export async function apiGetTestimonials() {
  return fetchAPI("/testimonials");
}

export async function apiGetGenres() {
  return fetchAPI("/genres");
}

export async function apiGetVenues() {
  return fetchAPI("/venues");
}

// ────────────────────────────────────
// ADMIN EVENTS API
// ────────────────────────────────────

export async function apiCreateEvent(eventData) {
  return fetchAPI("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export async function apiUpdateEvent(id, eventData) {
  return fetchAPI(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

export async function apiDeleteEvent(id) {
  return fetchAPI(`/events/${id}`, {
    method: "DELETE",
  });
}

// ────────────────────────────────────
// ADMIN TICKET GATE ENTRY & SCANNER API
// ────────────────────────────────────

export async function apiVerifyTicket(ticketCode) {
  return fetchAPI("/orders/verify", {
    method: "POST",
    body: JSON.stringify({ ticketCode }),
  });
}

export async function apiApproveTicketEntry(ticketCode) {
  return fetchAPI("/orders/scan-approve", {
    method: "POST",
    body: JSON.stringify({ ticketCode }),
  });
}

export async function apiGetAdminStats() {
  return fetchAPI("/orders/admin/stats");
}

// Re-export token helpers for use in components
export {
  isAuthenticated,
  getUserData,
  saveUserData,
  clearTokens,
  getAccessToken,
};

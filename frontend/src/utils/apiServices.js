export const BASE_URL = "http://localhost:5000/api/v1";

// ─── Helper ──────────────────────────────────────────────────────────────────
async function request(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("payzen_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { message: "Network error. Please try again." } };
  }
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const registerUser = (body) => request("/auth/register", "POST", body);
export const loginUser = (email, password, fcm_token = null) => request("/auth/login", "POST", { email, password, fcm_token });
export const logoutUser = () => request("/auth/logout", "POST", null, true);

// ─── USER ─────────────────────────────────────────────────────────────────────
export const getProfile = () => request("/settings/profile", "GET", null, true);
export const updateProfile = (body) => request("/settings/profile", "PUT", body, true);
export const sendOtp = (body) => request("/auth/send-otp", "POST", body);
export const verifyOtp = (body) => request("/auth/verify-otp", "POST", body);
export const resetPassword = (body) => request("/auth/reset-password", "POST", body);

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
export const getPreferences = () => request("/settings/preferences", "GET", null, true);
export const updatePreferences = (body) => request("/settings/preferences", "PUT", body, true);
export const changePassword = (body) => request("/settings/security/change-password", "POST", body, true);
export const getLoginActivity = () => request("/settings/security/activity", "GET", null, true);

// ─── ACCOUNT ──────────────────────────────────────────────────────────────────
export const openAccount = async (data) => {
  const formData = new FormData();
  const token = localStorage.getItem("payzen_token");

  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(`${BASE_URL}/accounts/open-request`, {
      method: "POST",
      headers: headers,
      body: formData,
    });
    return { ok: response.ok, data: await response.json() };
  } catch (error) {
    return { ok: false, data: { message: error.message } };
  }
};

export const getAccountStatus = () => request("/users/account-status", "GET", null, true);

// ─── ADMIN — ACCOUNT REQUESTS ─────────────────────────────────────────────────
export const adminGetRequests = (status = "") =>
  request(`/admin/account-requests${status ? `?status=${status}` : ""}`, "GET", null, false);

export const adminApproveRequest = (requestId) =>
  request(`/admin/account-requests/${requestId}/approve`, "POST", null, false);

export const adminRejectRequest = (requestId, remark = "") =>
  request(`/admin/account-requests/${requestId}/reject`, "POST", { remark }, false);

// ─── ADMIN — BANK ACCOUNTS ────────────────────────────────────────────────────
export const adminGetBankAccounts = () =>
  request("/admin/bank-accounts", "GET", null, false);

export const adminToggleAccountStatus = (accountId, status) =>
  request(`/admin/bank-accounts/${accountId}/status`, "PATCH", { status }, false);


// ─── KYC — USER FLOW ─────────────────────────────────────────────────────────
export const kycSendOtp = (email) => request("/kyc/send-otp", "POST", { email });
export const kycVerifyOtp = (email, otp) => request("/kyc/verify-otp", "POST", { email, otp });

export const kycSubmit = async (data) => {
  const formData = new FormData();
  const token = localStorage.getItem("payzen_token");
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(`${BASE_URL}/kyc/submit`, {
      method: "POST",
      headers,
      body: formData,
    });
    return { ok: response.ok, data: await response.json() };
  } catch (error) {
    return { ok: false, data: { message: error.message } };
  }
};

// ─── KYC — ADMIN FLOW ────────────────────────────────────────────────────────
export const adminGetAllKycs = () => request("/kyc/all", "GET", null, false);
export const adminUpdateKycStatus = (customId, status, rejectReason = "") =>
  request(`/kyc/${customId}/status`, "PUT", { status, rejectReason }, false);

// ─── TRANSACTION MANAGE (ADMIN) ───────────────────────────────────────────────
export const getAdminAccounts = (search = "") =>
  request(`/admin/txn-accounts${search ? `?search=${search}` : ""}`, "GET", null, true);

export const processTransaction = (data) =>
  request("/admin/transactions", "POST", data, true);

// ─── TRANSACTION HISTORY (USER) ───────────────────────────────────────────────
export const getMyTransactions = () =>
  request("/auth/transactions", "GET", null, true);

// ─── SUPPORT SYSTEM ──────────────────────────────────────────────────────────
export const createSupportTicket = (body) => request("/support/tickets", "POST", body, true);
export const getMyTickets = () => request("/support/my-tickets", "GET", null, true);
export const getTicketDetails = (id) => request(`/support/tickets/${id}`, "GET", null, true);
export const addTicketMessage = (id, msg) => request(`/support/tickets/${id}/message`, "POST", { message: msg }, true);

// ─── ADMIN — SUPPORT ──────────────────────────────────────────────────────────
export const adminGetTickets = (status = "") =>
  request(`/support/admin/tickets${status ? `?status=${status}` : ""}`, "GET", null, true);
export const adminUpdateTicketStatus = (id, status) =>
  request(`/support/admin/tickets/${id}/status`, "PATCH", { status }, true);

// admin login
export const adminLogin = (data) => request("/auth/admin/login", "POST", data);

// ─── AI CHAT ──────────────────────────────────────────────────────────────────
export const sendAIChatMessage = (text, history) => request("/ai/chat", "POST", { message: text, history });

// ─── MONEY TRANSFER ───────────────────────────────────────────────────────────
export const performTransfer = (data) => request("/auth/transfer", "POST", data, true);

const API_BASE_URL = "http://localhost:8081/api"; 

function getToken() {
  return localStorage.getItem("token");
}

async function parseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text }; 
  }
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error(await response.text() || "Login failed");

  const data = await parseResponse(response);
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}
export async function signup(data) {
  const userPayload = {
    username: data.username,
    email: data.email,
    passwordHash: data.password, 
    firstName: "-",
    lastName: "-",
    phone: "-",
    role: "DEFAULT_USER",
  };

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userPayload),
  });

  if (!response.ok) throw new Error(await response.text() || "Signup failed");
  return await parseResponse(response);
}
export async function verifyOtp(email, otp) {
  const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) throw new Error(await response.text() || "OTP verification failed");
  return await parseResponse(response);
}
export async function sendEmail(email, bookingDetails) {
  const response = await fetch(`${API_BASE_URL}/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, bookingDetails }),
  });

  if (!response.ok) throw new Error(await response.text() || "Failed to send email");
  return await parseResponse(response);
}
export async function sendSignupSuccessEmail(email, username) {
  const response = await fetch(`${API_BASE_URL}/send-signup-success`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username }),
  });

  if (!response.ok) throw new Error(await response.text() || "Failed to send signup success email");
  return await parseResponse(response);
}
export async function getProtectedData(endpoint) {
  const token = getToken();
  if (!token) throw new Error("No token found. Please log in.");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(await response.text() || "Failed to fetch data");
  return await parseResponse(response);
}

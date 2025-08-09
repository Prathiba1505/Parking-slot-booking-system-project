const API_BASE_URL = "http://localhost:8081/api";

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  return await response.json();
}

export async function signup(data) {
  const userPayload = {
    username: data.username,
    email: data.email,
    passwordHash: data.password,
    firstName: "Temp",
    lastName: "User",
    phone: "0000000000",
    role: "DEFAULT_USER",
  };

  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Signup failed");
  }

  return await response.json();
}

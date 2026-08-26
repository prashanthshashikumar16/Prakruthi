// Simple client-side API helper for registration
window.createUser = async function(values) {
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword
    })
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.message || 'Registration failed');
    err.fieldErrors = payload.fieldErrors;
    throw err;
  }
  return payload;
};

const initialRegistration = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}

function App() {
  const [page, setPage] = React.useState('login')
  const [notice, setNotice] = React.useState('')

  const navigate = (nextPage) => {
    setNotice('')
    setPage(nextPage)
  }

  return (
    <main className="app-shell">
      <section className="auth-card" aria-labelledby="page-title">
        <div className="brand" aria-label="Prakruthi Portal">
          <span className="brand-mark">P</span>
          <span>Prakruthi</span>
        </div>
        {page === 'login' ? (
          <Login onNavigate={navigate} notice={notice} setNotice={setNotice} />
        ) : (
          <Registration onNavigate={navigate} notice={notice} setNotice={setNotice} />
        )}
      </section>
      <p className="footer">© 2026 Prakruthi. All rights reserved.</p>
    </main>
  )
}

function Login({ onNavigate, notice, setNotice }) {
  const [values, setValues] = React.useState({ username: '', password: '' })

  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    setNotice('Login submitted. Connect this form to your authentication service to sign users in.')
  }

  return (
    <>
      <header className="page-header">
        <h1 id="page-title">Welcome back</h1>
        <p>Sign in to access your account.</p>
      </header>
      <form onSubmit={submit}>
        <Field label="User name" id="username" name="username" value={values.username} onChange={update} autoComplete="username" />
        <Field label="Password" id="password" name="password" type="password" value={values.password} onChange={update} autoComplete="current-password" />
        <div className="help-links" aria-label="Account recovery">
          <button type="button" className="text-link" onClick={() => setNotice('A password reset link would be sent from here.')}>Forgot password?</button>
          <button type="button" className="text-link" onClick={() => setNotice('Your user name recovery flow would start here.')}>Forgot user name?</button>
        </div>
        <button className="primary-button" type="submit">Log in</button>
      </form>
      {notice && <p className="notice" role="status">{notice}</p>}
      <p className="switch-copy">New to Prakruthi? <button className="text-link emphasis" type="button" onClick={() => onNavigate('register')}>Create an account</button></p>
    </>
  )
}

function Registration({ onNavigate, notice, setNotice }) {
  const [values, setValues] = React.useState(initialRegistration)
  const [error, setError] = React.useState('')
  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    setNotice('Registration submitted. Your account can be created when this form is connected to your service.')
  }

  return (
    <>
      <header className="page-header">
        <h1 id="page-title">Create your account</h1>
        <p>Fill in your details to get started.</p>
      </header>
      <form onSubmit={submit}>
        <div className="name-grid">
          <Field label="First name" id="firstName" name="firstName" value={values.firstName} onChange={update} autoComplete="given-name" />
          <Field label="Last name" id="lastName" name="lastName" value={values.lastName} onChange={update} autoComplete="family-name" />
        </div>
        <Field label="Email address" id="email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" />
        <Field label="User name" id="newUsername" name="username" value={values.username} onChange={update} autoComplete="username" />
        <Field label="Password" id="newPassword" name="password" type="password" value={values.password} onChange={update} autoComplete="new-password" hint="Use at least 8 characters." />
        <Field label="Confirm password" id="confirmPassword" name="confirmPassword" type="password" value={values.confirmPassword} onChange={update} autoComplete="new-password" />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Create account</button>
      </form>
      {notice && <p className="notice" role="status">{notice}</p>}
      <p className="switch-copy">Already have an account? <button className="text-link emphasis" type="button" onClick={() => onNavigate('login')}>Log in</button></p>
    </>
  )
}

function Field({ label, id, hint, ...inputProps }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} required {...inputProps} />
      {hint && <span className="hint">{hint}</span>}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
)

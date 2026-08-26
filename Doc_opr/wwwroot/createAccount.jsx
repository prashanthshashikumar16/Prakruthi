const initialRegistration = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}

function RegistrationPage() {
  const [values, setValues] = React.useState(initialRegistration)
  const [errors, setErrors] = React.useState({})
  const [submitting, setSubmitting] = React.useState(false)
  const [notice, setNotice] = React.useState('')

  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setNotice('')
    const validationErrors = validateRegistration(values)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    try {
      // window.createUser is defined in api.js
      const result = await window.createUser(values)
      setValues(initialRegistration)
      setNotice(result.message || 'Registration submitted. Check your email for verification instructions.')
    } catch (error) {
      setErrors(error.fieldErrors ?? {})
      setNotice(error.message || 'The account service is unavailable. Please try again shortly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    React.createElement('main', { className: 'app-shell' },
      React.createElement('section', { className: 'auth-card', 'aria-labelledby': 'page-title' },
        React.createElement('div', { className: 'brand', 'aria-label': 'Prakruthi Portal' },
          React.createElement('span', { className: 'brand-mark' }, 'P'),
          React.createElement('span', null, 'Prakruthi')
        ),
        React.createElement('header', { className: 'page-header' },
          React.createElement('h1', { id: 'page-title' }, 'Create your account'),
          React.createElement('p', null, 'Fill in your details to get started.')
        ),
        React.createElement('form', { onSubmit: submit },
          React.createElement('div', { className: 'name-grid' },
            Field({ label: 'First name', id: 'firstName', name: 'firstName', value: values.firstName, onChange: update, autoComplete: 'given-name', error: errors.firstName }),
            Field({ label: 'Last name', id: 'lastName', name: 'lastName', value: values.lastName, onChange: update, autoComplete: 'family-name', error: errors.lastName })
          ),
          Field({ label: 'Email address', id: 'email', name: 'email', type: 'email', value: values.email, onChange: update, autoComplete: 'email', error: errors.email }),
          Field({ label: 'User name', id: 'newUsername', name: 'username', value: values.username, onChange: update, autoComplete: 'username', error: errors.username }),
          Field({ label: 'Password', id: 'newPassword', name: 'password', type: 'password', value: values.password, onChange: update, autoComplete: 'new-password', hint: '8–26 characters, with upper/lowercase, a number, and a symbol.', error: errors.password }),
          Field({ label: 'Confirm password', id: 'confirmPassword', name: 'confirmPassword', type: 'password', value: values.confirmPassword, onChange: update, autoComplete: 'new-password', error: errors.confirmPassword }),
          React.createElement('button', { className: 'primary-button', type: 'submit', disabled: submitting }, submitting ? 'Creating account…' : 'Create account')
        ),
        notice && React.createElement('p', { className: 'notice', role: 'status' }, notice),
        React.createElement('p', { className: 'switch-copy' }, 'Already have an account? ', React.createElement('button', { className: 'text-link emphasis', type: 'button', onClick: () => window.location.href = '/' }, 'Back'))
      )
    )
  )
}

function Field({ label, id, hint, error, ...inputProps }) {
  return (
    React.createElement('div', { className: 'field' },
      React.createElement('label', { htmlFor: id }, label),
      React.createElement('input', Object.assign({ id: id, required: true, 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined }, inputProps)),
      hint && React.createElement('span', { className: 'hint' }, hint),
      error && React.createElement('span', { className: 'field-error', id: `${id}-error` }, error)
    )
  )
}

function validateRegistration(values) {
  const errors = {}
  if (!values.firstName || !values.firstName.trim()) errors.firstName = 'Enter your first name.'
  if (!values.lastName || !values.lastName.trim()) errors.lastName = 'Enter your last name.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!/^[a-zA-Z0-9._-]{3,100}$/.test(values.username)) errors.username = 'Use 3–100 letters, numbers, periods, underscores, or hyphens.'
  if (!values.password || values.password.length < 8 || values.password.length > 26 || !/[a-z]/.test(values.password) || !/[A-Z]/.test(values.password) || !/\d/.test(values.password) || !/[^A-Za-z0-9]/.test(values.password)) {
    errors.password = 'Use 8–26 characters with upper/lowercase, a number, and a symbol.'
  }
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match.'
  return errors
}

// Render the registration page into the root element when this script is loaded
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(RegistrationPage))
)

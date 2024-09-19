import { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [adopterDetails, setAdopterDetails] = useState({
    name: '',
    phone: '',
    address: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        adopterDetails,
      })
      const { token } = response.data
      localStorage.setItem('token', token)
      // Redirect or update UI after successful registration
    } catch (error) {
      setError('Registration failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else {
      setAdopterDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }))
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={adopterDetails.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={adopterDetails.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={adopterDetails.address}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default RegisterForm

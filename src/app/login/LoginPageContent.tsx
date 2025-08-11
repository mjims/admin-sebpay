'use client'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function LoginPageContent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      })
      const { access } = response.data
      login(access) // appel du contexte
      router.push('/users')
    } catch (err) {
      setError("Identifiants incorrects")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="relative flex flex-col items-center justify-center">
            <h1 className="my-2 text-xl font-bold text-primary lg:text-3xl">Sebpay</h1>
            <p className="">Se connecter à votre compte marchand</p>
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}   
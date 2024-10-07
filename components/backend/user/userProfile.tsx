"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getUserProfile, saveUserProfile, addUserToCommunity } from '@/components/backend/user/userService'

export interface Perfil {
  id: string
  name: string
  description: string
  likes: string
  mail: string
  communities: string[]
}

export default function Component() {
  const { user } = useUser()
  const [profile, setProfile] = useState<Perfil | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [likes, setLikes] = useState('')
  const [mail, setMail] = useState('')
  const [communities, setCommunities] = useState<string[]>([])
  const [newCommunity, setNewCommunity] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userProfile = await getUserProfile(user.id)
        if (userProfile) {
          setProfile(userProfile)
          setName(userProfile.name)
          setDescription(userProfile.description)
          setLikes(userProfile.likes)
          setMail(userProfile.mail)
          setCommunities(userProfile.communities)
        } else {
          setProfile({
            id: user.id,
            name: '',
            description: '',
            likes: '',
            mail: user.emailAddresses[0].emailAddress || '',
            communities: []
          })
        }
      }
    }
    fetchProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const updatedProfileData = {
        name,
        description,
        likes,
        mail,
        communities,
      }
      await saveUserProfile(updatedProfileData, user.id)
      alert('Perfil guardado con éxito')
    }
  }

  const handleAddCommunity = async () => {
    if (newCommunity && !communities.includes(newCommunity)) {
      const updatedCommunities = [...communities, newCommunity]
      setCommunities(updatedCommunities)
      if (profile && user) {
        const updatedProfile = {
          ...profile,
          communities: updatedCommunities,
          name: profile.name || '',
          description: profile.description || '',
          likes: profile.likes || '',
          mail: profile.mail || ''
        }
        await saveUserProfile(updatedProfile, user.id)
      }
      try {
        await addUserToCommunity(newCommunity)
      } catch (error) {
        console.error(`Error al intentar actualizar la comunidad ${newCommunity}: `, error)
      }
      setNewCommunity('')
      alert('Comunidad agregada con éxito y número de miembros actualizado.')
    } else {
      alert('El ID de la comunidad es inválido o ya has ingresado a esta comunidad.')
    }
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl font-semibold">El perfil está cargando, espera!</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Perfil de Usuario</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">👤</span>
                ID de Usuario (Clerk ID)
              </label>
              <input
                type="text"
                value={profile.id}
                readOnly
                className="mt-1  w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">✏️</span>
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">📝</span>
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">❤️</span>
                Gustos
              </label>
              <input
                type="text"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                className="mt-1  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">📧</span>
                Correo Electrónico
              </label>
              <input
                type="text"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="mt-1  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2">👥</span>
                Comunidades
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={newCommunity}
                  onChange={(e) => setNewCommunity(e.target.value)}
                  className="flex-1 min-w-0  w-full px-3 py-2 rounded-none rounded-l-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  placeholder="ID de nueva comunidad"
                />
                <button
                  type="button"
                  onClick={handleAddCommunity}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Comunidades a las que perteneces:</p>
                <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                  {communities.map((community, index) => (
                    <li key={index}>{community}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Guardar Perfil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InnerAnimal from './components/ui/InnerAnimal'
import AnimalEdit from './components/ui/AnimalEdit'
import { Toaster } from '@/components/ui/toaster'
import NewAnimalCreate from './components/ui/NewAnimalCreate'
import LoginForm from './components/ui/LoginForm'
import RegisterForm from './components/ui/RegisterForm'
import UserProfile from './components/ui/UserProfile'
import AnimalUpdate from './components/ui/AnimalUpdate'
import Admin from './components/ui/newAdmin'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/animals/:id',
    element: <InnerAnimal />,
  },
  {
    path: '/animals/:id/edit',
    element: <AnimalEdit />,
  },
  {
    path: '/animals/create',
    element: <NewAnimalCreate />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/update/:id',
    element: <AnimalUpdate />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/user',
    element: <UserProfile />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
)

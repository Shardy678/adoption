import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InnerAnimal from './components/ui/InnerAnimal'
import Admin from './components/ui/admin'
import AnimalEdit from './components/ui/AnimalEdit'
import AnimalCreate from './components/ui/AnimalCreate'

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
    element: <AnimalCreate />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

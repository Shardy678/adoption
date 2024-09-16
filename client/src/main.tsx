import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InnerAnimal from './components/ui/InnerAnimal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/animals/:id',
    element: <InnerAnimal />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

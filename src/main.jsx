import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home/home.jsx';
import InitialInformation from './pages/initial-information/initial-information.jsx';
import Form from './pages/form/form.jsx';
import { DataProvider } from './dataContext/dataContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "initialInformation",
    element: <InitialInformation />
  },
  {
    path: "form",
    element: <Form />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>,
)

import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
);

import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'
import Divisions from './pages/Divisions.jsx'
import Tours from './pages/Tours.jsx'
import TeamRegistration from './pages/TeamRegistration.jsx'
import ContactUs  from './pages/ContactUs.jsx'
import Div from './pages//Div.jsx'
import TeamManager from './pages/TeamManager.jsx'
import Login from './pages/Login.jsx'
import Testing from './pages/Testing.jsx'

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
      {
        path: 'divisions',
        element: <Divisions />,
      },
      {
        path: 'tours',
        element: <Tours />,
      },
      {
        path: 'team-registration',
        element: <TeamRegistration />,
      },
      {
        path: 'contact-us',
        element: <ContactUs />,
      },
      {
        path: 'divisions/:divisionId',
        element: <Div />
      },
      {
        path: 'admin',
        element: <TeamManager />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'testing',
        element: <Testing />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
);

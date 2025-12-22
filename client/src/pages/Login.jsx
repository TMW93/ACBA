import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState } from 'react'
import Auth from '../utils/auth'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../utils/mutations'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, {error}] = useMutation(LOGIN);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        }
      });

      const token = mutationResponse.data.login.token;
      Auth.login(token);
      navigate('/');

    } catch (error) {
      console.log('There was an error logging in!', error);
      alert("Oopsie! There was an error logging in!")
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav/>
      <div className="flex-1 mx-auto max-w-7xl px-6 lg:px-8">
        <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Login</h2>
            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleChange}            
                />
              </div>
            </div>
            {/* Password */}
            <div className="sm:col-span-2">
              <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  onChange={handleChange}            
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
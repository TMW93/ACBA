import {useState} from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Nav />
      <main>
        <Hero />
      </main>
    </div>
  )
};

export default Home;
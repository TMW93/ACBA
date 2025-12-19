import Nav from "../components/Nav";
import Footer from "../components/Footer";

const TeamRegistration = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white py-24 sm:py-32 dark:bg-gray-900">
      <Nav />
      <div className="flex-1">
        <h1>Team Registration</h1>
      </div>
      <Footer/>
    </div>
  )
};

export default TeamRegistration;
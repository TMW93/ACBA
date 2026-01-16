const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <Nav />
      
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero / Top Section */}
        <div className="w-full bg-white dark:bg-gray-900">
          <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative lg:flex lg:justify-between">
              
              {/* Image */}
              <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
                <div className="relative lg:h-auto lg:w-full">
                  <img
                    alt="snow"
                    src={iLoveSnow}
                    className="absolute inset-0 w-full h-full object-cover rounded bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="px-4 sm:px-0 lg:contents">
                <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mx-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
                  <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">09/01/2026</p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                    Announcement
                  </h1>
                  <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
                    Welcome to my basketball sandbox website.
                  </p>
                  <div className="mt-6 max-w-xl text-base/7 text-gray-600 lg:max-w-none dark:text-gray-400">
                    <p>To login, go to /login</p>
                    <p>email: timwong@email.com</p>
                    <p>password: admin123</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Divider />

        {/* Other sections */}
        <section className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Example content */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">08/07/2025</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              New Monday Social C
            </h1>
            <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
              🏀 New Monday Social C Season! 🏀
            </p>
          </div>
        </section>

        <Divider />

        {/* Season tables */}
        <SeasonTable title="2025 Autumn Season" data={autumnSeasonInfo} />
        <Divider />
        <SeasonTable title="2025 Summer Season" data={summerSeasonInfo} />
        <Divider />
      </main>

      <Footer />
    </div>
  );
};

import StudentList from "../components/StudentList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Student CRUD App</h1>
          <a
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            href="#students"
          >
            View Students
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <StudentList />
      </main>

      <footer className="mt-8 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Built with React + Vite + Tailwind CSS
      </footer>
    </div>
  );
};

export default Home;

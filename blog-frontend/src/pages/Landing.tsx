import { useNavigate } from 'react-router-dom'

export function Landing() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold tracking-tight text-indigo-400">BlogHub</div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/login')}
              className="rounded-lg border border-indigo-400/60 px-5 py-2 text-indigo-200 transition hover:bg-indigo-500/20"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-lg bg-indigo-500 px-5 py-2 font-semibold text-white transition hover:bg-indigo-400"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-12 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <span className="mb-6 inline-flex items-center rounded-full border border-indigo-300/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-200">
            Landing
          </span>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            Build, publish and grow your <span className="text-indigo-400">blog faster</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 md:text-xl">
            A cleaner blogging workspace with writing, libraries, and analytics in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="rounded-xl bg-indigo-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-indigo-400"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="rounded-xl border border-slate-600 px-8 py-3 text-lg font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Already have an account?
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold">Why BlogHub</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white/10">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="mb-2 text-xl font-semibold text-white">Write Posts</h3>
              <p className="text-slate-300">Create and publish your thoughts quickly with a clean editor flow.</p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white/10">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="mb-2 text-xl font-semibold text-white">Build Libraries</h3>
              <p className="text-slate-300">Organize posts into collections and keep your ideas discoverable.</p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white/10">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="mb-2 text-xl font-semibold text-white">Secure</h3>
              <p className="text-slate-300">Protected authentication keeps your content and profile safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {currentYear} BlogHub — Landing</p>
        </div>
      </footer>
    </div>
  )
}

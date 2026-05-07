import { Link } from "react-router-dom";

const services = [
  {
    title: "New Customer",
    description: "Register a new client with personal details and onboard them instantly.",
    link: "/create-customer",
    gradient: "from-violet-500 to-indigo-600",
    glow: "rgba(139,92,246,0.35)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: "Open Account",
    description: "Create savings, current or fixed deposit accounts in seconds.",
    link: "/open-account",
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.3)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
      </svg>
    ),
  },
  {
    title: "Transfer Funds",
    description: "Send money between accounts instantly with full audit trail.",
    link: "/transfer",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "View Transactions",
    description: "Browse detailed transaction history for any account.",
    link: "/transactions",
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Manage Accounts",
    description: "Look up all accounts linked to any customer ID.",
    link: "/accounts",
    gradient: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.3)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const stats = [
  { label: "Daily Volume", value: "$1.2M", icon: "💰" },
  { label: "Active Accounts", value: "2,500+", icon: "🏦" },
  { label: "Transfers Today", value: "312", icon: "⚡" },
  { label: "Uptime", value: "99.9%", icon: "🛡️" },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-10">

      {/* ── Hero ── */}
      <section className="relative text-center pt-16 pb-8 overflow-hidden">
        {/* decorative ring */}
        <div
          className="absolute inset-x-0 top-0 flex justify-center pointer-events-none"
          aria-hidden
        >
          <div
            className="w-[800px] h-[400px] rounded-[50%] opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(ellipse,#6366f1 0%,transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300 mb-2"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            System Online · All Services Operational
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05]">
            <span className="text-white">Next-Gen</span>{" "}
            <span className="gradient-text">Banking.</span>
            <br />
            <span className="text-slate-400 font-light text-4xl md:text-5xl">Built for speed.</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Manage customers, accounts, and transactions from a single unified dashboard.
            Secure, fast, and engineered for excellence.
          </p>

          <div className="flex justify-center items-center gap-4 pt-2 flex-wrap">
            <Link to="/accounts" className="btn btn-primary px-7 py-3 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              View Accounts
            </Link>
            <Link to="/transfer" className="btn btn-secondary px-7 py-3 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Quick Transfer
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card text-center group hover:border-indigo-500/20 transition-colors duration-300">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-black text-white tracking-tight">{s.value}</div>
            <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Services ── */}
      <section className="space-y-6">
        <div>
          <h2 className="section-heading">Core Services</h2>
          <p className="section-sub">Everything you need to manage your banking operations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className="group card p-6 hover:scale-[1.02] transition-all duration-300"
              style={{ '--glow': s.glow }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px ${s.glow}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'; }}
            >
              {/* icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 bg-gradient-to-br ${s.gradient}`}
                style={{ boxShadow: `0 4px 16px ${s.glow}` }}
              >
                {s.icon}
              </div>

              <h3 className="text-base font-bold text-white mb-2 group-hover:gradient-text transition-all">
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-slate-600 group-hover:text-indigo-400 transition-colors">
                Get Started
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

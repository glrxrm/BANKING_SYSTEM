import { useState } from "react";
import API from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

const ACCOUNT_TYPES = ["Savings", "Current", "Fixed Deposit", "Student"];

export default function OpenAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_id: "",
    branch_id: "",
    account_type: "Savings",
    balance: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/open-account", form);
      alert("Account opened successfully! Number: " + res.data.account_number);
      navigate("/accounts");
    } catch (err) {
      alert(err.response?.data?.message || "Error opening account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="back-link">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="card-glow overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg,#06b6d4,#2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.35)' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Open New Account</h1>
              <p className="text-sm text-slate-500 mt-0.5">Configure account parameters for a customer</p>
            </div>
          </div>
        </div>

        {/* Account type pills */}
        <div className="px-8 pt-6">
          <label className="label">Account Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {ACCOUNT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({ ...form, account_type: type })}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 text-center
                  ${form.account_type === type
                    ? "border-indigo-500 text-indigo-300"
                    : "border-white/8 text-slate-500 hover:border-white/15 hover:text-slate-300"
                  }`}
                style={form.account_type === type
                  ? { background: 'rgba(99,102,241,0.15)' }
                  : { background: 'rgba(255,255,255,0.02)' }
                }
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="label">Customer ID</label>
              <input name="customer_id" required className="input" placeholder="e.g. 1001" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="label">Branch ID</label>
              <input name="branch_id" required className="input" placeholder="e.g. B01" onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Initial Balance ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">$</span>
              <input
                type="number"
                name="balance"
                required
                min="0"
                step="0.01"
                className="input pl-8"
                placeholder="0.00"
                onChange={handleChange}
              />
            </div>
          </div>

          <input type="hidden" name="account_type" value={form.account_type} />

          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
              {loading ? <><span className="spinner" /> Initializing...</> : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

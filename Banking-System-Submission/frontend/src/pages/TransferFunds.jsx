import { useState } from "react";
import API from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

export default function Transfer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ from_acc: "", to_acc: "", amount: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/transfer", form);
      alert("Transfer successful!");
      navigate("/transactions");
    } catch (err) {
      alert(err.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Link to="/" className="back-link">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="card-glow overflow-hidden">
        {/* Gradient hero header */}
        <div className="relative px-8 py-8 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.1) 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* bg decoration */}
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg,#10b981,#0891b2)', boxShadow: '0 4px 20px rgba(16,185,129,0.4)' }}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Transfer Funds</h1>
              <p className="text-sm text-slate-400 mt-0.5">Instant peer-to-peer bank transfers</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* From / To */}
          <div className="relative">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="label">From Account</label>
                <input name="from_acc" required className="input font-mono" placeholder="Source account number" onChange={handleChange} />
              </div>

              {/* Arrow separator */}
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-emerald-400"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label className="label">To Account</label>
                <input name="to_acc" required className="input font-mono" placeholder="Destination account number" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Amount */}
          <div className="space-y-2">
            <label className="label">Amount to Transfer</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                name="amount"
                required
                min="0.01"
                step="0.01"
                className="input pl-8 text-2xl font-bold tracking-tight"
                placeholder="0.00"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3.5 text-base"
            style={{ background: 'linear-gradient(135deg,#10b981,#0891b2)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
          >
            {loading ? <><span className="spinner" /> Authorizing...</> : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Execute Transfer
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-600">
            Authorized transfers are processed immediately and cannot be instantly reversed.
          </p>
        </form>
      </div>
    </div>
  );
}

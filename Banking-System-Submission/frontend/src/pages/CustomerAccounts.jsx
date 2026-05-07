import { useState } from "react";
import API from "../services/api.js";
import { Link } from "react-router-dom";

function AccountCard({ acc }) {
  return (
    <div className="card p-6 hover:scale-[1.01] transition-transform duration-200 group"
      style={{ background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(255,255,255,0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'; }}
    >
      {/* top row */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <span className="badge badge-green">Active</span>
      </div>

      {/* account number */}
      <div>
        <p className="label mb-1">Account Number</p>
        <p className="font-mono text-lg font-bold text-white tracking-widest">{acc.account_number}</p>
      </div>

      {/* divider */}
      <div className="divider" />

      {/* balance + type */}
      <div className="flex justify-between items-end">
        <div>
          <p className="label mb-1">Balance</p>
          <p className="text-2xl font-black gradient-text">${parseFloat(acc.balance).toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="label mb-1">Type</p>
          <p className="text-sm font-semibold text-slate-300">{acc.account_type || "Standard"}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accounts() {
  const [customerId, setCustomerId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchAccounts = async () => {
    if (!customerId) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await API.get(`/get-customer-account/${customerId}`);
      setAccounts(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Customer not found");
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") fetchAccounts(); };

  return (
    <div className="space-y-10">

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Customer Accounts</h1>
          <p className="section-sub">Query all accounts linked to a specific customer ID</p>
        </div>
        <Link to="/" className="btn btn-secondary text-sm">Return Home</Link>
      </div>

      {/* Search bar */}
      <div className="card-glow p-6">
        <label className="label">Customer ID</label>
        <div className="flex gap-3 mt-2">
          <input
            className="input flex-grow"
            placeholder="Enter customer ID (e.g. 1001)"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={fetchAccounts}
            disabled={loading || !customerId}
            className="btn btn-primary min-w-[140px]"
          >
            {loading
              ? <><span className="spinner" /> Searching</>
              : <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                View Accounts
              </>
            }
          </button>
        </div>
      </div>

      {/* Results */}
      {accounts.length > 0 ? (
        <div>
          <p className="text-xs text-slate-500 mb-4">{accounts.length} account{accounts.length > 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {accounts.map((acc) => <AccountCard key={acc.account_number} acc={acc} />)}
          </div>
        </div>
      ) : searched && !loading && (
        <div className="card py-20 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">No accounts found for customer <span className="text-white font-mono">{customerId}</span></p>
        </div>
      )}
    </div>
  );
}

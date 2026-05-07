import { useState } from "react";
import API from "../services/api.js";
import { Link } from "react-router-dom";

function TxnRow({ t }) {
  const isCredit = t.txn_type === "Credit";
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.025] transition-colors">
      <td className="px-5 py-4 text-sm font-mono text-slate-500">
        #{String(t.transaction_id).slice(-6)}
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isCredit ? "bg-emerald-400" : "bg-amber-400"}`} />
          <span className={`text-xs font-bold ${isCredit ? "text-emerald-400" : "text-amber-400"}`}>
            {t.txn_type}
          </span>
        </div>
      </td>
      <td className="px-5 py-4">
        <span className={`text-sm font-black ${isCredit ? "text-emerald-400" : "text-slate-200"}`}>
          {isCredit ? "+" : "−"}&nbsp;${parseFloat(t.amount).toLocaleString()}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-slate-500">
        {t.txn_date ? new Date(t.txn_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
      </td>
      <td className="px-5 py-4 text-right">
        <span className="badge badge-green">Completed</span>
      </td>
    </tr>
  );
}

export default function Transactions() {
  const [account, setAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchTransactions = async () => {
    if (!account) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await API.get(`/transactions/${account}`);
      setTransactions(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Account not found");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") fetchTransactions(); };

  const totalCredit = transactions.filter(t => t.txn_type === "Credit").reduce((s, t) => s + parseFloat(t.amount), 0);
  const totalDebit = transactions.filter(t => t.txn_type !== "Credit").reduce((s, t) => s + parseFloat(t.amount), 0);

  return (
    <div className="space-y-8">

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Transaction History</h1>
          <p className="section-sub">View all financial activity for a specific account</p>
        </div>
        <Link to="/" className="btn btn-secondary text-sm">Return Home</Link>
      </div>

      {/* Search */}
      <div className="card-glow p-6">
        <label className="label">Account Number</label>
        <div className="flex gap-3 mt-2">
          <input
            className="input flex-grow font-mono"
            placeholder="Enter account number"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={fetchTransactions}
            disabled={loading || !account}
            className="btn btn-primary min-w-[150px]"
          >
            {loading
              ? <><span className="spinner" /> Fetching</>
              : <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Fetch Activity
              </>
            }
          </button>
        </div>
      </div>

      {/* Summary cards (only when data available) */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Transactions", value: transactions.length, color: "text-white", bg: "rgba(99,102,241,0.12)" },
            { label: "Total Credits", value: `+$${totalCredit.toLocaleString()}`, color: "text-emerald-400", bg: "rgba(16,185,129,0.08)" },
            { label: "Total Debits", value: `-$${totalDebit.toLocaleString()}`, color: "text-amber-400", bg: "rgba(245,158,11,0.08)" },
          ].map((s, i) => (
            <div key={i} className="stat-card text-center" style={{ background: s.bg }}>
              <p className="label">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => <TxnRow key={t.transaction_id} t={t} />)}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">
              {searched ? "No transactions found for this account." : "Enter an account number above to view transactions."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

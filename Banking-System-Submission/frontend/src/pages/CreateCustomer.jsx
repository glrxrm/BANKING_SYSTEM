import { useState } from "react";
import API from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

function FormField({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

export default function CreateCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/create-customer", form);
      alert("Customer created successfully! ID: " + res.data.customer_id);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating customer");
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
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', boxShadow: '0 4px 20px rgba(139,92,246,0.4)' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Create Customer</h1>
              <p className="text-sm text-slate-500 mt-0.5">Register a new client in the banking system</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="First Name">
              <input name="first_name" required className="input" placeholder="John" onChange={handleChange} />
            </FormField>
            <FormField label="Last Name">
              <input name="last_name" required className="input" placeholder="Doe" onChange={handleChange} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Date of Birth">
              <input type="date" name="dob" required className="input" onChange={handleChange} />
            </FormField>
            <FormField label="Phone Number">
              <input name="phone" required className="input" placeholder="+91 98765 43210" onChange={handleChange} />
            </FormField>
          </div>

          <FormField label="Address">
            <textarea
              name="address"
              required
              rows="3"
              className="input resize-none"
              placeholder="123 Financial Avenue, Wealth City"
              onChange={handleChange}
            />
          </FormField>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? <><span className="spinner" /> Processing...</> : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Register Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
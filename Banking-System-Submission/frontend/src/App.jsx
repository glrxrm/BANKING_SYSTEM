import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import CreateCustomer from "./pages/CreateCustomer.jsx";
import Accounts from "./pages/CustomerAccounts.jsx";
import OpenAccount from "./pages/OpenAccount.jsx";
import Transactions from "./pages/Transactions.jsx";
import Transfer from "./pages/TransferFunds.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/open-account" element={<OpenAccount />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </main>
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} NexusBank · Professional Banking Platform
          </span>
          <span className="text-xs text-slate-700">All transactions are encrypted & secured.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

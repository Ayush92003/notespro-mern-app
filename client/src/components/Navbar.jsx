import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-600">
            Notes<span className="text-gray-800">Pro</span>
          </h1>
          <p className="text-xs text-gray-500">Your personal knowledge space</p>
        </div>

        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded-md border cursor-pointer border-gray-300 hover:bg-red-50 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

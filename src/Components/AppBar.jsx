import { Link, useLocation } from "react-router-dom";

function AppBar() {
  const { pathname } = useLocation();
  const getLinkClass = (path) => {
    return pathname === path ? "text-[#8c5aff]" : "";
  };
  return (
    <div className="z-40 app-bar bg-[#0f121f] rounded-full w-[92%] m-auto mb-5 shadow-[1px -1px 8px rgba(0,0,0,0.5)]">
      <nav className="app-bar-nav flex justify-around gap-2 relative p-2">
        <Link
          to="/"
          className={`p-2 hover:bg-[#1D1C17] rounded-2xl ${getLinkClass("/")}`}
        >
          <img src="/images/appbar/home.png" alt="home logo" width={28} />
        </Link>
        <Link
          to="/earn"
          className={`p-2 hover:bg-[#1D1C17] rounded-2xl ${getLinkClass(
            "/earn"
          )}`}
        >
          <img src="/images/appbar/task.png" alt="task logo" width={28} />
        </Link>
        <Link to="/store" className="p-2"></Link>
        <Link
          to="/store"
          className={`rounded-2xl absolute bottom-[-24px] w-[128px] h-[128px] ${getLinkClass(
            "/store"
          )}`}
        >
          <img
            src="/images/appbar/store.png"
            alt="store logo"
            className="w-[128px] h-[128px]"
          />
        </Link>
        <Link
          to="/daily-bonus"
          className={`p-2 hover:bg-[#1D1C17] rounded-2xl ${getLinkClass(
            "/daily-bonus"
          )}`}
        >
          <img
            src="/images/appbar/daily_bonus.png"
            alt="daily bonus"
            width={28}
          />
        </Link>
        <Link
          to="/league"
          className={`p-2 hover:bg-[#1D1C17] rounded-2xl ${getLinkClass(
            "/league"
          )}`}
        >
          <img src="/images/appbar/league.png" alt="league logo" width={28} />
        </Link>
      </nav>
    </div>
  );
}

export default AppBar;

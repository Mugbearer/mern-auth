import { Outlet, Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand">You Suck At Coding</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

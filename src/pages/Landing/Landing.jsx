import { useNavigate } from "react-router-dom";
import "./Landing.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faBolt, faLock, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">
          <FontAwesomeIcon icon={faListCheck} /> To - Do List
        </div>
        <nav>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </nav>
      </header>

      <section className="hero">
        <h1>Organize your day, <span className="accent">effortlessly</span>.</h1>
        <p>Stay productive and in control with your personal, secure To-Do manager — built for focus and simplicity.</p>
        <div className="cta-buttons">
          <button onClick={() => navigate("/register")}>Start Now</button>
          <button className="outline" onClick={() => navigate("/login")}>
            Already have an account?
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <FontAwesomeIcon icon={faBolt} className="feature-icon" />
          <h3>Fast & Simple</h3>
          <p>Quickly add, edit, and manage your tasks with a clean and intuitive interface.</p>
        </div>

        <div className="feature">
          <FontAwesomeIcon icon={faLock} className="feature-icon" />
          <h3>Secure by Design</h3>
          <p>Your data is protected with authentication and encrypted storage.</p>
        </div>

        <div className="feature">
          <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
          <h3>Track Progress</h3>
          <p>Visualize your productivity and see how far you've come.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Taskify — Built with ❤️ for productivity</p>
      </footer>
    </div>
  );
}

import "./App.css";
import Important from "./components/important.jsx"; // import the component

const App = () => {
  return (
    <div>
      <nav>
        <div className="logo">
          <img
            src="/nike_PNG12.png"
            alt="Brand Logo"
            style={{ width: "100px", height: "auto" }}
          />
        </div>
        <ul>
          <li><a href="#">Menu</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Location</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <button>Login</button>
      </nav>
      <Important />
    </div>
  );
};

export default App;


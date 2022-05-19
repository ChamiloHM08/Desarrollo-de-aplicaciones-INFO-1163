import logo from './chessBoard.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className = "izquierda">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenido ChessOnline de LongCastling
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </div>
        <div className = "derecha">

      TODO DERECHA

        </div>
      </header>
    </div>
  );
}

export default App;

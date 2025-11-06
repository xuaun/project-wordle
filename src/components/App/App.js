import Game from "../Game";
import Header from "../Header";
import SkipToContent from "../SkipToContent";

function App() {
  return (
    <div className="wrapper">
      <SkipToContent />
      <Header />
      <div className="game-wrapper" id="game-content">
        <Game />
      </div>
    </div>
  );
}

export default App;

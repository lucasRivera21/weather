import "./App.css";
import Header from "./components/Header";
import Body from './components/Body'

function App() {
  return (
    <div className="bg-back h-full dark:bg-slate-800 transition ease-in-out duration-300">
      <Header />
      <Body/>
    </div>
  );
}

export default App;

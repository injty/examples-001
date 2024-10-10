import { Canvas } from "./components/canvas/canvas";

function App() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-1 justify-center items-center px-8 text-white">
        <Canvas />
      </main>
      <footer className="text-white flex-shrink-0 bg-[#1d2128] px-8">11.10.2024</footer>
    </div>
  );
}

export default App;

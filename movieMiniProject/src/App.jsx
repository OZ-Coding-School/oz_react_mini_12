import { useModeStore } from "./store/ModeStore";
import Layout from "./pages/Layout";

function App() {
  const { isDark } = useModeStore();

  localStorage.setItem(`isDark`, isDark);

  return (
    <div
      className={`w-screen h-screen ${
        isDark
          ? `bg-black text-[rgb(253,250,248)]`
          : `bg-[rgb(253,250,248)] text-black`
      }`}
    >
      <Layout />
    </div>
  );
}

export default App;

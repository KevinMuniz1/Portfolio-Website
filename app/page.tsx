
import TypingEffect from "./components/welcomePageName";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-900 to-cyan-900 font-sans">
      <div className="glass-card p-10">
        <TypingEffect />
      </div>
    </div>
  );
}


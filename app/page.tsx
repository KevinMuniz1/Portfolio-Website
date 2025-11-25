
import TypingEffect from "./components/welcomePageName";

export default function Home() {
  return (
    <>
    <section id="welcomeSection" className="bg-cyber-navy">
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 px-4">
        <TypingEffect />
      </div>
    </section>

    <section id="about-section" className="bg-cyber-neon">

    </section>
    </>

  );
}


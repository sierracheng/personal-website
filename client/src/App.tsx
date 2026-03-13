import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { useMagneticCursor } from './hooks/useMagneticCursor';

function AppContent() {
  useMagneticCursor();

  return (
    <>
      {/* Fixed atmospheric background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(8,6,5,0.72) 0%, rgba(15,11,9,0.60) 50%, rgba(5,8,12,0.78) 100%)',
        }} />
      </div>

      <CustomCursor />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <AnimatePresence>
      <AppContent />
    </AnimatePresence>
  );
}

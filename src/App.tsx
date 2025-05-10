
import Biography from './components/Biography';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
    <div className="min-h-screen">
      <div className="space-background" aria-hidden="true" />
      <div className="relative z-10">
      <Navbar />
      <div id="home" className="pt-16">
        <Biography />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      </div>
    </div>
    </LanguageProvider>
  );
}

export default App;

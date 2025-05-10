import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

const getNavItems = (t: (key: string) => string) => [
  { id: 'home', name: t('nav.home') },
  { id: 'projects', name: t('nav.projects') },
  { id: 'contact', name: t('nav.contact') },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const navItems = getNavItems(t);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });

      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
    >
      <motion.div
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/30 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      >
        <div className="flex items-center justify-center px-2 py-2 sm:px-4">
          <div className="flex items-center space-x-3 sm:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 text-sm sm:text-base font-medium transition-all duration-300 relative group rounded-full ${
                  activeSection === item.id
                    ? 'text-blue-400 bg-gray-800/50'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                {item.name}
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100 bg-blue-400' : 'scale-x-0 bg-white group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
            <LanguageToggle />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

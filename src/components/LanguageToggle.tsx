import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { t, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-white font-medium 
                transition-all duration-300 backdrop-blur-sm border border-blue-500/30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {t('nav.language')}
    </motion.button>
  );
};

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CodeBracketIcon, CommandLineIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaPhp, FaGithub, FaLinkedin, FaRobot } from 'react-icons/fa';
import { SiTailwindcss, SiOpenai } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';

const Biography = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      icon: SparklesIcon,
      title: t('biography.skills.aiServices'),
      technologies: [
        { name: "LLM Integration", icon: SiOpenai, color: "text-green-500" },
        { name: "AI Assistants", icon: FaRobot, color: "text-purple-500" },
        { name: "Chatbots", icon: FaRobot, color: "text-blue-500" },
        { name: "AI Automation", icon: SparklesIcon, color: "text-pink-500" }
      ]
    },
    {
      icon: CodeBracketIcon,
      title: t('biography.skills.webDev'),
      technologies: [
        { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
        { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
        { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
        { name: "React", icon: FaReact, color: "text-cyan-400" },
        { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" }
      ]
    },
    {
      icon: CommandLineIcon,
      title: t('biography.skills.backend'),
      technologies: [
        { name: "Python", icon: FaPython, color: "text-blue-500" },
        { name: "PHP", icon: FaPhp, color: "text-indigo-500" }
      ]
    }
  ];

  return (
    <section className="py-20" id="biography">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-blue-500">
            <img
              src="/adonis.jpg"
              alt="Adonis González"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            {t('biography.title')}
          </h1>
          <h2 className="text-2xl text-blue-500 mb-8">
            {t('biography.subtitle')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t('biography.description')}
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://github.com/adonis386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="w-8 h-8" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/adonis386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="w-8 h-8" />
            </motion.a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <skill.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">{skill.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1 bg-gray-700 text-sm text-white rounded-full flex items-center gap-2"
                  >
                    <tech.icon className={`h-4 w-4 ${tech.color}`} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Biography;

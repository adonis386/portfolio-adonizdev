import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaPython, FaDatabase, FaTelegram, FaWhatsapp, FaInstagram, FaPhp, FaQrcode, FaRobot } from 'react-icons/fa';
import { SiDjango, SiTailwindcss, SiJsonwebtokens, SiNextdotjs, SiFastapi, SiFirebase, SiMysql, SiBootstrap, SiOpenai } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import { OptimizedImage } from './OptimizedImage';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

interface Technology {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: Technology[];
  imageUrl: string;
  demoUrl?: string;
  sourceUrl?: string;
}

const Projects = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 5,
      title: "PC Builder AI Assistant",
      description: "Asistente inteligente para construcción de PCs que utiliza IA para recomendar componentes compatibles basados en el presupuesto y necesidades del usuario. Incluye comparación de precios, análisis de rendimiento y guía paso a paso para el ensamblaje.",
      technologies: [
        { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
        { name: "OpenAI", icon: SiOpenai, color: "text-green-500" },
        { name: "React", icon: FaReact, color: "text-cyan-400" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
        { name: "AI Integration", icon: FaRobot, color: "text-purple-500" }
      ],
      imageUrl: "/cgt.webp",
      demoUrl: undefined,
      sourceUrl: undefined
    },
    {
      id: 4,
      title: "Sistema QR - Telven Comunicaciones",
      description: "Sistema de ofertas basado en códigos QR para las tiendas físicas de Telven Comunicaciones. Los clientes pueden escanear códigos QR en la tienda para acceder a ofertas exclusivas y promociones de productos. Sistema implementado localmente en las tiendas.",
      technologies: [
        { name: "PHP", icon: FaPhp, color: "text-indigo-500" },
        { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
        { name: "QR System", icon: FaQrcode, color: "text-gray-200" },
        { name: "Bootstrap", icon: SiBootstrap, color: "text-purple-500" }
      ],
      imageUrl: "/telven.webp",
      demoUrl: undefined,
      sourceUrl: undefined // Proyecto local sin enlace público
    },
    {
      id: 3,
      title: "@denistatuajes - Portfolio Artístico",
      description: "Plataforma personalizada para artista del tatuaje que permite mostrar su trabajo y gestionar citas. Incluye galería de proyectos, sistema de agendamiento vía WhatsApp y panel administrativo para la gestión de contenido.",
      technologies: [
        { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
        { name: "Firebase", icon: SiFirebase, color: "text-yellow-500" },
        { name: "React", icon: FaReact, color: "text-cyan-400" },
        { name: "WhatsApp API", icon: FaWhatsapp, color: "text-green-500" },
        { name: "Instagram API", icon: FaInstagram, color: "text-pink-500" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" }
      ],
      imageUrl: "/denis.webp",
      demoUrl: "https://denis-tatuajes-c897c.web.app/", 
      sourceUrl: "" 
    },
    {
      id: 2,
      title: "Informática González - Desarrollo Web",
      description: "Plataforma empresarial para servicios de desarrollo de sistemas. Integra un formulario de contacto inteligente a través de un bot de Telegram, permitiendo una comunicación directa y eficiente con los clientes potenciales.",
      technologies: [
        { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
        { name: "FastAPI", icon: SiFastapi, color: "text-teal-500" },
        { name: "Python", icon: FaPython, color: "text-blue-500" },
        { name: "Telegram Bot", icon: FaTelegram, color: "text-blue-400" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" }
      ],
      imageUrl: "/logo-1.webp",
      demoUrl: "https://www.informaticagonzalez.com", 
      sourceUrl: "" 
    },
    {
      id: 1,
      title: "Plataforma de Competiciones Freestyle",
      description: "Aplicación web para competidores de freestyle rap. Incluye sistema de rankings, gestión de eventos, perfiles de usuario, y seguimiento de logros. Los usuarios pueden registrarse, buscar competiciones locales y mostrar sus trofeos.",
      technologies: [
        { name: "React", icon: FaReact, color: "text-cyan-400" },
        { name: "Django", icon: SiDjango, color: "text-green-500" },
        { name: "Python", icon: FaPython, color: "text-blue-500" },
        { name: "PostgreSQL", icon: FaDatabase, color: "text-blue-400" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
        { name: "JWT Auth", icon: SiJsonwebtokens, color: "text-pink-500" }
      ],
      imageUrl: "/rap.webp",
      demoUrl: "https://magnificent-vacherin-432a82.netlify.app/", 
      sourceUrl: "" 
    }
  ];

  return (
    <section className="py-20" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-16">{t('projects.title')}</h2>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 h-full"
            >
              <div className="relative h-48">
                <OptimizedImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{t('projects.technologies')}</p>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1 bg-gray-700 text-sm text-white rounded-full flex items-center gap-2"
                    >
                      <tech.icon className={`h-4 w-4 ${tech.color}`} />
                      {tech.name}
                    </span>
                  ))}
                </div>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    {t('projects.viewProject')}
                  </a>
                ) : (
                  <span className="inline-block bg-gray-600 text-gray-300 px-4 py-2 rounded-md cursor-not-allowed">
                    {t('projects.comingSoon')}
                  </span>
                )}
              </div>
            </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Projects;

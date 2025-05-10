import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';

interface FormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const FormInput = ({ label, error, ...props }: any) => (
  <div className="relative w-full mb-6">
    <input
      {...props}
      placeholder=" "
      className={`w-full bg-gray-900/50 text-white px-4 py-3 border-2 ${error ? 'border-red-500' : 'border-blue-500'} 
      focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all duration-300
      rounded-lg backdrop-blur-sm transform perspective-1000 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]
      peer`}
    />
    <label
      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 
      scale-75 top-3 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 
      peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8
      peer-focus:text-cyan-400 pointer-events-none"
    >
      {label}
    </label>
    {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
  </div>
);

function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const text = `
🚀 Nuevo Mensaje de Contacto

👤 Nombre: ${data.name}
📧 Email: ${data.email}
📝 Asunto: ${data.subject}

💬 Mensaje:
${data.message}
`;

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML'
      });

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-gray-300 mb-8">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto p-8 rounded-lg border-2 border-blue-500 bg-gray-900/30 backdrop-blur-md transform perspective-1000 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500"
          >
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">CONTACTO</h2>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-400 text-center">
                Mensajes directos vía <span className="text-[#0088cc] font-semibold">Telegram</span> • Respuesta en 24h
              </p>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            
            <FormInput
              {...register('name', { required: 'El nombre es requerido' })}
              label={t('contact.form.name')}
              error={errors.name}
            />

            <FormInput
              type="email"
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              label={t('contact.form.email')}
              error={errors.email}
            />

            <FormInput
              {...register('subject', { required: 'El asunto es requerido' })}
              label={t('contact.form.subject')}
              error={errors.subject}
            />

            <div className="relative w-full mb-8">
              <textarea
                {...register('message', { required: 'El mensaje es requerido' })}
                rows={4}
                placeholder=" "
                className={`w-full bg-gray-900/50 text-white px-4 py-3 border-2 ${errors.message ? 'border-red-500' : 'border-blue-500'} 
                focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all duration-300
                rounded-lg backdrop-blur-sm resize-none transform perspective-1000 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]
                peer`}
              />
              <label
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-8 
                scale-75 top-3 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8
                peer-focus:text-cyan-400 pointer-events-none"
              >
                MENSAJE
              </label>
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 text-white font-bold rounded-lg relative overflow-hidden group
              bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300
              hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute w-64 h-64 mt-12 group-hover:-rotate-45 group-hover:-mt-24 transition-all duration-1000 bg-white opacity-10"></span>
              <span className="relative">
                {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
              </span>
            </button>
          </form>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-700/30"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-500">{t('contact.form.success')}</h3>
                <p className="text-gray-400 text-center">
                  {t('contact.form.successMessage')} a través de <span className="text-[#0088cc] font-semibold">Telegram</span>.<br/>
                  Te responderé lo antes posible.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500"
            >
              {t('contact.form.error')}. Por favor, intenta nuevamente.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;

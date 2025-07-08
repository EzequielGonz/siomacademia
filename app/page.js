"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import PaymentModal from "./components/PaymentModal";
import Link from "next/link";

export default function Home() {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    course: null,
    amount: null,
  });

  const handlePayment = (course, amount) => {
    setPaymentModal({
      isOpen: true,
      course,
      amount,
    });
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      course: null,
      amount: null,
    });
  };

  return (
    <div className="bg-white text-[#1A237E] font-sans min-h-screen flex flex-col">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full flex justify-between items-center px-6 md:px-12 py-4 bg-[#1A237E] text-white shadow-lg sticky top-0 z-50"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-transparent"
          >
            <Image src="https://i.ibb.co/cKzpSMMx/SIOMACADEMIA-removebg-preview.png" alt="Logo Siom Academia" width={40} height={40} />
          </motion.div>
          <span className="text-xl md:text-2xl font-bold tracking-wide">SIOM Academia</span>
        </div>
        <nav className="hidden md:flex gap-8 text-base font-medium">
          {[
            { label: "Nosotros", href: "#nosotros" },
            { label: "Cursos", href: "/cursos" },
            { label: "Testimonios", href: "#testimonios" },
            { label: "Equipo", href: "#equipo" },
            { label: "Contacto", href: "#contacto" }
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="hover:text-[#FFD700] transition-colors duration-300 relative group"
            >
              {item.label}
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700]"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </motion.header>

      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 bg-gradient-to-br from-[#1A237E] via-[#283593] to-[#64B5F6] text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            Impulsa tu futuro con{" "}
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-[#FFD700]"
            >
              SIOM Academia
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Cursos de alta calidad para potenciar tu desarrollo profesional y personal. 
            Aprende con expertos y forma parte de nuestra comunidad de éxito.
          </motion.p>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a 
              href="/cursos" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFD700] text-[#1A237E] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-[#1A237E] transition-all duration-300"
            >
              Ver Cursos
            </motion.a>
            <motion.a 
              href="#contacto" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#1A237E] transition-all duration-300"
            >
              Contactar
            </motion.a>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </motion.section>

      {/* Sobre Nosotros */}
      <section id="nosotros" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Sobre Nosotros
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Somos una empresa dedicada a la formación profesional, brindando cursos innovadores 
              y actualizados. Nuestro objetivo es ayudarte a alcanzar tus metas a través de la 
              educación de calidad y el acompañamiento personalizado.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "Educación de Calidad",
                description: "Contenidos actualizados y metodologías innovadoras para un aprendizaje efectivo."
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Acompañamiento Personal",
                description: "Seguimiento individualizado para maximizar tu potencial y alcanzar tus objetivos."
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Resultados Garantizados",
                description: "Metodología probada que asegura el desarrollo de habilidades y competencias."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-[#F5F7FA] to-white shadow-lg"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-[#1A237E] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A237E]">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Nuestros Cursos
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubre nuestra amplia gama de cursos diseñados para impulsar tu carrera profesional
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Liderazgo Estratégico",
                description: "Desarrolla tus habilidades de liderazgo y gestión de equipos con expertos en la materia. Aprende técnicas modernas de motivación y dirección.",
                price: 299
              },
              {
                icon: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2",
                title: "Marketing Digital",
                description: "Aprende las estrategias más efectivas para posicionar tu marca en el mundo digital. Desde redes sociales hasta SEO avanzado.",
                price: 399
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                title: "Finanzas Personales",
                description: "Gestiona tus finanzas y alcanza la libertad financiera con nuestros especialistas. Aprende inversión, ahorro y planificación.",
                price: 249
              }
            ].map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#FFD700] hover:shadow-2xl transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#1A237E] to-[#283593] rounded-xl flex items-center justify-center mb-6"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={course.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-[#1A237E]">{course.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                <div className="flex justify-between items-center">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-2xl font-bold text-[#FFD700]"
                  >
                    ${course.price}
                  </motion.span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePayment(course.title, course.price)}
                    className="bg-[#1A237E] text-white px-6 py-2 rounded-lg hover:bg-[#283593] transition-colors duration-300"
                  >
                    Inscribirse
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/cursos" className="bg-[#FFD700] text-[#1A237E] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-[#1A237E] transition-all duration-300">
              Ver Cursos
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Lo que dicen nuestros estudiantes
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María López",
                role: "Gerente de Marketing",
                testimonial: "Gracias a SIOM Academia logré avanzar en mi carrera profesional. Los cursos son excelentes y el equipo muy atento. Recomiendo totalmente.",
                initial: "M"
              },
              {
                name: "Juan Pérez",
                role: "Emprendedor",
                testimonial: "La calidad de los contenidos y la atención personalizada hacen la diferencia. Los instructores son expertos en sus campos. ¡Recomendado!",
                initial: "J"
              },
              {
                name: "Ana Torres",
                role: "Consultora",
                testimonial: "Excelente metodología y contenidos actualizados. El seguimiento personalizado me ayudó a alcanzar mis objetivos profesionales.",
                initial: "A"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-[#F5F7FA] to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-[#1A237E] rounded-full flex items-center justify-center mr-4"
                  >
                    <span className="text-white font-bold text-lg">{testimonial.initial}</span>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-[#1A237E]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">{testimonial.testimonial}</p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  className="flex text-[#FFD700] mt-4"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section id="equipo" className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Nuestro Equipo
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conoce a los expertos que harán posible tu crecimiento profesional
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Torres",
                role: "Directora General",
                description: "Más de 15 años de experiencia en formación profesional y desarrollo de talento.",
                initial: "A"
              },
              {
                name: "Carlos Ruiz",
                role: "Instructor Senior",
                description: "Especialista en liderazgo y gestión empresarial con certificaciones internacionales.",
                initial: "C"
              },
              {
                name: "Lucía Gómez",
                role: "Coordinadora Académica",
                description: "Experta en metodologías educativas y seguimiento personalizado de estudiantes.",
                initial: "L"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-br from-[#1A237E] to-[#283593] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <span className="text-white font-bold text-2xl">{member.initial}</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-[#1A237E]">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Contáctanos
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              ¿Listo para comenzar tu transformación? Ponte en contacto con nosotros
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#1A237E]">Información de Contacto</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    title: "Teléfono",
                    value: "+1 (555) 123-4567"
                  },
                  {
                    icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    title: "Email",
                    value: "info@siomacademia.com"
                  },
                  {
                    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                    title: "Dirección",
                    value: "Av. Principal 123, Ciudad"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-center"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 bg-[#1A237E] rounded-full flex items-center justify-center mr-4"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="font-semibold text-[#1A237E]">{contact.title}</p>
                      <p className="text-gray-600">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
              onSubmit={e => {
                e.preventDefault();
                const form = e.target;
                const nombre = form.nombre.value.trim();
                const email = form.email.value.trim();
                const mensaje = form.mensaje.value.trim();
                const newsletter = form.newsletter.checked;
                let error = '';
                if (!nombre) error = 'Por favor ingresa tu nombre.';
                else if (!email || !/^\S+@\S+\.\S+$/.test(email)) error = 'Por favor ingresa un email válido.';
                else if (!mensaje) error = 'Por favor escribe tu mensaje.';
                if (error) {
                  form.querySelector('.form-error').textContent = error;
                  form.querySelector('.form-success').textContent = '';
                } else {
                  form.querySelector('.form-error').textContent = '';
                  form.querySelector('.form-success').textContent = '¡Mensaje enviado correctamente!';
                  form.reset();
                }
              }}
            >
              {[
                { type: "text", label: "Nombre completo", placeholder: "Tu nombre", name: "nombre" },
                { type: "email", label: "Email", placeholder: "tu@email.com", name: "email" }
              ].map((field, index) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-[#1A237E] mb-2" htmlFor={field.name}>{field.label}</label>
                  <input 
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
                    placeholder={field.placeholder}
                    required
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-[#1A237E] mb-2" htmlFor="mensaje">Mensaje</label>
                <textarea 
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A237E] focus:border-transparent"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <input type="checkbox" id="newsletter-contact" name="newsletter" className="accent-[#FFD700]" />
                <label htmlFor="newsletter-contact" className="text-sm text-gray-700 select-none cursor-pointer">Suscribirme al newsletter</label>
              </motion.div>
              <div className="form-error text-red-600 text-sm font-semibold"></div>
              <div className="form-success text-green-600 text-sm font-semibold"></div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-[#1A237E] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#283593] transition-colors duration-300"
              >
                Enviar Mensaje
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes (FAQ) */}
      <section id="faq" className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Preguntas Frecuentes
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Resuelve tus dudas sobre nuestros cursos, pagos y servicios.
            </p>
          </motion.div>
          <div className="space-y-6">
            {[
              {
                question: "¿Cómo me inscribo en un curso?",
                answer: "Simplemente haz clic en 'Inscribirse' en el curso de tu interés y sigue los pasos para completar el pago."
              },
              {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos PayPal, Mercado Pago y tarjetas de crédito/débito."
              },
              {
                question: "¿Recibiré un certificado al finalizar?",
                answer: "Sí, todos nuestros cursos incluyen certificado digital de finalización."
              },
              {
                question: "¿Puedo acceder a los cursos en cualquier momento?",
                answer: "Sí, el acceso es 24/7 y puedes avanzar a tu propio ritmo."
              }
            ].map((faq, index) => (
              <motion.details
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer group"
              >
                <summary className="font-semibold text-[#1A237E] text-lg flex items-center justify-between group-open:text-[#FFD700] transition-colors">
                  {faq.question}
                  <span className="ml-2 text-[#FFD700] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Noticias */}
      <section id="blog" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A237E]">
              Blog & Noticias
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-[#FFD700] mx-auto mb-8"
            />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Novedades, consejos y recursos para tu desarrollo profesional.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "5 consejos para potenciar tu aprendizaje online",
                excerpt: "Descubre cómo aprovechar al máximo los cursos virtuales y mantener la motivación.",
                date: "10/06/2024"
              },
              {
                title: "Tendencias en liderazgo para 2024",
                excerpt: "Las habilidades más demandadas y cómo desarrollarlas en el mundo actual.",
                date: "05/06/2024"
              },
              {
                title: "¿Por qué certificarte con SIOM Academia?",
                excerpt: "Ventajas de obtener un certificado reconocido y cómo impacta en tu carrera.",
                date: "01/06/2024"
              }
            ].map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-[#F5F7FA] to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1A237E]">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-[#FFD700] font-semibold hover:underline">Leer más</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#1A237E] text-white py-16 mt-auto"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <span className="text-[#1A237E] font-bold">S</span>
                </div>
                <span className="text-xl font-bold">SIOM Academia</span>
              </motion.div>
              <p className="text-gray-300 text-sm mb-6">
                Formación profesional de calidad para impulsar tu carrera y desarrollo personal.
              </p>
              {/* Newsletter */}
              <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); alert('¡Gracias por suscribirte!'); }}>
                <label htmlFor="newsletter" className="text-sm font-semibold">Suscríbete al newsletter</label>
                <div className="flex">
                  <input id="newsletter" type="email" required placeholder="Tu email" className="px-3 py-2 rounded-l-lg text-[#1A237E] focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full" />
                  <button type="submit" className="bg-[#FFD700] text-[#1A237E] px-4 py-2 rounded-r-lg font-bold hover:bg-white transition-colors">Suscribirse</button>
                </div>
              </form>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Cursos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {[
                  { name: "Liderazgo", href: "#cursos" },
                  { name: "Marketing Digital", href: "#cursos" },
                  { name: "Finanzas", href: "#cursos" },
                  { name: "Desarrollo Personal", href: "#cursos" }
                ].map((course, index) => (
                  <motion.li
                    key={course.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a href={course.href} className="hover:text-[#FFD700] transition-colors focus:outline-none focus:underline">{course.name}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {[
                  { name: "Sobre Nosotros", href: "#nosotros" },
                  { name: "Nuestro Equipo", href: "#equipo" },
                  { name: "Testimonios", href: "#testimonios" },
                  { name: "Contacto", href: "#contacto" }
                ].map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a href={item.href} className="hover:text-[#FFD700] transition-colors focus:outline-none focus:underline">{item.name}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4 mb-6">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/siom_academia", icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="#FFD700"/></svg>
                  ) },
                  { name: "LinkedIn", href: "#", icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" strokeWidth="2"/><path d="M8 11v5M8 8v.01M16 16v-3a4 4 0 0 0-8 0v3" strokeWidth="2"/></svg>
                  ) },
                  { name: "Facebook", href: "#", icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" strokeWidth="2"/><path d="M16 8a6 6 0 0 1-12 0" strokeWidth="2"/></svg>
                  ) }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              {/* Mapa de ubicación */}
              <div className="rounded-lg overflow-hidden shadow-lg border-2 border-[#FFD700]">
                <iframe
                  title="Ubicación SIOM Academia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019234!2d-58.3816!3d-34.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzEzLjMiUyA1OMKwMjInNTMuOCJX!5e0!3m2!1ses-419!2sar!4v1686170000000!5m2!1ses-419!2sar"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 pt-8 text-center"
          >
            <p className="text-sm text-gray-300">
              © 2024 SIOM Academia. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Modal de Pago */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        course={paymentModal.course}
        amount={paymentModal.amount}
      />
    </div>
  );
}

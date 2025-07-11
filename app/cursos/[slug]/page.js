"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import PaymentModal from "../../components/PaymentModal";

const opinionesSimuladas = [
  {
    nombre: "María López",
    estrellas: 5,
    comentario: "Excelente curso, aprendí muchísimo y los docentes son muy atentos.",
  },
  {
    nombre: "Juan Pérez",
    estrellas: 4,
    comentario: "Muy buen contenido y bien explicado. Lo recomiendo.",
  },
  {
    nombre: "Ana Torres",
    estrellas: 5,
    comentario: "Me encantó la dinámica y el temario. Superó mis expectativas.",
  },
];

const beneficios = [
  "Acceso de por vida",
  "Certificado de finalización",
  "Proyectos prácticos",
  "Soporte del instructor",
  "Comunidad de estudiantes",
  "Recursos descargables",
  "Actualizaciones gratuitas"
];

const aprendizajes = [
  "Crear aplicaciones web completas con React y Node.js",
  "Manejar bases de datos con MongoDB",
  "Desplegar aplicaciones en la nube",
  "Trabajar con herramientas profesionales",
  "Implementar APIs RESTful profesionales",
  "Aplicar mejores prácticas de código",
  "Implementar autenticación y autorización",
  "Construir un portafolio impresionante"
];

export default function DetalleCurso() {
  const { slug } = useParams();
  const router = useRouter();
  const [curso, setCurso] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [tab, setTab] = useState("descripcion");
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

  useEffect(() => {
    fetch("/api/cursos")
      .then(res => res.json())
      .then(data => {
        const cursos = Array.isArray(data.cursos) ? data.cursos : [];
        const encontrado = cursos.find(c => c.nombre.toLowerCase().replace(/ /g, "-") === slug);
        setCurso(encontrado);
        setFavorito(
          typeof window !== "undefined" && localStorage.getItem("favoritos-cursos")
            ? JSON.parse(localStorage.getItem("favoritos-cursos")).includes(slug)
            : false
        );
      });
  }, [slug]);

  const toggleFavorito = () => {
    if (!curso) return;
    let favs = [];
    if (typeof window !== "undefined" && localStorage.getItem("favoritos-cursos")) {
      favs = JSON.parse(localStorage.getItem("favoritos-cursos"));
    }
    if (favorito) {
      favs = favs.filter(f => f !== slug);
    } else {
      favs.push(slug);
    }
    localStorage.setItem("favoritos-cursos", JSON.stringify(favs));
    setFavorito(!favorito);
  };

  if (!curso) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando curso...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fafd]">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="https://i.ibb.co/cKzpSMMx/SIOMACADEMIA-removebg-preview.png" alt="Logo Siom Academia" width={40} height={40} />
          <span className="text-xl md:text-2xl font-bold tracking-wide text-[#1A237E]">Siom Academia</span>
        </div>
        <nav className="hidden md:flex gap-8 text-base font-medium">
          <a href="/" className="text-[#1A237E] hover:text-[#FFD700] transition-colors">Inicio</a>
          <a href="/cursos" className="text-[#1A237E] hover:text-[#FFD700] transition-colors">Cursos</a>
          <a href="/#testimonios" className="text-[#1A237E] hover:text-[#FFD700] transition-colors">Testimonios</a>
          <a href="/#contacto" className="text-[#1A237E] hover:text-[#FFD700] transition-colors">Contacto</a>
        </nav>
        <button onClick={() => router.push('/cursos')} className="text-white bg-[#FFD700] px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#1A237E] border border-[#FFD700] transition-colors">Volver a cursos</button>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 md:px-0 pt-8 pb-2 text-sm text-gray-500 flex items-center gap-2">
        <a href="/" className="hover:underline">Inicio</a>
        <span>/</span>
        <a href="/cursos" className="hover:underline">Cursos</a>
        <span>/</span>
        <span className="text-[#1A237E] font-semibold">{curso.nombre}</span>
      </div>

      {/* Banner imagen grande */}
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-8 flex items-center justify-center bg-gray-100">
          <Image src={curso.imagen} alt={curso.nombre} width={800} height={320} className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col lg:flex-row gap-8">
        {/* Columna principal */}
        <div className="flex-1">
          {/* Título y meta info */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-[#E3F2FD] text-[#1A237E] px-3 py-1 rounded-full text-xs font-semibold">{curso.categoria}</span>
              <span className="bg-[#FFF8E1] text-[#FFA000] px-3 py-1 rounded-full text-xs font-semibold">{curso.nivel}</span>
              <span className="bg-[#FFD700] text-[#1A237E] px-3 py-1 rounded-full text-xs font-semibold">Bestseller</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A237E] mb-2">{curso.nombre}</h1>
            <p className="text-lg text-gray-700 mb-2">{curso.descripcion}</p>
            <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-2">
              <span>⭐ 4.9 (1247 valoraciones)</span>
              <span>2,340 estudiantes</span>
              <span>{curso.duracion}</span>
              <span>Español</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200 flex gap-4">
            <button onClick={() => setTab("descripcion")} className={`py-2 px-4 font-semibold ${tab === "descripcion" ? "border-b-2 border-[#FFD700] text-[#1A237E]" : "text-gray-500"}`}>Descripción</button>
            <button onClick={() => setTab("contenido")} className={`py-2 px-4 font-semibold ${tab === "contenido" ? "border-b-2 border-[#FFD700] text-[#1A237E]" : "text-gray-500"}`}>Contenido</button>
            <button onClick={() => setTab("opiniones")} className={`py-2 px-4 font-semibold ${tab === "opiniones" ? "border-b-2 border-[#FFD700] text-[#1A237E]" : "text-gray-500"}`}>Reseñas</button>
          </div>

          {/* Contenido de los tabs */}
          {tab === "descripcion" && (
            <div>
              <h2 className="text-xl font-bold text-[#1A237E] mb-4">Descripción del Curso</h2>
              <p className="text-gray-700 mb-6">Aprende a crear aplicaciones web completas y escalables utilizando las tecnologías más demandadas del mercado. Este curso te llevará desde los fundamentos hasta conceptos avanzados, con proyectos reales que podrás incluir en tu portafolio profesional.</p>
              <h3 className="text-lg font-semibold text-[#1A237E] mb-2">Lo que aprenderás</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {aprendizajes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-green-700"><span>✔️</span> {item}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-[#1A237E] mb-2">Este curso incluye:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {beneficios.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-blue-700"><span>🎓</span> {item}</li>
                ))}
              </ul>
            </div>
          )}
          {tab === "contenido" && (
            <div>
              <h2 className="text-xl font-bold text-[#1A237E] mb-4">Temario del Curso</h2>
              <ul className="list-disc list-inside text-gray-700 text-base mb-6">
                {curso.temario.map((tema, i) => (
                  <li key={i}>{tema}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-[#1A237E] mb-2">Docentes</h3>
              <ul className="list-disc list-inside text-gray-700 text-base">
                {curso.docentes.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
          {tab === "opiniones" && (
            <div>
              <h2 className="text-xl font-bold text-[#1A237E] mb-4">Opiniones de alumnos</h2>
              <div className="space-y-4">
                {opinionesSimuladas.map((op, i) => (
                  <div key={i} className="bg-[#F5F7FA] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#1A237E]">{op.nombre}</span>
                      <span className="flex text-[#FFD700]">
                        {Array.from({ length: op.estrellas }).map((_, j) => (
                          <span key={j}>★</span>
                        ))}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{op.comentario}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Panel lateral */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 sticky top-28">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold text-[#1A237E]">${Math.round(299 * (1 - (curso.descuento || 0) / 100))}</span>
              {curso.descuento > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">${299}</span>
                  <span className="ml-2 bg-[#FFD700] text-[#1A237E] px-2 py-1 rounded text-xs font-bold">{curso.descuento}% de descuento</span>
                </>
              )}
            </div>
            <button
              className="w-full bg-[#FFD700] text-[#1A237E] font-bold py-3 rounded-xl mt-2 hover:bg-[#ffe066] transition-colors text-lg mb-2"
              onClick={() => handlePayment(curso.nombre, Math.round(299 * (1 - (curso.descuento || 0) / 100)))}
            >
              Inscribirse Ahora
            </button>
            <button className="w-full border-2 border-[#1A237E] text-[#1A237E] font-bold py-3 rounded-xl hover:bg-[#1A237E] hover:text-white transition-colors text-lg mb-2">Agregar al Carrito</button>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Garantía de devolución 30 días</span>
              <span className="cursor-pointer" onClick={toggleFavorito}>{favorito ? "❤️ Favorito" : "🤍 Favorito"}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 bg-gray-100 rounded-lg py-2 text-sm font-semibold hover:bg-gray-200 transition-colors">Compartir</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-semibold text-[#1A237E] mb-4">Detalles del curso</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              <li><b>Nivel:</b> {curso.nivel}</li>
              <li><b>Duración:</b> {curso.duracion}</li>
              <li><b>Idioma:</b> Español</li>
              <li><b>Certificado:</b> Sí</li>
              <li><b>Última actualización:</b> Diciembre 2024</li>
            </ul>
          </div>
        </aside>
        <PaymentModal
          isOpen={paymentModal.isOpen}
          onClose={closePaymentModal}
          course={paymentModal.course}
          amount={paymentModal.amount}
        />
      </div>
    </div>
  );
} 
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import PaymentModal from "../components/PaymentModal";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

const categorias = [
  "Todos", "Liderazgo", "Marketing", "Finanzas", "Desarrollo Personal"
];

const ORDENES = [
  { label: "Nombre (A-Z)", value: "nombre-asc" },
  { label: "Nombre (Z-A)", value: "nombre-desc" },
  { label: "Precio (menor a mayor)", value: "precio-asc" },
  { label: "Precio (mayor a menor)", value: "precio-desc" },
  { label: "Duración (menor a mayor)", value: "duracion-asc" },
  { label: "Duración (mayor a menor)", value: "duracion-desc" },
];

export default function Cursos() {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    course: null,
    amount: null,
  });
  const [busqueda, setBusqueda] = useState("");
  const [nivel, setNivel] = useState("Todos");
  const [categoria, setCategoria] = useState("Todos");
  const [duracion, setDuracion] = useState("Todos");
  const [cursosData, setCursosData] = useState([]);
  const [niveles, setNiveles] = useState(["Todos"]);
  const [duraciones, setDuraciones] = useState(["Todos"]);
  const [orden, setOrden] = useState("nombre-asc");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(6);
  const PRECIO_BASE = 120000;

  // Fetch cursos desde la API
  useEffect(() => {
    const params = new URLSearchParams();
    if (nivel !== "Todos") params.append("nivel", nivel);
    if (duracion !== "Todos") params.append("duracion", duracion);
    if (categoria !== "Todos") params.append("categoria", categoria);
    if (busqueda) params.append("busqueda", busqueda);
    if (orden) params.append("orden", orden);
    if (pagina) params.append("pagina", pagina);
    if (porPagina) params.append("porPagina", porPagina);
    fetch(`/api/cursos?${params.toString()}`)
      .then(res => res.json())
      .then(data => setCursosData(Array.isArray(data.cursos) ? data.cursos : []));
  }, [nivel, duracion, categoria, busqueda, orden, pagina, porPagina]);

  // Ordenar cursos
  const cursosOrdenados = useMemo(() => {
    let arr = [...cursosData];
    switch (orden) {
      case "nombre-asc":
        arr.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      case "nombre-desc":
        arr.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
      case "precio-asc":
        arr.sort((a, b) => {
          const pa = a.descuento > 0 ? Math.round(PRECIO_BASE * (1 - a.descuento / 100)) : PRECIO_BASE;
          const pb = b.descuento > 0 ? Math.round(PRECIO_BASE * (1 - b.descuento / 100)) : PRECIO_BASE;
          return pa - pb;
        }); break;
      case "precio-desc":
        arr.sort((a, b) => {
          const pa = a.descuento > 0 ? Math.round(PRECIO_BASE * (1 - a.descuento / 100)) : PRECIO_BASE;
          const pb = b.descuento > 0 ? Math.round(PRECIO_BASE * (1 - b.descuento / 100)) : PRECIO_BASE;
          return pb - pa;
        }); break;
      case "duracion-asc":
        arr.sort((a, b) => parseInt(a.duracion) - parseInt(b.duracion)); break;
      case "duracion-desc":
        arr.sort((a, b) => parseInt(b.duracion) - parseInt(a.duracion)); break;
      default: break;
    }
    return arr;
  }, [cursosData, orden]);

  // Paginación
  const totalPaginas = Math.ceil(cursosOrdenados.length / porPagina);
  const cursosPagina = cursosOrdenados.slice((pagina - 1) * porPagina, pagina * porPagina);

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
            { label: "Inicio", href: "/" },
            { label: "Cursos", href: "/cursos" },
            { label: "Contacto", href: "/#contacto" }
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
      </motion.header>

      <main className="flex-1 py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#F5F7FA] to-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1A237E]">Nuestros Cursos</h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-[#FFD700] mx-auto mb-8"
          />
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Elige el curso que más se adapte a tus objetivos y potencia tu futuro profesional.
          </p>
        </motion.div>
        {/* Filtros, búsqueda y ordenamiento */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center items-center">
          <input
            type="text"
            placeholder="Buscar por nombre, temario o docente..."
            value={busqueda}
            onChange={e => { setBusqueda(e.target.value); setPagina(1); }}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] min-w-[220px]"
          />
          <select value={nivel} onChange={e => { setNivel(e.target.value); setPagina(1); }} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
            {niveles.map(n => <option key={n}>{n}</option>)}
          </select>
          <select value={duracion} onChange={e => { setDuracion(e.target.value); setPagina(1); }} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
            {duraciones.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={categoria} onChange={e => { setCategoria(e.target.value); setPagina(1); }} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
            {categorias.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={orden} onChange={e => { setOrden(e.target.value); setPagina(1); }} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
            {ORDENES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={porPagina} onChange={e => { setPorPagina(Number(e.target.value)); setPagina(1); }} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
            {[6, 9, 12, 18].map(n => <option key={n} value={n}>{n} por página</option>)}
          </select>
        </div>
        {/* Cursos paginados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cursosPagina.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">No se encontraron cursos con esos criterios.</div>
          )}
          {cursosPagina.map((curso, idx) => {
            const precioFinal = curso.descuento > 0 ? Math.round(PRECIO_BASE * (1 - curso.descuento / 100)) : PRECIO_BASE;
            const slug = curso.nombre.toLowerCase().replace(/ /g, "-");
            return (
              <motion.div
                key={curso.nombre}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#FFD700] hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <Link href={`/cursos/${slug}`} className="block group">
                  <div className="flex justify-center mb-6">
                    <Image src={curso.imagen} alt={curso.nombre} width={64} height={64} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-[#1A237E] group-hover:underline">{curso.nombre}</h2>
                </Link>
                <p className="text-gray-600 mb-4">{curso.descripcion}</p>
                <div className="flex flex-wrap gap-3 mb-2 text-sm">
                  <span className="bg-[#F5F7FA] text-[#1A237E] px-3 py-1 rounded-full">Duración: {curso.duracion}</span>
                  <span className="bg-[#F5F7FA] text-[#1A237E] px-3 py-1 rounded-full">Nivel: {curso.nivel}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-[#1A237E]">Temario:</span>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {curso.temario.map((tema, i) => (
                      <li key={i}>{tema}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-[#1A237E]">Docentes:</span>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {curso.docentes.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {curso.descuento > 0 && (
                    <span className="bg-[#FFD700] text-[#1A237E] font-bold px-3 py-1 rounded-full text-sm animate-pulse">
                      {curso.descuento}% OFF
                    </span>
                  )}
                  <span className="text-2xl font-bold text-[#FFD700]">
                    ${precioFinal.toLocaleString("es-AR")} ARS
                  </span>
                  {curso.descuento > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      ${PRECIO_BASE.toLocaleString("es-AR")} ARS
                    </span>
                  )}
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePayment(curso.nombre, precioFinal)}
                  className="bg-[#1A237E] text-white px-6 py-2 rounded-lg hover:bg-[#283593] transition-colors duration-300 font-semibold mt-auto"
                >
                  Comprar
                </motion.button>
              </motion.div>
            );
          })}
        </div>
        {/* Controles de paginación */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1} className="px-3 py-1 rounded bg-[#1A237E] text-white disabled:bg-gray-300">Anterior</button>
          <span className="mx-2">Página {pagina} de {totalPaginas}</span>
          <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas} className="px-3 py-1 rounded bg-[#1A237E] text-white disabled:bg-gray-300">Siguiente</button>
        </div>
      </main>
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        course={paymentModal.course}
        amount={paymentModal.amount}
      />
    </div>
  );
} 
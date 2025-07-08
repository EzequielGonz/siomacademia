"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

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

export default function DetalleCurso() {
  const { slug } = useParams();
  const router = useRouter();
  const [curso, setCurso] = useState(null);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    fetch("/api/cursos")
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find(c => c.nombre.toLowerCase().replace(/ /g, "-") === slug);
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white py-12 px-4 md:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <Image src={curso.imagen} alt={curso.nombre} width={96} height={96} className="rounded-xl" />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A237E] mb-2">{curso.nombre}</h1>
            <p className="text-gray-600 mb-2">{curso.descripcion}</p>
            <div className="flex flex-wrap gap-3 mb-2 text-sm">
              <span className="bg-[#F5F7FA] text-[#1A237E] px-3 py-1 rounded-full">Duración: {curso.duracion}</span>
              <span className="bg-[#F5F7FA] text-[#1A237E] px-3 py-1 rounded-full">Nivel: {curso.nivel}</span>
              <span className="bg-[#F5F7FA] text-[#1A237E] px-3 py-1 rounded-full">Categoría: {curso.categoria}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-[#1A237E]">Docentes:</span>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                {curso.docentes.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFavorito}
                className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors duration-300 flex items-center gap-2 ${favorito ? 'bg-[#FFD700] text-[#1A237E] border-[#FFD700]' : 'bg-white text-[#1A237E] border-[#FFD700]'}`}
              >
                {favorito ? '★ Favorito' : '☆ Marcar Favorito'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Simulación de compra')}
                className="bg-[#1A237E] text-white px-6 py-2 rounded-lg hover:bg-[#283593] transition-colors duration-300 font-semibold"
              >
                Comprar
              </motion.button>
              <button onClick={() => router.back()} className="ml-2 text-sm text-gray-500 underline">Volver</button>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#1A237E] mb-2">Temario</h2>
          <ul className="list-disc list-inside text-gray-700 text-base">
            {curso.temario.map((tema, i) => (
              <li key={i}>{tema}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1A237E] mb-2">Opiniones de alumnos</h2>
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
      </div>
    </div>
  );
} 
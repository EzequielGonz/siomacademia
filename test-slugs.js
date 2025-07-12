// Script de prueba para verificar la generación de slugs
const cursos = [
  "Liderazgo Estratégico",
  "Marketing Digital", 
  "Finanzas Personales",
  "Desarrollo Personal",
  "Programación Web Full Stack",
  "Diseño Gráfico Profesional",
  "Inglés para Negocios"
];

console.log("Prueba de generación de slugs:");
cursos.forEach(curso => {
  const slug = curso.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  console.log(`${curso} -> ${slug}`);
}); 
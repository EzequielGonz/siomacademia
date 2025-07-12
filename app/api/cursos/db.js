const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'cursos.db');
const db = new Database(dbPath);

// Crear tabla y poblar si no existe
const init = () => {
  db.exec(`CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    imagen TEXT,
    descuento INTEGER,
    duracion TEXT,
    nivel TEXT,
    temario TEXT,
    docentes TEXT,
    categoria TEXT
  )`);
  
  const count = db.prepare('SELECT COUNT(*) as count FROM cursos').get();
  if (count.count === 0) {
    const cursosEjemplo = [
      {
        nombre: "Liderazgo Estratégico",
        descripcion: "Desarrolla habilidades de liderazgo y gestión de equipos con expertos. Incluye casos prácticos y mentoría.",
        imagen: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
        descuento: 20,
        duracion: "8 semanas",
        nivel: "Avanzado",
        temario: JSON.stringify(["Fundamentos del liderazgo", "Gestión de equipos", "Toma de decisiones", "Mentoría y coaching"]),
        docentes: JSON.stringify(["Dra. Ana Torres", "Lic. Carlos Ruiz"]),
        categoria: "Liderazgo"
      },
      {
        nombre: "Marketing Digital",
        descripcion: "Aprende estrategias efectivas para posicionar tu marca en el mundo digital. Incluye SEO, redes y campañas.",
        imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        descuento: 0,
        duracion: "6 semanas",
        nivel: "Intermedio",
        temario: JSON.stringify(["SEO y SEM", "Redes sociales", "Email marketing", "Analítica digital"]),
        docentes: JSON.stringify(["Mg. Lucía Gómez"]),
        categoria: "Marketing"
      },
      {
        nombre: "Finanzas Personales",
        descripcion: "Gestiona tus finanzas y alcanza la libertad financiera. Incluye inversión, ahorro y planificación.",
        imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
        descuento: 10,
        duracion: "5 semanas",
        nivel: "Básico",
        temario: JSON.stringify(["Presupuesto personal", "Ahorro e inversión", "Créditos y deudas", "Planificación financiera"]),
        docentes: JSON.stringify(["Lic. Juan Pérez"]),
        categoria: "Finanzas"
      },
      {
        nombre: "Desarrollo Personal",
        descripcion: "Potencia tu crecimiento personal y profesional con herramientas de autoconocimiento y coaching.",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        descuento: 15,
        duracion: "4 semanas",
        nivel: "Todos los niveles",
        temario: JSON.stringify(["Autoconocimiento", "Gestión emocional", "Comunicación efectiva", "Coaching personal"]),
        docentes: JSON.stringify(["Dra. Ana Torres"]),
        categoria: "Desarrollo Personal"
      },
      // Más cursos variados...
      {
        nombre: "Programación Web Full Stack",
        descripcion: "Aprende a crear aplicaciones web modernas con JavaScript, Node.js y React.",
        imagen: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        descuento: 25,
        duracion: "12 semanas",
        nivel: "Avanzado",
        temario: JSON.stringify(["HTML/CSS", "JavaScript", "Node.js", "React", "APIs REST"]),
        docentes: JSON.stringify(["Ing. Pablo Díaz"]),
        categoria: "Programación"
      },
      {
        nombre: "Diseño Gráfico Profesional",
        descripcion: "Domina herramientas de diseño y crea piezas visuales impactantes.",
        imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
        descuento: 5,
        duracion: "7 semanas",
        nivel: "Intermedio",
        temario: JSON.stringify(["Photoshop", "Illustrator", "Branding", "Diseño UX/UI"]),
        docentes: JSON.stringify(["Lic. Sofía Ramírez"]),
        categoria: "Diseño"
      },
      {
        nombre: "Inglés para Negocios",
        descripcion: "Mejora tu inglés enfocado en el mundo empresarial y las reuniones internacionales.",
        imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        descuento: 0,
        duracion: "10 semanas",
        nivel: "Básico",
        temario: JSON.stringify(["Presentaciones", "Negociación", "Vocabulario empresarial", "Cultura global"]),
        docentes: JSON.stringify(["Prof. Emily Smith"]),
        categoria: "Idiomas"
      }
    ];
    const stmt = db.prepare(`INSERT INTO cursos (nombre, descripcion, imagen, descuento, duracion, nivel, temario, docentes, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insert = db.transaction((cursos) => {
      for (const c of cursos) {
        stmt.run(c.nombre, c.descripcion, c.imagen, c.descuento, c.duracion, c.nivel, c.temario, c.docentes, c.categoria);
      }
    });
    insert(cursosEjemplo);
  }
};

init();

module.exports = db; 
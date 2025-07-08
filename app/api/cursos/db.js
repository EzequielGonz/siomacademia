const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'cursos.db');
const db = new sqlite3.Database(dbPath);

// Crear tabla y poblar si no existe
const init = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS cursos (
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
    db.get('SELECT COUNT(*) as count FROM cursos', (err, row) => {
      if (row.count === 0) {
        const cursosEjemplo = [
          {
            nombre: "Liderazgo Estratégico",
            descripcion: "Desarrolla habilidades de liderazgo y gestión de equipos con expertos. Incluye casos prácticos y mentoría.",
            imagen: "/public/globe.svg",
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
            imagen: "/public/next.svg",
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
            imagen: "/public/vercel.svg",
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
            imagen: "/public/window.svg",
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
            imagen: "/public/next.svg",
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
            imagen: "/public/window.svg",
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
            imagen: "/public/globe.svg",
            descuento: 0,
            duracion: "10 semanas",
            nivel: "Básico",
            temario: JSON.stringify(["Presentaciones", "Negociación", "Vocabulario empresarial", "Cultura global"]),
            docentes: JSON.stringify(["Prof. Emily Smith"]),
            categoria: "Idiomas"
          }
        ];
        const stmt = db.prepare(`INSERT INTO cursos (nombre, descripcion, imagen, descuento, duracion, nivel, temario, docentes, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        cursosEjemplo.forEach(c => {
          stmt.run(c.nombre, c.descripcion, c.imagen, c.descuento, c.duracion, c.nivel, c.temario, c.docentes, c.categoria);
        });
        stmt.finalize();
      }
    });
  });
};

init();

module.exports = db; 
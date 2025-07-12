import db from './db.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nivel = searchParams.get('nivel');
  const duracion = searchParams.get('duracion');
  const categoria = searchParams.get('categoria');
  const busqueda = searchParams.get('busqueda');
  const orden = searchParams.get('orden') || 'nombre-asc';
  const pagina = parseInt(searchParams.get('pagina') || '1');
  const porPagina = parseInt(searchParams.get('porPagina') || '6');

  let where = [];
  let params = [];
  if (nivel && nivel !== 'Todos') { where.push('nivel = ?'); params.push(nivel); }
  if (duracion && duracion !== 'Todos') { where.push('duracion = ?'); params.push(duracion); }
  if (categoria && categoria !== 'Todos') { where.push('categoria = ?'); params.push(categoria); }
  if (busqueda) {
    where.push('(nombre LIKE ? OR descripcion LIKE ? OR temario LIKE ? OR docentes LIKE ?)');
    params.push(`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`);
  }
  let whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

  // Ordenamiento
  let orderBy = 'nombre COLLATE NOCASE ASC';
  if (orden === 'nombre-desc') orderBy = 'nombre COLLATE NOCASE DESC';
  if (orden === 'precio-asc') orderBy = '(CASE WHEN descuento > 0 THEN 120000 * (1.0 - descuento/100.0) ELSE 120000 END) ASC';
  if (orden === 'precio-desc') orderBy = '(CASE WHEN descuento > 0 THEN 120000 * (1.0 - descuento/100.0) ELSE 120000 END) DESC';
  if (orden === 'duracion-asc') orderBy = 'CAST(duracion AS INTEGER) ASC';
  if (orden === 'duracion-desc') orderBy = 'CAST(duracion AS INTEGER) DESC';

  // Paginación
  const offset = (pagina - 1) * porPagina;

  try {
    // Consulta principal
    const sql = `SELECT * FROM cursos ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
    const allParams = [...params, porPagina, offset];
    const stmt = db.prepare(sql);
    const rows = stmt.all(allParams);

    // Consulta total para frontend
    const sqlTotal = `SELECT COUNT(*) as total FROM cursos ${whereClause}`;
    const totalStmt = db.prepare(sqlTotal);
    const totalRow = totalStmt.get(params);

    // Parsear temario y docentes
    const cursos = rows.map(c => ({
      ...c,
      temario: JSON.parse(c.temario),
      docentes: JSON.parse(c.docentes)
    }));

    return Response.json({ cursos, total: totalRow.total });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const {
    nombre, descripcion, imagen, descuento = 0, duracion, nivel, temario, docentes, categoria
  } = body;
  if (!nombre || !descripcion || !imagen || !duracion || !nivel || !temario || !docentes || !categoria) {
    return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }
  
  try {
    const stmt = db.prepare(`INSERT INTO cursos (nombre, descripcion, imagen, descuento, duracion, nivel, temario, docentes, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const result = stmt.run(
      nombre,
      descripcion,
      imagen,
      descuento,
      duracion,
      nivel,
      JSON.stringify(temario),
      JSON.stringify(docentes),
      categoria
    );
    return Response.json({ id: result.lastInsertRowid });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const body = await req.json();
  const {
    id, nombre, descripcion, imagen, descuento = 0, duracion, nivel, temario, docentes, categoria
  } = body;
  if (!id || !nombre || !descripcion || !imagen || !duracion || !nivel || !temario || !docentes || !categoria) {
    return Response.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }
  
  try {
    const stmt = db.prepare(`UPDATE cursos SET nombre=?, descripcion=?, imagen=?, descuento=?, duracion=?, nivel=?, temario=?, docentes=?, categoria=? WHERE id=?`);
    const result = stmt.run(
      nombre,
      descripcion,
      imagen,
      descuento,
      duracion,
      nivel,
      JSON.stringify(temario),
      JSON.stringify(docentes),
      categoria,
      id
    );
    return Response.json({ updated: result.changes });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ error: 'Falta el id' }, { status: 400 });
  
  try {
    const stmt = db.prepare('DELETE FROM cursos WHERE id=?');
    const result = stmt.run(id);
    return Response.json({ deleted: result.changes });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
} 
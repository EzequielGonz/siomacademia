"use client";
import { useEffect, useState } from "react";

const emptyCurso = {
  nombre: "",
  descripcion: "",
  imagen: "",
  descuento: 0,
  duracion: "",
  nivel: "",
  temario: "",
  docentes: "",
  categoria: ""
};

export default function AdminCursos() {
  const [cursos, setCursos] = useState([]);
  const [form, setForm] = useState(emptyCurso);
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [recargar, setRecargar] = useState(0);

  useEffect(() => {
    fetch("/api/cursos?porPagina=1000")
      .then(res => res.json())
      .then(data => setCursos(data.cursos || []));
  }, [recargar]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje("");
    const body = {
      ...form,
      descuento: Number(form.descuento),
      temario: form.temario.split("\n").map(t => t.trim()).filter(Boolean),
      docentes: form.docentes.split(",").map(d => d.trim()).filter(Boolean)
    };
    const res = await fetch("/api/cursos" + (editId ? "" : ""), {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...body, id: editId } : body)
    });
    const data = await res.json();
    if (data.error) setMensaje("Error: " + data.error);
    else {
      setMensaje(editId ? "Curso actualizado" : "Curso creado");
      setForm(emptyCurso);
      setEditId(null);
      setRecargar(r => r + 1);
    }
  };

  const handleEdit = curso => {
    setEditId(curso.id);
    setForm({
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      imagen: curso.imagen,
      descuento: curso.descuento,
      duracion: curso.duracion,
      nivel: curso.nivel,
      temario: (curso.temario || []).join("\n"),
      docentes: (curso.docentes || []).join(", "),
      categoria: curso.categoria
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async id => {
    if (!window.confirm("¿Eliminar este curso?")) return;
    const res = await fetch(`/api/cursos?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.error) setMensaje("Error: " + data.error);
    else {
      setMensaje("Curso eliminado");
      setRecargar(r => r + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white py-10 px-4 md:px-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h1 className="text-2xl font-bold mb-4 text-[#1A237E]">{editId ? "Editar Curso" : "Crear Curso"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full px-3 py-2 border rounded" required />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full px-3 py-2 border rounded" required />
          <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL de imagen" className="w-full px-3 py-2 border rounded" required />
          <input name="descuento" type="number" min="0" max="100" value={form.descuento} onChange={handleChange} placeholder="Descuento (%)" className="w-full px-3 py-2 border rounded" />
          <input name="duracion" value={form.duracion} onChange={handleChange} placeholder="Duración (ej: 8 semanas)" className="w-full px-3 py-2 border rounded" required />
          <input name="nivel" value={form.nivel} onChange={handleChange} placeholder="Nivel" className="w-full px-3 py-2 border rounded" required />
          <textarea name="temario" value={form.temario} onChange={handleChange} placeholder="Temario (una línea por tema)" className="w-full px-3 py-2 border rounded" required />
          <input name="docentes" value={form.docentes} onChange={handleChange} placeholder="Docentes (separados por coma)" className="w-full px-3 py-2 border rounded" required />
          <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" className="w-full px-3 py-2 border rounded" required />
          <div className="flex gap-2">
            <button type="submit" className="bg-[#1A237E] text-white px-6 py-2 rounded hover:bg-[#283593]">{editId ? "Actualizar" : "Crear"}</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm(emptyCurso); }} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>}
          </div>
          {mensaje && <div className="text-center text-sm text-green-700 font-semibold mt-2">{mensaje}</div>}
        </form>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-bold mb-4 text-[#1A237E]">Cursos existentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-[#F5F7FA]">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Categoría</th>
                <th className="p-2 border">Nivel</th>
                <th className="p-2 border">Duración</th>
                <th className="p-2 border">Descuento</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map(curso => (
                <tr key={curso.id} className="border-b hover:bg-[#F5F7FA]">
                  <td className="p-2 border text-center">{curso.id}</td>
                  <td className="p-2 border">{curso.nombre}</td>
                  <td className="p-2 border">{curso.categoria}</td>
                  <td className="p-2 border">{curso.nivel}</td>
                  <td className="p-2 border">{curso.duracion}</td>
                  <td className="p-2 border text-center">{curso.descuento}%</td>
                  <td className="p-2 border text-center">
                    <button onClick={() => handleEdit(curso)} className="text-blue-600 hover:underline mr-2">Editar</button>
                    <button onClick={() => handleDelete(curso.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
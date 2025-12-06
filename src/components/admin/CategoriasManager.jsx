import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import FormModal from './FormModal';
import { 
  getCategorias, 
  createCategoria, 
  updateCategoria, 
  deleteCategoria 
} from '../../api/adminService';

const CategoriasManager = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [formData, setFormData] = useState({ nombre: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const response = await getCategorias();
      setCategorias(response.data || []);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      alert('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCategoria(null);
    setFormData({ nombre: '' });
    setError('');
    setIsModalOpen(true);
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setFormData({ nombre: categoria.nombre });
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (categoria) => {
    try {
      await deleteCategoria(categoria.id_categoria);
      alert('Categoría eliminada exitosamente');
      loadCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      alert('Error al eliminar categoría: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setFormLoading(true);
      if (editingCategoria) {
        await updateCategoria(editingCategoria.id_categoria, formData);
        alert('Categoría actualizada exitosamente');
      } else {
        await createCategoria(formData);
        alert('Categoría creada exitosamente');
      }
      setIsModalOpen(false);
      loadCategorias();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      setError(error.response?.data?.message || 'Error al guardar categoría');
    } finally {
      setFormLoading(false);
    }
  };

  const columns = [
    {
      header: 'ID',
      accessor: (item) => item.id_categoria,
    },
    {
      header: 'Nombre',
      accessor: (item) => item.nombre,
    },
    {
      header: 'Fecha Creación',
      accessor: (item) => new Date(item.created_at).toLocaleDateString('es-SV'),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={categorias}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        loading={loading}
        emptyMessage="No hay categorías registradas"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategoria ? 'Editar Categoría' : 'Crear Categoría'}
        onSubmit={handleSubmit}
        loading={formLoading}
      >
        {error && (
          <div style={{ 
            backgroundColor: '#fee', 
            color: '#c33', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Categoría *</label>
          <input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Ej: Restaurantes, Tecnología, etc."
            required
            disabled={formLoading}
          />
        </div>
      </FormModal>
    </>
  );
};

export default CategoriasManager;

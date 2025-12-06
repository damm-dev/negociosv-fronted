import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import FormModal from './FormModal';
import { 
  getMetodosPago, 
  createMetodoPago, 
  updateMetodoPago, 
  deleteMetodoPago 
} from '../../api/adminService';

const MetodosPagoManager = () => {
  const [metodosPago, setMetodosPago] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMetodo, setEditingMetodo] = useState(null);
  const [formData, setFormData] = useState({ nombre: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMetodosPago();
  }, []);

  const loadMetodosPago = async () => {
    try {
      setLoading(true);
      const response = await getMetodosPago();
      setMetodosPago(response.data || []);
    } catch (error) {
      console.error('Error al cargar métodos de pago:', error);
      alert('Error al cargar métodos de pago');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMetodo(null);
    setFormData({ nombre: '' });
    setError('');
    setIsModalOpen(true);
  };

  const handleEdit = (metodo) => {
    setEditingMetodo(metodo);
    setFormData({ nombre: metodo.nombre });
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (metodo) => {
    try {
      await deleteMetodoPago(metodo.id_metodo_pago);
      alert('Método de pago eliminado exitosamente');
      loadMetodosPago();
    } catch (error) {
      console.error('Error al eliminar método de pago:', error);
      alert('Error al eliminar método de pago: ' + (error.response?.data?.message || error.message));
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
      if (editingMetodo) {
        await updateMetodoPago(editingMetodo.id_metodo_pago, formData);
        alert('Método de pago actualizado exitosamente');
      } else {
        await createMetodoPago(formData);
        alert('Método de pago creado exitosamente');
      }
      setIsModalOpen(false);
      loadMetodosPago();
    } catch (error) {
      console.error('Error al guardar método de pago:', error);
      setError(error.response?.data?.message || 'Error al guardar método de pago');
    } finally {
      setFormLoading(false);
    }
  };

  const columns = [
    {
      header: 'ID',
      accessor: (item) => item.id_metodo_pago,
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
        data={metodosPago}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        loading={loading}
        emptyMessage="No hay métodos de pago registrados"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMetodo ? 'Editar Método de Pago' : 'Crear Método de Pago'}
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
          <label htmlFor="nombre">Nombre del Método de Pago *</label>
          <input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Ej: Efectivo, Tarjeta, Bitcoin, etc."
            required
            disabled={formLoading}
          />
        </div>
      </FormModal>
    </>
  );
};

export default MetodosPagoManager;

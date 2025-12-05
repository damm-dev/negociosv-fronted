import { useState } from 'react';
import '../../styles/admin/dataTable.css';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onCreate,
  loading = false,
  emptyMessage = 'No hay datos disponibles'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar datos según búsqueda
  const filteredData = data.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return columns.some(column => {
      const value = column.accessor(item);
      return value && value.toString().toLowerCase().includes(searchLower);
    });
  });

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (item) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      onDelete(item);
    }
  };

  if (loading) {
    return (
      <div className="data-table-loading">
        <div className="spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <div className="data-table-search">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
        {onCreate && (
          <button className="btn-create" onClick={onCreate}>
            ➕ Crear Nuevo
          </button>
        )}
      </div>

      {filteredData.length === 0 ? (
        <div className="data-table-empty">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column.header}</th>
                  ))}
                  <th className="actions-column">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.render 
                          ? column.render(item) 
                          : column.accessor(item)}
                      </td>
                    ))}
                    <td className="actions-cell">
                      {onEdit && (
                        <button
                          className="btn-action btn-edit"
                          onClick={() => onEdit(item)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(item)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="data-table-pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DataTable;

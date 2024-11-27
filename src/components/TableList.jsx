const TableList = ({ handleOpen, searchTerm, handleDelete, tableData, error }) => {
  // Filter clients based on the search term
  const filteredData = tableData.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rate.toString().includes(searchTerm)
    );
  });

  return (
    <div className="overflow-x-auto mt-10 pl-10">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Rate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="hover">
          {filteredData.map((client) => (
            <tr key={client._id}>
              <th>{client.id}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.rate}</td>
              <td>
                <button
                  className={`btn ${
                    client.isActive
                      ? "btn-primary text-black w-20"
                      : "btn btn-outline btn-info w-20"
                  } rounded-full`}
                >
                  {client.isActive ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpen("edit", client)}
                    className="btn btn-outline btn-secondary w-20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="btn btn-outline btn-error w-20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;

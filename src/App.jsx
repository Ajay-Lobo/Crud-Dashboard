import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ModalForm from "./components/ModalForm";
import Navbar from "./components/Navbar";
import TableList from "./components/TableList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [search, setSearch] = useState("");
  const [currentClient, setCurrentClient] = useState(null);
  const [tableData, setTableData] = useState([]); // Manage table data here
  const [error, setError] = useState(null); // Error state

  // Fetch data once when the component mounts
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clients");
        setTableData(response.data.data);
      } catch (error) {
        setError(error.message || "Something went wrong while fetching data.");
      }
    };
    fetchClients();
  }, []);

  const handleOpen = (mode, client = null) => {
    setIsOpen(true);
    setModalMode(mode);
    setCurrentClient(client || null);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (clientData) => {
    console.log("Submitting form:", clientData);
    try {
      if (modalMode === "add") {
        await axios.post("http://localhost:3000/api/clients", clientData);
        console.log("Client added");
        // Refresh table data
        setTableData((prevData) => [...prevData, clientData]);
      } else {
        await axios.put(`http://localhost:3000/api/clients/${clientData._id}`, clientData);
        console.log("Client edited");
        // Update the edited client in the table
        setTableData((prevData) =>
          prevData.map((client) =>
            client._id === clientData._id ? clientData : client
          )
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this client?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/clients/${id}`);
      console.log("Client deleted");
      // Remove the deleted client from the table
      setTableData((prevData) => prevData.filter((client) => client._id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <>
      <Navbar onOpen={handleOpen} onSearch={setSearch} />
      <TableList
        handleOpen={handleOpen}
        searchTerm={search}
        handleDelete={handleDelete}
        tableData={tableData} // Pass tableData to TableList
        error={error} // Pass error to TableList
      />
      <ModalForm
        isOpen={isOpen}
        onClose={handleClose}
        mode={modalMode}
        onSubmit={handleSubmit}
        clientData={currentClient}
      />
    </>
  );
}

export default App;

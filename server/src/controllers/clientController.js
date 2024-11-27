import mongoose from "mongoose";
import Client from "../model/clientModel.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createClient = async (req, res) => {
  const { name, email, rate, job, isActive = true } = req.body;

  if (!name || !email || !rate) {
    return res.status(400).json({
      success: false,
      message: "Name, Email, and Rate are required fields",
    });
  }

  if (isNaN(rate)) {
    return res
      .status(400)
      .json({ success: false, message: "Rate must be a valid number" });
  }

  try {
    const newClient = new Client({ name, email, rate, job, isActive });
    await newClient.save();
    res.status(201).json({ success: true, data: newClient });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;  // 'id' from the request params
    const { name, email, rate, job, isActive } = req.body;
  
    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid client ID" });
    }
  
    // Ensure that essential fields (name, email, rate) are provided
    if (!name || !email || !rate) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, and Rate are required fields",
      });
    }
  
    // Ensure the 'rate' is a valid number
    if (isNaN(rate)) {
      return res.status(400).json({ success: false, message: "Rate must be a valid number" });
    }
  
    try {
      // Find and update the client based on ID
      const updatedClient = await Client.findByIdAndUpdate(
        id,  // Using _id here as part of the query
        { name, email, rate, job, isActive }, // Fields to update
        { new: true, runValidators: true } // Return the updated document
      );
  
      // If client is not found, return a 404 error
      if (!updatedClient) {
        return res.status(404).json({ success: false, message: "Client not found" });
      }
  
      // Successfully updated, return the updated client data
      res.status(200).json({ success: true, data: updatedClient });
    } catch (error) {
      // Return server error message in case of failure
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  

export const deleteClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid client ID" });
  }

  try {
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid client ID" });
  }

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchClients = async (req, res) => {
  try {
    const searchTerm = req.query.query || ""; // Capture search term from query params
    const clients = await Client.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search
        { email: { $regex: searchTerm, $options: "i" } },
        { job: { $regex: searchTerm, $options: "i" } },
        { rate: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.json({ data: clients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

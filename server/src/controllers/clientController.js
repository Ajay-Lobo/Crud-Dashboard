import mongoose from "mongoose";
import Client from "../model/clientModel.js";

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createClient = async (req, res) => {
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

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, rate, job, isActive } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid client ID" });
  }

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
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, email, rate, job, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res.status(200).json({ success: true, data: updatedClient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteClient = async (req, res) => {
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


export { getClients, createClient, updateClient, deleteClient };
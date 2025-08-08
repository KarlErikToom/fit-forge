const Client = require("../models/client.model");
const Workout = require("../models/workout.model");

const createClient = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const newClient = new Client({
      ...req.body,
      trainerId: trainerId,
    });

    const client = await newClient.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClients = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const client = await Client.find({ trainerId });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const trainerId = req.user.id;
    const client = await Client.findOne({ _id: clientId, trainerId });
    if (!client) {
      return res
        .status(404)
        .json({
          message: "Client not found or does not belong to this trainer.",
        });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const trainerId = req.user.id;

    const client = await Client.findOneAndDelete({ _id: clientId, trainerId });
    if (!client) {
      return res
        .status(404)
        .json({
          message: "Client not found or does not belong to this trainer.",
        });
    }
    await Workout.deleteMany({ clientId, trainerId });
    res.status(200).json({ message: "Client and associated workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createClient, getClients, getClient, deleteClient };

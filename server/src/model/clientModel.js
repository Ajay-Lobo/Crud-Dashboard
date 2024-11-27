import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  job: {
    type: String,
  },
  rate: {
    type: Number,
    required: true,
    default: 100.0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  id: { // Custom 'id' field to keep track of clients if needed
    type: Number,
    immutable: true,
  },
});

// Apply auto-increment plugin for custom 'id'
clientSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 1 });

const Client = mongoose.model("Client", clientSchema);

export default Client;

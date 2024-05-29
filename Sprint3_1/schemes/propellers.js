//import mongoose for data handling
import mongoose from "mongoose";
//extracting schema from mongoose
const { Schema } = mongoose;
//new schema based on mongoose, specification
const propellersSchema = new Schema(
  {
    //definition of discipline code
    propellerName: {
      type: String,
      required: true,
      unique: true,
    },
    //definition of teacher
    propellerSize: {
      type: Number,
      required: true,
    },
    //definition of discipline name
    propellerColor: {
      type: String,
      required: true,
    },
    propellerPeakNumber: {
      type: Number,
    },
    propellerPrice: {
      type: Number,
    },
  },
  //property of timestamps include
  { timestamps: true }
);
//definition of parameter Nota
const Propeller = mongoose.model("Propeller", propellersSchema, "Propellers");
//exporting Nota object
export default Propeller;

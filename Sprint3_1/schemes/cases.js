//import mongoose for data handling
import mongoose from "mongoose";
//extracting schema from mongoose
const { Schema } = mongoose;
//new schema based on mongoose, specification
const casesSchema = new Schema(
  {
    //definition of discipline code
    caseName: {
      type: String,
      required: true,
      unique: true,
    },
    //definition of teacher
    caseSize: {
      type: String,
      required: true,
    },
    //definition of discipline name
    caseMaterial: {
      type: String,
      required: true,
    },
    caseColor: {
      type: String,
    },
    casePrice: {
      type: Number,
    },
  },
  //property of timestamps include
  { timestamps: true }
);
//definition of parameter Nota
const Case = mongoose.model("Case", casesSchema, "Cases");
//exporting Nota object
export default Case;

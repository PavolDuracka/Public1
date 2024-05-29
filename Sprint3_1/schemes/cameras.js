//import mongoose for data handling
import mongoose from "mongoose";
//extracting schema from mongoose
const { Schema } = mongoose;
//new schema based on mongoose, specification
const camerasSchema = new Schema(
  {
    //definition of discipline code
    cameraName: {
      type: String,
      required: true,
      unique: true,
    },
    //definition of teacher
    cameraResolution: {
      type: Number,
      required: true,
    },
    //definition of discipline name
    cameraSensor: {
      type: String,
      required: true,
    },
    cameraFocal: {
      type: Number,
    },
    cameraPrice: {
      type: Number,
    },
  },
  //property of timestamps include
  { timestamps: true }
);
//definition of parameter Nota
const Camera = mongoose.model("Camera", camerasSchema, "Cameras");
//exporting Nota object
export default Camera;

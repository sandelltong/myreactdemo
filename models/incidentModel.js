const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncidentSchema = new Schema(
  {
    id: Number,
    name: String,
    severity: String,
    status: String,
    reportDate: Date
  },
  { timestamps: true }
);


IncidentSchema.pre('save', function (next) {
  // Delete the id and avoid to save it.
  delete this.id;  
  next();
});

IncidentSchema.pre('update', function (next) {
  // Delete the id and avoid to save it.
  delete this.id;  
  next();
});


IncidentSchema.pre('updateOne', function (next) {
  // Delete the id and avoid to save it.
  delete this.id;  
  next();
});

IncidentSchema.options.toObject = IncidentSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, returned, opts) {
    returned.id = returned._id;

    delete returned._id;
  }
};

module.exports = mongoose.model("Incident", IncidentSchema);
// untuk model contact di dalam schema oyeng

const mongoose = require("mongoose");

const Contact = mongoose.model("contact", {
  nama: {
    type: String,
    required: true,
  },
  nohp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

// masukkan ini ke database

module.exports = Contact;

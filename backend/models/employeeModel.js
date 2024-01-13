const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    photo: { type: String},
    ethnicity: { type: String, required: true },
    phoneNumber: {
      prefix: { type: String, required: true },
      number: { type: String, required: true },
    },
    email: { type: String, required: true },
    currentAddress: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
      camp: { type: String },
    },
    salary: { type: String, required: true },
    educationLevel: { type: String, required: true },
    education: {
      bachelor: [
        {
          graduationYear: { type: String, required: true },
          fieldOfStudy: { type: String, required: true },
          universityName: { type: String, required: true },
        },
      ],
      master: [
        {
          graduationYear: { type: String, required: true },
          fieldOfStudy: { type: String, required: true },
          universityName: { type: String, required: true },
        },
      ],
      phd: [
        {
          graduationYear: { type: String, required: true },
          fieldOfStudy: { type: String, required: true },
          universityName: { type: String, required: true },
        },
      ],
    },
    birthplaceInfo: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    motherInformation: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
      phoneNumber: {
        prefix: { type: String, required: true },
        number: { type: String, required: true },
      },
    },
    emergencyContact: {
      info: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        relationship: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String },
      },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    maritalStatus: { type: String, required: true },
    spouseInfo: {
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      dob: { type: Date },
      phoneNumber: { type: String },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    divorcedInfo: {
      divorceDate: { type: Date },
      // Add other divorced fields as needed
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    mname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    aadharCardNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    whatsappNo: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    dateofVisit: {
        type: Date,
        required: true
    },
    infoOfDonation: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
});

const donor = mongoose.model('donor', donorSchema);
module.exports = donor;
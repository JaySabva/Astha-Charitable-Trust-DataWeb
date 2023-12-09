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
    },
    whatsappNo: {
        type: String,
        required: true,
    },
    dateofVisit: {
        type: Date,
        required: true
    },
    timeofVisit: {
        type: String,
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

const doner = mongoose.model('doner', donorSchema);
module.exports = doner;
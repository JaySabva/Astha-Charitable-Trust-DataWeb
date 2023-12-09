const mongoose = require('mongoose');

const labharthiSchema = new mongoose.Schema({
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
    typeofDisability: {
        type: String,
        required: true
    },
    precentageOfDisability: {
        type: String,
        required: true
    },
    dateofVisit: {
        type: Date,
        required: true
    },
    timeofVisit: {
        type: String,
        required: true
    },
    purposeofVisit: {
        type: String,
        required: true
    },
    help: [{
        help: String,
        helpOrganization: String,
        helpDate: Date,
    }]
});

const Labharthi = mongoose.model('Labharthi', labharthiSchema);
module.exports = Labharthi;
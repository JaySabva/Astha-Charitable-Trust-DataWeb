const mongoose = require('mongoose');

const otherSchema = new mongoose.Schema({
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
    dateofVisit: {
        type: Date,
        required: true
    },
    mobileNo: {
        type: String,
        required: true,
    },
    reasonOfVisit: {
        type: String,
        required: true
    },
});

const Other = mongoose.model('Other', otherSchema);
module.exports = Other;
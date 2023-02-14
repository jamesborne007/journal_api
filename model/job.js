//company, position, status, createdby


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = new Schema({
    company :{
        type: String,
        required: [true,'please provide a company name'],
    },
    position :{
        type: String,
        required: [true,'please provide a position'],
    },
    createdby :{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,'please provide a user'],
    },
    status :{
        type: String,
        Enum:['interview','applied','declined'],
        default: 'applied',
    },
},{timestamps: true}
)

module.exports = mongoose.model('Job', jobSchema)
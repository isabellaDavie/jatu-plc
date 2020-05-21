const mongoose = require('mongoose')

const schema = mongoose.Schema

const comment = new schema({
    body: {
        type: String
    },
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const leave = new schema({

    approvedBy: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        defualt:"pending",
        enum:['pending', 'approved', 'denied']
    },
    payable:{
        type:Boolean
    },
    comments: [comment]
}, {
    timestamps: true
}, {
    toJSON: {
        virtuals: true
    }
})

leave.pre('find', function () {
    this.populate({
        path: 'approvedBy',
        select: 'name.first name.middle name.last  email role position department'
    }).populate({
        path:'requestBy',
        select: 'name.first name.middle name.last  email role position department'
    }).sort({ createdAt: -1})
})


module.exports = mongoose.model('Leave', leave)
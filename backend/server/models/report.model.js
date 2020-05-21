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

const report = new schema({

    reviewedBy: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comments: [comment]
}, {
    timestamps: true
}, {
    toJSON: {
        virtuals: true
    }
})

report.pre('find', function () {
    this.populate({
        path: 'reviewedBy',
        select: 'name.first name.middle name.last  email role position'
    }).populate({
        path: 'reporter',
        select: 'name.first name.middle name.last  email role'
    }).sort({
        createdAt: -1
    })
})


module.exports = mongoose.model('Report', report)
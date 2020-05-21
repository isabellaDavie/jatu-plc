const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const schema = mongoose.Schema

const user = new schema({

    name: {
        first: {
            type: String,
            required: true,
        },
        middle: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'This email is already taken.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", ]
    },
    mobile: [{
        type: Number,
        default: null
    }],
    maritalStatus: {
        type: String,
        default: null,
        enum: ['single', 'married', 'divorced']
    },
    role: {
        type: String,
        default: 'staff',
        enum: ["staff", "admin", "super-admin"],
    },
    position: {
        type: String,
        default: 'Intern'
    },
    department: {
        type: String,
    },
    address: {
        region: {
            type: String,
            default: null
        },
        district: {
            type: String,
            default: null
        },
        ward: {
            type: String,
            default: null
        },
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}, {
    toJSON: {
        virtuals: true
    }
})

user.virtual('fullname').get(function () {
    return `${this.name.first} ${this.name.last}`
})

user.set('toJSON', { virtuals: true })
user.methods.createToken = async function () {
    let payload = {
        id: this._id,
        fullname: this.fullname,
        email: this.email,
        role: this.role
    }
    let options = { }

    let token = await jwt.sign(payload, 'secretword', options)
    return token
}


module.exports = mongoose.model('User', user);
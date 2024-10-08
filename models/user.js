const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]+$/.test(v)
            },
            message: props => `${props.value} is not a valid username!`
        }
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
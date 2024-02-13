const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema for user the admin
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        }
    },
    password: {
        type: String,
        required: true,
    }
});

// Using old JavaScript syntax since arrow functions do not bind 'this'
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware or error handler
    }
});

// login user 
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    // check if user
    if (user) {
        const isPasswordHashed = await bcrypt.compare(password, user.password);

        // create error if massword don't match
        if (!isPasswordHashed) {
            throw new Error("Invalid password");
        }
        return user

    } else {
        // new error if email not found
        throw new Error("Invalid Email");
    }

}
const User = mongoose.model('User', userSchema);

module.exports = User;

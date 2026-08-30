import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    },
    cartData: {
        type: Object,
        default: {}
    }

}, {minimize: false});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
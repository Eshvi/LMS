import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        set: function (password) {
            let saltKey = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, saltKey);
        }
    },
    contact: {
        type: Number,
        trim: true,
        // unique: true
    },
}, { versionKey: false });

const User = mongoose.model("user", userSchema);

User.checkPassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword);
}

export default User;
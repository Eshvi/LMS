import User from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';


export const SignUp = (req, response, next) => {
    const email = req.body.email;
    const payload = { email };
    const secretKey = "asjdflasjdfasjkfldoctor";
    const token = jwt.sign(payload, secretKey);

    User.create(req.body).then(result => {
        return response.status(200).json({ message: "User Sign up successfully...", user: result, token })
    }).catch(err => {
        console.log(err);
        return response.status(401).json({ message: "Internal server error...", err })
    });
};

export const SignIn = async (request, response, next) => {
    try {
        console.log(request.body);
        let user = await User.findOne({ email: request.body.email });

        console.log(user)
        if (user) {
            console.log("If user", user);
            return user ? User.checkPassword(request.body.password, user.password) ?
                response.status(200).json({ message: "User Sign In successfully...", user })
                : response.status(403).json({ error: "Bad request (Invalid password)", message: "Wrong password" })
                : response.status(402).json({ error: "Bad request (Unauthorized user)", message: "Pata nhi" });
        }
        console.log("user", user);

        return response.status(401).json({ error: "Bad request (Unauthorized user)" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal server error" });
    }
}

export const findByEmail = async (req, response, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        return response.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return response.status(401).json({ message: "Something went wrong" });
    }
};

// Assuming you have required necessary modules and connected to MongoDB


export const updateUser = async (req, response) => {
    const { name, email, contact, userId } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { name, email, contact }, { new: true });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        return response.status(200).json({ user });
    } catch (error) {
        console.error('Error updating user:', error);
        return response.status(500).json({ error: 'An error occurred while updating the user' });
    }
};


export const updatePassword = async (req, response, next) => {
    try {
        const { email, password, newPassword } = req.body;
        console.log(email, password, newPassword);
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(401).json({ message: "Unauthorized User..." });
        }
        const isPasswordCorrect = await user.checkPass(password);
        if (!isPasswordCorrect) {
            return response.status(401).json({ message: "Password does not match" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return response.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Something went wrong" });
    }
};
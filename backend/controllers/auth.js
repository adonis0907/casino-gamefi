const User = require("../models/User");
const roles = require("../config/role");
const AuthHelpers = require("../helpers/auth");

module.exports.loginUser = async function (req, res) {
    const { wallet_address, email, password } = req.body;

    try {
        let registeredUser = await User.findOne({ $or: [{ wallet_address }, { email }] });
        if (!registeredUser) {
            res.status(404).send({ success: false, message: "Non Registered User!" });

            return;
        }

        if (!wallet_address) {
            if (registeredUser.password != AuthHelpers.toSha256(password)) {
                res.status(403).send({ success: false, message: "Wrong password!" });

                return;
            }
        }

        res.status(200).send({ success: true,
                                token: AuthHelpers.generateToken({
                                    username: registeredUser.username,
                                    email: registeredUser.email,
                                    wallet_address: registeredUser.wallet_address,
                                    role: registeredUser.role
                                })
                            });

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.registerUser = async function (req, res) {
    const { username, email, password, wallet_address } = req.body;

    try {
        let isRegistered = await User.exists({ $or: [{ username }, { email }, { wallet_address }] });
        if (isRegistered) {
            res.status(409).send({ success: false, message: "Registered User!" });

            return;
        }
        
        let user = new User({ username, email, password: AuthHelpers.toSha256(password), wallet_address, role: roles["user"] });
        await user.save();

        res.status(200).send({ success: true, token: AuthHelpers.generateToken({ username, email, wallet_address, role: user.role }) });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
}
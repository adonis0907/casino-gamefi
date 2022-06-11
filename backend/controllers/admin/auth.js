const crypto = require('crypto');

const User = require("../../models/User");
const roles = require("../../config/role");
const AuthHelpers = require("../../helpers/auth");

module.exports.loginAdmin = async function (req, res) {
    const { username, password } = req.body;
    const hash = crypto.createHash('md5').update(password).digest('hex');

    try {
        let registeredAdmin = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!registeredAdmin) {
            res.status(404).send({ success: false, msg: "Non Registered User!" });

            return;
        } else if (registeredAdmin.password != hash) {
            res.status(400).send({ success: false, msg: "Incorrect Password!" });

            return;
        } else if (registeredAdmin.role == roles["user"]) {
            res.status(422).send({ success: false, msg: "No permisson!" });

            return;
        }

        res.status(200).send({ success: true,
                                token: AuthHelpers.generateToken({
                                    username: registeredAdmin.username,
                                    email: registeredAdmin.email,
                                    role: registeredAdmin.role
                                })
                            });

    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.registerAdmin = async function (req, res) {
    const { username, email, password } = req.body;
    const hash = crypto.createHash('md5').update(password).digest('hex');

    try {        
        let user = new User({ username, email, password: hash, wallet_address: '0x', role: roles["superadmin"] });
        await user.save();

        res.status(200).send({ success: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
}
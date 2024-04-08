const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserbyToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body;

        // validations
        if(!name) {
            res.status(422).json({ message: "Campo nome é obrigatório"});
            return;
        }

        if(!email) {
            res.status(422).json({ message: "Campo email é obrigatório"});
            return;
        }

        if(!phone) {
            res.status(422).json({ message: "Campo telefone é obrigatório"});
            return;
        }

        if(!password) {
            res.status(422).json({ message: "Campo password é obrigatório"});
            return;
        }

        if(!confirmPassword) {
            res.status(422).json({ message: "Campo confirmação de senha é obrigatório"});
            return;
        }

        if(password !== confirmPassword) {
            res.status(422).json({ message: "A senha e a confirmação de senha devem ser iguais"});
            return;
        }

        // checando se o usuário existe
        const userExists = await User.findOne({ email: email });

        if(userExists) {
            res.status(422).json({ message: "Email já existente. Por favor, informe outro."});
            return;
        }

        // create an encrypted user password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // creating a new user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        });

        try {
            // salva o usuário
            // .save() ==> mongoose --> método para salvar
            const newUser = await user.save();
            await createUserToken(newUser, req, res);
            return true;
        } catch (e) {
            res.status(500).json({ message: e.toString()});
            return false;
        }
    }

    // login
    static async login(req, res) {
        const { email, password } = req.body;

        if(!email) {
            res.status(422).json({ message: "Campo email é obrigatório"});
            return;
        }

        if(!password) {
            res.status(422).json({ message: "Campo password é obrigatório"});
            return;
        }

        // checando se o usuário existe
        const user = await User.findOne({ email: email });

        if(!user) {
            res.status(422).json({ message: "Usuário não cadastrado."});
            return;
        }

        // check se o password match by bcrypt
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            res.status(422).json({ message: "Senha incorreta." });
        }

        // loga o usuário
        await createUserToken(user, req, res);
        return true;
    }

    // access the current user's token
    static  async checkUser(req, res) {
        let currentUser = undefined;

        // location to set/place the token
        if(req.headers.authorization) {

            // access the token
            const token = getToken(req);
            const decoded = jwt.verify(token, "nossosecret");

            // find the user by id
            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;

        } else {
            currentUser = null;
        }

        try {
            res.status(200).send(currentUser);
            return true;
        } catch (e) {
            console.log(e.message.toString());
            return false;
        }

    }

    static async getUserById(req, res) {
        const id = req.params.id;

        // find the user by his ID and remove the password field
        const user = await User.findById(id).select("-password");

        if(!user) {
            res.status(422).json({ message: "Usuário não encontrado."});
            return;
        }

        try {
            res.status(200).json({ user });
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }

    static async editUser(req, res) {
        const id = req.params.id;

        // check if user exists
        const token = getToken(req);
        const user = await getUserbyToken(token);

        const { name, email, phone, password, confirmPassword } = req.body;

        // verify if there's a file in the req
        if(req.file) {
            user.image = req.file.filename;
        }

        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }

        user.name = name;

        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório!" });
            return;
        }


        // check if the email already exists
        const isEmailExists = await User.findOne({ email: email })

        if (user.email !== email && isEmailExists ) {
            res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
            return;
        }

        user.email = email;

        if (!phone) {
            res.status(422).json({ message: "O telefone é obrigatório!" });
            return;
        }

        user.phone = phone;


        if(password !== confirmPassword) {
            res.status(422).json({ message: "As senhas devem ser iguais!" });
        } else if ((password === confirmPassword) && (password !== null)) {

            // create an encrypted user password
            if (password) {
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(password, salt);
                user.password = passwordHash;
            }
        }


        try {

            // return user data updated
            await User.findByIdAndUpdate(
                {_id: user._id},
                { $set: user },
                { new: true }
            );

            res.status(200).json({ message: "User updated with success!!" });
            return true;
        } catch (e) {
            res.status(500).json({ message: e.toString() });
            return false;
        }
    }
}

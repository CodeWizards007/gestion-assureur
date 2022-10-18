const Assureur = require("../models/Assureur.model");
const bcrypt = require("bcrypt");
const { loginRequest,AuthRequest } = require("../utils/validation.utils");
const generateToken = require("../utils/generateToken.utils");

// crud
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const salt = bcrypt.genSaltSync(10, "a");
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create a Assureur
    const assureur = new Assureur({
        name: req.body.name,
        email: req.body.email,
        salaire: req.body.salaire,
        location: req.body.location,
        password: hashedPassword,
    });

    // Save Assureur in the database
    Assureur.create(assureur, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Assureur."
            });
        else res.send(data);
    });
}
//update  assureur
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Assureur.findByIdAndUpdate(
        req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Assureur with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Assureur with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
}

//delete  assureur
exports.deleteById = (req, res) => {
    Assureur.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Assureur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Assureur with id " + req.params.id
                });
            }
        } else res.send({ message: `Assureur was deleted successfully!` });
    });
}

//get all assureurs
exports.findAll = (req, res) => {
    Assureur.find((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving assureurs."
            });
        else res.send(data);
    });
}
//get one assureur by any field
exports.findOne = (req, res) => {
    Assureur.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Assureur with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Assureur with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.auth = async (req,res)=>{
    const { email, password } = req.body;

    //validate request
    const { error }  = loginRequest.validate(req.body);
    if(error) {
        return res.status(400).json(error.details[0].message);
    }
    const user = await Assureur.findOne({ email });
    if (!user) return res.status(400).json("Invalid email and password!");
    //check if password match
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json("Invalid email and password!");

    return res.status(200).json({
            "access_token" : generateToken(user._id),
            "role":"assureur"
    });
}
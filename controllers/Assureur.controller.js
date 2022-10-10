const Assureur = require("../models/Assureur.model");

// crud
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Assureur
    const assureur = new Assureur({
        name: req.body.name,
        email: req.body.email,
        salaire: req.body.salaire,
        location: req.body.location,
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

    Assureur.updateById(
        req.params.id,
        new Assureur(req.body),
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
exports.delete = (req, res) => {
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
    Assureur.getAll((err, data) => {
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
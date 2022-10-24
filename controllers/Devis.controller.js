const Devis = require("../models/Devis.model");
const Constats = require("../models/Constats.model");
// Create and Save a new Devis
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Devis
    const devis = new Devis({
        titre: req.body.titre,
        montant: req.body.montant,
        status: req.body.status,
    });

    // Save Devis in the database
    Devis.create(devis,async(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Devis."
            });
        else {
             await Constats.updateOne({_id:req.params.idConstat},{$push:{devis:data._id}})
            res.send(data);
        }
    });
}
// Retrieve all Devis from the database.
exports.findAll = (req, res) => {
    Devis.find((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving devis."
            });
        else res.send(data);
    });
}
// Find a single Devis with a id
exports.findOne = (req, res) => {
    Devis.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Devis with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Devis with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}
// Update a Devis identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Devis.updateOne(
        {_id:req.params.id},
        req.body,
        (err, data) => {
            if (err) {
                console.log(err);
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Devis with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Devis with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
}
// Delete a Devis with the specified id in the request
exports.deleteDevis = (req, res) => {
    Devis.deleteOne({_id:req.params.id}, (err, data) => {
        if (err) {
            console.log(err);
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Devis with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Devis with id " + req.params.id
                });
            }
        } else res.send({ message: `Devis was deleted successfully!` });
    });
}

exports.updateDevisExpert = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Devis.updateOne(
        {_id:req.params.id},
        req.body,
        (err, data) => {
            if (err) {
                console.log(err);
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Devis with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Devis with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
}
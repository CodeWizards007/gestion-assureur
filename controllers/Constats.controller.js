const Constat= require('../models/Constats.model');

// Create and Save a new Constat
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Constat
    const constat = new Constat({
        titre: req.body.titre,
        montant: req.body.montant,
        status: req.body.status,
        emplacement: req.body.emplacement,
        fautif:req.body.fautif,
        expertId:req.body.expertId,
        responsableId:req.body.responsableId,
        clientId:req.body.clientId,
        devis:[req.body.devis],
        agence:req.body.agence,
       // images:[req.files[0].filename],
    });
    req.files.map((file)=>{
      constat.images.push(file.filename)
    })
    console.log(constat)
    // Save Constat in the database
    Constat.create(constat, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Constat."
            });
        else res.send(data);
    });
}


// Retrieve all Constats from the database.
exports.findAll = (req, res) => {
    Constat.find((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving constats."
            });
        else res.send(data);
    });
}


//delete  constat
exports.deleteConstat = (req, res) => {
    Constat.deleteOne(req.params.id,(err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all constats."
            });
        else res.send({ message: `constat were deleted successfully!` });
    });
}


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Constat.updateOne(
        {_id:req.body._id},
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Constat with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Constat with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
}

exports.findbyexpert = async (req, res) => {
    const constat = await Constat.find({expertId:req.params.id});

    res.send(constat);

}

exports.find = async (req, res) => {
    const constat = await Constat.findById(req.params.id);

    res.send(constat);

}
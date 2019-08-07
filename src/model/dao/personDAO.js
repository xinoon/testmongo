const Person = require("../dto/PersonDB");

let createPerson = (req, res) => {
    try {
        //map req to PersonDB -- implement ---
        let person = new Person(req.body); 
        person.save();
        res.json(person);        
    } catch (error) {
        res.status(500).send(error);
    }
}

let getPerson = (req, res) => {
    try {
        Person.find({}, (err, PersonList) => {
            if (err){
                return res.status(500).json({
                    error: err
                });
            }
            return res.json({
                personList: PersonList
            })
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

let getPersonById = (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        Person.findById(id, (err, PersonDB) =>{
            if (err){
                  res.status(500).json({
                    error: err
                });
            }
            if(PersonDB === null){
                return res.status(404).json({
                    error: {
                        message: 'resource not found',
                        id
                    }
                })
            }
            return res.json({
                PersonDB
            });
        });      
    } catch (error) {
        res.status(500).send(error);
    }
};

let updatePersonById = (req,res) => {
    try {
        let id = req.params.id;
        var result = new Person({ firstname: "Aldo", lastname: "pizarro", id });
        res.send(person);
    } catch (error) {
        res.status(500).send(error);
    }
}

let deletePersonById = (req, res) => {
    try {
        /*var result = await PersonModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);*/
        console.log('--||| DELETE PERSONBYID |||--')
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createPerson,
    getPerson,
    getPersonById,
    updatePersonById,
    deletePersonById
};
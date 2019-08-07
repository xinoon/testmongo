const Express = require("express");
const app = Express();
const Person = require("../model/dto/PersonDB");
const {
    createPerson,
    getPerson,
    getPersonById,
    updatePersonById,
    deletePersonById}  = require("../model/dao/personDAO");



app.post("/person", async (request, response) => {
    try {
        //console.log("post.method");
        let person = createPerson(request,response);
        return response.json(person);
        
    } catch (error) {
        console.log('----ERROR-----');
        response.status(500).send(error);
    }
});
app.get("/person", async (request, response) => {
    try {
        return getPerson(request,response);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.get("/person/:id", async (request, response) => {
    try {
        return getPersonById(request, response);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.put("/person/:id", async (request, response) => {
    try {
        let person = updatePersonById(request, response);
        return person;
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/person/:id", async (request, response) => {
    try {
        return deletePersonById(request, response);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;
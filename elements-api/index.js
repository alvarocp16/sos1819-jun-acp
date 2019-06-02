const BASE_PATH = "/api/v1/elements"
//Aquí cambiaría la url de la API
var apiRest = {};
module.exports = apiRest;



apiRest.register = (app, elements) => {

    // GET a docs /api/v1/elements/docs
    app.get(BASE_PATH + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7064258/S17us6KT");
    });

    //GET a la ruta base /api/v1/elements/ con búsqueda y paginación
    app.get(BASE_PATH, (req, res) => {
        //Busqueda 
        var begin = parseInt(req.query.from);
        var end = parseInt(req.query.to);
        //Paginacion
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var queries = req.query;
        if (req.query.province) {
            queries.province = req.query.province;
        }
        if (req.query.year) {
            queries.year = Number(req.query.year);
        }
        if (req.query.victims) {
            queries.victims = Number(req.query.victims);
        }
        if (req.query.injurednothospitalizedinaccidents) {
            queries.injurednothospitalizedinaccidents = Number(req.query.injurednothospitalizedinaccidents);
        }
        if (req.query.accidentswithvictims) {
            queries.accidentswithvictims = Number(req.query.accidentswithvictims);
        }

        //Paginacion y busqueda
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(begin) && Number.isInteger(end)) {
            elements.find({ "year": { $gte: begin, $lte: end } }).skip(offset).limit(limit).toArray((err, elementsArray) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(200).send(elementsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
            });
            //Paginación
        } else if (Number.isInteger(limit) && Number.isInteger(offset)) {
            elements.find({}).skip(offset).limit(limit).toArray((err, elementsArray) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(200).send(elementsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
            });
          //Búsqueda  
        } else if (Number.isInteger(begin) && Number.isInteger(end)) {
            elements.find({ "year": { $gte: begin, $lte: end } }).toArray((err, elementsArray) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(200).send(elementsArray.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
            });
        } else {
            // si no esta vacio entra
            if (JSON.stringify(queries) != "{}") {
                elements.find(queries).toArray((err, elementsArray) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        if (!elementsArray.length) {
                            res.sendStatus(404);
                        } else {
                            res.status(200).send(elementsArray.map((c) => {
                                delete c._id;
                                return c;
                            }));
                        }
                    }
                });
            } else {
                elements.find({}).toArray((err, elementsArray) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.status(200).send(elementsArray.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                });
            }
        }
    });


    //GET al loadInitialData (mete los iniciales en la base de datos) /api/v1/elements/loadInitialData
    app.get(BASE_PATH + "/loadInitialData", (req, res) => {
        var elementsInitials = [{
            province: "sevilla",
            year: 2014,
            victims: 4227,
            injurednothospitalizedinaccidents: 4106,
            accidentswithvictims: 3023
        }, {
            province: "madrid",
            year: 2015,
            victims: 16062,
            injurednothospitalizedinaccidents: 14876,
            accidentswithvictims: 12632
        }, {
            province: "albacete",
            year: 2016,
            victims: 659,
            injurednothospitalizedinaccidents: 611,
            accidentswithvictims: 519
        }, {
            province: "sevilla",
            year: 2015,
            victims: 5959,
            injurednothospitalizedinaccidents: 5861,
            accidentswithvictims: 4200
        }, {
            province: "jaen",
            year: 2013,
            victims: 567,
            injurednothospitalizedinaccidents: 520,
            accidentswithvictims: 416
        }, {
            province: "badajoz",
            year: 2016,
            victims: 725,
            injurednothospitalizedinaccidents: 661,
            accidentswithvictims: 541
        }, {
            province: "caceres",
            year: 2016,
            victims: 195,
            injurednothospitalizedinaccidents: 176,
            accidentswithvictims: 148
        }, {
            province: "madrid",
            year: 2011,
            victims: 16062,
            injurednothospitalizedinaccidents: 14876,
            accidentswithvictims: 12632
        }, {
            province: "albacete",
            year: 2009,
            victims: 659,
            injurednothospitalizedinaccidents: 611,
            accidentswithvictims: 519
        }, {
            province: "sevilla",
            year: 2010,
            victims: 5959,
            injurednothospitalizedinaccidents: 5861,
            accidentswithvictims: 4200
        }, {
            province: "jaen",
            year: 2014,
            victims: 567,
            injurednothospitalizedinaccidents: 520,
            accidentswithvictims: 416
        }, {
            province: "badajoz",
            year: 2011,
            victims: 725,
            injurednothospitalizedinaccidents: 661,
            accidentswithvictims: 541
        }, {
            province: "caceres",
            year: 2010,
            victims: 195,
            injurednothospitalizedinaccidents: 176,
            accidentswithvictims: 148
        }, {
            province: "sevilla",
            year: 2004,
            victims: 4227,
            injurednothospitalizedinaccidents: 4106,
            accidentswithvictims: 3023
        }, {
            province: "madrid",
            year: 2005,
            victims: 16062,
            injurednothospitalizedinaccidents: 14876,
            accidentswithvictims: 12632
        }, {
            province: "albacete",
            year: 2006,
            victims: 659,
            injurednothospitalizedinaccidents: 611,
            accidentswithvictims: 519
        }, {
            province: "sevilla",
            year: 2005,
            victims: 5959,
            injurednothospitalizedinaccidents: 5861,
            accidentswithvictims: 4200
        }, {
            province: "jaen",
            year: 2003,
            victims: 567,
            injurednothospitalizedinaccidents: 520,
            accidentswithvictims: 416
        }, {
            province: "badajoz",
            year: 2006,
            victims: 725,
            injurednothospitalizedinaccidents: 661,
            accidentswithvictims: 541
        }, {
            province: "caceres",
            year: 2006,
            victims: 195,
            injurednothospitalizedinaccidents: 176,
            accidentswithvictims: 148
        }, {
            province: "madrid",
            year: 2001,
            victims: 16062,
            injurednothospitalizedinaccidents: 14876,
            accidentswithvictims: 12632
        }, {
            province: "albacete",
            year: 2019,
            victims: 659,
            injurednothospitalizedinaccidents: 611,
            accidentswithvictims: 519
        }, {
            province: "sevilla",
            year: 2000,
            victims: 5959,
            injurednothospitalizedinaccidents: 5861,
            accidentswithvictims: 4200
        }, {
            province: "jaen",
            year: 2004,
            victims: 567,
            injurednothospitalizedinaccidents: 520,
            accidentswithvictims: 416
        }, {
            province: "badajoz",
            year: 2001,
            victims: 725,
            injurednothospitalizedinaccidents: 661,
            accidentswithvictims: 541
        }, {
            province: "caceres",
            year: 2000,
            victims: 195,
            injurednothospitalizedinaccidents: 176,
            accidentswithvictims: 148
        }];
        elements.find({}).toArray((err, elementsArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (elementsArray.length == 0) {
                elements.insert(elementsInitials);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
            }
        });
    });
    //POST a la ruta base (introduce un recurso) /api/v1/elements
    app.post(BASE_PATH, (req, res) => {
        var newElement = req.body;
        var province = req.body.province;
        var year = req.body.year;
        elements.find({ province: province, year: year }).toArray((err, elementsArray) => {
            if (err) {
                console.log(err);
            }
            if (elementsArray != 0) {
                res.sendStatus(409);
            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("victims") == false || req.body.hasOwnProperty("injurednothospitalizedinaccidents") == false || req.body.hasOwnProperty("accidentswithvictims") == false || req.body.province != province) {
                res.sendStatus(400);
            }
            else {
                elements.insertOne(newElement);
                res.sendStatus(201);
            }
        });
    });
    //POST a una coleccion (debe dar fallo 405, metodo no permitido) /api/v1/elements/:province
    app.post(BASE_PATH + "/:province", (req, res) => {
        res.sendStatus(405);
    });
    //POST a un recurso (debe dar fallo 405, metodo no permitido) /api/v1/elements/:province/:year
    app.post(BASE_PATH + "/:province/:year", (req, res) => {
        res.sendStatus(405);
    });
    //GET a un recurso (provincia) /api/v1/elements/:province
    app.get(BASE_PATH + "/:province", (req, res) => {
        var province = req.params.province;
        elements.find({ "province": province }).toArray((err, elementArray) => {
            if (err) {
                console.log("Error:" + err);
            }
            if (elementArray.length >= 1) {
                res.send(elementArray.map((c) => {
                    delete c._id;
                    return c;
                }));
            }
            else {
                res.sendStatus(404);
            }
        });
    });
    //GET a dos recursos (provincia y año) /api/v1/elements/:province/:year
    app.get(BASE_PATH + "/:province/:year", (req, res) => {
        var year = Number(req.params.year);
        var province = req.params.province;
        elements.find({ "province": province, "year": year }).toArray((err, elementArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (elementArray.length > 0) {
                delete elementArray[0]._id;
                res.json(elementArray[0]);
            }
            else {
                res.sendStatus(404);
            }
        });
    });
    //PUT a dos recursos (debe modificarlos mediante el body) /api/v1/elements/:province/:year 
    app.put(BASE_PATH + "/:province/:year", (req, res) => {
        var year = Number(req.params.year);
        var province = req.params.province;
        var updatedElement = req.body;
        elements.find({ "province": province, "year": year }).toArray((err, elementsArray) => {
            if (err)
                console.log(err);
            if (elementsArray == 0) {
                res.sendStatus(404);
            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false ||
                req.body.hasOwnProperty("victims") == false || req.body.hasOwnProperty("injurednothospitalizedinaccidents") == false || req.body.hasOwnProperty("accidentswithvictims") == false || req.body.province != province || req.body.year != year) {
                res.sendStatus(400);
            }
            else {
                elements.updateOne({ "province": province, "year": year }, { $set: updatedElement });
                res.sendStatus(200);
            }
        });
    });
    //PUT a la ruta base (debe dar fallo 405, metodo no permitido) /api/v1/elements
    app.put(BASE_PATH, (req, res) => {
        res.sendStatus(405);
    });
    //PUT a la ruta con conjunto (debe dar fallo 405, metodo no permitido) /api/v1/elements/malaga
    app.put(BASE_PATH + "/:province", (req, res) => {
        res.sendStatus(405);
    });
    //DELETE a un recurso (borra todos los recursos que coinciden) /api/v1/elements/:province
    app.delete(BASE_PATH + "/:province", (req, res) => {
        var province = req.params.province;
        elements.find({ "province": province }).toArray((err, arrayElements) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (arrayElements.length == 0) {
                res.send(404);
            }
            else {
                elements.remove({ "province": province });
                res.send(200);
            }
        });
    });
    //DELETE a un recurso en concreto (borra el recurso que coincide) /api/v1/elements/:province/:year
    app.delete(BASE_PATH + "/:province/:year", (req, res) => {
        var year = Number(req.params.year);
        var province = req.params.province;
        elements.find({ "province": province, "year": year }).toArray((err, elementArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (elementArray.length == 0) {
                res.send(404);
            }
            else {
                elements.deleteOne({ "province": province, "year": year });
                res.send(200);
            }
        });
    });
    //DELETE a la ruta base (borra todos los recursos) /api/v1/elements
    app.delete(BASE_PATH, (req, res) => {
        elements.remove({});
        res.sendStatus(200);
    });
};

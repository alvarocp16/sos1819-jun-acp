const BASE_PATH = "/api/v1/injured-hospitalized"

var apiRest = {};


module.exports = apiRest;



apiRest.register = (app, injuredHospitalized) => {
    app.get(BASE_PATH + "/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6976657/S17usmD2");
    });

    
    //GET /deceaseds/
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

        if (req.query.accident_with_victim) {

            queries.accident_with_victim = Number(req.query.accident_with_victim);
        }

        if (req.query.number_of_deceased) {

            queries.number_of_deceased = Number(req.query.number_of_deceased);
        }

        if (req.query.injured_hospitalized) {

            queries.injured_hospitalized = Number(req.query.injured_hospitalized);
        }



        //Paginacion y busqueda
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(begin) && Number.isInteger(end)) {
            injuredHospitalized.find({ "year": { $gte: begin, $lte: end } }).skip(offset).limit(limit).toArray((err, injHospitalizedArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(deceasedsArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }


            });

        } //Paginación
        else if (Number.isInteger(limit) && Number.isInteger(offset)) {

            injuredHospitalized.find({}).skip(offset).limit(limit).toArray((err, deceasedsArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(deceasedsArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }
            });
        } //Búsqueda
        else if (Number.isInteger(begin) && Number.isInteger(end)) {

            injuredHospitalized.find({ "year": { $gte: begin, $lte: end } }).toArray((err, deceasedsArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(deceasedsArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }
            });

        }
        else {

            // si no esta vacio entra
            if (JSON.stringify(queries) != "{}") {

                injuredHospitalized.find(queries).toArray((err, deceasedsArray) => {

                    if (err) {

                        res.sendStatus(500);

                    }
                    else {

                        if (!deceasedsArray.length) {

                            res.sendStatus(404);

                        }
                        else {

                            res.status(200).send(deceasedsArray.map((c) => {
                                delete c._id;
                                return c;

                            }));
                        }


                    }
                });

            }
            else {

                injuredHospitalized.find({}).toArray((err, deceasedsArray) => {

                    if (err) {

                        res.sendStatus(500);

                    }
                    else {

                        res.status(200).send(deceasedsArray.map((c) => {
                            delete c._id;
                            return c;

                        }));

                    }
                });

            }
        }

    });


    //GET /api/v1/YYYYYY/loadInitialData

    app.get(BASE_PATH + "/loadInitialData", (req, res) => {

        var newDeceased = [{
                province: "Badajoz",
                injured_hospitalized: "60",
                number_of_deceased: "414",
                accident_with_victim: "507",
                year: 2015

            },

            {
                province: "Malaga",
                injured_hospitalized: "20",
                number_of_deceased: "438",
                accident_with_victim: "492",
                year: 2015
            },

            {
                province: "Seville",
                injured_hospitalized: "10",
                number_of_deceased: "418",
                accident_with_victim: "502",
                year: 2015
            },

            {
                province: "Madrid",
                injured_hospitalized: "40",
                number_of_deceased: "411",
                accident_with_victim: "509",
                year: 2015
            },

            {
                province: "Huelva",
                injured_hospitalized: "10",
                number_of_deceased: "422",
                accident_with_victim: "512",
                year: 2015
            }
        ];

        injuredHospitalized.find({}).toArray((err, deceasedsArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (deceasedsArray.length == 0) {
                injuredHospitalized.insert(newDeceased);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
            }
        });
    });


    //POST /deceaseds/

    app.post(BASE_PATH, (req, res) => {

        var newDeceased = req.body;
        var province = req.body.province;
        var year = req.body.year;

        injuredHospitalized.find({ province: province, year: year }).toArray((err, deceasedsArray) => {
            if (err) {
                console.log(err);
            }
            if (deceasedsArray != 0) {

                res.sendStatus(409);

            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("accident_with_victim") == false ||
                req.body.hasOwnProperty("injured_hospitalized") == false || req.body.hasOwnProperty("number_of_deceased") == false || req.body.province != province) {

                res.sendStatus(400);

            }
            else {

                injuredHospitalized.insert(newDeceased);

                res.sendStatus(201);
            }
        });
    });



    //POST /deceaseds/Alava
    app.post(BASE_PATH + "/:province", (req, res) => {

        res.sendStatus(405);
    });



    //GET /deceaseds/albacete/2015

    app.get(BASE_PATH + "/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);

        injuredHospitalized.find({ province: province, year: year }).toArray((err, filtered) => {
            if (err) {
                console.log("Error:" + err);
            }
            if (filtered.length >= 1) {
                delete filtered[0]._id;
                res.json(filtered[0]);

            }
            else {
                res.sendStatus(404);
            }
        });
    });

    //GET /deceaseds/albacete
    app.get(BASE_PATH + "/:province", (req, res) => {
        var province = req.params.province;

        injuredHospitalized.find({ province: province }).toArray((err, filtered) => {
            if (err) {
                console.log("Error:" + err);
            }
            if (filtered.length >= 1) {
                res.send(filtered.map((c) => {
                    delete c._id;
                    return c;
                }));
            }
            else {
                res.sendStatus(404);
            }
        });
    });

    //PUT /deceaseds/petr

    app.put(BASE_PATH + "/:province", (req, res) => {
        res.sendStatus(405);

    });


    app.put("/api/v1/deceaseds/:province/:year", (req, res) => {
        var year = Number(req.params.year);
        var province = req.params.province;
        var updatedDeceased = req.body;
        injuredHospitalized.find({ "province": province, "year": year }).toArray((err, injHospitalizedArray) => {
            if (err)
                console.log(err);
            if (injHospitalizedArray == 0) {
                res.sendStatus(404);
            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("accident_with_victim") == false || req.body.hasOwnProperty("number_of_deceased") == false ||
                req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("injured_hospitalized") == false ||
                req.body.province != province || req.body.year != year) {
                res.sendStatus(400);
            }
            else {
                injuredHospitalized.updateOne({ "province": province, "year": year }, { $set: updatedDeceased });
                res.sendStatus(200);
            }
        });
    });


    //PUT /deceaseds

    app.put(BASE_PATH, (req, res) => {

        res.sendStatus(405);
    });


    //DELETE /deceaseds/Seville

    app.delete(BASE_PATH + "/:province", (req, res) => {

        var province = req.params.province;
        injuredHospitalized.find({ "province": province }).toArray((err, injHospitalizedArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (injHospitalizedArray.length == 0) {
                res.send(404);
            }
            else {
                injuredHospitalized.deleteOne({ "province": province });
                res.send(200);
            }
        });

    });


    //DELETE /deceaseds/Seville/2016
    app.delete(BASE_PATH + "/:province/:year", (req, res) => {
        var year = Number(req.params.year);
        var province = req.params.province;
        injuredHospitalized.find({ "province": province, "year": year }).toArray((err, injHospitalizedArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (injHospitalizedArray.length == 0) {
                res.send(404);
            }
            else {
                injuredHospitalized.deleteOne({ "province": province, "year": year });
                res.send(200);
            }
        });
    });


    //DELETE /deceaseds/

    app.delete(BASE_PATH, (req, res) => {
        injuredHospitalized.remove({});
        res.sendStatus(200);
    });
};

const BASE_PATH = "/api/v1/injured-hospitalized"

var apiRest = {};


module.exports = apiRest;



apiRest.register = (app, injuredHospitalized) => {
    app.get(BASE_PATH+"/docs/", (req, res) =>{
        res.redirect("https://documenter.getpostman.com/view/6976657/S17usmD2");
    });


    app.get(BASE_PATH+"/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6976657/S17usmD2");
    });
    
    //Busqueda y paginacion
    app.get(BASE_PATH, (req, res) => {
       //Busqueda
        var begin = parseInt(req.query.from);
        var end = parseInt(req.query.to);

        //Paginacion
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        //Paginacion y busqueda
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(begin) && Number.isInteger(end)) {
            injuredHospitalized.find({ "year": { $gte: begin, $lte: end } }).skip(offset).limit(limit).toArray((err, injuredHospitalizedArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(injuredHospitalizedArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }


            });

        }
        //Paginacion
        else if (Number.isInteger(limit) && Number.isInteger(offset)) {

            injuredHospitalized.find({}).skip(offset).limit(limit).toArray((err, injuredHospitalizedArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(injuredHospitalizedArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }
            });
        } //Búsqueda
        else if (Number.isInteger(begin) && Number.isInteger(end)) {

            injuredHospitalized.find({ "year": { $gte: begin, $lte: end } }).toArray((err, injuredHospitalizedArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(injuredHospitalizedArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }
            });
        }
        else {

            injuredHospitalized.find({}).toArray((err, injuredHospitalizedArray) => {

                if (err) {

                    res.sendStatus(500);

                }
                else {

                    res.status(200).send(injuredHospitalizedArray.map((c) => {
                        delete c._id;
                        return c;

                    }));

                }
            });

        }

    });
        
    //loadInitialData

    app.get(BASE_PATH+"/loadInitialData", (req, res) => {


        var injurHospitalized = [{
                province: "Sevilla",
                year: "2016",
                accident: "356"
            },

            {
                province: "Madrid",
                year: "2016",
                accident: "567"
            },

            {
                province: "Madrid",
                year: "2016",
                accident: "935"
            },

            {
                province: "Huelva",
                year: "2013",
                accident: "863"
            },

            {
                province: "Asturias",
                year: "2014",
                accident: "567"
            }

        ];

        injuredHospitalized.find({}).toArray((err, injHospitalizedArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (injHospitalizedArray.length == 0) {
                injuredHospitalized.insert(injurHospitalized);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
            }
        });
    });

    // GET /injured-hospitalized

    app.get(BASE_PATH, (req, res) => {

        injuredHospitalized.find({}).toArray((err, injuredHospitalizedArray) => {
            if (err) {
                console.log("Error" + err);
            }
            res.send(injuredHospitalizedArray);
        });

    });


    // POST /injured-hospitalized/

    app.post(BASE_PATH, (req, res) => {

        var newInjuredHospitalized = req.body;
        var province = req.body.province;
        var year = req.body.year;
        console.log(newInjuredHospitalized);

        injuredHospitalized.find({ province: province, year: year }).toArray((err, injuredHospitalizedArray) => {
            if (err) {
                console.log(err);
            }
            if (injuredHospitalizedArray != 0) {

                res.sendStatus(409);

            }
            else {

                injuredHospitalized.insertOne(newInjuredHospitalized);

                res.sendStatus(201);
            }
        });
    });


    // POST /elements/:province

    app.post(BASE_PATH+"/:province", (req, res) => {

        res.sendStatus(405);
    });


    // DELETE 

    app.delete(BASE_PATH, (req, res) => {

        injuredHospitalized.remove({});

        res.sendStatus(200);
    });


    // GET /contacts/province

    app.get(BASE_PATH+"/:province", (req, res) => {

        var province = req.params.province;

        injuredHospitalized.find({ "province": province }).toArray((error, filtered) => {
            if (error) {
                console.log("Error:" + error);
            }


            //   var filtered = injuredHospitalized.filter((c) =>{
            //      return c.province == province; 
            //   })


            if (filtered.length >= 1) {
                res.send(filtered[0]);
            }
            else {
                res.sendStatus(404);
            }
        });
    });


    // PUT /contacts/sevilla


    app.put(BASE_PATH+"/:province", (req, res) => {

        var province = req.params.province;
        var newIH = req.body;
        var found = false;

        injuredHospitalized.find({ "province": province }).toArray((err, IHArray) => {

            if (err)
                console.log(err);

            if (IHArray == 0) {

                res.sendStatus(404);

            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("accident") == false ||
                req.body.province != province) {

                res.sendStatus(400);

            }
            else {

                injuredHospitalized.updateOne({ "province": province }, { $set: newIH });
                res.sendStatus(200);
                console.log(newIH);


            }
        });
    });


    // PUT /injuredHospitalized/
    app.put(BASE_PATH, (req, res) => {

        res.sendStatus(405);
    });


    // DELETE /injured-hospitalized/:province

    app.delete(BASE_PATH+"/:province", (req, res) => {

        var province = req.params.province;

        injuredHospitalized.find({ "province": province }).toArray((err, filtered) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (filtered.length == 0) {
                res.sendStatus(404);
            }
            else {
                injuredHospitalized.deleteOne({ "province": province });
                res.sendStatus(200);
            }
        });

    });
}

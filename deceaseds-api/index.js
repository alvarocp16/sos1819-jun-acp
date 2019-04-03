const BASE_PATH = "/api/v1/deceaseds"

var apiRest = {};


module.exports = apiRest;



apiRest.register = (app, deceaseds) => {
    app.get(BASE_PATH+"/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/1804509/S17tS8Nc");
    });

    /*
    var deceaseds = [{
        province: "Alava",
        number: "10",
        year: "2015"
    }, {
        province: "Albacete",
        number: "22",
        year: "2015"
    }];
    */
    //GET /deceaseds/
    app.get(BASE_PATH, (req, res) => {

        //Busqueda 
        var begin = parseInt(req.query.from);
        var end = parseInt(req.query.to);

        //Paginacion
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        //Paginacion y busqueda
        if (Number.isInteger(limit) && Number.isInteger(offset) && Number.isInteger(begin) && Number.isInteger(end)) {
            deceaseds.find({ "year": { $gte: begin, $lte: end } }).skip(offset).limit(limit).toArray((err, deceasedsArray) => {

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

            deceaseds.find({}).skip(offset).limit(limit).toArray((err, deceasedsArray) => {

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

            deceaseds.find({ "year": { $gte: begin, $lte: end } }).toArray((err, deceasedsArray) => {

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

            deceaseds.find({}).toArray((err, deceasedsArray) => {

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

    });


    //GET /api/v1/YYYYYY/loadInitialData

    app.get(BASE_PATH+"/loadInitialData", (req, res) => {

        var newDeceased = [{
                province: "Badajoz",
                number: "60",
                year: 2015
            },

            {
                province: "Malaga",
                number: "20",
                year: 2015
            },

            {
                province: "Seville",
                number: "10",
                year: 2015
            },

            {
                province: "Madrid",
                number: "40",
                year: 2015
            },

            {
                province: "Huelva",
                number: "10",
                year: 2015
            }
        ];

        deceaseds.find({}).toArray((err, deceasedsArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (deceasedsArray.length == 0) {
                deceaseds.insert(newDeceased);
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

        deceaseds.find({ province: province, year: year }).toArray((err, deceasedsArray) => {
            if (err) {
                console.log(err);
            }
            if (deceasedsArray != 0) {

                res.sendStatus(409);

            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("number") == false ||
                req.body.province != province) {

                res.sendStatus(400);

            }
            else {

                deceaseds.insert(newDeceased);

                res.sendStatus(201);
            }
        });
    });



    //POST /deceaseds/Alava
    app.post(BASE_PATH+"/:province", (req, res) => {

        res.sendStatus(405);
    });



    //GET /deceaseds/albacete/2015

    app.get(BASE_PATH+"/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);

        deceaseds.find({ province: province, year: year }).toArray((err, filtered) => {
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

    //GET /deceaseds/albacete
    app.get(BASE_PATH+"/:province", (req, res) => {
        var province = req.params.province;

        deceaseds.find({ province: province }).toArray((err, filtered) => {
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

   /* //PUT /deceaseds/petr

    app.put(BASE_PATH+"/:province", (req, res) => {

        var province = req.params.province;
        var newDeceased = req.body;
        var found = false;

        deceaseds.find({ "province": province }).toArray((err, deceasedsArray) => {
            if (err)
                console.log(err);

            if (deceasedsArray == 0) {

                res.sendStatus(404);

            }
            else if (req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("number") == false ||
                req.body.province != province) {

                res.sendStatus(400);

            }
            else {

                deceaseds.updateOne({ "province": province }, { $set: newDeceased });
                console.log(newDeceased);
                res.sendStatus(200);


            }
        });
    });*/


    //PUT /deceaseds/Seville/2017
    /*app.put(BASE_PATH+"/:province/:year", (req, res) => {
        var params = {
            year : Number(req.params.year),
            province : req.params.province
        };
        var updatedDeceased = req.body;
        deceaseds.find(params).toArray((err, deceasedArray) => {
            if (err)
                console.log(err);
            if (deceasedArray == 0) {
                res.sendStatus(404);
            }
            else if (updatedDeceased.province != req.params.province || updatedDeceased.year != params["year"] 
            || isNaN(updatedDeceased.province) || isNaN(updatedDeceased.year) || isNaN(updatedDeceased.number) 
            || !updatedDeceased.hasOwnProperty("province") || !updatedDeceased.hasOwnProperty("number") || !updatedDeceased.hasOwnProperty("year")){
                res.sendStatus(400);
            }
            else {
                deceaseds.updateOne(params, updatedDeceased, (err, updateAr) =>{
                    if (err){
                        res.sendStatus(500);
                    }
                    else{
                        res.sendStatus(200);
                    }
                });
            }
        });
    });*/
    
    app.put("/api/v1/deceaseds/:province/:year", (req, res) => {
    var year = Number(req.params.year);
    var province = req.params.province;
    var updatedDeceased = req.body;
    deceaseds.find({"province": province,"year": year}).toArray((err, deceasedArray) => {
        if (err)
            console.log(err);
        if (deceasedArray == 0) {
            res.sendStatus(404);
        }else if(req.body.hasOwnProperty("province") == false || req.body.hasOwnProperty("year") == false || req.body.hasOwnProperty("number") == false 
        || req.body.province != province || req.body.year != year) {
            res.sendStatus(400);
        }else{
            deceaseds.updateOne({ "province": province,"year": year }, { $set: updatedDeceased });
            res.sendStatus(200);
        }
    });
});


    //PUT /deceaseds

    app.put(BASE_PATH, (req, res) => {

        res.sendStatus(405);
    });


    //DELETE /deceaseds/Seville

    app.delete(BASE_PATH+"/:province", (req, res) => {

        var province = req.params.province;
        deceaseds.find({ "province": province }).toArray((err, deceasedsArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (deceasedsArray.length == 0) {
                res.send(404);
            }
            else {
                deceaseds.deleteOne({ "province": province });
                res.send(200);
            }
        });

    });


    //DELETE /deceaseds/Seville/2016
    app.delete(BASE_PATH+"/:province/:year", (req, res) => {
        var year = req.params.year;
        var province = req.params.province;
        deceaseds.find({ "province": province, "year": year }).toArray((err, deceasedArray) => {
            if (err) {
                console.log("Error: " + err);
            }
            if (deceasedArray.length == 0) {
                res.send(404);
            }
            else {
                deceaseds.deleteOne({ "province": province, "year": year });
                res.send(200);
            }
        });

    });


    //DELETE /deceaseds/

    app.delete(BASE_PATH, (req, res) => {
        deceaseds.remove({});
        res.sendStatus(200);
    });
};

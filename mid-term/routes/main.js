module.exports = function(app) {


    app.get("/",function(req, res){
        res.render("home.html")
        });//get the homepage

    app.get("/about",function(req, res){
        res.render("about.html")
        });//get about page

    app.get("/add",function(req, res) {
        res.render("add.html");
        }); //get add page 
    
    app.post("/added", function (req,res) {
        // add device in database
        let adddevice = "INSERT INTO device (Name,Type,Status,Position,Temperature,Volume,Wind) VALUES (?,?,?,?,?,?,?)";
        //inserting the the values Name,Type,Status,Position,Temperature,Volume,Wind which the user inputs
        let record = [req.body.Name, req.body.Type,req.body.Status,req.body.Position,req.body.Temperature,req.body.Volume,req.body.Wind];
        //input command and  Name,Type,Status,Position,Temperature,Volume,Wind values and output is adding these values in device table  
        db.query(adddevice, record, (err, result) => {
        if (err) {
        return console.error(err.message);
        }else
        res.redirect("/all");
        });//after adding device then redirect to all.html 
        }); 

    app.get("/delete", function(req, res) {
        let name = "SELECT Name FROM device";
        //getting names of device in device table
        db.query(name, (err, result) => {
        //input command, output is all the names of devices 
        if (err) {
        res.redirect("/");
        }else
        res.render("delete.html",{devicenames: result});
        });//get delete.html with the result(names)
        });   

    app.post("/deleted",function(req, res) {
        // deleting the specific device from database
        let delname = [req.body.deletename];
        //request and receive the device's name to be deleted
        let deletedevice = "Delete from device where Name=?";
        //input device name and command,  ouput deletes the data with the corresponding device name
        db.query(deletedevice,delname, (err, result) => {
        if (err) {
        res.redirect("/");
        }else
        res.redirect("/all");
        });//after deleting, get all.html to show all the devices 
        }); 

    app.get("/select", function(req, res) {
        let name = "SELECT Name FROM device";
        //getting names of devices in database
        db.query(name, (err, result) => {
        //input command, output the device names
        if (err) {
        res.redirect("/");
        }
        res.render("select.html",{devicenames: result});
        })//get select page with the results(names)
        });

    app.get("/viewstatus", function(req, res) {
        let command = "SELECT* FROM device where name=?";
        //getting all the status of device having the specific name
        db.query(command,req.query.name,(err, result) => {
        //input command and select name, output the devie's status with the corresponding name
        if (err) {
        res.redirect("/");
            }
        res.render("viewstatus.html",{devvalue: result});
        })//then get viewstatus.html with result(status of device)
        }); 
    
    app.get("/controlselect", function(req, res) {
        let name = "SELECT Name FROM device";
        //getting names of devices in database
        db.query(name, (err, result) => {
        //input command, ouput device names
        if (err) {
        res.redirect("/");
        }
        res.render("controlselect.html",{devicenames: result});
        })//call controlselect.html with names retrieved
        });

    app.get("/update", function(req, res) {
        //get the devices's status
        let name = "SELECT* FROM device where Name=?";
        //getting all the status of device having the specific name
        db.query(name,req.query.name ,(err, result) => {
        //input name and command, ouput the device's status
        if (err) {
        res.redirect("/");
        }
        res.render("update.html",{devicenames: result});
        })//after getting status get update page with received results(device status)
        });

    app.post("/updated",function(req, res) {
        // to receive the changed status and update the data using name condition
        let update ="UPDATE device SET Status=?,Position=?,Temperature=?,Volume=?,Wind=? WHERE Name=? ";
        let values = [req.body.Status,req.body.Position,req.body.Temperature,req.body.Volume,req.body.Wind,req.body.Name];
        //edit the devices's data where the name equals to specific name  
        db.query(update,values,(err, result) => {
        //input command and Position,Temperature,Volume,Wind values , output the device with corresponding name the their status are edited
        if (err) {
            return console.error(err.message);
        }else
        res.redirect("/all");
        });//after udpating, get all.html which show all the devices and their status
        }); 

     app.get("/all", function(req, res) {
        let sqlquery = "SELECT * FROM device";
        //get all the devices and their status from sql
        db.query(sqlquery, (err, result) => {
        //input command, result the whole device table data
        if (err) {
        res.redirect("/");
        }
        res.render("all.html",{availableDevices: result});
        });//geting all.html with received values
    });  
   
 

}
var express = require("express");
var app = express();
var bodyParser = require('body-parser')

//For database connection
var mongoose = require('mongoose');

//for database schema
var employeeSchema = mongoose.Schema({
  name : String,
  age : Number,
  contact : String
});

//Database model
var Employee = mongoose.model('Employee', employeeSchema);
var emp1;
mongoose.connect('mongodb://localhost:27017/employeelist', function(error){
  if(error)
    console.log(error);
  else {
    console.log("Database is connected.");
  }
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

//To Insert Record in Database
app.post('/addEmployeeDetails', function(req, res){
  console.log("This data came from Front-end : -", req.body);
  newEmp = new Employee( req.body);
  newEmp.save(function(err){
    if(err){
    console.log(err);
    res.send('Error occured during saving data : -',err);
  }
  else{
    console.log("Employee Details saved in database.");
    res.send('Employee Details saved in database.');
  }
  });
});

//To delete Record from database
app.post('/removeEmployeeDetails', function(req, res){
  console.log("This data is getting deleted : -", req.body);
  Employee.findOneAndRemove({_id: req.body._id}, function(err){
    if(!err){
      console.log('Record deleted from database ',req.body._id);
      res.send('Record deleted from database');
    }
    else {
      console.log(err);
      res.send(err);
    }
  });
});

//To Update Record into database
app.post('/updateEmployeeDetails', function(req, res){
  console.log("This data is going to be updated : -", req.body);
  Employee.findOne({_id: req.body._id}, function(err, doc){
    if(!err){
      doc.name = req.body.name;
      doc.age = req.body.age;
      doc.contact = req.body.contact;
      doc.save(function(error){
        if(!error){
          console.log('Record Updated into database ',doc);
          res.send('Record Updated into database');
        }
        else{
          console.log(error);
          res.send(error);
        }
      });
    }
    else {
      console.log(err);
      res.send(err);
    }
  });
});

//To get all data from database
app.get('/employeeList', function(req, res){
  console.log("Recieved a Get Request");

    //Employee emp ;
  var empList = Employee.find(function (err, empList) {
    if (err) return console.error(err);
      console.log(empList);
      res.json(empList);
    });
  });

app.listen(3000);
console.log("Server running on port 3000");

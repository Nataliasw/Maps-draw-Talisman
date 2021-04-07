const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash")
app.use(bodyParser.urlencoded({
  extended: true
}));


app.set("view engine", "ejs");

app.use(express.static("public"))


let arrayChecked = [];
let arrayResult = [];
let uniqueChar = [];

app.get("/", function(req, res) {
  res.render("home")
  arrayChecked = [];
  arrayResult = [];
  uniqueChar = [];
});

app.get("/result", function(req, res) {
  res.render("result", {
    arrayResult: uniqueChar
  })
})

//------------------------------------ -------------input form -----------------------------------------------

app.post("/choose", function(req, res) {

  const arrayAll = [req.body.dungeon, req.body.highland, req.body.dragon, req.body.city, req.body.woodland, req.body.cataclysm, req.body.northenland]

  const mapsNumber = Number(req.body.mapsNumber);

  arrayAll.forEach(checkedFunction)

  //if checkbox is checked, push item to the array

  function checkedFunction(item) {
    if (item != undefined) {
      arrayChecked.push(item)
    }
  }



  do {
    addItems()
  } while (uniqueChar.length > 0 && uniqueChar.length < mapsNumber)



  //if array uniqueChar do not contain item from arrayResult it will be pushed there
  function addItems() {
    arrayResult.push(_.upperFirst(arrayChecked[Math.floor(Math.random() * arrayChecked.length)]))
    arrayResult.forEach(filterFunction)

    function filterFunction(item) {
      if (!uniqueChar.includes(item)) {
        uniqueChar.push(item)
      }
    };
  };
  res.redirect("/result")




  console.log(uniqueChar.length)
  console.log(uniqueChar)
  // console.log(arrayChecked);
  console.log(arrayResult);
  // console.log(arrayChecked[Math.floor(Math.random() * arrayChecked.length + 1)]);
  console.log(mapsNumber);

});

//-------------------------------------------result------------------------------------
app.post("/result", function(req, res) {
  res.redirect("/")
})




app.listen(3000, function() {
  console.log("server started on port 3000")
});
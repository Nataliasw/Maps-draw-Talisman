const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.set("view engine", "ejs");

app.use(express.static("public"))


let arrayChecked = [];
let arrayResult = [];


app.get("/", function(req, res) {
  res.render("home")
});

app.get("/result", function(req, res) {
  res.render("result", {
    arrayResult: arrayResult
  })
})

app.post("/choose", function(req, res) {
  const arrayAll = [req.body.podziemia, req.body.gory, req.body.smoki, req.body.miasto, req.body.las, req.body.kataklizm, req.body.krainaLodu]

  const mapsNumber = Number(req.body.mapsNumber) + 1

  arrayAll.forEach(checkedFunction)

  function checkedFunction(item) {
    if (item != undefined) {
      arrayChecked.push(item)
    }
  }

  if (arrayResult.length === 0) {
    for (let i = 0; i < mapsNumber; i++) {

      arrayResult.push(arrayChecked[Math.floor(Math.random() * arrayChecked.length + 1)])

    }
  }

  $.each(arrayResult, function(i, el) {
    if ($.inArray(el, arrayResultfinal) === -1) arrayResultfinal.push(el)
  });





  console.log(arrayResult)
  console.log(arrayChecked[Math.floor(Math.random() * arrayChecked.length + 1)])
  console.log(mapsNumber)
  res.redirect("/result")
});







app.listen(3000, function() {
  console.log("server started on port 3000")
});
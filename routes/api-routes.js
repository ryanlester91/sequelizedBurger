var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/", function(req, res) {
    res.redirect("/burgers");
  });

  app.get("/burgers", function(req, res) {
    let query = {};
    if (req.query.CustomerId) {
      query.Customer = req.query.CustomerId;
    }

    db.Burger
      .findAll({
        include: db.Customer,
        where: query,
      }).then(function(data) {
        let hbsObject = { burgers: data };
        res.render("index", hbsObject);
      });
});

//submit button creates burger
app.post("/burgers/create", function(req, res) {
  db.Burger
    .create({
      burger_name: req.body.burger_name,
  }).then(function() {
    res.redirect("/burgers");
  });
});

app.put("/burgers/update", function(req, res) {
  let customerName = req.body.eater_id;

  db.Customer
    .findAll({
      where: { customer_name: customerName}
    }). then(function(data) {
        if(data.length > 0) {
          //if customer already exists in database
          console.log("customer already exists");
          devour(data[0].dataValues.id);
        } else {
          //if customer does not exist in database
          console.log("creating new customer");
          db.Customer
            .create({
              customer_name: req.body.eater_id
            }).then(function(data) {
              devour(data.dataValues.id);
            }
        });

        function devour(customer) {
          console.log("devouring");

          //mark burger as devoured and record the id of the customer
        db.Burger
          .update(
            {
              devoured: true,
              CustomerId: customer
            },
          {
            where: { id: req.body.burger_id }
          }
          ).then(function() {
            res.redirect("/burgers");
          });

  }
});
};
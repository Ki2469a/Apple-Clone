const mysql1 = require("mysql2");
const express = require("express");
var app = express();
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));

const connection = mysql1.createConnection({
  host: "localhost",
  user: "kiraDB",
  password: "1234",
  database: "kiraDB",
});

connection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to MySQL DB");
});

app.get("/", (req, res) => {
  res.send("Welcome to the MySQL Example app!");
});
app.listen(2024, () => {
  console.log("Example app listening on port 2024!");
});

app.get("/create-table", (req, res) => {
  // let name = `CREATE TABLE if not exists customers(
  //       customer_id int auto_increment,
  //       name varchar(255) not null,
  //       PRIMARY KEY (customer_id)
  //    )`;

  // let address = `CREATE TABLE if not exists address(
  //  address_id int auto_increment,
  //  customer_id int(11) not null,
  //  address varchar(255) not null,
  //  PRIMARY KEY (address_id),
  //  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

  //  )`;

  // let company = `CREATE TABLE if not exists company(
  //       company_id int auto_increment,
  //       customer_id int(11) not null,
  //       company varchar(255) not null,
  //       PRIMARY KEY (company_id),
  //       FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

  //  )`;

  let Products = `CREATE TABLE if not exists Products(
        product_id int auto_increment,
         product_url varchar(255) not null,
         product_name varchar(255) not null,

        PRIMARY KEY (product_id)
   )`;

  //product description table
  let ProductDescription = `CREATE TABLE if not exists ProductDescription(
        description_id int auto_increment,
        product_id int(11) not null,
        product_brief_description varchar(255) not null,
        product_description varchar(255) not null,
        product_img varchar(255) not null,
        product_link varchar(255) not null,

        PRIMARY KEY (description_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
      )`;
  // product price table
  let ProductPrice = `CREATE TABLE if not exists ProductPrice(
        price_id int auto_increment,
        product_id int(11) not null,
        starting_price varchar(255) not null,
        price_range varchar(255) not null,

        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
      )`;

  // connection.query(name, (err, result, fields) => {
  //   if (err) console.log(err);
  // });

  // connection.query(address, (err, result, fields) => {
  //   if (err) console.log(err);
  // });

  // connection.query(company, (err, result, fields) => {
  //   if (err) console.log(err);
  // });
  connection.query(Products, (err, result, fields) => {
    if (err) console.log(err);
  });
  connection.query(ProductDescription, (err, result, fields) => {
    if (err) console.log(err);
  });
  connection.query(ProductPrice, (err, result, fields) => {
    if (err) console.log(err);
  });
  res.end("Table Created");
  console.log("Table Created");
});

app.use(express.json());
app.post("/insertIphone", (req, res) => {
  // console.table(req.body);

  // const { name, address, company } = req.body;

  // let InsertName = " INSERT INTO customer(name) VALUES (?)";

  // let InsertAddress = " INSERT INTO address(customer_id, address) VALUES (?,?)";

  // let InsertCompany = " INSERT INTO address(customer_id, company) VALUES (?,?)";
  console.log(req.body.iphoneId);
  let Id = req.body.iphoneId;
  let img = req.body.imgPath;
  let Url = req.body.iphoneLink;
  let Title = req.body.iphoneTitle;
  let Brief = req.body.briefDescription;
  let StartPrice = req.body.StartPrice;
  let PriceRange = req.body.priceRange;
  let Description = req.body.fullDescription;

  let addedProductId = 0;

  let sqlAddToProducts =
    "INSERT INTO Products (product_url, product_name) VALUES ('" +
    Id +
    "', '" +
    Title +
    "' )";

  connection.query(sqlAddToProducts, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  const selectPID = `SELECT product_id FROM products WHERE product_name = "${product_name}"`;

  Connection.query(
    "SELECT * FROM Products WHERE product_url = '" + Id + "' ",
    (err, rows, fields) => {
      addedProductId = rows[0].product_id;
      console.log(addedProductId);
      if (err) console.log(err);

      if (addedProductId != 0) {
        let sqlAddToProductDescription =
          "INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES ('" +
          addedProductId +
          "', '" +
          Brief +
          "', '" +
          Description +
          "', '" +
          img +
          "', '" +
          Url +
          "' )";

        let sqlAddToProductPrice =
          "INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES ('" +
          addedProductId +
          "', '" +
          StartPrice +
          "', '" +
          PriceRange +
          "')";

        Connection.query(
          sqlAddToProductDescription,
          function (err, result) {
            if (err) throw err;
            console.log("Product description inserted");
          }
        );

        Connection.query(sqlAddToProductPrice, function (err, result) {
          if (err) throw err;
          console.log("Product price inserted");
        });
      }
    }
  );
  res.end("Product added");
});

//Get all iphones
app.get("/iphones", (req, res) => {
  Connection.query(
    "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
    (err, rows, fields) => {
      let iphones = { products: [] };
      iphones.products = rows;
      var stringIphones = JSON.stringify(iphones);
      if (!err) res.end(stringIphones);
      else console.log(err);
    }
  );
});

// const port = 3001; for LOCAL
// const port = process.env.PORT; //for REMOTE
// app.listen(port, () =>
//   console.log(
//     "Listening to : " + port,
//     `\nRunning on => http://localhost:${port}`
//   )
// );

// const mysql = require("mysql");
// const express = require("express");
// var cors = require("cors");

// const body_parser = require("body-parser");

// var app = express();
// app.use(cors());

// // Use  body parser as middle ware
// app.use(body_parser.urlencoded({ extended: true }));

// var mysqlConnection = mysql.createConnection({
//   // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //path to mysql sock in MAMP
//   user: "mydb",
//   password: "mydb",
//   host: "localhost",
//   database: "mydb",
// });

// mysqlConnection.connect((err) => {
//   if (err) console.log(err);
//   else console.log("Connected");
// });

// // Install: Create the tables necessary
// app.get("/install", (req, res) => {
//   let message = "Tables Created";
//   // products table
//   let createProducts = `CREATE TABLE if not exists Products(
//         product_id int auto_increment,
//         product_url varchar(255) not null,
//         product_name varchar(255) not null,

//         PRIMARY KEY (product_id)
//     )`;

//   // product description table
//   let createProductDescription = `CREATE TABLE if not exists ProductDescription(
//       description_id int auto_increment,
//       product_id int(11) not null,
//       product_brief_description varchar(255) not null,
//       product_description varchar(255) not null,
//       product_img varchar(255) not null,
//       product_link varchar(255) not null,

//       PRIMARY KEY (description_id),
//       FOREIGN KEY (product_id) REFERENCES Products(product_id)
//     )`;
//   // product price table
//   let createProductPrice = `CREATE TABLE if not exists ProductPrice(
//       price_id int auto_increment,
//       product_id int(11) not null,
//       starting_price varchar(255) not null,
//       price_range varchar(255) not null,

//       PRIMARY KEY (price_id),
//       FOREIGN KEY (product_id) REFERENCES Products(product_id)
//     )`;

//   mysqlConnection.query(createProducts, (err) => {
//     if (err) console.log(err);
//   });
//   mysqlConnection.query(createProductDescription, (err) => {
//     if (err) console.log(err);
//   });
//   mysqlConnection.query(createProductPrice, (err, results) => {
//     if (err) console.log(err);
//   });

//   res.end(message);
// });

// // Insert a new iPhone
// app.post("/add-product", (req, res) => {
//   // products table
//   let product_name = req.body.product_name;
//   let product_url = req.body.product_url;
//   // product_description table
//   let product_brief_description = req.body.product_brief_description;
//   let product_description = req.body.product_description;
//   let product_img = req.body.product_img;
//   let product_link = req.body.product_link;
//   // ProductPrice table
//   let starting_price = req.body.starting_price;
//   let price_range = req.body.price_range;

//   let insertProduct = `INSERT INTO products (product_url,product_name) VALUES ("${product_url}", "${product_name}") ;`;

//   mysqlConnection.query(insertProduct, (err) => {
//     if (err) {
//       console.log(err);
//       res.end(err);
//     }
//   });
//   const selectPID = `SELECT product_id FROM products WHERE product_name = "${product_name}"`;

//   mysqlConnection.query(selectPID, (err, result) => {
//     const PId = result[0].product_id;
//     if (err) {
//       console.log(err);
//       res.end(err);
//     } else {

//       let insert_product_des = `INSERT INTO ProductDescription(product_id,product_brief_description,product_description,product_img,product_link) VALUES (${PId},"${product_brief_description}","${product_description}","${product_img}","${product_link}")`;

//       let insert_Product_price = `INSERT INTO ProductPrice(product_id,starting_price,price_range) VALUES ("${PId}","${starting_price}", "${price_range}") ;`;

//       mysqlConnection.query(insert_product_des, (err) => {
//         if (err) {
//           console.log(err);
//           res.end(err);
//         }
//       });

//       mysqlConnection.query(insert_Product_price, (err) => {
//         if (err) {
//           console.log(err);
//           res.end(err);
//         }
//       });

//     }
//     res.send("data inserted");
//   });

// });

// //Get all iphone's
// app.get("/iphones", (req, res) => {
//   mysqlConnection.query(
//     "SELECT * FROM Products INNER JOIN ProductDescription INNER JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
//     (err, rows) => {
//       // let iphones = { : [] };
//       // iphones.products = rows;
//       // var stringIphones = JSON.stringify(iphones);
//       if (!err) res.json({ products: rows });
//       else console.log(err);
//     }
//   );
// });

// app.listen(3001, (err) => {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log("Listening to : 3001")
//   }
// });

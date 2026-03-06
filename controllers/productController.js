//SQL
const connection = require('../config/db');

//Get all users
exports.getAllProducts=(req,res)=>{
    connection.query('SELECT * FROM product_info', (err,rows,fields)=>{
        if(err) throw err;
            res.json(rows);
    });
};

//Search a user by ID
exports.getProductsByName=(req,res)=>{
    const iName=req.params.id;
    connection.query('SELECT * FROM product_info WHERE itemName=?',[iName],(err,rows,fields)=>{
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json({message: 'Item not found'});
    });
};

//Create a new user
//CRUD - Create
exports.createProduct=(req,res)=>{
    const {iName, uPrice, qt, sp}=req.body;
    connection.query('INSERT INTO product_info (itemName, unitPrice, quantity, supplier) VALUES (?,?,?,?)',[iName,uPrice,qt,sp],(err,result)=>{
        if(err) throw err;
            res.json({message: 'Item created succesfully', userId:result.insertId});
    });
};


//Update a user
//CRUD - Update
exports.updateProduct = (req, res) => {
  const {iName, uPrice, qt, sp} = req.body;
  connection.query(
    "UPDATE product_info SET unitPrice=?, quantity=?, supplier=? WHERE itemName=?",
    [uPrice, qt, sp, iName],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({ message: "Item updated successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    },
  );
};

//Delete a user
//CRUD - Delete
exports.deleteProduct = (req, res) => {
  const iName = req.body.id;
  connection.query("DELETE FROM product_info WHERE itemName=?", [iName], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  });
};
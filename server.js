const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = 3000;

sequelize.sync().then(()=>{

 app.listen(PORT,()=>{
  console.log("Server running on port "+PORT);
 });

});
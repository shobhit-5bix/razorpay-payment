const { app } = require("./app.js");


app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const mongoose = require("mongoose");

// Dennis: Recommended to leave useNewUrlParser and useUnifiedTopology as true to avoid depreciated warnings
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/premium_user')(app);
require('./routes/recent_pages')(app);
require('./routes/users')(app);
require('./routes/comment')(app);
require('./routes/like')(app);
require('./routes/favorite')(app);

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
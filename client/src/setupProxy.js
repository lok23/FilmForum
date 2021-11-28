// https://github.com/chimurai/http-proxy-middleware
// https://www.youtube.com/watch?v=gppIydsYNOs

// this saves us from having to type "http://localhost:5000/" over and over again
const proxy = require("http-proxy-middleware");

module.exports = function(app) {

    app.use(proxy("/api", { target: "http://localhost:5000/" }));

};

var notFound = require('./handler/NotFounfHandler');
const routerLogin = require('./route/login');
function Routes(app) {
    //general: 
    app.use("/api/user", routerLogin)




    app.use("*", notFound);
}
module.exports = Routes;
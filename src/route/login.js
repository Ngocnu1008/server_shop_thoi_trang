const { Router} = require("express");
const { v4: uuidv4} = require("uuid");
const argon2 = require("argon2");
const db = require("../connectDb");

const routerLogin = Router();
routerLogin.post('/register', async(req, res) => {
    try {
        var { name, phone, pw, add } = req.body;
        if ([ name, phone, pw, add].includes(undefined)) {
            return res.status(401).send("Argument invalid");
        }
        
        const hashPw = await argon2.hash(pw);

        let sql = `insert into ivymodal (id, name, phone, pw, add) 
        values ('${uuidv4()}', '${name}' , '${phone}', '${hashPw}', '${add}')`;

        db.query(sql)
            .then(() => res.status(200).json({ success: true}))
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server");
    }
});
routerLogin.post('/login', async (req, res) => {
    try {
        var { phone, pw } = req.body;
        // console.log(req.body);

        if(!phone || !pw) {
            return res.status(401).send("Argument invalid");
        }

        let sql_find = `select * from ivymodal where phone = '${phone}'`;
        
        let check_user = await db.query(sql_find);
    //    console.log(check_user); => ra mang rong
        if (check_user.length === 0) {
            return res.status(401).send("User does not exist")
        }
        
        const verify = await argon2.verify(check_user[0].pw, pw);
        if(!verify) {
            return res.status(401).send("User name or password is not correct");
        }

        res.json({
            success: true, 
            name: check_user[0].name, 
            phone: check_user[0].phone, 
            add: check_user[0].add
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server");
    }
})
module.exports = routerLogin;
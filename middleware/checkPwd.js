
module.exports = (req, res, next) => {
    try {
        const pwd = req.body.password;
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/;
        
        if (regex.test(pwd)==false){
            throw 'Invalid password';}
         else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid password!')
        });
    }
};
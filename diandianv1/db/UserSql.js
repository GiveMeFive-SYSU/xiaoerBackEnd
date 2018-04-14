var UserSQL = {
    insert:'INSERT INTO business_info(Username,Password,Shopname,Phonenum,accessKey) VALUES(?,?,?,?,?)',
    // queryAll:'SELECT Username,Shopname,Tablenum,Phonenum,Key FROM business_info',
    getUserByUsername:'SELECT * FROM business_info WHERE Username = ? '
};
// param.username, password, param.shopname, param.tablenum, param.phonenum, Key
module.exports = UserSQL;
var OrderdetailSql = {
    insert:'INSERT INTO business_orderdetail(Username,Ordernumber,Dishname,Count,Tastenote) VALUES(?,?,?,?,?)',
    getOrderByUsernameAndOrdernumber:'SELECT * FROM business_orderdetail WHERE Username = ? AND Ordernumber=?',
    deleteOrderInfo:'DELETE FROM business_orderdetail WHERE Username=? AND Ordernumber=?'
};
module.exports = OrderdetailSql;
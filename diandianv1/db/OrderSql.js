/**
 * Created by 90747 on 5/11/2018
 */

var OrderSql = {
    insert:'INSERT INTO business_order(Username, Ordernumber, Ordertime, Tablenumber, Tastenote, Price) VALUES(?,?,?,?,?,?)',
    getOrderByUsername:'SELECT * FROM business_order WHERE Username = ? ORDER BY Tablenumber asc, Ordertime desc',
    getOrderTetailByUsername:' SELECT * FROM business_orderdetail as od, business_order as o where o.Username= ? and od.Ordernumber = o.Ordernumber and o.Finished=0  ORDER BY o.Tablenumber asc, o.Ordertime desc',
    setFished:'UPDATE business_order SET Finished = 1 WHERE Username=? AND Ordernumber=?',
    deleteOrderInfo:'DELETE FROM business_order WHERE Username=? AND Ordernumber=?',
    queryOrderByTime : 'SELECT count(*) as cases, sum(Price) as total FROM business_order WHERE Username = ? AND Ordertime >  ? AND Ordertime < ?'
};
module.exports = OrderSql;

/**
 * Created by 90747 on 5/11/2018
 */

var OrderSql = {
    insert:'INSERT INTO business_order(Username, Ordernumber, Ordertime, Tablenumber, Tastenote,Price) VALUES(?,?,?,?,?,?)',
    getOrderByUsername:'SELECT * FROM business_order WHERE Username = ? ORDER BY Tablenumber asc, Ordertime desc',
    deleteOrderInfo:'DELETE FROM business_order WHERE Username=? AND Ordernumber=?'
};
module.exports = OrderSql;

/**
 * Created by 90747 on 7/23/2017.
 */

var OrderSql = {
    insert:'INSERT INTO business_order(Username, Ordernumber, Ordertime, Tablenumber, Price) VALUES(?,?,?,?,?)',
    getOrderByUsername:'SELECT * FROM business_order WHERE Username = ? ORDER BY Ordertime desc',
    deleteOrderInfo:'DELETE FROM business_order WHERE Username=? AND Ordernumber=?'
};
module.exports = OrderSql;

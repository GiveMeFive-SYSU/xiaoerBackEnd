/**
 * Created by 90747 on 7/23/2017.
 */
var FoodSql = {
    getFoodTypeByUsername:"SELECT * FROM business_dish WHERE Username = ? AND Dishtypename = ?",
    getFoodTypeListByUsername:"SELECT distinct(Dishtypename), Dishtype FROM business_dish WHERE Username = ? ORDER BY Dishtype",
    getFoodListByUsername :"SELECT * FROM business_dish WHERE Username = ? ORDER BY Dishtype",
    getFoodByUsernameAndDishname : "SELECT * FROM business_dish WHERE Username = ? AND Dishname = ?",
    addFoodInfo : "INSERT INTO business_dish(Username,Dishname,DishOldprice,Dishprice,Dishimage,Dishdescription,Dishtypename,Dishtype) VALUES(?,?,?,?,?,?,?,?)",
    deleteFoodInfo : "DELETE FROM business_dish WHERE Username=? AND Dishname=? AND Dishtype = ?",
    deleteTypeInfo : "DELETE FROM business_dish WHERE Username=? AND Dishtypename = ?",
    updateFoodInfo : "UPDATE business_dish SET DishOldprice = ?, Dishprice = ?,  Dishimage = ?,  Dishdescription = ?, Dishtypename = ?, Dishtype = ? WHERE Username=? AND Dishname = ?",
    updateFoodInfoNoImg:"UPDATE business_dish SET DishOldprice = ?, Dishprice = ?, Dishdescription = ?, Dishtypename = ?, Dishtype = ? WHERE Username=? AND Dishname = ?",
    updateTypeInfo : "UPDATE business_dish SET Dishtype = ? WHERE Username=? AND Dishtypename = ?"
};
module.exports = FoodSql;


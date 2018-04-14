// queryAll:'SELECT * FROM cards',
var BankCardSql = {
    insert:'INSERT INTO business_credictcard(Cardnumber,Cardholder, Username) VALUES(?,?,?)',
    getCardByCardNum:'SELECT * FROM business_credictcard WHERE Cardnumber = ? ',
    updateCardInfo:'UPDATE business_credictcard SET Cardnumber=?, Cardholder=? WHERE Username=?',
    deleteCardInfo:'DELETE FROM business_credictcard WHERE Cardnumber=? AND Cardholder=? AND Username=?'
};
module.exports = BankCardSql;
var TableSql = {
  getTableInfoByUsername:"SELECT Tablenumber FROM business_table WHERE Username = ?",
  addTableInfo:"INSERT INTO business_table(Username, Tablenumber) VALUES(?,?)",
  deleteTableInfo:"DELETE FROM business_table WHERE Username=? AND Tablenumber=?",
  updateTableInfo:"UPDATE business_table SET Tablenumber = ? WHERE Username=?"
};
module.exports = TableSql;
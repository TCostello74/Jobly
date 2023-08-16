const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
  
/**Function designed to help with constructing the SET clause of a SQL UPDATE statement
   * Given object of data to update (dataToUpdate)
   * & mapping of Javascript object property names to their corresponding SQL column names (jsToSql)
   */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate); 
  // ^^extract property names (keys) from 'dataToUpdate' object then stores them in the 'keys' array
  if (keys.length === 0) throw new BadRequestError("No data"); 
  // ^^checks for keys by checking length of keys. If no keys it throws an error.

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  
  const cols = keys.map((colName, idx) => 
  // ^^with (map) transform each key from dataToUpdate object ex: colName ='firstName' idx ='0'
      `"${jsToSql[colName] || colName}"=$${idx + 1}`, 
      // ^^checks if mapping for 'colName' in 'jsTOSql' object. If there is it uses that mapping.
      // if not, defaults to using 'colName'.
      // $${idx + 1} -- placeholder for SQL parameterized queries ex: $1.. $2.. $3..
  );

  return {   //return object containing..
    setCols: cols.join(", "), //SET clause of the SQL statement
    values: Object.values(dataToUpdate), //an array of values to be used with the parameterized SQL query
  };
}

module.exports = { sqlForPartialUpdate };

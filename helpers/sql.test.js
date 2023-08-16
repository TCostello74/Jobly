const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require("../expressError");
const assert = require('assert');

describe('sqlForPartialUpdate()', function() {

  it('should return correct SQL SET clause and values', function() {
    const data = {firstName: 'Aliya', age: 32};
    const mapping = {firstName: "first_name"};

    const result = sqlForPartialUpdate(data, mapping);
    assert.strictEqual(result.setCols, '"first_name"=$1, "age"=$2');
    assert.deepStrictEqual(result.values, ['Aliya', 32]);
  });

  it('should handle case where jsToSql mapping is not provided for a key', function() {
    const data = {name: 'Aliya', age: 32};

    const result = sqlForPartialUpdate(data, {});
    assert.strictEqual(result.setCols, '"name"=$1, "age"=$2');
    assert.deepStrictEqual(result.values, ['Aliya', 32]);
  });

  it('should throw BadRequestError if dataToUpdate is empty', function() {
    assert.throws(() => {
      sqlForPartialUpdate({}, {});
    }, BadRequestError);
  });

});

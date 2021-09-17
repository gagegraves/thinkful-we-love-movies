
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary();
    // store strings in an array to be iterated through
    const strFields = ["name", "address_line_1", "address_line_2", "city", "state", "zip"];
    // creates all the table strings via iteration
    strFields.map((field) => table.string(field));
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("theaters");
};

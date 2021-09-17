
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary();
    table.integer("runtime_in_minutes");
    table.text("description");
    
    // store strings in an array to be iterated through
    const strFields = ["title", "rating", "image_url"];
    // creates all the table strings via iteration
    strFields.map((field)=>table.string(field));
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};

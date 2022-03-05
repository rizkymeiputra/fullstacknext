/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  //   ketika melakukan migration, isinya create table, yang menambahkan-menambahkan
  return knex.schema.createTable("posts", function (table) {
    table.increments();
    table.string("title");
    table.text("content");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  //   digunakan untuk rollback, kalau ada yang salah bisa dirollback, bisa drop table dsb
  return knex.schema.dropTable("posts");
};

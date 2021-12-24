import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Bands extends BaseSchema {
  protected tableName = 'bands';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable().unique();
      table.string('genre', 100).notNullable();
      table.integer('favorites').unsigned();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

import { ISearchParams } from '../../schema';
import db from './db';

// Helper functions for interacting with the database

interface BaseRecord {
  id?: number; // Optional ID property for all records
}

/**
 * Base class for representing database tables (optional for type safety).
 */
export abstract class DbRecord implements BaseRecord {
  idColumn?: string;

  id?: number;
}

/**
 * Creates a new row in a table.
 *
 * @param db The database connection instance.
 * @param tableName The name of the table to insert into.
 * @param data The object containing data for the new row.
 * @param options Optional configuration for the insert operation.
 *   - fields: An array of strings specifying which fields to insert (defaults to all).
 * @returns The ID of the newly inserted row.
 */
export async function create<T extends {}>(
  tableName: string,
  data: T,
  options?: { fields?: string[] },
): Promise<number | bigint> {
  const fieldsToInsert = options?.fields ?? Object.keys(data);

  const placeholders = new Array(fieldsToInsert.length).fill('?').join(', ');

  const insertStmt = db.prepare(
    `INSERT INTO ${tableName} (${fieldsToInsert.join(
      ', ',
    )}) VALUES (${placeholders})`,
  );

  const result = await insertStmt.run(
    Object.values(data).filter((_, index) =>
      fieldsToInsert.includes(Object.keys(data)[index]),
    ),
  );
  return result.lastInsertRowid;
}

export async function update<T extends Object>(
  tableName: string,
  idColumn: string,
  id: number,
  data: T,
  options?: { fields?: string[] },
): Promise<number> {
  const fieldsToUpdate = options?.fields ?? Object.keys(data);
  const updateStmt = db.prepare(
    `UPDATE ${tableName} SET ${fieldsToUpdate
      .map((key) => `${key} = ?`)
      .join(', ')} WHERE ${idColumn} = ?`,
  );
  const valuesToUpdate = [
    ...Object.values(data).filter((_, index) =>
      fieldsToUpdate.includes(Object.keys(data)[index]),
    ),
    id,
  ];
  const result = await updateStmt.run(valuesToUpdate);
  return result.changes;
}

/**
 * Finds rows in a table based on provided criteria.
 *
 * @param db The database connection instance.
 * @param tableName The name of the table to query.
 * @param criteria An object containing search conditions (key-value pairs for column names and values).
 * @param options Optional configuration for the find operation.
 *   - limit: The maximum number of rows to return.
 *   - offset: The starting index for returned rows (for pagination).
 *   - orderBy: An object specifying sorting (e.g., { field: 'name', order: 'DESC' }).
 * @returns An array of objects representing the found rows.
 */
export async function find<T extends DbRecord>(
  tableName: string,
  criteria?: { [key: string]: any },
  options?: {
    limit?: number;
    offset?: number;
    orderBy?: { field: string; order: string };
  },
): Promise<T[]> {
  let whereClause = '';
  const values: any[] = [];

  if (criteria) {
    whereClause = ` WHERE ${Object.keys(criteria)
      .map((key) => `${key} = ?`)
      .join(' AND ')}`;
    values.push(...Object.values(criteria));
  }

  let orderByClause = '';
  if (options?.orderBy) {
    orderByClause = ` ORDER BY ${options.orderBy.field} ${options.orderBy.order}`;
  }

  let limitClause = '';
  if (options?.limit) {
    limitClause = ` LIMIT ${options.limit}`;
  }

  let offsetClause = '';
  if (options?.offset) {
    offsetClause = ` OFFSET ${options.offset}`;
  }

  const sql = `SELECT * FROM ${tableName}${whereClause}${orderByClause}${limitClause}${offsetClause}`;
  const stmt = db.prepare(sql);
  const rows = await stmt.all(values);
  return rows as T[];
}

/**
 * Counts the number of rows in a table or matching specific criteria.
 *
 * @param db The database connection instance.
 * @param tableName The name of the table to count rows in.
 * @param criteria An object containing search conditions (key-value pairs for column names and values) (optional).
 * @returns The number of rows in the table or matching the criteria.
 */
export async function count(
  tableName: string,
  criteria?: { [key: string]: any },
): Promise<number> {
  let whereClause = '';
  const values: any[] = [];

  if (criteria) {
    whereClause = ` WHERE ${Object.keys(criteria)
      .map((key) => `${key} = ?`)
      .join(' AND ')}`;
    values.push(...Object.values(criteria));
  }

  const sql = `SELECT COUNT(*) FROM ${tableName}${whereClause}`;
  const stmt = db.prepare(sql);
  const result = (await stmt.get(values)) as any;
  return result['COUNT(*)']; // Access the count value from the result object
}
/**
 * Deletes rows from a table based on ID or criteria.
 *
 * @param db The database connection instance.
 * @param tableName The name of the table to delete from.
 * @param id The ID of the row to delete, or an object containing criteria for deletion.
 * @returns The number of rows affected (should be 1 for a successful delete).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteRecord<T extends DbRecord>(
  tableName: string,
  id: number | { [key: string]: any },
): Promise<number> {
  let whereClause = '';
  const values: any[] = [];

  if (typeof id === 'number') {
    whereClause = ' WHERE id = ?';
    values.push(id);
  } else {
    whereClause = ` WHERE ${Object.keys(id)
      .map((key) => `${key} = ?`)
      .join(' AND ')}`;
    values.push(...Object.values(id));
  }

  const sql = `DELETE FROM ${tableName}${whereClause}`;
  const stmt = db.prepare(sql);
  const result = await stmt.run(values);
  return result.changes; // Number of rows affected (should be 1 for a successful delete)
}

export async function getFilesWithParams(
  searchParams: ISearchParams = {},
): Promise<File[]> {
  try {
    const { tag, search, order, orderBy, limit } = searchParams;
    let sql = `SELECT DISTINCT f.* FROM FileTags ft INNER JOIN Files f ON ft.file_id = f.file_id`;
    const values: any[] = [];

    if (tag) {
      sql += ` WHERE ft.tag_id = ?`;
      values.push(tag);
    }

    if (search) {
      sql = ` SELECT DISTINCT f.* FROM Files f
    INNER JOIN FileTags ft ON f.file_id = ft.file_id
    WHERE f.file_name LIKE ?`;

      values.push(`%${search}%`);

      if (tag) {
        sql += ` AND ft.tag_id = ?`;
        values.push(tag);
      }
    }

    if (order && orderBy && ['ASC', 'DESC'].includes(order)) {
      sql += ` ORDER BY ${orderBy} ${order}`;
    } else {
      sql += ` ORDER BY f.file_id DESC`;
    }

    if (limit) {
      sql += ` LIMIT ?`;
      values.push(limit);
    }

    const stmt = db.prepare(sql);
    const result = await stmt.all(...values);
    return result;
  } catch (error) {
    return [];
  }
}

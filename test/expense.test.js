import assert from "assert";
import ExpenseTracker from "../services/query.js";
import pgPromise from "pg-promise";

const connectionString = process.env.PGDATABASE_URL ||
 'postgres://wqlxqiyo:o5dTSLHmMPR3jXFAcCWmQaaWKVkkjHnK@ella.db.elephantsql.com/wqlxqiyo'

const pgp = pgPromise();
const db = pgp(connectionString);

let expense = ExpenseTracker(db);
describe("Expense Tracker", function () {
  this.timeout(10000);
  beforeEach(async function () {
    await db.none("TRUNCATE TABLE expense RESTART IDENTITY CASCADE");
  });

  it("should be able to add expense", async function () {
    let res = [
      {
        id: 1,
        description: "monthly",
        amount: "200",
        category_id: 2,
      },
    ];

    let query = await expense.addExpense("monthly", 200, 2);
    assert.deepEqual(res, query);
  });

  after(function () {
    db.$pool.end();
  });
});
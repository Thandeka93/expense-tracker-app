export default function Expense(db) {
    async function addExpense(description, amount, catergoryid) {
      if (catergoryid && amount && description) {
        await db.any(
          "INSERT INTO expense (description, amount, category_id) VALUES($1,$2,$3)",
          [description, amount, catergoryid]
        );
        return await db.manyOrNone("SELECT * FROM expense");
      }
    }
    async function expenseForCategory(categoryid) {
      return await db.any("SELECT * FROM expense WHERE category_id=$1", [
        categoryid,
      ]);
    }
    async function allExpenses() {
      return await db.any("SELECT * FROM expense");
    }

    async function categoryTotals() {
        let totals = await db.any(`
          WITH category_sums AS (
            SELECT category_type, SUM(amount) AS total_amount
            FROM category AS c
            LEFT JOIN expense AS e ON c.id = e.category_id
            GROUP BY category_type
          )
          SELECT * FROM category_sums
          ORDER BY total_amount DESC;
        `);
        return totals;
      }
      
    async function deleteExpense(expenseid) {
        await db.none("DELETE FROM expense WHERE id=$1", [expenseid]);
        return allExpenses();
      }
    return {
      addExpense,
      expenseForCategory,
      allExpenses,
      categoryTotals,
      deleteExpense
    };
  }
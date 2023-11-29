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
    async function deleteExpense(expenseid) {
        await db.none("DELETE FROM expense WHERE id=$1", [expenseid]);
        return allExpenses();
      }
    return {
      addExpense,
      expenseForCategory,
      allExpenses,
      deleteExpense
    };
  }
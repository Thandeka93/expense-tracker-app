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
    return {
      addExpense,
    };
  }
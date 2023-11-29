// Exporting a default function that takes a database connection (db) as a parameter
export default function Expense(db) {

    // Async function to add an expense to the database
    async function addExpense(description, amount, categoryId) {
        // Checking if all necessary data is provided
        if (categoryId && amount && description) {
            // Performing an asynchronous database insertion
            await db.any(
                "INSERT INTO expense (description, amount, category_id) VALUES($1, $2, $3)",
                [description, amount, categoryId]
            );
            
            // Returning all expenses from the database
            return await db.manyOrNone("SELECT * FROM expense");
        }
    }

    // Async function to retrieve expenses for a specific category from the database
    async function expenseForCategory(categoryId) {
        return await db.any("SELECT * FROM expense WHERE category_id=$1", [categoryId]);
    }

    // Async function to retrieve all expenses from the database
    async function allExpenses() {
        return await db.any("SELECT * FROM expense");
    }

    // Async function to retrieve category totals (sum of expenses) from the database
    async function categoryTotals() {
        // Using a Common Table Expression (CTE) to calculate category sums
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
        
        // Returning the calculated totals
        return totals;
    }

    // Async function to delete an expense from the database by expense id
    async function deleteExpense(expenseId) {
        // Performing an asynchronous database deletion
        await db.none("DELETE FROM expense WHERE id=$1", [expenseId]);
        
        // Returning all expenses from the database after deletion
        return allExpenses();
    }
    async function allCategories() {
        return await db.manyOrNone("SELECT * FROM category");
    }

    // Returning an object with references to the defined functions
    return {
        addExpense,
        expenseForCategory,
        allExpenses,
        categoryTotals,
        deleteExpense,
        // allCategories
    };
}

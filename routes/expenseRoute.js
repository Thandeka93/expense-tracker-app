export default function (servicesFunc) {
    async function home(req, res) {
      try {
        res.render("index",);
      } catch (err) {
        console.log(err);
      }
    }
    async function addExpense(req, res) {
      try {
        await servicesFunc.addExpense(
          req.body.expense_desc,
          Number(req.body.expense_amount),
          req.body.expense_radio
        );
        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    }
    async function expense(req, res) {
      try {
        res.render("expense");
      } catch (err) {
        console.log(err);
      }
    }
    async function expenseForCategory(req, res) {
      try {
        await services.expenseForCategory(req.body.expense_dropdown);
      } catch (err) {
        console.log(err);
      }
    }
    return { home, expense, addExpense, expenseForCategory };
  }

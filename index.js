import express from 'express';
import exphbs from 'express-handlebars';
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser';
import flash from 'express-flash';
import pgPromise from 'pg-promise';
import session from 'express-session';
import Expense from "./services/query.js";
import routes from "./routes/expenseRoute.js";

const app = express();

const connectionString = process.env.PGDATABASE_URL ||
 'postgres://wqlxqiyo:o5dTSLHmMPR3jXFAcCWmQaaWKVkkjHnK@ella.db.elephantsql.com/wqlxqiyo'

const pgp = pgPromise();
const db = pgp(connectionString);

const expenseServices = Expense();
/* INITIALIZE ROUTES FUNCTION */
const expenseRoute = routes(expenseServices);

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.get("/", expenseRoute.home);
app.get("/expense", expenseRoute.expense);



const PORT = process.env.PORT || 3006
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
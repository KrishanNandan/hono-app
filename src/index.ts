import { Hono } from "hono";

const app = new Hono();

/**In any backend we need to acess or make following things like body,headers,queryParams,middleware
 * connecting to a DB
 */

async function authMiddleware(c: any, next: any) {
  if (c.req.header("Authorization")) {
    await next();
  } else {
    return c.text("You don't have access");
  }
}

/**Middleware */
app.use(authMiddleware);

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

/**Acessing Body, headers and query param */
/**Another way of using middleware */
app.post("/", authMiddleware,async (c) => {
  c.res;
  const body = await c.req.json();
  console.log(body); /**Here we are getting value of body*/
  console.log(
    c.req.header("Authorization")
  ); /**Here we are extracting value of Authorization header*/
  console.log(
    c.req.query("param")
  ); /**Here we are extracting value of query parameter of param query*/
  return c.text("Hello Hono!");
});

export default app;

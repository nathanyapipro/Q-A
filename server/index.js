const express =require('express');
const { createServer } = require("http");
const chalk = require("chalk");
const middleware = require("./middleware");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const PORT = process.env.PORT || 5000
const isDev = process.env.NODE_ENV === "development"

async function main() {
  /*
   * Our Express server
   */
  const app = express();

  /*
   * Getting access to the HTTP server directly means that we can do things
   * with websockets if we need to (e.g. GraphQL subscriptions).
   */
  const httpServer = createServer(app);
  app.set("httpServer", httpServer);


  /*
   * Middleware is installed from the /server/middleware directory. These
   * helpers may augment the express app with new settings and/or install
   * express middleware. These helpers may be asynchronous, but they should
   * operate very rapidly to enable quick as possible server startup.
   */
  await middleware.installDatabasePools(app);

  if (isDev) {
    // We're using a non-super-user connection string (authPgPool), so we need to
    // install the watch fixtures ourselves.
    await middleware.installDatabaseWatchFixtures(app);
  }

  // await middleware.installSession(app);
  // await middleware.installPassport(app);
  // await middleware.installLogging(app);

  // These are our assets: images/etc; served out of the /client/public folder
  // await middleware.installSharedStatic(app);

  await middleware.installPostGraphile(app);

  // if (isDev) {
  //   // In development, the client runs its own server
  //   await middleware.installClientServerProxy(app);
  // } else {
  //   throw new Error("SSR not yet implemented!");
  // }

  // And finally, we open the listen port
  httpServer.listen(PORT, () => {
    const address = httpServer.address();
    const actualPort =
      typeof address === "string" ? address : address.port || PORT;
    console.log();
    console.log(
      chalk.green(
        `${chalk.bold("Fundamental")} listening on port ${chalk.bold(
          actualPort
        )}`
      )
    );
    console.log();
    console.log(
      `  Site:     ${chalk.bold.underline(`http://localhost:${actualPort}`)}`
    );
    console.log(
      `  GraphiQL: ${chalk.bold.underline(
        `http://localhost:${actualPort}/graphiql`
      )}`
    );
    console.log();
  });
}

main().catch(e => {
  console.error("Fatal error occurred starting server!");
  console.error(e);
  process.exit(1);
});
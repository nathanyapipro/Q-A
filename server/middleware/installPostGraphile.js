const { postgraphile } = require("postgraphile");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
const secret = process.env.SECRET;

function postgraphileOptions() {
  return {
    // Default pg role to used
    pgDefaultRole: "fundamental_visitor",

    // JWT token type
    jwtPgTypeIdentifier: "app_private.jwt_token",

    // Secret used for jwt verification
    jwtSecret: secret,

    // enableQueryBatching: On the client side, use something like apollo-link-batch-http to make use of this
    enableQueryBatching: true,

    // dynamicJson: instead of inputting/outputting JSON as strings, input/output raw JSON objects
    dynamicJson: true,

    // ignoreRBAC=false: honour the permissions in your DB - don't expose what you don't GRANT
    ignoreRBAC: false,

    // ignoreIndexes=false: honour your DB indexes - only expose things that are fast
    ignoreIndexes: false,

    // setofFunctionsContainNulls=false: reduces the number of nulls in your schema
    setofFunctionsContainNulls: false,

    // Enable GraphiQL in development
    graphiql: isDev,
    // Use a fancier GraphiQL with `prettier` for formatting, and header editing.
    enhanceGraphiql: true,

    // Disable query logging - we're using morgan
    disableQueryLog: true,

    // See https://www.graphile.org/postgraphile/debugging/
    extendedErrors:
      isDev || isTest
        ? [
            "errcode",
            "severity",
            "detail",
            "hint",
            "positon",
            "internalPosition",
            "internalQuery",
            "where",
            "schema",
            "table",
            "column",
            "dataType",
            "constraint",
            "file",
            "line",
            "routine"
          ]
        : ["errcode"],

    showErrorStack: isDev,

    // Automatically update GraphQL schema when database changes
    watchPg: isDev,

    graphileBuildOptions: {
      // Any properties here are merged into the settings passed to each Graphile
      // Engine plugin - useful for configuring how the plugins operate.

      // We install our own watch fixtures manually because we run PostGraphile
      // with non-database-owner privileges.
      pgSkipInstallingWatchFixtures: true,
      connectionFilterAllowNullInput: true,
      connectionFilterAllowedFieldTypes: ["Int", "String", "Boolean"]
    },

    /*
     * Plugins to enhance the GraphQL schema, see:
     *   https://www.graphile.org/postgraphile/extending/
     */
    appendPlugins: [
      // Simplifies the field names generated by PostGraphile.
      PgSimplifyInflectorPlugin,
      // Add addition filter options on connections
      ConnectionFilterPlugin
    ]
  };
}

module.exports = app => {
  const authPgPool = app.get("authPgPool");

  // Install the PostGraphile middleware
  const middleware = postgraphile(
    authPgPool,
    "app_public",
    postgraphileOptions()
  );
  app.use(middleware);
};

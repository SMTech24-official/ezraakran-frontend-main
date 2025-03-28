module.exports = {
    apps: [
      {
        name: "ezraakran-client",
        script: "node_modules/next/dist/bin/next",
        args: "start",
        env: {
          NODE_ENV: "production",
          PORT: 3001
        },
      },
    ],
  };
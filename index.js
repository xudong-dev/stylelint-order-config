const glob = require("glob");
const fs = require("fs");
const path = require("path");

const files = glob.sync("./csscomb.js/config/*.json");

files.forEach(file => {
  const type = path.basename(file, path.extname(file));

  const config = {
    rules: {
      "declaration-empty-line-before": null,
      "order/order": [
        "custom-properties",
        "dollar-variables",
        "at-variables",
        "declarations",
        "rules",
        "at-rules",
        "less-mixins"
      ],
      "order/properties-order": require(file)["sort-order"].map(properties => ({
        emptyLineBefore: "always",
        properties
      }))
    }
  };

  fs.writeFileSync(
    path.join(
      process.cwd(),
      `packages/stylelint-order-config-${type}/config.json`
    ),
    JSON.stringify(config, null, 2)
  );
});

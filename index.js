const glob = require("glob");
const fs = require("fs");
const path = require("path");

const files = glob.sync("node_modules/csscomb/config/*.json");

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
      "order/properties-order": require(`csscomb/config/${type}`)[
        "sort-order"
      ].map(properties => ({
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

fs.writeFileSync(
  path.join(
    process.cwd(),
    `packages/stylelint-order-config-standard/config.json`
  ),
  JSON.stringify(
    require("./packages/stylelint-order-config-yandex/config"),
    null,
    2
  )
);

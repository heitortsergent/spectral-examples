const path = require("path");
const fs = require("fs");
const { Spectral, Doc } = require("@stoplight/spectral-core");
const { spectralFetch } = require("@stoplight/spectral-runtime");
const Parsers = require("@stoplight/spectral-parsers"); // make sure to install the package if you intend to use default parsers!
const { truthy } = require("@stoplight/spectral-functions"); // this has to be installed as well
const { oas } = require("@stoplight/spectral-rulesets");
const { bundleAndLoadRuleset } = require("@stoplight/spectral-ruleset-bundler/with-loader");
const myDocument = new Doc(`---
responses:
  '200':
    description: ''`, Parsers.Yaml, "/my-file");
const spectral = new Spectral();
const rulesetFilepath = path.join(__dirname, "ruleset.yaml");
spectral.setRuleset(await bundleAndLoadRuleset(rulesetFilepath, { fs, spectralFetch }));
spectral.run(myDocument).then(console.log);
export {};

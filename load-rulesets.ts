import path from "path"
import fs from "fs";

import { Spectral, Document } from "@stoplight/spectral-core";
import { fetch } from "@stoplight/spectral-runtime";
import Parsers from "@stoplight/spectral-parsers"; // make sure to install the package if you intend to use default parsers!
import { truthy } from "@stoplight/spectral-functions"; // this has to be installed as well
import { oas } from "@stoplight/spectral-rulesets";
// import { bundleAndLoadRuleset } from "@stoplight/spectral-ruleset-bundler/with-loader";
import spectralRulesetBundler from "@stoplight/spectral-ruleset-bundler/with-loader";
const bundleAndLoadRuleset = spectralRulesetBundler.bundleRuleset;

const myDocument = new Document(
  `---
responses:
  '200':
    description: ''`,
  Parsers.Yaml,
  "/my-file",
);

const spectral = new Spectral();
const rulesetFilepath = path.join(__dirname, "ruleset.yaml");
spectral.setRuleset(await bundleAndLoadRuleset(rulesetFilepath, { fs, fetch }));
spectral.run(myDocument).then(console.log);

export {}
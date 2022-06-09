// example-2.mjs
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import { join } from 'path';
import { bundleAndLoadRuleset } from "@stoplight/spectral-ruleset-bundler/with-loader";
import Parsers from "@stoplight/spectral-parsers"; // make sure to install the package if you intend to use default parsers!
import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import spectralRuntime from "@stoplight/spectral-runtime";
const { fetch } = spectralRuntime;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const myDocument = new Document(
  // load an API specification file from your project's root directory. You can use the petstore.yaml example from here: https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml
  fs.readFileSync(join(__dirname, 'petstore.yaml'), 'utf-8').trim(),
  Parsers.Yaml,
  'petstore.yaml'
);

const spectral = new Spectral();
// load a ruleset file from your project's root directory
const rulesetFilepath = path.join(__dirname, ".spectral.yaml");
spectral.setRuleset(await bundleAndLoadRuleset(rulesetFilepath, { fs, fetch }));

spectral.run(myDocument).then(console.log);
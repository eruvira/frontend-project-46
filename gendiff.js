#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .option("-f, --format [type]", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, options) => {
    console.log("File 1:", filepath1);
    console.log("File 2:", filepath2);
    console.log("Format:", options.format);
  });

program.parse();

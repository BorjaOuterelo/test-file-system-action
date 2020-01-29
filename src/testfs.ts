import * as core from "@actions/core";
import fs from "fs";
import * as path from "path";

export function check_fs(
  files: Array<string>,
  base_path: string = "./"
): boolean {
  let result: boolean = true;
  let full_path: string = "";
  for (let test_file of files) {
    full_path = path.join(base_path, test_file);
    console.log("Testing ....: ", full_path);
    console.log(
      (result =
        result && fs.existsSync(full_path) && fs.statSync(full_path).isFile())
    );
    if (result == false) {
      return result;
    }
  }
  return result;
}

async function run(): Promise<void> {
  try {
    const base_path: string = core.getInput("path");
    const raw_file_list: string = core.getInput("files");
    const files: Array<string> = raw_file_list.split(",");

    console.log(
      "Testing existence of ",
      files,
      " with working dir = ",
      base_path
    );
    if (!check_fs(files, base_path)) {
      core.setFailed("Missing output files");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

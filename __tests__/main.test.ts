import { check_fs } from "../src/testfs";
import * as process from "process";
import * as cp from "child_process";
import * as path from "path";
import { exportVariable } from "@actions/core";

const no_files: Array<string> = ["a", "b"];
const real_files: Array<string> = [
  "main.test.ts",
  path.join("..", "lib", "testfs.js")
];
const mix_files: Array<string> = no_files.concat(real_files);

test("Not found files", async () => {
  expect(check_fs(no_files, __dirname)).toBe(false);
});

test("Existent files", async () => {
  const input = expect(check_fs(real_files, __dirname)).toBe(true);
});

test("Existent files in wrong path", async () => {
  const input = expect(check_fs(real_files, "~/")).toBe(false);
});

test("Mix files", async () => {
  expect(check_fs(mix_files, __dirname)).toBe(false);
});

const real_files_to_trim: Array<string> = [
  " main.test.ts",
  path.join("..", "lib", "testfs.js ")
];

test("Trim", async () => {
  expect(check_fs(real_files_to_trim, __dirname)).toBe(true);
});

// shows how the runner will run a javascript action with env / stdout protocol
test("Run action bad input", () => {
  process.env["INPUT_FILES"] = no_files.toString();
  process.env["INPUT_PATH"] = __dirname;
  const ip = path.join(__dirname, "..", "lib", "testfs.js");
  const options: cp.ExecSyncOptions = {
    env: process.env
  };
  expect(() => {
    console.log(cp.execSync(`node ${ip}`, options));
  }).toThrow();
});

test("Run action good input", () => {
  process.env["INPUT_FILES"] = real_files.toString();
  process.env["INPUT_PATH"] = __dirname;
  const ip = path.join(__dirname, "..", "lib", "testfs.js");
  const options: cp.ExecSyncOptions = {
    env: process.env
  };
  console.log(cp.execSync(`node ${ip}`, options).toString());
});

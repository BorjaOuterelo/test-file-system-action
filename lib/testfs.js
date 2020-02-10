"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
function check_fs(files, base_path = "./") {
    let result = true;
    let full_path = "";
    for (let test_file of files) {
        full_path = path.join(base_path, test_file.trim());
        console.log("Testing ....: ", full_path);
        console.log((result =
            result && fs_1.default.existsSync(full_path) && fs_1.default.statSync(full_path).isFile()));
        if (result == false) {
            return result;
        }
    }
    return result;
}
exports.check_fs = check_fs;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const base_path = core.getInput("path");
            const raw_file_list = core.getInput("files");
            const files = raw_file_list.split(",");
            console.log("Testing existence of ", files, " with working dir = ", base_path);
            if (!check_fs(files, base_path)) {
                core.setFailed("Missing output files");
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();

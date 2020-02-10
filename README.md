
# Test the existence of set of files in the filesystem

If you want to test for the existence of files in the filesystem you can use this TypeScript based action.
It is usefull whether you want to test for generated files or for the existence of dependencies.

## Usage

This Action checks the existence of a list of files in your environment

```workflow
name: Test Files 
on:
  pull_request

jobs:
  test_job:
    runs-on: ubuntu-latest
    steps:
      - name: Check_files 
        uses: BorjaOuterelo/test-file-system-action@v0.0.1
        with:
            path: '<your path>'
            files: 'file.txt,../secondfile.a'
```
# macOS csplit Command Reference

**Source:** https://ss64.com/mac/csplit.html
**Fetched:** 2025-07-07T21:31:00Z

## Syntax
```bash
csplit [-ks] [-f prefix] [-n number] file args ...
```

## Options
- **-f prefix**: Give created files names beginning with prefix. Default is 'xx'.
- **-k**: Do not remove output files if an error occurs.
- **-n number**: Use number of decimal digits after the prefix to form the file name. Default is 2.
- **-s**: Do not write the size of each output file to standard output.

## Arguments
- **/regexp/[[+|-]offset]**: Create file from current line to (but not including) next line matching regex.
- **%regexp%[[+|-]offset]**: Same as above but no file is created for the output.
- **line_no**: Create file from current line to (but not including) specified line number.
- **{num}**: Repeat the previous pattern the specified number of times.

## Key Differences from GNU csplit
1. **No -b option**: macOS csplit doesn't support the GNU-specific -b option for suffix formatting.
2. **Repetition syntax**: Uses {num} instead of {*} for finite repetitions.
3. **File naming**: Uses xx00, xx01, xx02... format with -n option controlling digit count.

## Examples from Documentation
```bash
# Split mdoc file into sections (up to 20)
csplit -k foo.1 '%^\.Sh%' '/^\.Sh/' '{20}'

# Split stdin after first 99 lines and every 100 lines thereafter
csplit -k - 100 '{19}'
```

## Implications for Our Use Case
The macOS version doesn't support:
- `-b "%02d.yaml"` syntax (GNU-specific)
- `{*}` for indefinite repetition

Must use:
- `-n 2` for 2-digit suffixes
- `{6}` for specific repetition count
- Manual file extension handling

This explains why our automated splitting failed and why manual file creation was necessary.

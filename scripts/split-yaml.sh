#!/bin/bash
# This script splits the multi-document YAML templates from integration-app/templates/
# into single-document YAML files required by the membrane CLI, placing them
# in the membrane/integrations/ directory.
# NOTE: This script is designed for macOS/BSD `csplit` compatibility.

set -e # Exit on any error
set -x # Echo every command being executed for debugging

# Ensure the target directory exists and is clean
TARGET_DIR="membrane/integrations"
mkdir -p "$TARGET_DIR"
echo "Cleaning target directory: $TARGET_DIR"
rm -f "$TARGET_DIR"/*.yaml

# Function to split a multi-document YAML file
split_yaml() {
    local file_path="$1"
    local provider_name="$2"

    echo "--> Processing file: $file_path for provider: $provider_name"

    # A more robust way to split the file, avoiding complex IFS issues
    # We use csplit, which is more reliable for this task, and then process the files.
    
    # Create a temporary directory for splitting
    TMP_DIR=$(mktemp -d)
    echo "Created temporary directory: $TMP_DIR"
    
    # Split the file into pieces based on '---'
    # Using {6} because there are 7 documents (6 '---' separators) in each source file.
    # This is the macOS/BSD compatible way to specify repetitions.
    csplit -s -f "$TMP_DIR/doc-" -n 2 "$file_path" '/^---$/' '{6}'
    
    echo "Split into raw files:"
    ls -l "$TMP_DIR"

    for f in "$TMP_DIR"/doc-*; do
        echo "--> Analyzing split file: $f"
        
        # Skip empty files
        if [ ! -s "$f" ]; then
            echo "Skipping empty file: $f"
            continue
        fi

        # Extract key and connector
        key=$(grep '^key:' "$f" | awk '{print $2}')
        connector=$(grep '^connector:' "$f" | awk '{print $2}')

        echo "Found key: '$key', connector: '$connector'"

        if [[ -n "$key" && -n "$connector" ]]; then
            output_file="$TARGET_DIR/$key.yaml"
            echo "Creating final action file: $output_file"
            # The file from csplit is already a single, clean document.
            cat "$f" > "$output_file"
        else
            echo "Skipping file $f, no key/connector found."
        fi
    done
    
    # Clean up temp directory
    rm -rf "$TMP_DIR"
    echo "Cleaned up temporary directory: $TMP_DIR"
}

# Process both template files
split_yaml "integration-app/templates/hubspot-contacts.yaml" "HubSpot"
split_yaml "integration-app/templates/pipedrive-persons.yaml" "Pipedrive"


echo "YAML files split successfully."
ACTION_COUNT=$(find "$TARGET_DIR" -name "*.yaml" -type f | wc -l | xargs)
echo "Generated $ACTION_COUNT individual action files."

if [[ $ACTION_COUNT -eq 12 ]]; then
    echo "✅ Success! All 12 action files created."
else
    echo "⚠️  Warning: Expected 12 files but found $ACTION_COUNT."
fi

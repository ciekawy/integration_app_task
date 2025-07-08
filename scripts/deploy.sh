#!/bin/bash
# This script automates the full deployment process to Integration.app.
# 1. Splits the source YAML templates into individual action files.
# 2. Copies the interface definition to the correct deployment directory.
# 3. Pushes the entire configuration from the project root.

set -e # Exit on any error

echo "Starting deployment process..."

# Step 1: Run the split script to generate action files in membrane/integrations/
echo "--> Step 1: Splitting YAML templates..."
./scripts/split-yaml.sh

# Step 2: Create the interfaces directory and copy the interface file.
# This structure is a logical attempt to resolve the discovery issue.
echo "--> Step 2: Staging interface file for deployment..."
mkdir -p membrane/interfaces
cp integration-app/interfaces/contacts-api.yaml membrane/interfaces/contacts-api.yaml

# Step 3: Push the entire configuration from the project root.
# The CLI should discover both membrane/interfaces/ and membrane/integrations/.
echo "--> Step 3: Pushing configuration to Integration.app..."
membrane push

echo "✅ Deployment complete!"

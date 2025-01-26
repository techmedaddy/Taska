#!/bin/bash

# Variables
DB_NAME="taksa"
BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: ./restore.sh <backup_file>"
    exit 1
fi

# Run the restore command
psql -U taksa_user -h localhost -d $DB_NAME <$BACKUP_FILE

# Check if the restore was successful
if [ $? -eq 0 ]; then
    echo "Restore successful!"
else
    echo "Restore failed!"
fi

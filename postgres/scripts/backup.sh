#!/bin/bash

# Variables
DB_NAME="taksa"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/$DB_NAME-$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Run the backup command
pg_dump -U taksa_user -h localhost $DB_NAME >$BACKUP_FILE

# Check if the backup was successful
if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
else
    echo "Backup failed!"
fi

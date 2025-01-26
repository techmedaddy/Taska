#!/bin/bash

# Variables
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/dump-$TIMESTAMP.rdb"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Copy the Redis dump file to the backup directory
if [ -f /data/dump.rdb ]; then
    cp /data/dump.rdb $BACKUP_FILE
    echo "Backup successful: $BACKUP_FILE"
else
    echo "No Redis dump file found. Backup failed."
fi

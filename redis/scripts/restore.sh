#!/bin/bash

# Variables
BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: ./restore.sh <backup_file>"
    exit 1
fi

# Restore the Redis dump file
if [ -f $BACKUP_FILE ]; then
    cp $BACKUP_FILE /data/dump.rdb
    echo "Restore successful. Restart Redis to apply the changes."
else
    echo "Backup file not found. Restore failed."
fi

#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U myuser -d mydatabase > backend/backups/db_backup_$TIMESTAMP.sql
cp backend/backups/db_backup_$TIMESTAMP.sql backend/backups/db_backup_latest.sql
echo "Backup created: db_backup_$TIMESTAMP.sql"

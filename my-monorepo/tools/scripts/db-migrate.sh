#!/bin/bash

# This script is used to run database migrations using Prisma.

# Load environment variables from .env file
if [ -f ../api/.env ]; then
  export $(cat ../api/.env | xargs)
fi

# Run Prisma migrations
npx prisma migrate deploy

# Optionally, you can also generate the Prisma client after migrations
npx prisma generate

echo "Database migrations completed successfully."
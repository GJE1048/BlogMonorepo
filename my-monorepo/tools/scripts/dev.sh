#!/bin/bash

# Navigate to the API directory and start the server
cd apps/api && npm run dev &

# Navigate to the web directory and start the Next.js app
cd ../web && npm run dev &

# Navigate to the admin directory and start the Vite app
cd ../admin && npm run dev &

# Wait for all background processes to finish
wait
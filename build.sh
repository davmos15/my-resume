#!/bin/bash

echo "Setting up database..."

# Create database directory if it doesn't exist
mkdir -p database

# Run database initialization
echo "Initializing database..."
node database/init.js

# Run migrations
echo "Running migrations..."
node database/create_contact_messages_table.js
node database/add_subtitle_to_projects.js
node database/add_emoji_to_projects.js

echo "Database setup complete!"
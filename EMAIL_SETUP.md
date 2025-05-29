# Contact Form Setup Guide

The contact form on this website stores messages in a local SQLite database for security and simplicity.

## How It Works

1. **Form Submission**: When users submit the contact form, their message is stored in the `contact_messages` table
2. **Email Link**: The "Email Me" button opens the user's default email client with your email address
3. **No Server Credentials**: This approach doesn't require storing email passwords or API keys

## Database Schema

The `contact_messages` table stores:
- `id`: Unique identifier
- `name`: Sender's name
- `email`: Sender's email
- `subject`: Optional message subject
- `message`: The message content
- `created_at`: Timestamp
- `is_read`: Boolean flag for tracking read messages

## Viewing Messages

Messages can be viewed:
1. Through the admin panel (if implemented)
2. By querying the SQLite database directly
3. By creating a custom admin interface

## Alternative Email Solutions

If you want automated email notifications when the form is submitted, consider:

1. **Email Service APIs** (no password needed):
   - SendGrid
   - Mailgun
   - Amazon SES
   - Postmark

2. **Form Services**:
   - Formspree
   - Netlify Forms
   - Getform

3. **Serverless Functions**:
   - Vercel Functions
   - Netlify Functions
   - AWS Lambda

These services provide API keys instead of requiring email passwords, making them more secure for production use.
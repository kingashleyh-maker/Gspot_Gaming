# Connect Gspot account registration to Supabase

1. Create a project at https://supabase.com/dashboard .
2. Open SQL Editor, paste `backend/supabase-setup.sql`, and run it once.
3. Find your Project URL and publishable key in the project's Connect dialog (API keys are also available in project settings).
4. Paste those two public values into `js/backend-config.js`. Never put a secret or service-role key here.
5. Serve the Gspot folder using VS Code Live Server. The browser needs internet access.
6. Create a NEW customer account from Sign Up. Confirm the email if confirmation is enabled, then log in.
7. View registered login accounts in Authentication → Users. View ID, name, email and creation date in Table Editor → profiles.

## What is connected

When both configuration fields are filled, new customer signups and email/password login use Supabase Auth. Local demo manager passwords are disabled in that mode. Auth sessions are held in memory; reload requires login. Passwords are handled by Supabase, not stored in the local demo database. Sign Out clears the remote session where possible and clears the app's local session.

Profile edits, addresses, photos, demo card references, orders and stock remain the existing browser demo. They do not sync to Supabase. The profiles table captures the name and email at registration; later profile edits in this version stay local. This package does not implement real payments or server-validated order totals.

If configuration is blank, the original offline demo continues to work. Existing local demo accounts are not automatically migrated. Sign up again to create an actual Supabase account.

If your project already has users before running the SQL, only subsequent signups are automatically added to profiles. Existing Auth users still appear under Authentication → Users.

## Checks

Sign up with a new email, confirm email, sign in with the correct password, try an incorrect password, and sign out. Confirm that a second customer cannot read the first customer's profile through the API. Do not treat this as a deployed backend until you have configured and tested your own project.

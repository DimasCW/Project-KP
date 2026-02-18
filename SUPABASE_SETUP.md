# Supabase Setup Instructions

1. **Create a Supabase Project**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard/projects)
   - Click "New Project"
   - Select your organization, fill in Name and Password, choose a Region.
   - Click "Create new project" and wait for it to be ready.

2. **Run the Database Schema**
   - In the left sidebar, click on **SQL Editor** (icon looking like `_>`).
   - Click **New Query**.
   - Copy the contents of the file `supabase_schema.sql` (located in the artifacts folder) and paste it into the editor.
   - Click **Run** (bottom right).
   - This will create the necessary tables (`profiles`, `cards`) and security policies.

3. **Get API Keys**
   - Go to **Project Settings** (gear icon at the bottom left).
   - Click on **API**.
   - Copy the **Project URL**. https://xygytrdwmxxhuxswrvvx.supabase.co
   - Copy the **anon** / **public** key.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Z3l0cmR3bXh4eHVxc3dydnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNzUwNDYsImV4cCI6MjA4Njk1MTA0Nn0.wStW_LUQAowfGmPWC7Mvk98ehsuvDqFlEL174N1iy34 / sb_publishable_v9IKr2pMTApu44LeGuL-NQ_5xfQ81rJ

4. **Configure Environment Variables**
   - Open the file `.env.local` in your project folder `e-business-card`.
   - Replace the placeholders with your actual values:
     ```
     NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
     ```

5. **Start the Application**
   - Make sure you are in the correct folder:
     ```bash
     cd e-business-card
     npm run dev
     ```
   - Open `http://localhost:3000` in your browser.

6. **Authentication Settings (Optional)**
   - Go to **Authentication** -> **URL Configuration**.
   - Set **Site URL** to `http://localhost:3000`.
   - Add `http://localhost:3000/**` to **Redirect URLs**.

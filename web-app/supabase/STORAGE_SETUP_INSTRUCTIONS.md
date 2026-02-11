# Supabase Storage Setup Instructions

## Step 1: Create the Storage Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `uremfwmoqaygttpgldvm`
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Enter bucket name: `news-images`
6. Enable **"Public bucket"** (toggle ON)
7. Click **"Create bucket"**

## Step 2: Set Up Storage Policies

1. In the Supabase Dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy and paste the contents of `supabase/storage_setup.sql`
4. Click **"Run"** to execute the SQL

The SQL will create the following policies:
- ✅ Public read access (anyone can view images)
- ✅ Authenticated users can upload images
- ✅ Authenticated users can update images
- ✅ Authenticated users can delete images

## Step 3: Verify Setup

1. Go back to **Storage** → **news-images** bucket
2. Click on **Policies** tab
3. You should see 4 policies listed:
   - Public Access (SELECT)
   - Authenticated users can upload images (INSERT)
   - Authenticated users can update images (UPDATE)
   - Authenticated users can delete images (DELETE)

## Alternative: Manual Policy Creation

If you prefer to create policies manually through the UI:

1. Go to **Storage** → **news-images** → **Policies**
2. Click **"New policy"**
3. Create each policy with these settings:

### Policy 1: Public Access
- **Policy name**: Public Access
- **Allowed operation**: SELECT
- **Target roles**: public
- **USING expression**: `bucket_id = 'news-images'`

### Policy 2: Upload Images
- **Policy name**: Authenticated users can upload images
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **WITH CHECK expression**: `bucket_id = 'news-images' AND auth.role() = 'authenticated'`

### Policy 3: Update Images
- **Policy name**: Authenticated users can update images
- **Allowed operation**: UPDATE
- **Target roles**: authenticated
- **USING expression**: `bucket_id = 'news-images' AND auth.role() = 'authenticated'`

### Policy 4: Delete Images
- **Policy name**: Authenticated users can delete images
- **Allowed operation**: DELETE
- **Target roles**: authenticated
- **USING expression**: `bucket_id = 'news-images' AND auth.role() = 'authenticated'`

## Done! 🎉

Your Supabase Storage is now configured and ready to use. The admin dashboard will automatically upload images to this bucket.

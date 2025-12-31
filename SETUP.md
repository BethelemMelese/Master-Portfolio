# Setup Instructions

Follow these steps to get your portfolio up and running.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Sanity CMS

### Option A: New Sanity Project

1. Create a new Sanity project:
```bash
npx sanity init
```

2. Follow the prompts:
   - Select "Create new project"
   - Enter a project name
   - Choose a dataset name (e.g., "production")
   - Select "Clean project with no predefined schemas"
   - Don't add the Sanity folder (we already have it)

3. Note your Project ID and Dataset name

### Option B: Existing Sanity Project

If you already have a Sanity project, you'll need:
- Project ID
- Dataset name

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root directory:
```bash
cp env.template .env.local
```

2. Edit `.env.local` and add your Sanity credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Step 4: Verify Sanity Schemas

The schemas are already set up in `/sanity/schemas/`:
- ✅ Project schema
- ✅ Skill schema
- ✅ Experience schema
- ✅ About schema

Make sure your Sanity project uses these schemas. If you used `npx sanity init`, you may need to ensure the schemas are recognized.

## Step 5: Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## Step 6: Configure CORS Origins

**Important:** Before accessing Sanity Studio, you need to add CORS origins to your Sanity project.

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project (ID: `0p7jkymm`)
3. Go to **Settings** → **API** → **CORS origins**
4. Click **Add CORS origin**
5. Add the following:
   - **Origin**: `http://localhost:3000`
   - **Allow credentials**: ✅ Yes
   - **Save**

**For production:** Add your production domain later (e.g., `https://yourdomain.com`)

## Step 7: Access Sanity Studio

You can access the Sanity Studio in two ways:

1. **Integrated Studio** (recommended):
   - Visit `http://localhost:3000/studio`
   - This runs Sanity Studio within your Next.js app

2. **Standalone Studio**:
   ```bash
   npm run sanity
   ```
   - Visit `http://localhost:3333`
   
   **Note:** For standalone studio, you'll also need to add `http://localhost:3333` as a CORS origin.

## Step 8: Add Initial Content

1. Open Sanity Studio (`/studio` or standalone)
2. Add your first:
   - About entry (your bio)
   - Skills
   - Experience entries
   - Projects

## Next Steps

Once setup is complete, you can:
- Share your UI designs for each page
- Start implementing the frontend designs
- Customize the design system colors if needed

## Troubleshooting

### Sanity Studio Not Loading / CORS Error

- **CORS Error**: Make sure you've added `http://localhost:3000` as a CORS origin in your Sanity project settings (see Step 6)
- Check that your `.env.local` has correct credentials
- Verify your Sanity project exists and is accessible
- Make sure schemas are properly exported in `sanity/schemas/index.ts`

### Build Errors

- Run `npm install` again to ensure all dependencies are installed
- Check TypeScript errors: `npm run lint`
- Verify all environment variables are set

### Images Not Loading

- Ensure images are uploaded through Sanity Studio
- Check that `next.config.js` has the correct image domain configuration

# Master Portfolio

A professional portfolio built with Next.js, Tailwind CSS, Sanity CMS, and deployed on Vercel.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS**
- **Vercel** (Deployment)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your Sanity project details:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your dataset 
- `NEXT_PUBLIC_SANITY_API_VERSION`: API version

3. Initialize Sanity (if not done already):
```bash
npx sanity init
```

4. Run the development server:
```bash
npm run dev
```

5. Access Sanity Studio:
- Navigate to `http://localhost:3000/studio`
- Or run `npm run sanity` for standalone studio

## Project Structure

```
/app
  /page.tsx              # Home page
  /about                 # About page
  /projects              # Projects listing
  /projects/[slug]       # Project detail
  /experience            # Experience page
  /skills                # Skills page
  /contact               # Contact page
  /studio                # Sanity Studio

/sanity
  /schemas               # Sanity schemas

/lib
  /sanity                # Sanity client & queries

/types                  # TypeScript types

/components             # React components
```

## Sanity CMS

### Content Types

- **Project**: Portfolio projects with images, descriptions, and links
- **Skill**: Technical skills with categories
- **Experience**: Work experience entries
- **About**: Personal bio and social links

### Adding Content

1. Go to `/studio` in your browser
2. Add content through the Sanity Studio interface
3. Changes reflect automatically on the site (with ISR)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sanity` - Start Sanity Studio
- `npm run sanity:build` - Build Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## Design System

### Colors

- Background: `#0d0d0d`
- Card: `#151515`
- Accent: `#8f0606`
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`

### Typography

- Font: System UI (customizable in `globals.css`)

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Add these in your Vercel project settings:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

## License

Private project

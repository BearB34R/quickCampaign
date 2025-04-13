# Quick Campaign

A Next.js application that helps Dungeon & Dragons game masters create campaigns quickly and easily using AI. Generate custom campaigns based on your preferred theme, player count, and difficulty level.

## Features

- 🎲 AI-powered D&D campaign generation
- 🎨 Dark mode support
- 📱 Responsive design
- ✨ Real-time campaign preview with Markdown formatting

## Prerequisites

Before you begin, ensure you have:

- Node.js (version 18.18.0 or higher)
- pnpm package manager
- An OpenAI API key

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

- `/src/app` - Next.js application code
  - `/components` - Reusable UI components
  - `/actions` - Server actions for campaign generation
  - `/api` - API routes
  - `/form` - Campaign generation form
  - `/home` - Landing page

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI API](https://openai.com/) - AI campaign generation
- [React Markdown](https://github.com/remarkjs/react-markdown) - Campaign content rendering

## Development

The project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## License

This project is MIT licensed.

# LangChain Tutorial Website

A comprehensive W3Schools-style tutorial website for learning LangChain tools and concepts.

**Live Demo**: https://robin230307-collab.github.io/langchain-tutorial

## Features

- **6 Tutorial Categories**: Prompt工程、输出解析、文档处理、向量存储、RAG应用、Agent开发
- **Step-by-Step Code Examples**: Easy-to-follow Python code snippets
- **Industry Use Cases**: Finance, Legal, Medical, E-commerce, and more
- **Bilingual Support**: Chinese explanations with English technical terms
- **Deep Dive Section**: "In Case You Want to Know How It Works" for advanced learners

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click **New repository**
3. Name it `langchain-tutorial`
4. Select **Public**
5. Click **Create repository**

### Step 2: Push Code to GitHub

Run these commands in your terminal (in the project folder):

```bash
# Add remote origin
git remote add origin https://github.com/robin230307-collab/langchain-tutorial.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `gh-pages` (or `main` if using the workflow)
5. Click **Save**

The site will be available at: `https://robin230307-collab.github.io/langchain-tutorial`

### Automatic Deployment (Recommended)

This project includes a GitHub Actions workflow that automatically deploys on every push to `main`.

1. After pushing your code, go to the **Actions** tab in your repository
2. You should see the workflow running
3. Once complete, your site will be live!

## Project Structure

```
langchain-tutorial/
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Sidebar.tsx      # Category sidebar
│   │   ├── MainContent.tsx  # Category content
│   │   └── TutorialContent.tsx # Individual tutorial
│   ├── data/
│   │   └── tutorials.ts     # Tutorial content
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── App.tsx              # Main application
├── public/                  # Static assets
└── index.html               # Entry point
```

## Tutorial Categories

| Category | Description |
|----------|-------------|
| Prompt工程 | Prompt Template, Few-Shot, Output Parser |
| 文档处理 | Document Loader, Text Splitter |
| 向量存储 | Embedding, Vector Store |
| RAG应用 | Retrieval, RAG Chain |
| Agent开发 | Agent, Tool Calling |
| 高级特性 | LCEL, LangGraph |

## Technologies

- React 18 + TypeScript
- Vite for bundling
- Tailwind CSS for styling
- Lucide React for icons

## License

MIT

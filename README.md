

![logo](https://github.com/0rbitSoc/aura/assets/133385746/8e75b187-4d06-4e45-9833-65baea4f9012)

# aura.ai

A place where you can create Your own AI chatbots and use them for your needs!




## 📱Features

- Light/dark mode toggle
- Built with llama-2-13b
- Responsive design 
- Cross platform
- Long term AI memory with redis
- Payment with stripe (upcoming)
- Image upload with cloudinary (will switch to AWS S3)
- Chat history
- CRUD of chatbots



## 💻Tech Stack

**Client:** React, NextJS, TailwindCSS Shadcn-ui

**Server:** NextJS

**Databases-** 

        Planetscale: For chat history and user info storing
        Redis: For long-term Memory
        Pinecone: Vector database for AI interactions

**Others:** Prism(ORM), lucide-react icons, Clerk(auth), Replicate(ML model runner)



![blog (1)](https://github.com/0rbitSoc/aura/assets/133385746/e6682123-6855-421d-bdab-68e2e7f52a39)


## Documentation

[Documentation](https://linktodocumentation)

For aura configs find bots folder inside this repo!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!



![AIMen 640x360](https://github.com/user-attachments/assets/a2313f2e-2178-4d51-8097-5ea42cd04b0f)

AIM streamlines onchain programming by leveraging a Markdown-inspired language that lets you write near-natural language instructions for AI-driven blockchain workflows without the usual verbosity.

Instead of writing extensive boilerplate, AIM enables you to perform tasks like filtering tokens on Uniswap or checking your balance with simple, intuitive commands, seamlessly integrating with Ethereum’s ecosystem. 

This approach not only reduces the overhead associated with traditional coding and LLM token usage but also frees you from vendor lock-in, offering a more accessible, cost-effective, and adaptable solution for decentralized applications.

# Agentic Ethereum Hackathon

For this hackathon, I extended AIMX (the CLI tool for executing AIM documents) to support tools and plugins, adding Coinbase Agentkit tools and The Graph for fetching onchain data as tools. See [aim.config.ts](./aim.config.ts)

I've implemented several core features for AIM—a Markdown-based language for onchain agentic workflows—including filesystem support to load referenced documents at runtime, an aim.config.ts for project configuration, a minimal server with GET/POST endpoints for managing docs, and a Tailwind-styled UI to neatly visualize workflow flows.

Additionally, I enabled running inference locally via a CLI that respects environment variables and deployed the application on fly.io. These implementations lay the groundwork for AIM’s extensible framework—including the new plugin system—which will allow further integration of external data sources and services.

## Screenshots

![image](https://github.com/user-attachments/assets/2a218c54-a891-4d6e-a077-7ce2fa0eb00e)

![image](https://github.com/user-attachments/assets/46d74456-6814-42c8-8c73-4eb178a070d4)

![image](https://github.com/user-attachments/assets/8b09ee62-871c-4730-aaeb-5b9447c354a3)

## Getting Started

1. Add your AI provider API keys in the .env file
2. Create your content files in the /files directory
3. Run `npm install` to install the dependencies
4. Run `npm run start` to start the development server

## Documentation

For full documentation, visit [aim.microchipgnu.pt](https://aim.microchipgnu.pt)
Read blog post, visit [Syntax Decisions](https://aim.microchipgnu.pt/blog/syntax-decisions)

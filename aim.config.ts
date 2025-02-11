import { z } from "zod";
import { Tag } from "@aim-sdk/core";
import { 
    AgentKit, 
    cdpApiActionProvider, 
    CdpWalletProvider, 
    erc20ActionProvider, 
    walletActionProvider, 
    wethActionProvider,
    erc721ActionProvider
} from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { convertLangChainTool } from "./utils/tool-converter";
import { theGraphTools } from "./actions/the-graph";

// Move async initialization into a function
async function initializeAgentKit() {
    // Add error handling for environment variables
    const requiredEnvVars = [
        'CDP_API_KEY_NAME',
        'CDP_API_KEY_PRIVATE_KEY',
        'CDP_NETWORK_ID'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }

    try {
        const walletProvider = await CdpWalletProvider.configureWithWallet({
            apiKeyName: process.env.CDP_API_KEY_NAME,
            apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
            networkId: process.env.CDP_NETWORK_ID,
        });

        const CDPActionProvider = cdpApiActionProvider({
            apiKeyName: process.env.CDP_API_KEY_NAME,
            apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
        });

        const agentKit = await AgentKit.from({
            walletProvider,
            actionProviders: [
                CDPActionProvider,
                walletActionProvider(),
                erc20ActionProvider(),
                wethActionProvider(),
                erc721ActionProvider()
            ]
        });

        return {
            agentKit,
            langChainTools: await getLangChainTools(agentKit)
        };
    } catch (error) {
        console.error('Failed to initialize AgentKit:', error);
        throw error;
    }
}

// Export a function that returns the config
export default async function getConfig() {
    try {
        const { agentKit, langChainTools } = await initializeAgentKit();
        const convertedTools = Object.fromEntries(langChainTools.map((tool) => [tool.name, convertLangChainTool(tool)]));

        return {
            tools: [
                ...Object.values(convertedTools),
                ...Object.values(theGraphTools),
            ],
            plugins: [
                {
                    plugin: {
                        name: 'base',
                        version: '0.0.1',
                        tags: {
                            "list-actions": {
                                render: "list-actions",
                                execute: async function* ({ node, config, state }) {
                                    try {
                                        const actions = agentKit.getActions();
                                        
                                        state.context.methods.addToTextRegistry({ 
                                            text: JSON.stringify(actions), 
                                            scope: "global" 
                                        });
                                        
                                        yield new Tag("p", {}, [
                                            Object.values(actions).map((action) => action.name).join(", ")
                                        ]);
                                    } catch (error) {
                                        console.error('Error executing list-actions:', error);
                                        yield new Tag("p", {}, ["Error listing actions"]);
                                    }
                                }
                            },
                        }
                    }
                }
            ],
        };
    } catch (error) {
        console.error('Error in config initialization:', error);
        throw error;
    }
}
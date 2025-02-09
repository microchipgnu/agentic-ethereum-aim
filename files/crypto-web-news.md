---
input:
  - name: network
    description: The network to get news for
---


I'm interested in the following topics: {% $frontmatter.input.network %}. Give me a summary of the news in the following topics. Include images

{% ai model="openai/gpt-4o:online@openrouter" /%}


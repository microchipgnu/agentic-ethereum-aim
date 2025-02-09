---
title: Inspect Subgraph
input:
  - name: service
    description: The service to inspect
---

Let's inspect a subgraph schema. You will need to discover the id of the subgraph from the service name. Find the most appropriate subgraph for the service.

Service: {% $frontmatter.input.service %}

Return the schema of the subgraph in JSON format.

{% ai /%}
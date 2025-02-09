---
title: Fetch Data from Subgraph
description: Fetch data from the subgraph
input:
  - name: service
    description: The service to fetch data from
  - name: goal
    description: The goal of the query
---

Service: {% $frontmatter.input.service %}

Goal: {% $frontmatter.input.goal %}

Let's first inspect the subgraph to understand the data model.

{% flow path="files/inspect-subgraph.md" /%}

Let's now generate a query to fetch the data.

{% ai /%}

Let's now fetch the data from the subgraph.

{% ai /%}

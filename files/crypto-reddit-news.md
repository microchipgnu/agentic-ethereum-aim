---
input:
  - name: network
    description: The network to get news for
---


```js {% #news %}
async function fetchRedditNews() {
    const response = await fetch('https://www.reddit.com/r/cryptocurrency/hot.json');
    if (!response.ok) {
        throw new Error('Failed to fetch Reddit news');
    }
    const data = await response.json();
    
    // Extract relevant info from each post
    return data.data.children.slice(0, 100).map(post => ({
        title: post.data.title,
        url: `https://reddit.com${post.data.permalink}`,
        upvotes: post.data.ups,
        comments: post.data.num_comments,
        author: post.data.author,
        image: post.data.thumbnail && post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default' 
            ? post.data.thumbnail
            : (post.data.preview?.images[0]?.source?.url || null)
    }));
}

const redditNews = await fetchRedditNews();
return redditNews;

```

{% debug($news) %} {% .omit %}

I'm interested in the following topics: {% $frontmatter.input.network %}. Give me a summary of the news in the following topics. Include images

{% ai /%}


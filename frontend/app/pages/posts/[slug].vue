<!-- Andreas Bester - u04613628 -->
<script setup>
import { computed } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()
const strapiUrl = (process.server && config.strapiServerUrl) ? config.strapiServerUrl : config.public.strapiUrl
const slug = route.params.slug

// Fetch single post by slug with relations
const { data: postData, error } = await useFetch(() => `${strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`)
const post = computed(() => postData.value?.data?.[0] || null)

// First-principles custom Markdown-to-HTML parser
const parseMarkdown = (markdownText) => {
  if (!markdownText) return ''
  
  // Split content into blocks using double newlines
  const blocks = markdownText.split(/\n\s*\n/)
  
  const htmlBlocks = blocks.map(block => {
    let text = block.trim()
    if (!text) return ''

    // 1. Parse Headings (e.g. ## Heading)
    if (text.startsWith('### ')) {
      return `<h3>${text.substring(4)}</h3>`
    }
    if (text.startsWith('## ')) {
      return `<h2>${text.substring(3)}</h2>`
    }
    if (text.startsWith('# ')) {
      return `<h1>${text.substring(2)}</h1>`
    }

    // 2. Parse Blockquotes (e.g. > Quote)
    if (text.startsWith('>')) {
      const quoteLines = text.split('\n').map(line => line.replace(/^>\s*/, '').trim())
      
      // Separate quote body and citation if "--" or "—" exists
      let quoteBody = ''
      let citation = ''
      
      const fullQuote = quoteLines.join(' ')
      const citationIndex = fullQuote.lastIndexOf('—') !== -1 ? fullQuote.lastIndexOf('—') : fullQuote.lastIndexOf('--')
      
      if (citationIndex !== -1) {
        quoteBody = fullQuote.substring(0, citationIndex).trim()
        citation = fullQuote.substring(citationIndex).trim()
      } else {
        quoteBody = fullQuote
      }

      const citationMarkup = citation ? `<cite class="quote-citation">${citation}</cite>` : ''
      return `<blockquote class="custom-blockquote"><p class="quote-text">"${quoteBody}"</p>${citationMarkup}</blockquote>`
    }

    // 3. Parse Bullet Lists (e.g. - Item)
    if (text.startsWith('- ') || text.startsWith('* ')) {
      const listItems = text.split('\n')
        .map(line => {
          const itemText = line.replace(/^[-*]\s*/, '').trim()
          return `<li>${itemText}</li>`
        })
        .join('')
      return `<ul class="custom-ul">${listItems}</ul>`
    }

    // 4. Parse Numbered Lists (e.g. 1. Item)
    if (/^\d+\.\s+/.test(text)) {
      const listItems = text.split('\n')
        .map(line => {
          const itemText = line.replace(/^\d+\.\s*/, '').trim()
          return `<li>${itemText}</li>`
        })
        .join('')
      return `<ol class="custom-ol">${listItems}</ol>`
    }

    // 5. Standard Paragraphs
    return `<p>${text}</p>`
  })

  // Recombine blocks and parse inline bold and italic styling
  let html = htmlBlocks.join('\n')
  
  // Parse Bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Parse Italic (*text*)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  return html
}

const parsedContent = computed(() => {
  return parseMarkdown(post.value?.content)
})
</script>

<template>
  <div class="post-detail-page">
    <div class="detail-container">
      <!-- Back Button -->
      <NuxtLink to="/" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="back-icon">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to all posts
      </NuxtLink>

      <!-- Error / Loading States -->
      <div v-if="error" class="status-msg error">
        Unable to load this post. Connection to the backend database failed.
      </div>
      
      <div v-else-if="!post" class="status-msg empty">
        Blog post not found.
      </div>

      <!-- Post Detail Content -->
      <article v-else class="post-detail">
        <header class="detail-header">
          <div class="detail-meta">
            <span class="detail-category">{{ post.category?.name || 'Uncategorized' }}</span>
            <span class="meta-divider">|</span>
            <span class="detail-date">{{ post.publishedDate }}</span>
          </div>
          
          <h1 class="detail-title">{{ post.title }}</h1>
          
          <div class="detail-author-row">
            <div class="author-info">
              <img 
                :src="post.author?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'" 
                :alt="post.author?.name" 
                class="author-avatar"
              />
              <div class="author-meta-details">
                <span class="author-name">{{ post.author?.name }}</span>
                <span class="read-time">{{ post.readTime }}</span>
              </div>
            </div>
            
            <!-- Visual Mockup Actions (Static placeholders matching design) -->
            <div class="action-buttons">
              <button class="action-btn" aria-label="Bookmark">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button class="action-btn" aria-label="Share">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <!-- Featured Banner Image -->
        <div class="detail-image-wrapper">
          <img 
            :src="post.imageUrl" 
            :alt="post.title" 
            class="detail-image"
          />
        </div>

        <!-- Rendered Post Markdown Body -->
        <div class="detail-body-content" v-html="parsedContent"></div>
      </article>
    </div>
  </div>
</template>

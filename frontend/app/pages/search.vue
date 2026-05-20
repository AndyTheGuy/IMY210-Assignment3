<!-- Andreas Bester - u04613628 -->
<script setup>
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const strapiUrl = config.public.strapiUrl

// Fetch all posts with category and author relations
const { data: postsData, error } = await useFetch(`${strapiUrl}/api/posts?populate=*`)
const posts = computed(() => postsData.value?.data || [])

// Search query state
const searchQuery = ref('')
const activeQuery = ref('')

const handleSearch = () => {
  activeQuery.value = searchQuery.value.trim()
}

// Live filter based on title or author name
const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    return posts.value
  }
  return posts.value.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(query)
    const authorMatch = post.author?.name?.toLowerCase().includes(query)
    return titleMatch || authorMatch
  })
})
</script>

<template>
  <div class="search-page">
    <div class="search-container">
      <h1 class="search-title">Search</h1>
      <p class="search-subtitle">Find posts by title or author.</p>
      
      <!-- Search Input Form -->
      <form @submit.prevent="handleSearch" class="search-form">
        <div class="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-input-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Type search terms..." 
            class="search-input"
            aria-label="Search posts"
          />
        </div>
        <button type="submit" class="search-btn">Search</button>
      </form>
    </div>

    <!-- Results Section -->
    <div class="results-container">
      <div class="results-header">
        <h2 class="results-title">
          <span v-if="searchQuery">Results for "{{ searchQuery }}"</span>
          <span v-else>All Posts</span>
        </h2>
        <span class="results-count">{{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'result' : 'results' }} found</span>
      </div>

      <!-- Error and Empty States -->
      <div v-if="error" class="status-msg error">
        Unable to complete search. Backend connection offline.
      </div>
      
      <div v-else-if="filteredPosts.length === 0" class="status-msg empty">
        No articles found matching your criteria. Try another keyword.
      </div>

      <!-- Horizontal Search Results List -->
      <div v-else class="results-list">
        <article v-for="post in filteredPosts" :key="post.id" class="horizontal-card">
          <div class="card-left">
            <NuxtLink :to="`/posts/${post.slug}`" class="horizontal-image-link">
              <img 
                :src="post.imageUrl" 
                :alt="post.title" 
                class="horizontal-image"
                loading="lazy"
              />
            </NuxtLink>
          </div>
          
          <div class="card-right">
            <span class="horizontal-category">{{ post.category?.name || 'Uncategorized' }}</span>
            <h3 class="horizontal-title">
              <NuxtLink :to="`/posts/${post.slug}`" class="title-link">{{ post.title }}</NuxtLink>
            </h3>
            <p class="horizontal-snippet">{{ post.snippet }}</p>
            
            <div class="horizontal-author-row">
              <img 
                :src="post.author?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'" 
                :alt="post.author?.name" 
                class="author-avatar"
              />
              <div class="author-details">
                <span class="author-name">{{ post.author?.name }}</span>
                <span class="post-date">{{ post.publishedDate }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

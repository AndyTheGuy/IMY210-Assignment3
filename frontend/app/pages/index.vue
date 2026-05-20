<!-- Andreas Bester - u04613628 -->
<script setup>
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const strapiUrl = config.public.strapiUrl

// Fetch posts and categories from Strapi
const { data: postsData, error: postsError } = await useFetch(`${strapiUrl}/api/posts?populate=*`)
const { data: categoriesData, error: categoriesError } = await useFetch(`${strapiUrl}/api/categories`)

const posts = computed(() => postsData.value?.data || [])
const categories = computed(() => categoriesData.value?.data || [])

// Category filter state
const activeCategory = ref('all')

const setCategory = (slug) => {
  activeCategory.value = slug
}

// Filter posts dynamically
const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') {
    return posts.value
  }
  return posts.value.filter(post => post.category?.slug === activeCategory.value)
})

// Smooth scroll to showcase
const scrollToContent = () => {
  const element = document.getElementById('showcase')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-left">
        <h1 class="hero-title">
          Stories that <br />
          <span class="highlight">inspire.</span>
        </h1>
        <p class="hero-subtitle">
          Thoughts, ideas and perspectives on design, life and everything in between.
        </p>
        <button @click="scrollToContent" class="hero-btn">
          Explore Posts <span class="arrow">&rarr;</span>
        </button>
      </div>
      <div class="hero-right">
        <!-- Hero Image (curated, falls back to pre-seeded visual mockups if local is absent) -->
        <img 
          src="/images/hero-image.png" 
          onerror="this.src='https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800'"
          alt="Inkspire desk illustration" 
          class="hero-image"
        />
      </div>
    </section>

    <!-- Main Showcase -->
    <section id="showcase" class="showcase-section">
      <div class="showcase-header">
        <h2 class="showcase-title">Browse by category</h2>
        
        <!-- Category Filter Pills -->
        <div class="category-pills">
          <button 
            @click="setCategory('all')" 
            class="pill-btn" 
            :class="{ active: activeCategory === 'all' }"
          >
            All
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            @click="setCategory(cat.slug)" 
            class="pill-btn" 
            :class="{ active: activeCategory === cat.slug }"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Loading and Error Handling -->
      <div v-if="postsError" class="status-msg error">
        Unable to load blog posts. Please ensure the Strapi backend is running.
      </div>
      
      <div v-else-if="filteredPosts.length === 0" class="status-msg empty">
        No articles found in this category.
      </div>

      <!-- Post Grid -->
      <div v-else class="post-grid">
        <article v-for="post in filteredPosts" :key="post.id" class="post-card">
          <NuxtLink :to="`/posts/${post.slug}`" class="card-image-link">
            <img 
              :src="post.imageUrl" 
              :alt="post.title" 
              class="card-image"
              loading="lazy"
            />
          </NuxtLink>
          
          <div class="card-content">
            <span class="card-category">{{ post.category?.name || 'Uncategorized' }}</span>
            <h3 class="card-title">
              <NuxtLink :to="`/posts/${post.slug}`" class="title-link">{{ post.title }}</NuxtLink>
            </h3>
            <p class="card-snippet">{{ post.snippet }}</p>
            
            <div class="card-author-row">
              <img 
                :src="post.author?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'" 
                :alt="post.author?.name" 
                class="author-avatar"
              />
              <div class="author-details">
                <span class="author-name">{{ post.author?.name || 'Anonymous' }}</span>
                <span class="post-date">{{ post.publishedDate }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

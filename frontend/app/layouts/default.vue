<!-- Andreas Bester - u04613628 -->
<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark-mode', isDark.value)
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
    document.documentElement.classList.toggle('dark-mode', isDark.value)
  }
})
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <NuxtLink to="/" class="logo">
          <!-- Feather Pen Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather-icon">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
          <span class="logo-text">Inkspire</span>
        </NuxtLink>
        
        <nav class="main-nav">
          <NuxtLink to="/" class="nav-link" active-class="active">Home</NuxtLink>
          <NuxtLink to="/search" class="nav-link" active-class="active">Search</NuxtLink>
        </nav>

        <button @click="toggleDarkMode" class="theme-toggle" aria-label="Toggle dark mode">
          <!-- Sun Icon (show in dark) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <!-- Moon Icon (show in light) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-logo">Inkspire</div>
          <p class="footer-tagline">Thoughts, ideas and perspectives on design, life and everything in between.</p>
        </div>
        <div class="footer-right">
          <p class="footer-student">Andreas Bester | u04613628</p>
          <p class="footer-copyright">&copy; 2026 Inkspire. Built for IMY 210.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

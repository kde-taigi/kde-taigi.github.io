<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Header from "./Header.svelte";
  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header
  paths={{
    "/": "頭頁",
    "/about": "紹介",
    // "/glossary": "用詞",
  }}
/>
<main class="px-2">
  {@render children()}
</main>

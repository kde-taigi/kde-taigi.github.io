<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<header>
  <nav class="p-2">
    <ul class="flex gap-1">
      <li><a href="/">頭頁</a></li>
      <li><a href="/about">紹介</a></li>
      <li><a href="/glossary">用詞</a></li>
    </ul>
  </nav>
</header>
<main class="px-2">
  {@render children()}
</main>

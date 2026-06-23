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
    "/glossary": "用詞",
  }}
/>
<main class="px-2 grow">
  {@render children()}
</main>
<footer class="px-2 py-6 prose">
  <a class="underline" href="https://github.com/kde-taigi/kde-taigi.github.io">網站原始碼</a>
</footer>

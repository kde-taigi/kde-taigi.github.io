<script lang="ts">
  import { page } from "$app/state";
  interface Props {
    paths: Record<string, string>;
  }
  const { paths }: Props = $props();
</script>

<header class="px-2 py-4">
  <div class="font-bold pb-1">KDE 台語團隊</div>
  <nav>
    <ul class="flex gap-2">
      {#each Object.entries(paths) as [path, label]}
        <li>
          <a class={["hover:opacity-75", page.url.pathname === path && "underline"]} href={path}
            >{label}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</header>

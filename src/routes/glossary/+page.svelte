<script lang="ts">
  import terms from "$lib/assets/terms.json?raw";
  import { Terms } from "$lib";
  const parsed = Terms.parse(JSON.parse(terms));
  const textElem = parsed.root.children.find(
    (it) => it.type === "element" && it.name.raw === "text",
  );
</script>

<div class="prose">
  <p>TODO</p>
  <p>我會囥我選 ê 用詞 kap 解說來遮。</p>
  <p>用詞這馬我佇 <a href="https://www.terminologue.org/z9m89rsek/">Terminologue</a> 管理。</p>
</div>

<!--
{#each entries as entry}
  <div class="border">
    {#each entry.langSet as langSet}
      <div class="flex">
        <div class="min-w-[4rem]">
          {langSet["@_lang"]}
        </div>
        <div>
          {#each ensureArray(langSet.ntig) as ntig}
            {#each ensureArray(ntig.termGrp.term) as term}
              <div>
                {term}
              </div>
            {/each}
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/each}
-->

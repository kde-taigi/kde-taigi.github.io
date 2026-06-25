<script lang="ts">
  import { ensureArray } from "$lib";
  import data from "$lib/assets/terms.json";
  const entries = $derived(data.martif.text.body.termEntry);

  let input = $state("");
  let debounced = $derived(input);
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  // Why this isn't builtin (to JS or Svelte) is beyond me.
  $effect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      debounced = input;
    }, 250);
  });
</script>

<div class="prose mb-8">
  <p>我會囥我選 ê 用詞 kap 解說來遮。</p>
  <p>用詞這馬我佇 <a href="https://www.terminologue.org/z9m89rsek/">Terminologue</a> 管理。</p>
</div>

<input class="w-full border rounded p-2" type="search" bind:value={input} placeholder="過濾項目…" />

<ul class="space-y-4 mt-4">
  {#each entries.filter((entry) => {
    if (debounced === "") return true;
    // HACK but what can we do about it.
    return JSON.stringify(entry).includes(debounced);
  }) as entry (entry["@_id"])}
    <li>
      <div class="shadow-lg bg-gray-4 rounded relative py-0">
        <div class="absolute top-0 right-0 opacity-50 px-2">
          {entry["@_id"]}
        </div>
        <div class="divide-y divide-gray-8">
          {#each entry.langSet as langSet}
            <div class="grid grid-cols-[4rem_1fr] px-2">
              <div class="my-2">{langSet["@_lang"]}</div>
              <div class="flex flex-col gap-y-1 my-2">
                {#each ensureArray(langSet.ntig) as ntig}
                  {@const termGrp = ntig.termGrp}
                  {@const text = termGrp.term}
                  {@const termNotes =
                    "termNote" in termGrp ? ensureArray(termGrp.termNote ?? []) : undefined}
                  <!-- Grab it early... -->
                  {@const normativeAuthorization = termNotes?.find(
                    (it) => it["@_type"] === "normativeAuthorization",
                  )?.["#text"]}
                  <button
                    class="text-left hover:text-breezeblue-11 cursor-pointer"
                    title={`Khóo-pih "${text}"`}
                    onclick={() => {
                      navigator.clipboard.writeText(text);
                    }}
                  >
                    <div class={normativeAuthorization === "deprecated" ? "opacity-50" : undefined}>
                      <strong>{text}</strong>
                      {#if normativeAuthorization}
                        ({normativeAuthorization})
                      {/if}
                      {#if "termNote" in termGrp}
                        {#each termNotes as termNote}
                          {@const type = termNote["@_type"]}
                          {@const text = termNote["#text"]}
                          {#if type === "partOfSpeech"}
                            <span class="opacity-50">({text})</span>
                          {:else if type === "normativeAuthorization"}
                            <!-- already shown above -->
                          {:else if type === "transferComment"}
                            <div>{text}</div>
                          {:else}
                            <div>
                              termNote ({type}): {text}
                            </div>
                          {/if}
                        {/each}
                      {/if}
                      {#if "admin" in termGrp && termGrp.admin}
                        {#each ensureArray(termGrp.admin ?? []) as admin}
                          {@const type = admin["@_type"]}
                          {@const text = admin["#text"]}
                          {#if type === "source"}
                            <div class="opacity-75">— {text}</div>
                          {:else}
                            <div>
                              admin ({type}): {text}
                            </div>
                          {/if}
                        {/each}
                      {/if}
                      {#if "descripGrp" in langSet}
                        {#each ensureArray(langSet.descripGrp?.descrip ?? []) as descrip}
                          {@const type = descrip["@_type"]}
                          {@const text = descrip["#text"]}
                          {#if type === "example"}
                            <div class="italic">"{text}"</div>
                          {:else}
                            <div>
                              descrip ({type}): {descrip["#text"]}
                            </div>
                          {/if}
                        {/each}
                      {/if}
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </li>
  {/each}
</ul>

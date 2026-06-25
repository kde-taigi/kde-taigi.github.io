<script lang="ts">
  import { ensureArray } from "$lib";
  import data from "$lib/assets/terms.json";
  const entries = $derived(data.martif.text.body.termEntry);
</script>

<div class="prose">
  <p>我會囥我選 ê 用詞 kap 解說來遮。</p>
  <p>用詞這馬我佇 <a href="https://www.terminologue.org/z9m89rsek/">Terminologue</a> 管理。</p>
</div>

<ul class="space-y-4">
  {#each entries as entry}
    <li>
      <div class="shadow-lg rounded relative py-1">
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
                    class="text-left hover:text-green-400"
                    onclick={() => {
                      navigator.clipboard.writeText(text);
                    }}
                  >
                    <div class={normativeAuthorization === "deprecated" ? "opacity-50" : undefined}>
                      {text}
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

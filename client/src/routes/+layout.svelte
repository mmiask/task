<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import Anime from "./anime.svelte";

    export let data: LayoutData;

    let showFavorites = false;

    function toggleFavorites() {
        showFavorites = !showFavorites;
    }
</script>

<div class="relative">
    <button
        class="fixed right-0 top-0 z-10 mr-4 mt-4 rounded-full bg-white p-2 shadow-md"
        on:click={toggleFavorites}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
        >
            <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
        </svg>
    </button>

    <div class="mx-auto flex flex-col justify-center">
        {#if !showFavorites}
            <div>
                <slot />
            </div>
        {/if}
        {#if showFavorites}
            <div
                class="flex h-screen w-full flex-col items-center justify-center gap-5 bg-amber-300 p-3"
            >
                <div class="text-3xl font-bold">Favorites</div>
                <div class="flex flex-wrap justify-center gap-5">
                    {#each [...data.favorites] as [key, value]}
                        <button class="w-fit" on:click={toggleFavorites}>
                            <Anime
                                title={value.title}
                                mal_id={key}
                                image={value.image}
                            />
                        </button>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

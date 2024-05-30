<script lang="ts">
    import type { PageData } from "./$types";
    import Anime from "./anime.svelte";
    import { onMount } from "svelte";
    import { gsap } from "gsap";

    let itemRef;

    onMount(() => {
        if (itemRef) {
            animateOnScroll(itemRef, { opacity: 1, y: 0, duration: 1 });
        }
    });

    function animateOnScroll(target, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, options);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(target);
    }

    export let data: PageData;

    import { writable, derived } from "svelte/store";

    const itemsPerPage = 5;
    let currentPage = writable(1);

    const startIndex = derived(
        currentPage,
        ($currentPage) => ($currentPage - 1) * itemsPerPage,
    );
    const endIndex = derived(
        [currentPage, startIndex],
        ([$currentPage, $startIndex]) => $startIndex + itemsPerPage,
    );
</script>

{#each data.recommended.data.slice($startIndex, $endIndex) as recommendation, index}
    <div
        class="flex h-screen w-full flex-col justify-center overflow-hidden md:flex-row"
        class:bg-blue-300={index % 2 === 0}
        class:bg-blue-200={index % 2 !== 0}
    >
        <div
            class="order-1 flex h-1/2 w-full items-center justify-center overflow-y-scroll bg-gray-800 px-12 py-3 md:h-full md:w-1/2"
            class:bg-gray-800={index % 2 === 0}
            class:bg-gray-700={index % 2 !== 0}
        >
            <h1
                class="text-justify text-base font-thin italic tracking-widest text-white md:text-xl"
            >
                " {recommendation.content} "
            </h1>
        </div>
        <div
            class="flex h-1/2 w-full flex-row items-center justify-evenly gap-4 md:h-full md:w-1/2"
        >
            {#each recommendation.entry as subRecommendation}
                <div
                    id="slide"
                    bind:this={itemRef}
                    use:animateOnScroll={{ opacity: 1, y: 0, duration: 1 }}
                    style="opacity: 1; transform: translateY(100px);"
                >
                    <Anime
                        title={subRecommendation.title}
                        mal_id={subRecommendation.mal_id}
                        image={subRecommendation.images.webp.image_url}
                    />
                </div>
            {/each}
        </div>
    </div>
{/each}

<div class="flex items-center justify-between px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
        <button
            class="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            on:click={() => {
                $currentPage -= 1;
            }}
            disabled={$currentPage === 1}
        >
            Previous
        </button>
        <button
            class="relative ml-3 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            on:click={() => {
                $currentPage += 1;
            }}
            disabled={$currentPage ===
                Math.ceil(data.recommended.data.length / itemsPerPage)}
        >
            Next
        </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
            <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{$startIndex + 1}</span>
                to
                <span class="font-medium">{$endIndex}</span>
                of
                <span class="font-medium">{data.recommended.data.length}</span>
                results
            </p>
        </div>
        <div>
            <nav
                class="isolate inline-flex gap-4 -space-x-px rounded-md"
                aria-label="Pagination"
            >
                <button
                    class="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    on:click={() => {
                        $currentPage -= 1;
                    }}
                    disabled={$currentPage === 1}
                >
                    <span class="sr-only">Previous</span>
                    <svg
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <button
                    class="relative ml-3 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    on:click={() => {
                        $currentPage += 1;
                    }}
                    disabled={$currentPage ===
                        Math.ceil(data.recommended.data.length / itemsPerPage)}
                >
                    <span class="sr-only">Next</span>
                    <svg
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    </div>
</div>

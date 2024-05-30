<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="h-screen">
    <div class="my-5 ml-5">
        <a
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            href="/"
        >
            Go back to list
        </a>
    </div>

    <div class="mx-auto flex flex-col gap-y-5 px-4 md:w-1/2 md:px-0">
        <div class="flex flex-col items-center gap-5">
            <h1 class="text-4xl">
                {data.anime.title}
            </h1>

            <img
                src={data.anime.images.webp.image_url}
                alt={data.anime.title}
            />
        </div>

        <p class="text-justify text-base leading-loose">
            {data.anime.synopsis}
        </p>

        <div class="flex flex-row justify-center gap-4 pb-4">
            <form action="?/addToFavorites" method="post" use:enhance>
                <input type="hidden" name="mal_id" value={data.anime.mal_id} />
                <input type="hidden" name="title" value={data.anime.title} />
                <input
                    type="hidden"
                    name="image"
                    value={data.anime.images.webp.image_url}
                />
                <button
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    type="submit"
                >
                    Add to favorites
                </button>
            </form>

            <form action="?/removeFromFavorites" method="post" use:enhance>
                <input type="hidden" name="mal_id" value={data.anime.mal_id} />
                <button
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    type="submit"
                >
                    Remove From Favorites
                </button>
            </form>
        </div>
    </div>
</div>

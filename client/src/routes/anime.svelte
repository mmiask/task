<script lang="ts">
    export let title: string;
    export let mal_id: number;
    export let image: string;
</script>

<div class="group relative flex flex-col items-center">
    <h1
        class="absolute inset-0 flex items-center justify-center text-wrap text-center tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
        {title}
    </h1>

    <a href="/{mal_id}">
        <img
            class="h-64 transition-opacity duration-300 hover:cursor-pointer group-hover:opacity-40"
            src={image}
            alt={title}
        />
    </a>
</div>

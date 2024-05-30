import api from "$lib/server/api";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import favorites from "$lib/data";
import { z } from "zod";

const FormDataSchema = z.object({
    mal_id: z.number(),
    title: z.string(),
    image: z.string().url(),
});

export type Anime = {
    data: {
        mal_id: number;
        title: string;
        url: string;
        synopsis: string;
        images: {
            webp: {
                image_url: string;
                small_image_url: string;
                large_image_url: string;
            };
        };
    };
};

export const load = (async ({ params }) => {
    const id = params.anime_id;
    const anime = await api<Anime>(`https://api.jikan.moe/v4/anime/${id}`);
    if (!anime.success) {
        console.error("Failed to fetch anime", anime.error);
        throw error(500, "Failed to fetch anime");
    }
    console.debug("anime", anime.data);
    return {
        anime: anime.data.data,
    };
}) satisfies PageServerLoad;

export const actions = {
    addToFavorites: async ({ request }) => {
        const form = await request.formData();
        const mal_idRaw = form.get("mal_id");
        const mal_id =
            typeof mal_idRaw === "string" ? parseInt(mal_idRaw) : undefined;

        try {
            const formData = FormDataSchema.parse({
                mal_id,
                title: form.get("title"),
                image: form.get("image"),
            });

            favorites.set(formData.mal_id, {
                title: formData.title,
                image: formData.image,
            });

            return { success: true };
        } catch (e) {
            console.error("Form validation error:", e);
            return { success: false, error: "Form validation error" };
        }
    },

    removeFromFavorites: async ({ request }) => {
        const form = await request.formData();
        const mal_idRaw = form.get("mal_id");
        const mal_id =
            typeof mal_idRaw === "string" ? parseInt(mal_idRaw) : undefined;

        try {
            const formData = z
                .object({
                    mal_id: z.number(),
                })
                .parse({ mal_id });

            favorites.delete(formData.mal_id);

            return { success: true };
        } catch (e) {
            console.error("Form validation error:", e);
            return { success: false, error: "Form validation error" };
        }
    },
} satisfies Actions;

import { ref, watch } from 'vue';

export default function useTitleAndDescription() {
    const title = ref(document.title);
    const description = ref('');

    watch(title, (newTitle) => {
        document.title = newTitle;
    });

    watch(description, (newDescription) => {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', newDescription);
        }
    });

    return {
        title,
        description
    };
}
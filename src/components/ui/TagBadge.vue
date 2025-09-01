<script lang="ts">
    export default {
        props: {
            content: {
                type: String,
                required: true,
            }
        },
    }
</script>

<template>
    <article class="badge">
        {{ content }}
    </article>
</template>

<style scoped>
    .badge {
        display: inline-block;
        padding: 0.25rem 0.6rem;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 500;
        background-color: #e0e7ff;
        color: #1e3a8a;
        border: 1px solid #c7d2fe;
        white-space: nowrap;
    }
</style>
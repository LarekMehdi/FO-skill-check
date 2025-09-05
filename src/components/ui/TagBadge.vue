<script lang="ts">
    export default {
        props: {
            content: {
                type: String,
                required: true,
            },
            canDelete: {
                type: Boolean,
                required: false,
                default: false,
            }
        },
        emits: ['delete'],
    }
</script>

<template>
    <article :class="`${canDelete ? 'badge-delete' : 'badge'}`">
        {{ content }}
        <button
            v-if="canDelete"
            class="delete-btn"
            @click="$emit('delete')"
            title="Supprimer"
        >
            <i class="pi pi-times"></i>
        </button>
    </article>
</template>



<style scoped>
    .badge-delete {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.6rem;
        border-radius: 9999px;
        font-size: 0.85rem;
        font-weight: 500;
        background-color: #e0e7ff;
        color: #1e3a8a;
        border: 1px solid #c7d2fe;
        white-space: nowrap;
    }
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

    .delete-btn {
        border: none;
        background: transparent;
        font-size: 1rem;
        cursor: pointer;
        line-height: 1;
        padding: 0;
        color: #ef4444;
    }
    .delete-btn:hover {
        color: #dc2626;
    }
</style>
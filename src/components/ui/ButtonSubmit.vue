<script lang="ts">
    export default {
        data() {
            return {}
        },
        props: {
            class: {
                type: String,
                required: false,
                default: 'btn btn-primary btn-block'
            },
            content: {
                type: String,
                required: true,
            }
        },
        methods: {},
    }
</script>

<template>
    <button
        type="submit" 
        :class="class"
    >
        {{ content }}
    </button>
</template>
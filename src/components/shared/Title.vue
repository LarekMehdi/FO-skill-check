<script lang="ts">
    export default {
        props: {
            content: {
                type: String,
                required: true,
            },
            canGoBack: {
                type: Boolean,
                required: false,
                default: false,
            }
        },
        methods: {

        },
        components: {

        },
    }
</script>

<template>
    <section class="mb-5">
        <h1>{{ content }}</h1>
    </section>
    
</template>
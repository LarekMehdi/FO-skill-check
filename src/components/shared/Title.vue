<script lang="ts">
import GoBack from '../ui/GoBack.vue';

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
            GoBack,
        },
    }
</script>

<template>
    <section class="mb-5 header-container">
        <GoBack v-if="canGoBack" buttonClass="go-back-btn"/>
        <h1>{{ content }}</h1>
    </section>
    
</template>

<style scoped>
    .header-container {
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
    }

    .go-back-btn {
        position: absolute;
        left: 0;
    }

    .title {
        margin: 0;
    }
</style>
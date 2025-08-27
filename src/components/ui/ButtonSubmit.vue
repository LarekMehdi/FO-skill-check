<script lang="ts">
    export default {
        data() {
            return {}
        },
        props: {
            buttonClass: {
                type: String,
                required: false,
                default: 'btn-primary'
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
        :class="['btn btn-block', buttonClass]"
    >
        {{ content }}
    </button>
</template>
<script lang="ts">
    export default {
        data() {
            return {}
        },
        props: {
            buttonClass: {
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
        :class="buttonClass"
    >
        {{ content }}
    </button>
</template>
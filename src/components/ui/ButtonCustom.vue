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
            },
        },
        methods: {},
        emits: ['click']
    }
</script>

<template>
    <button
        type="button" 
        :class="['btn btn-block', buttonClass]"
        @click="$emit('click')"
    >
        {{ content }}
    </button>
</template>
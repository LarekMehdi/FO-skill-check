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
            style: {
                type: Object,
                required: false,
                default: {},
            }
        },
        methods: {},
        emits: ['click']
    }
</script>

<template>
    <button
        type="button" 
        :class="['btn btn-block', buttonClass]"
        :style="style"
        @click="$emit('click')"
    >
        {{ content }}
    </button>
</template>
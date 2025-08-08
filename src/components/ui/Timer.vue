<script lang="ts">
import type { PropType } from 'vue';
import type { TakeQuestionInterface } from '../../interfaces/question.interface';

    export default {
        props: {
            question: {
                type: Object as PropType<TakeQuestionInterface>,
                required: true,
            }
        },
        emits: ['timeOut'],
        data(): {timerCount: number, intervalId: number|null} {
            return {
                timerCount: 0,
                intervalId: null,
            }
        },
        beforeUnmount() {
            if (this.intervalId) clearInterval(this.intervalId);
        },
        methods: {
            startTimer(timeLimit: number) {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
                this.timerCount = timeLimit;
                if (timeLimit > 0) {
                    this.intervalId = setInterval(() => {
                        if (this.timerCount > 0) this.timerCount--;
                        else {
                            clearInterval(this.intervalId!);
                            this.intervalId = null;
                            this.$emit('timeOut');
                        }
                    }, 1000);
                }
            }
        },
        watch: {
            'question.timeLimit': {
                immediate: true,
                handler(newVal: number) {
                    this.startTimer(newVal);
                }
            }
        },
        components: {

        },
    }
</script>

<template>

    <input
        type="number"
        name="timer"
        class="input-timer"
        :value="timerCount"
        :disabled="true"
    />
</template>

<style scoped>
    .input-timer {
        
    }
</style>
<script lang="ts">
import type { PropType } from 'vue';
import type { TakeQuestionInterface } from '../../interfaces/question.interface';
import { useAuth } from '../../composables/useAuth';

    export default {
        props: {
            question: {
                type: Object as PropType<TakeQuestionInterface>,
                required: true,
            }
        },
        emits: ['timeOut'],
        setup() {
            const { isAdmin } = useAuth();
            return {
                isAdmin,
            }
        },
        data(): {timerCount: number, intervalId: number|null, isPaused: boolean} {
            return {
                timerCount: 0,
                intervalId: null,
                isPaused: false,
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
                        if (this.timerCount > 0) {
                            this.isPaused ? '' : this.timerCount-- ;
                        } 
                        else {
                            clearInterval(this.intervalId!);
                            this.intervalId = null;
                            this.$emit('timeOut');
                        }
                    }, 1000);
                }
            },
            changeIsPaused() {
                this.isPaused = !this.isPaused;
            },
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
    <section v-if="isAdmin">
        <i 
            v-if="isPaused" 
            class="pi pi-play"
            @click="changeIsPaused"
        >
        </i>
        <i 
            v-else 
            class="pi pi-pause"
            @click="changeIsPaused"
        >
        </i>
    </section>
    
</template>

<style scoped>
    .input-timer {
        
    }
</style>
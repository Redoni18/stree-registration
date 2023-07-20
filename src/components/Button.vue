<template>
    <button
        class="button text-white w-full py-3 mt-12 rounded-lg font-semibold text-xl bg-background-primary shadow-primary"
        :class="buttonClass"
        :disabled="disabled"
        @click="handleClick"
    >
        {{ title }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
    props: {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'button',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        customClass: {
            type: String,
            default: '',
        },
    },
    computed: {
        buttonClass(): string {
            return `${this.customClass} ${this.disabled ? '!bg-background-disabled !shadow-disabled' : ''}`;
        },
    },
    methods: {
        handleClick(): void {
            this.$emit('onClick');
        },
    }
})
</script>

<style>
</style>
<template>
    <div class="flex gap-3 justify-between w-full">
        <div class="flex gap-3 justify-between w-full">
        <div :class="`w-1/4 h-2 ${passwordStrength >= 1 ? 'bg-background-primary' : 'bg-background-disabled'}`"></div>
        <div :class="`w-1/4 h-2 ${passwordStrength >= 2 ? 'bg-background-primary' : 'bg-background-disabled'}`"></div>
        <div :class="`w-1/4 h-2 ${passwordStrength >= 3 ? 'bg-background-primary' : 'bg-background-disabled'}`"></div>
        <div :class="`w-1/4 h-2 ${passwordStrength >= 4 ? 'bg-background-primary' : 'bg-background-disabled'}`"></div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import zxcvbn from "zxcvbn";

export default defineComponent ({
    props: {
        password: {
            type: String,
            required: true,
        },
    },
    computed: {
        passwordStrength() {
            const result = zxcvbn(this.password);
            return result.score;
        },
    }
})
</script>

<style>

</style>
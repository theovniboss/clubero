<template>
    <button :class="[
        'button',
        $attrs.class
    ]" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup>

</script>

<style scoped>
@import "../../css/app.css";

.button {
    @apply whitespace-nowrap rounded-lg text-center self-center px-3 pt-2 pb-1.5 cursor-pointer transition-colors duration-300 ease-in-out;
}

.small {
    @apply text-xs px-1.5 pt-1 pb-0.75 rounded;
}

.large {
    @apply text-xl px-6 pt-4 pb-3 rounded-xl;
}

.primary {
    @apply bg-primary text-white hover:bg-primary-800;
}

.success {
    @apply bg-success text-white hover:bg-success-500;
}

.danger {
    @apply bg-danger text-white hover:bg-danger-700;
}
</style>

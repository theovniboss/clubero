<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        class="bg-white border border-gray-300 rounded-md pt-1.5 pb-1 px-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out disabled:border-transparent disabled:bg-transparent disabled:cursor-default"
        v-bind="$attrs" />
</template>

<script setup>
defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>

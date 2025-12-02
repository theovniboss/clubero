<template>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" class="
            bg-white border border-gray-300
            rounded-md pt-1.5 pb-1 
            focus:outline-none focus:ring focus:ring-primary focus:border-transparent 
            transition-all duration-300 ease-in-out 
            disabled:border-transparent disabled:bg-transparent disabled:cursor-default" v-bind="$attrs">
        <option value="" selected v-if="!notNull">{{ placeholder }}</option>
        <option v-for="option in options" :key="getOptionValue(option)" :value="getOptionValue(option)">
            {{ getOptionLabel(option) }}
        </option>
    </select>
</template>

<script setup>
defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: 'Selecione...',
    },
    notNull: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['update:modelValue']);

const getOptionValue = (option) => {
    return typeof option === 'object' ? option.value : option;
};

const getOptionLabel = (option) => {
    return typeof option === 'object' ? option.label : option;
};
</script>
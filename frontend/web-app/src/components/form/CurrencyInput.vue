<template>
    <input ref="inputRef" type="text"
        class="w-32 bg-white border border-gray-300 rounded-md pt-1.5 pb-1 px-2 focus:outline-none focus:ring focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out disabled:border-transparent disabled:bg-transparent disabled:cursor-default" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
    name: 'CurrencyInput',
    props: {
        modelValue: Number, // Vue 2: value
        options: Object
    },
    setup(props) {
        const options = {
            currency: 'BRL',
            currencyDisplay: 'symbol',
            hideCurrencySymbolOnFocus: false,
            precision: 2,
            autoDecimalDigits: true,
            valueScaling: "precision",
            ...(props.options || {})
        }
        const { inputRef } = useCurrencyInput(options)

        return { inputRef }
    }
}
</script>
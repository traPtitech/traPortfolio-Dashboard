<script lang="ts" setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
    modelValue: string
    options: string[]
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(),
    {
        placeholder: ''
    })

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const value = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
})

</script>

<template>
    <v-select v-model="value" :options="options" :clearable="false" :class="$style.select">
        <template #option="{ label }">
            <div :class="$style.item">
                <icon name="mdi:tick-circle-outline" :class="$style.icon" />
                <p>{{ label }}</p>
            </div>
        </template>
    </v-select>
</template>

<style lang="scss" module>
.select :global(.vs__dropdown-toggle) {
    border-color: $color-secondary;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.select:global(.vs--open .vs__dropdown-toggle) {
    border-color: $color-primary;
}

.select :global(.vs__dropdown-option)[aria-selected="false"] .icon {
    visibility: hidden;
}


.select :global(.vs__dropdown-menu) {
    margin-top: 4px;
    border-radius: 4px;
    border-color: $color-primary;
}

.item {
    display: flex;
    gap: 0.5rem;
}
</style>
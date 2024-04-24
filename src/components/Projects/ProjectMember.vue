<script lang="ts" setup>
import { User, YearWithSemesterDuration } from '/@/lib/apis'
import UserIcon from '/@/components/UI/UserIcon.vue'
import FormProjectDuration from '/@/components/UI/FormProjectDuration.vue'
import Icon from '/@/components/UI/Icon.vue'
import { computed } from 'vue'
import FieldErrorMessage from '/@/components/UI/FieldErrorMessage.vue'
import { isValidYearWithSemesterDuration } from '/@/lib/validate'

interface Props {
  user: User
  modelValue: YearWithSemesterDuration
}

const props = defineProps<Props>()

const value = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const emit = defineEmits<{
  (e: 'delete', value: string): void
  (e: 'update:modelValue', value: YearWithSemesterDuration): void
}>()

const shouldShowDurationError = computed(
  () => !isValidYearWithSemesterDuration(value.value)
)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.user">
        <user-icon :user-id="user.id" :size="48" />
        <p :class="$style.name">{{ user.name }}</p>
        <button :class="$style.icon" @click="emit('delete', user.id)">
          <icon :size="32" name="mdi:delete" />
        </button>
      </div>
      <div>
        <form-project-duration
          v-model="value"
          since-required
          :class="$style.projectDuration"
        />
        <field-error-message v-if="shouldShowDurationError">
          開始期間は終了期間よりも前に指定してください。
        </field-error-message>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  gap: 1rem;

  align-items: center;
  padding: 0.5rem;

  border: 1px solid $color-primary-text;
  border-radius: 8px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1;
}
.name {
  flex: 1;
  word-break: break-all;
}
.user {
  width: 30%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (width <= 768px) {
    width: 100%;
  }
}

.icon {
  color: $color-secondary;
  &:hover {
    opacity: 0.8;
  }
  margin-left: auto;
}
</style>

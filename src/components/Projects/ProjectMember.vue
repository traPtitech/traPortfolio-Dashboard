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
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', value: string): void
}>()

const model = defineModel<YearWithSemesterDuration>({ required: true })

const shouldShowDurationError = computed(
  () => !isValidYearWithSemesterDuration(model.value)
)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.user">
        <user-icon :user-name="user.name" :size="48" />
        <p :class="$style.name">{{ user.name }}</p>
        <button
          :class="[$style.deleteButton, $style.sp]"
          @click="emit('delete', user.id)"
        >
          <icon :size="32" name="mdi:delete" />
        </button>
      </div>
      <div>
        <form-project-duration
          v-model="model"
          :class="$style.projectDuration"
        />
        <field-error-message v-if="shouldShowDurationError">
          開始期間は終了期間よりも前に指定してください。
        </field-error-message>
      </div>
    </div>
    <button
      :class="[$style.deleteButton, $style.pc]"
      @click="emit('delete', user.id)"
    >
      <icon :size="32" name="mdi:delete" />
    </button>
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

.deleteButton {
  color: $color-secondary;
  &:hover {
    opacity: 0.8;
  }
}
.pc {
  @media (width <= 768px) {
    display: none;
  }
}
.sp {
  @media (width > 768px) {
    display: none;
  }
}
</style>

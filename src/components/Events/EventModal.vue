<script lang="ts" setup>
interface Props {
  openStatus: string
}

defineProps<Props>()

const emit = defineEmits(['update-public-status'])
</script>

<template>
  <dev :class="$style.eventModalBox">
    <button
      :class="[
        openStatus === 'open' ? $style.selected : $style.notSelected,
        $style.eventModalButton
      ]"
      @click="emit('update-public-status', 'open')"
    >
      <h3 :class="$style.statusName">公開</h3>
      <p :class="$style.discription">ポートフォリオにて公開します</p>
    </button>
    <button
      :class="[
        openStatus === 'anonymous' ? $style.selected : $style.notSelected,
        $style.eventModalButton
      ]"
      @click="emit('update-public-status', 'anonymous')"
    >
      <h3 :class="$style.statusName">匿名公開</h3>
      <p :class="$style.discription">
        企画者の名前を伏せて、<br />ポートフォリオにて公開します
      </p>
    </button>
    <button
      :class="[
        openStatus === 'private' ? $style.selected : $style.notSelected,
        $style.eventModalButton
      ]"
      @click="emit('update-public-status', 'private')"
    >
      <h3 :class="$style.statusName">非公開</h3>
      <p :class="$style.discription">ポートフォリオにて公開しません</p>
    </button>
  </dev>
</template>

<style lang="scss" module>
.eventModalBox {
  width: min-content;
  display: flex;
  flex-direction: column;
  padding: 4px 4px;
  border-radius: 6px;
  border: 2px solid;
  border-color: $color-secondary;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.15);
}
.eventModalButton {
  width: 234px;
  text-align: left;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.discription {
  font-size: 0.875rem;
}
.selected {
  & .statusName {
    color: $color-primary;
  }
  & .discription {
    color: $color-text;
  }
}
.notSelected {
  & .statusName {
    color: $color-secondary;
  }
  & .discription {
    color: $color-secondary;
  }
}
</style>

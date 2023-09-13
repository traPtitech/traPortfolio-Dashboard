<script lang="ts" setup>
interface Props {
  openStatus: string
}

defineProps<Props>()

const emit = defineEmits(['changeOpenStatus'])
</script>

<template>
  <dev :class="$style.modalList">
    <button
      :class="[
        openStatus === 'open' ? $style.Selected : $style.NotSelected,
        $style.modalListButton
      ]"
      @click="emit('changeOpenStatus', 'open')"
    >
      <h3 :class="$style.statusName">公開</h3>
      <p :class="$style.discription">ポートフォリオにて公開します</p>
    </button>
    <button
      :class="[
        openStatus === 'anonymous' ? $style.Selected : $style.NotSelected,
        $style.modalListButton
      ]"
      @click="emit('changeOpenStatus', 'anonymous')"
    >
      <h3 :class="$style.statusName">匿名公開</h3>
      <p :class="$style.discription">
        企画者の名前を伏せて、<br />ポートフォリオにて公開します
      </p>
    </button>
    <button
      :class="[
        openStatus === 'private' ? $style.Selected : $style.NotSelected,
        $style.modalListButton
      ]"
      @click="emit('changeOpenStatus', 'private')"
    >
      <h3 :class="$style.statusName">非公開</h3>
      <p :class="$style.discription">ポートフォリオにて公開しません</p>
    </button>
  </dev>
</template>

<style lang="scss" module>
.modalList {
  width: min-content;
  display: flex;
  flex-direction: column;
  padding: 4px 4px;
  border-radius: 6px;
  border: 2px solid;
  border-color: $color-secondary;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.15);
}
.modalListButton {
  width: 234px;
  text-align: left;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  & .statusName {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
  & .discription {
    font-size: 0.875rem;
  }
}
.NotSelected {
  & .statusName {
    color: $color-secondary;
  }
  & .discription {
    color: $color-secondary;
  }
}

.Selected {
  & .statusName {
    color: $color-primary;
  }
  & .discription {
    color: $color-text;
  }
}

.discription {
  font-size: 0.875rem;
}
</style>

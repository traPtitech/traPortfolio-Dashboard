<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import ToggleSwitch from '/@/components/UI/ToggleSwitch.vue'
import apis, { type UserDetail } from '/@/lib/apis'

interface Props {
  user: UserDetail
}

const props = defineProps<Props>()

const shouldShowRealname = ref(props.user.realName !== '') // todo:checkがUserDetailに追加されたら初期値をそこから取得する
const bio = ref(props.user.bio)

const isSending = ref(false)

const updateUserProfile = async () => {
  isSending.value = true
  try {
    await apis.editUser(props.user.id, {
      bio: bio.value,
      check: shouldShowRealname.value
    })
    //eslint-disable-next-line no-console
    console.log('更新しました') // todo:トーストとかに変えたい
  } catch {
    //eslint-disable-next-line no-console
    console.log('更新に失敗しました')
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div>
    <div>
      <h2 :class="$style.shouldShowRealnameText">本名を表示する</h2>
      <div :class="$style.toggleContainer">
        <p>{{ user.realName }}</p>
        <toggle-switch v-model="shouldShowRealname" />
      </div>
    </div>
    <div>
      <h2 :class="$style.bio">自己紹介</h2>
      <div :class="$style.textareaContainer">
        <form-text-area
          v-model="bio"
          :class="$style.textarea"
          :rows="3"
          :limit="256"
          placeholder="自己紹介を入力してください"
        />
        <base-button
          icon="mdi:update"
          :class="$style.updateButton"
          :disabled="isSending"
          @click="updateUserProfile"
        >
          Update
        </base-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.toggleContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0 0.5rem;
}
.shouldShowRealnameText {
  font-size: 1.25rem;
}
.textareaContainer {
  margin: 0.5rem 0 0 0.5rem;
}
.bio {
  font-size: 1.25rem;
  margin-top: 2rem;
}
.updateButton {
  margin-top: 2rem;
}
</style>

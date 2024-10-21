<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '/@/components/UI/BaseButton.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
// import Checkbox from '/@/components/UI/Checkbox.vue'
import apis, { type UserDetail } from '/@/lib/apis'

interface Props {
  user: UserDetail
}

const props = defineProps<Props>()

const toast = useToast()

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
    toast.success('プロフィ－ルの更新に成功しました')
  } catch {
    toast.error('プロフィ－ルの更新に失敗しました')
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div>
    <!-- <section>
      <h2 :class="$style.shouldShowRealnameText">本名</h2>
      <label :class="$style.checkboxContainer">
        <checkbox v-model="shouldShowRealname" />
        本名を表示する
      </label>
    </section> -->
    <section>
      <h2 :class="$style.bio">
        自己紹介
      </h2>
      <div :class="$style.textareaContainer">
        <form-text-area
          v-model="bio"
          :rows="3"
          :limit="256"
          placeholder="自己紹介を入力してください"
        />
      </div>
    </section>
    <div :class="$style.buttonContainer">
      <base-button
        icon="mdi:update"
        :disabled="isSending"
        @click="updateUserProfile"
      >
        Update
      </base-button>
    </div>
  </div>
</template>

<style lang="scss" module>
.checkboxContainer {
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0 0.5rem;
}
.shouldShowRealnameText {
  font-size: 1.25rem;
}
.textareaContainer {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
.bio {
  font-size: 1.25rem;
  margin-top: 2rem;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>

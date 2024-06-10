<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { EditUserAccountRequest } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import useParam from '/@/lib/param'
import ServiceAccordion from '/@/components/UI/ServiceAccordion.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import { hasIdService, hasAtmarkService } from '/@/consts/services'
import { isValidLength, isValidUrl } from '/@/lib/validate'
import useModal from '/@/components/UI/composables/useModal'
import ConfirmModal from '/@/components/UI/ConfirmModal.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const { modalRef, open, close } = useModal()

const me = (await apis.getMe()).data
const accountId = useParam('accountId')
const account = me.accounts.find(account => account.id === accountId.value)
if (!account) {
  throw new Error('Account not found')
}

const registeredServices = computed(() =>
  me.accounts.map(account => account.type)
)

const formValues = ref<Required<EditUserAccountRequest>>(account)
const isSending = ref(false)
const isDeleting = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    (hasIdService(formValues.value.type)
      ? isValidLength(formValues.value.displayName, 1, 256)
      : true) &&
    isValidUrl(formValues.value.url)
)

const updateAccount = async () => {
  isSending.value = true
  try {
    await apis.editUserAccount(me.id, accountId.value, formValues.value)
    toast.success('アカウント情報を更新しました')
    router.push('/user/accounts')
  } catch {
    toast.error('アカウント情報の更新に失敗しました')
  }
  isSending.value = false
}

const deleteAccount = async () => {
  isDeleting.value = true
  try {
    await apis.deleteUserAccount(me.id, accountId.value)
    toast.success('アカウント情報を削除しました')
    router.push('/user/accounts')
  } catch {
    toast.error('アカウント情報の削除に失敗しました')
  }
  isDeleting.value = false
}
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[
          { title: 'Profile', url: '/user' },
          { title: 'Accounts', url: `/user/accounts` },
          {
            title: 'Edit',
            url: `/user/accounts/edit`
          }
        ]"
        detail="アカウント情報を編集します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form label="サービス名" required :class="$style.labeledForm">
        <service-accordion
          v-model="formValues.type"
          :registered="registeredServices"
        />
      </labeled-form>
      <labeled-form
        v-if="hasIdService(formValues.type)"
        required
        label="ID"
        :class="$style.labeledForm"
      >
        <form-input
          v-model="formValues.displayName"
          placeholder="IDを入力"
          :icon="hasAtmarkService(formValues.type) ? 'at' : undefined"
          :limit="256"
        />
      </labeled-form>
      <labeled-form label="リンク" required :class="$style.labeledForm">
        <form-input
          v-model="formValues.url"
          placeholder="https://"
          has-anchor
        />
      </labeled-form>
    </form>
    <delete-form target="アカウント" @delete="open" />

    <div :class="$style.buttonContainer">
      <router-link to="/user/accounts" :class="$style.link">
        <base-button
          :class="$style.backButton"
          type="secondary"
          icon="mdi:arrow-left"
        >
          Back
        </base-button>
      </router-link>
      <base-button
        :is-disabled="!canSubmit"
        type="primary"
        icon="mdi:update"
        @click="updateAccount"
      >
        Update
      </base-button>
    </div>

    <confirm-modal
      ref="modalRef"
      title="アカウントの削除"
      body="アカウントを削除します。この操作は取り消せません。"
      :is-disabled="isDeleting"
      @cancel="close"
      @delete="deleteAccount"
    />
  </page-container>
</template>

<style lang="scss" module>
.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  margin-bottom: 2rem;
}
.labeledForm {
  margin-bottom: 2rem;
}
.prPermittedForm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.buttonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
}
.backButton {
  margin-left: 0.5rem;
}
</style>

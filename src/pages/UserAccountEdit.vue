<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import apis, { EditUserAccountRequest } from '/@/lib/apis'
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import useParam from '/@/lib/param'
import ServiceAccordion from '/@/components/UI/ServiceAccordion.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import {
  hasIdService,
  hasAtmarkService,
  generateUrlFromId,
  hasUrlGenerator
} from '/@/consts/services'
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
  me.accounts
    .map(account => account.type)
    .filter(accountType => accountType !== account.type)
)

const displayName = computed(() =>
  [0, 1].includes(formValues.value.type)
    ? me.name
    : formValues.value.displayName
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

watch(formValues, () => {
  if (hasUrlGenerator(formValues.value.type)) {
    formValues.value.url = generateUrlFromId(
      formValues.value.type,
      displayName.value
    )
  }
})

const updateAccount = async () => {
  isSending.value = true
  try {
    // FIXME: https://github.com/traPtitech/traPortfolio-Dashboard/issues/71
    // 暫定的にHomePageとBlogのときはdisplayNameにユーザー名を入れておく
    const _formValues = {
      ...formValues.value,
      displayName: displayName.value
    }
    await apis.editUserAccount(me.id, accountId.value, _formValues)
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
          { title: 'Profile', path: { name: 'Profile' } },
          { title: 'Accounts', path: { name: 'UserAccounts' } },
          {
            title: 'Edit',
            path: { name: 'UserAccountEdit', params: { accountId: accountId } }
          }
        ]"
        detail="アカウント情報を編集します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form
        label="サービス名"
        required
        :class="$style.labeledForm"
      >
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
      <labeled-form
        label="リンク"
        required
        :class="$style.labeledForm"
      >
        <form-input
          v-model="formValues.url"
          placeholder="https://"
          :disabled="hasUrlGenerator(formValues.type)"
          has-anchor
        />
      </labeled-form>
    </form>
    <delete-form
      target="アカウント"
      @delete="open"
    />

    <div :class="$style.buttonContainer">
      <link-button
        :to="{ name: 'UserAccounts' }"
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </link-button>
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

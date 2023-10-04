<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { EditUserAccountRequest, Account } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import ToggleSwitch from '/@/components/UI/ToggleSwitch.vue'
import useParam from '/@/use/param'
import { useDataFetcher } from '/@/use/fetcher'
import ServiceAccordion from '/@/components/UI/ServiceAccordion.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import { hasIdService, hasAtmarkService } from '/@/consts/services'
import { isValidLength, isValidUrl } from '/@/use/validate'
import useModal from '/@/components/UI/composables/useModal'
import ConfirmModal from '/@/components/UI/ConfirmModal.vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const { modalRef, open, close } = useModal()

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う
const accountId = useParam('accountId')
const { data: account } = useDataFetcher<Account>(() =>
  apis.getUserAccount(userId.value, accountId.value)
)
const { data: accounts } = useDataFetcher<Account[]>(() =>
  apis.getUserAccounts(userId.value)
)
const registeredServices =
  computed(() => accounts.value?.map(account => account.type)) ?? []

const formValues = ref<Required<EditUserAccountRequest>>({
  type: 0,
  displayName: '',
  url: '',
  prPermitted: false
})
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
    await apis.editUserAccount(userId.value, accountId.value, formValues.value)
    toast.success('アカウント情報を更新しました')
    router.push('/users/accounts')
  } catch {
    toast.error('アカウント情報の更新に失敗しました')
  }
  isSending.value = false
}

const deleteAccount = async () => {
  isDeleting.value = true
  try {
    await apis.deleteUserAccount(userId.value, accountId.value)
    toast.success('アカウント情報を削除しました')
    router.push('/users/accounts')
  } catch {
    toast.error('アカウント情報の削除に失敗しました')
  }
  isDeleting.value = false
}

watch(account, () => {
  if (account.value) {
    formValues.value = {
      type: account.value.type,
      displayName: account.value.displayName,
      url: account.value.url,
      prPermitted: account.value.prPermitted
    }
  }
})
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[
          { title: 'Profile', url: '/users' },
          { title: 'Accounts', url: `/users/accounts` },
          {
            title: 'Edit',
            url: `/users/accounts/edit`
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
      <labeled-form label="traP広報での言及を許可" :class="$style.labeledForm">
        <div :class="$style.prPermittedForm">
          許可する
          <toggle-switch v-model="formValues.prPermitted" />
        </div>
      </labeled-form>
    </form>
    <delete-form target="アカウント" @delete="open" />

    <div :class="$style.buttonContainer">
      <router-link to="/users/accounts" :class="$style.link">
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
  margin: 4rem 0 2rem;
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

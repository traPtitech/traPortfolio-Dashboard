<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { Account, AddAccountRequest } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import ToggleSwitch from '/@/components/UI/ToggleSwitch.vue'
import ServiceAccordion from '/@/components/UI/ServiceAccordion.vue'
import { useDataFetcher } from '/@/use/fetcher'
import { hasAtmarkService, hasIdService } from '/@/consts/services'
import { isValidLength, isValidUrl } from '/@/use/validate'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う
const { data: accounts } = useDataFetcher<Account[]>(() =>
  apis.getUserAccounts(userId.value)
)
const registeredServices =
  computed(() => accounts.value?.map(account => account.type)) ?? []

const formValues = reactive<AddAccountRequest>({
  type: 0,
  displayName: '',
  url: '',
  prPermitted: false
})

const isSending = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    (hasIdService(formValues.type)
      ? isValidLength(formValues.displayName, 1, 256)
      : true) &&
    isValidUrl(formValues.url)
)

const createNewAccount = async () => {
  isSending.value = true
  try {
    await apis.addUserAccount(userId.value, formValues)
    toast.success('アカウントを登録しました')
    router.push('/users/accounts')
  } catch {
    toast.error('アカウントの登録に失敗しました')
  }
  isSending.value = false
}
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
            title: 'New',
            url: `/users/accounts/new`
          }
        ]"
        detail="アカウントを登録します。"
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
        label="ID"
        required
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
        icon="mdi:plus"
        @click="createNewAccount"
      >
        Create
      </base-button>
    </div>
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

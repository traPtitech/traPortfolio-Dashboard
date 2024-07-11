<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { AddAccountRequest } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import ServiceAccordion from '/@/components/UI/ServiceAccordion.vue'
import {
  hasAtmarkService,
  hasIdService,
  serviceArray
} from '/@/consts/services'
import { isValidLength, isValidUrl } from '/@/lib/validate'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const me = (await apis.getMe()).data
const registeredServices = computed(() =>
  me.accounts.map(account => account.type)
)

const formValues = reactive<AddAccountRequest>({
  type:
    serviceArray
      .filter(s => !registeredServices.value.includes(s.type))
      .map(s => s.type)[0] ?? 0,
  displayName: '',
  url: '',
  prPermitted: true
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
    // FIXME: https://github.com/traPtitech/traPortfolio-Dashboard/issues/71
    // 暫定的にHomePageとBlogのときはdisplayNameにユーザー名を入れておく
    const _formValues = {
      ...formValues,
      displayName: [0, 1].includes(formValues.type)
        ? me.name
        : formValues.displayName
    }
    await apis.addUserAccount(me.id, _formValues)
    toast.success('アカウント情報を登録しました')
    router.push('/user/accounts')
  } catch {
    toast.error('アカウント情報の登録に失敗しました')
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
          { title: 'Profile', path: { name: 'Profile' } },
          { title: 'Accounts', path: { name: 'UserAccounts' } },
          {
            title: 'New',
            path: { name: 'UserAccountsNew' }
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
    </form>
    <div :class="$style.buttonContainer">
      <router-link :to="{ name: 'UserAccounts' }" :class="$style.link">
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
  margin-bottom: 2rem;
}
.labeledForm {
  margin-bottom: 2rem;
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

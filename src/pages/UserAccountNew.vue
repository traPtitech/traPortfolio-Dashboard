<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import { reactive, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import ToggleSwitch from '/@/components/UI/ToggleSwitch.vue'
import { link } from 'fs'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const formValues = reactive({
  type: 0,
  displayName: '',
  url: '',
  prPermitted: false
})

const isSending = ref(false)
const createNewAccount = async () => {
  isSending.value = true
  try {
    await apis.addUserAccount(userId.value, formValues)
    //eslint-disable-next-line no-console
    console.log('登録しました') // todo:トーストとかに変えたい
  } catch {
    //eslint-disable-next-line no-console
    console.log('登録に失敗しました')
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
      <labeled-form label="サービス名" :class="$style.labeledForm">
        <!--todo: ServiceAccordionができたら使う-->
      </labeled-form>
      <labeled-form label="ID" :class="$style.labeledForm">
        <form-input
          v-model="formValues.displayName"
          placeholder="IDを入力"
          icon="at"
          :limit="256"
        />
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
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
        :is-disabled="isSending"
        :class="$style.createButton"
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
</style>

<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import ToggleSwitch from '/@/components/UI/ToggleSwitch.vue'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const service = ref(0)
const id = ref('')
const link = ref('')
const prPermitted = ref(false)

const isSending = ref(false)
const createNewAccount = async () => {
  isSending.value = true
  try {
    await apis.addUserAccount(userId.value, {
      type: service.value,
      displayName: id.value,
      url: link.value,
      prPermitted: prPermitted.value
    })
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
        <form-input v-model="id" placeholder="IDを入力" icon="at" />
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input v-model="link" placeholder="https://" has-anchor />
      </labeled-form>
      <labeled-form label="traP広報での言及を許可" :class="$style.labeledForm">
        <div :class="$style.prPermittedForm">
          許可する
          <toggle-switch v-model="prPermitted" />
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

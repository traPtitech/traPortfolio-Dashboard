<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import { ref } from 'vue'
import apis, { ContestDetail } from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import useParam from '/@/use/param'
import useFetcher from '/@/use/fetcher'

const contest = ref<ContestDetail | null>(null)
const contestId = useParam('id')

const { fetcherState } = useFetcher<ContestDetail>(contest, () =>
  apis.getContest(contestId.value)
)
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:trophy-outline"
        :header-texts="[
          { title: 'Contests', url: '/contests' },
          { title: contest?.name ?? '', url: `/contests/${contestId}` }
        ]"
        detail="コンテストの詳細です。"
        :class="$style.header"
      />
      <router-link :to="`/contests/${contestId}/edit`" :class="$style.link">
        <base-button type="primary" icon="mdi:pencil">Edit</base-button>
      </router-link>
    </div>

    <router-link to="/contests" :class="$style.link">
      <base-button
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </base-button>
    </router-link>
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
.link {
  text-decoration: none;
  color: inherit;
}

.backButton {
  margin-top: 2rem;
}
</style>

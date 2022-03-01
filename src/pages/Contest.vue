<template>
  <page-container>
    <div :class="$style.titleContainer">
      <page-title>{{ name }}</page-title>
      <external-link
        v-if="link !== undefined"
        :href="link"
        :class="$style.link"
      >
        説明ページ
      </external-link>
      <p :class="$style.descirption">{{ description }}</p>
    </div>
    <contest-team-list :contest-teams="contestTeams" :contest-id="contestId" />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import ExternalLink from '/@/components/UI/ExternalLink.vue'
import ContestTeamList from '/@/components/Contest/ContestTeamList.vue'
import useParam from '/@/use/param'
import apis, { ContestDetail } from '/@/lib/apis'

export default defineComponent({
  name: 'Contest',
  components: {
    PageContainer,
    PageTitle,
    ExternalLink,
    ContestTeamList
  },
  setup() {
    const contestId = useParam('contestId')
    const contestDetail = ref<ContestDetail>()
    watchEffect(async () => {
      contestDetail.value = (await apis.getContest(contestId.value)).data
    })

    const name = computed(
      () => contestDetail.value?.name ?? 'Loading... コンテスト'
    )
    const link = computed(() => contestDetail.value?.link)
    const description = computed(() => contestDetail.value?.description)
    const contestTeams = computed(() => contestDetail.value?.teams)

    return { name, link, description, contestTeams, contestId }
  }
})
</script>

<style lang="scss" module>
.titleContainer {
  margin: 4rem 0;
}
.link {
  color: $color-secondary-text;
}
.descirption {
  color: $color-text;
  font-size: 1rem;
}
</style>

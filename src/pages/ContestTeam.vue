<template>
  <page-container>
    <div :class="$style.titleContainer">
      <page-title>チーム「{{ name }}」</page-title>
      <external-link
        v-if="link !== undefined"
        :href="link"
        :class="$style.link"
      >
        説明ページ
      </external-link>
      <p v-if="result" :class="$style.result">{{ result }}</p>
      <p v-if="description" :class="$style.description">{{ description }}</p>
    </div>
    <member-list :members="members" />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import ExternalLink from '/@/components/UI/ExternalLink.vue'
import useParam from '/@/use/param'
import apis, { ContestTeamDetail } from '/@/lib/apis'
import MemberList from '/@/components/ContestTeam/MemberList.vue'

export default defineComponent({
  name: 'ContestTeam',
  components: {
    PageContainer,
    PageTitle,
    ExternalLink,
    MemberList
  },
  setup() {
    const contestId = useParam('contestId')
    const teamId = useParam('teamId')
    const contestTeamDetail = ref<ContestTeamDetail>()
    watchEffect(async () => {
      contestTeamDetail.value = (
        await apis.getContestTeam(contestId.value, teamId.value)
      ).data
    })

    const name = computed(
      () => contestTeamDetail.value?.name ?? 'Loading... コンテストチーム'
    )
    const link = computed(() => contestTeamDetail.value?.link)
    const result = computed(() => contestTeamDetail.value?.result)
    const members = computed(() => contestTeamDetail.value?.members)
    const description = computed(() => contestTeamDetail.value?.description)

    return { name, link, result, members, description }
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
.result {
  color: $color-text;
  font-size: 1rem;
}
.description {
  color: $color-text;
  font-size: 1rem;
}
</style>

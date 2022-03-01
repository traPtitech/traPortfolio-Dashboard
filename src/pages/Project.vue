<template>
  <page-container>
    <div :class="$style.titleContainer">
      <page-title>{{ name }}</page-title>
      <external-link
        v-if="link !== undefined"
        :href="link"
        :class="$style.link"
      >
        紹介ページ
      </external-link>
      <p :class="$style.descirption">{{ description }}</p>
    </div>
    <member-list :members="members" />
  </page-container>
</template>

<script lang="ts">
import { computed, ref, defineComponent, watchEffect } from 'vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import ExternalLink from '/@/components/UI/ExternalLink.vue'
import useParam from '/@/use/param'
import apis, { ProjectDetail } from '/@/lib/apis'
import MemberList from '/@/components/Project/MemberList.vue'

export default defineComponent({
  name: 'Project',
  components: {
    PageContainer,
    PageTitle,
    ExternalLink,
    MemberList
  },
  setup() {
    const projectId = useParam('projectId')
    const projectDetail = ref<ProjectDetail>()
    watchEffect(async () => {
      projectDetail.value = (await apis.getProject(projectId.value)).data
    })

    const name = computed(
      () => projectDetail.value?.name ?? 'Loading... プロジェクト'
    )
    const link = computed(() => projectDetail.value?.link)
    const members = computed(() => projectDetail.value?.members)
    const description = computed(() => projectDetail.value?.description)

    return { name, link, members, description }
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

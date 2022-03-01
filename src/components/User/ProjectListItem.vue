<template>
  <div>
    {{ `${project.name} (${duration})` }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserProject } from '/@/lib/apis'
import { getGroupOrProjectDuration } from '/@/lib/date'

export default defineComponent({
  name: 'ProjectListItem',
  props: {
    project: {
      type: Object as PropType<UserProject>,
      required: true
    }
  },
  setup(props) {
    const duration = computed(() =>
      getGroupOrProjectDuration(props.project.userDuration)
    )
    return { duration }
  }
})
</script>

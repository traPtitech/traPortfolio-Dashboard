<template>
  <div>
    {{ `${group.name} (${duration})` }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserGroup } from '/@/lib/apis'
import { getGroupOrProjectDuration } from '/@/lib/date'

export default defineComponent({
  name: 'GroupListItem',
  props: {
    group: {
      type: Object as PropType<UserGroup>,
      required: true
    }
  },
  setup(props) {
    const duration = computed(() =>
      getGroupOrProjectDuration(props.group.duration)
    )
    return { duration }
  }
})
</script>

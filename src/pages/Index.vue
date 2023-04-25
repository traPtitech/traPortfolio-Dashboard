<script lang="ts" setup>
import { ref } from 'vue'
import FormProjectDuration from '/@/components/UI/FormProjectDuration.vue'
import { YearWithSemesterDuration, Semester } from '/@/lib/apis'

const aaa = ref<YearWithSemesterDuration>({
  since: {
    year: 2021,
    semester: Semester.first
  },
  until: {
    year: 2021,
    semester: Semester.second
  }
})
</script>

<template>
  <form-project-duration v-model="aaa" />
</template>

<style lang="scss" module>
.header {
  margin: 4rem 0 2rem;
}
</style>

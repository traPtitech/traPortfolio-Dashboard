<script lang="ts" setup>
import PageContainer from '/@/components/Layout/PageContainer.vue'
import FormDuration from '/@/components/UI/FormDuration.vue'
import { ref } from 'vue'
import { Duration } from '/@/lib/apis'

const value = ref<Duration>({ since: '', until: '' })
</script>

<template>
  <page-container>
    <form-duration v-model="value" />
  </page-container>
</template>

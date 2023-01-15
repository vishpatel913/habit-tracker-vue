<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/modules/auth'

const route = useRoute()
useAuth()

const layout = computed(() =>
  route.meta.layout
    ? () => import(`@/layouts/${route.meta.layout}.vue`)
    : 'div',
)
</script>

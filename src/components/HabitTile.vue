<template>
  <div class="container">
    <CellGroup inset>
      <Space fill :size="4">
        <Button icon="plus" type="primary" />
        <Cell
          :title="props.label"
          :value="undefined"
          :label="props.description"
        />
      </Space>
    </CellGroup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Space, Button, Icon, CellGroup, Cell } from "vant";

const props = defineProps<{
  label: string;
  description?: string;
}>();
const emit = defineEmits<{
  (e: "toggle", id: string): void;
}>();
</script>

<style>
.container {
  /* display: flex; */
  /* width: 100%; */
}
</style>

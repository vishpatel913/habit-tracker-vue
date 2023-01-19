<template>
  <div class="container">
    <CellGroup inset>
      <Cell>
        <template v-slot:title>
          <Row justify="space-between" align="center">
            <Space :size="8" align="center">
              <Button
                :icon="isCompletedToday ? 'success' : 'plus'"
                size="small"
                type="primary"
                @click="handleToggle"
              />
              {{ label }}
            </Space>
            <div v-if="showStreak">
              {{ streakLength }} <Icon name="fire-o" />
            </div>
          </Row>
        </template>
        <template v-slot:label>
          {{ description }}
        </template>
      </Cell>
    </CellGroup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { Space, Button, Row, Icon, CellGroup, Cell } from "vant";

import { getLatestDateStreak, formatDate, sortDateList } from "@/helpers/date";

const props = defineProps<{
  id: string;
  label: string;
  description?: string;
  dateList: string[];
}>();
const emit = defineEmits<{
  (e: "toggle", id: string): void;
}>();

const today = formatDate(new Date());
const yesterday = formatDate(today, { dayOffset: -1 });

const descendingDateList = computed(() => sortDateList(props.dateList, "DESC"));
const isCompletedToday = computed(() => descendingDateList.value[0] === today);
const showStreak = computed(() =>
  [today, yesterday].includes(descendingDateList.value[0])
);
const streakLength = computed(() => {
  const latestBatch = getLatestDateStreak(props.dateList);
  return latestBatch.length;
});

const handleToggle = () => {
  emit("toggle", props.id);
};
</script>

<style>
.container {
  /* display: flex; */
  /* width: 100%; */
}
</style>

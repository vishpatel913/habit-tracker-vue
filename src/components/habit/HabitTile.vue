<template>
  <div class="container">
    <CellGroup inset>
      <SwipeCell>
        <Cell :border="false">
          <template #title>
            <Row justify="space-between" align="center">
              <Space :size="8" align="center">
                <Button
                  :icon="lastCompletedToday ? 'success' : 'plus'"
                  :plain="lastCompletedToday"
                  size="small"
                  type="primary"
                  @click="handleToggle"
                />
                {{ label }}
              </Space>
              <div
                v-if="lastCompletedToday || lastCompletedYesterday"
                :class="lastCompletedYesterday && 'disabled'"
              >
                {{ streakLength }} <Icon name="fire-o" />
              </div>
            </Row>
          </template>
          <template #label>
            {{ description }}
            <div class="dates-container">
              <DateStreakGrid :selected-dates="dateList" />
            </div>
          </template>
          <template #right-icon>
            <div class="click-icon-container">
              <Icon name="arrow" @click="handleClick" size="large" />
            </div>
          </template>
        </Cell>
        <template #right>
          <Space class="actions-container">
            <Button
              block
              plain
              type="warning"
              icon="edit"
              @click="handleEdit"
            />
            <Button
              block
              plain
              type="danger"
              icon="delete-o"
              @click="handleDelete"
            />
          </Space>
        </template>
      </SwipeCell>
    </CellGroup>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import {
  Space,
  Button,
  Row,
  Icon,
  CellGroup,
  Cell,
  SwipeCell,
  showConfirmDialog,
} from "vant";

import DateStreakGrid from "./DateStreakGrid.vue";
import { getLatestDateStreak, formatDate, sortDateList } from "@/helpers";

const props = defineProps<{
  id: string;
  label: string;
  description?: string;
  dateList: string[];
}>();
const emit = defineEmits<{
  (e: "toggle", id: string): void;
  (e: "view", id: string): void;
  (e: "edit", id: string): void;
  (e: "delete", id: string): void;
}>();

const today = formatDate(new Date());
const yesterday = formatDate(today, { dayOffset: -1 });

const descendingDateList = computed(() => sortDateList(props.dateList, "DESC"));
const lastCompletedToday = computed(
  () => descendingDateList.value[0] === today
);
const lastCompletedYesterday = computed(
  () => descendingDateList.value[0] === yesterday
);
const streakLength = computed(() => {
  const latestBatch = getLatestDateStreak(props.dateList);
  return latestBatch.length;
});

const handleToggle = () => {
  emit("toggle", props.id);
};
const handleClick = () => {
  emit("view", props.id);
};
const handleEdit = () => {
  emit("edit", props.id);
};
const handleDelete = () => {
  showConfirmDialog({
    title: "Delete habit?",
  })
    .then(() => {
      emit("delete", props.id);
    })
    .catch(() => null);
};
</script>

<style scoped>
.disabled {
  opacity: var(--van-disabled-opacity);
}
.dates-container {
  padding-top: 4px;
}
.actions-container {
  height: 100%;
  padding: 4px;
}
.click-icon-container {
  display: flex;
  align-items: center;
  padding-left: 8px;
  height: 32px;
}
</style>

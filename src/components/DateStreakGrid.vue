<template>
  <div class="container">
    <Row align="center" justify="space-between">
      <Button
        v-for="date in dates"
        :key="date"
        :plain="!isActive(date)"
        :type="isActive(date) || isToday(date) ? 'primary' : undefined"
        size="mini"
        disabled
      >
        {{ formatDateToNumber(date) }}
      </Button>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Button, Row } from "vant";
import { getDateList, formatDate } from "@/helpers/date";

const DATE_NUMBER = 10;

const props = defineProps<{
  selectedDates: string[];
}>();

const amountOfDays = DATE_NUMBER - 1;
const today = new Date();
const dates = getDateList(
  formatDate(today, { dayOffset: -amountOfDays }),
  formatDate(today)
);

const isActive = (date: string) => props.selectedDates.includes(date);
const isToday = (date: string) => date === formatDate(today);

const formatDateToNumber = (date: string) => formatDate(date, { format: "DD" });
</script>

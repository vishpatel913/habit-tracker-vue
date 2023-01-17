<template>
  <div class="form-container">
    <Form @submit="onSubmit">
      <CellGroup inset>
        <Field
          v-model="label"
          name="label"
          label="Label"
          placeholder="Label"
          :rules="[{ required: true, message: 'Label is required' }]"
        />
        <Field
          v-model="description"
          name="description"
          label="Description"
          placeholder="Description"
        />
        <Field
          v-model="selectedDatesValue"
          is-link
          readonly
          name="selectedDates"
          label="Days Achieved"
          placeholder="Select initial days"
          @click="showCalendar = true"
        />
        <Calendar
          v-model:show="showCalendar"
          type="multiple"
          @confirm="onCalendarConfirm"
          first-day-of-week="1"
          :max-date="maxDate"
          :min-date="minDate"
        />
      </CellGroup>
      <div style="margin: 16px">
        <Button native-type="submit">Create</Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, CellGroup, Button, Calendar } from "vant";
import { formatDate } from "@/helpers/date";
import { Habit } from "@/models/habit.model";

const label = ref();
const description = ref();
const selectedDates = ref<Date[]>([]);

const selectedDatesValue = ref<string>(
  `${selectedDates.value.length} Selected`
);
const showCalendar = ref(false);

const maxDate = new Date();
const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

const onCalendarConfirm = (values: Date[]) => {
  selectedDates.value = values;
  // selectedDatesValue.value = values
  //   .map((date) => formatDate(date, "D/M"))
  //   .join(", ");
  selectedDatesValue.value = `${values.length} Selected`;
  showCalendar.value = false;
};

const onSubmit = (values: Omit<Habit, "id | days">) => {
  const days = selectedDates.value.map((date) => formatDate(date)).sort();
  console.log("form submit", { ...values, days: days });
};
</script>

<style lang="scss"></style>

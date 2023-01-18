<template>
  <div class="form-container">
    <Form @submit="onSubmit">
      <CellGroup inset>
        <Field
          v-model="label"
          name="label"
          label="Label"
          placeholder="Label"
          clearable
          :rules="[{ required: true, message: 'Label is required' }]"
        />
        <Field
          v-model="description"
          name="description"
          label="Description"
          placeholder="Description"
          clearable
        />
        <Field
          v-model="selectedDatesValue"
          name="dateList"
          label="Days Achieved"
          placeholder="Select days"
          type="textarea"
          readonly
          is-link
          @click="showCalendar = true"
        />
        <Calendar
          v-model:show="showCalendar"
          type="multiple"
          first-day-of-week="1"
          :max-date="maxDate"
          :min-date="minDate"
          @confirm="onCalendarConfirm"
        />
      </CellGroup>
      <div style="margin: 16px">
        <Button native-type="submit">Create</Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { Form, Field, CellGroup, Button, Calendar } from "vant";
import { formatDate, getLastSuccessiveList } from "@/helpers/date";
import { UpdateHabitArg } from "@/models/habit.model";

const label = ref();
const description = ref();
const selectedDates = ref<string[]>([]);

const selectedDatesValue = ref<string>();
const showCalendar = ref(false);

const emit = defineEmits<{
  (e: "submit", newHabit: UpdateHabitArg): void;
}>();

const maxDate = new Date();
const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

const onCalendarConfirm = (values: Date[]) => {
  const dateStrings = values.map((date) => formatDate(date));
  selectedDates.value = dateStrings;
  const lastStreak = getLastSuccessiveList(dateStrings);
  selectedDatesValue.value = `${values.length} days selected\nLast streak: ${lastStreak.length}`;
  showCalendar.value = false;
};

const onSubmit = (values: Omit<UpdateHabitArg, "days">) => {
  const dateList = selectedDates.value;
  emit("submit", { ...values, dateList });
};
</script>

<style lang="scss"></style>

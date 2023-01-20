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
          :default-date="defaultDates"
          :max-date="maxDate"
          :min-date="minDate"
          @confirm="onCalendarConfirm"
        />
      </CellGroup>

      <Row class="button-container" :gutter="16">
        <Col :span="12">
          <Button @click="onCancel" block>Cancel</Button>
        </Col>
        <Col :span="12">
          <Button type="primary" native-type="submit" block> Save </Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import { Form, Field, CellGroup, Button, Calendar, Row, Col } from "vant";
import { formatDate } from "@/helpers/date";
import { Habit, HabitPayload } from "@/models/habit.model";

const props = defineProps<{
  habit?: Habit;
}>();

const emit = defineEmits<{
  (e: "submit", newHabit: HabitPayload): void;
  (e: "cancel"): void;
}>();

const label = ref(props.habit?.label);
const description = ref(props.habit?.description);
const selectedDates = ref<string[]>(props.habit?.dateList || []);

const getSelectedDateValue = (length?: number) =>
  length ? `${length} days selected` : undefined;
const selectedDatesValue = ref<string | undefined>(
  getSelectedDateValue(props.habit?.dateList.length)
);
const showCalendar = ref(false);
const defaultDates = computed(() => {
  const dateList = props.habit?.dateList;
  if (dateList?.length) {
    return dateList.map((date) => new Date(date));
  }
  return undefined;
});

const maxDate = new Date();
const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

const onCalendarConfirm = (values: Date[]) => {
  const dateStrings = values.map((date) => formatDate(date));
  selectedDates.value = dateStrings;
  selectedDatesValue.value = getSelectedDateValue(values.length);
  showCalendar.value = false;
};

const onSubmit = (values: Omit<HabitPayload, "days">) => {
  const dateList = selectedDates.value;
  const submitValue = { ...values, dateList };
  if (props.habit?.id) {
    submitValue.id = props.habit?.id;
  }
  emit("submit", submitValue);
};
const onCancel = () => {
  emit("cancel");
};
</script>

<style>
.button-container {
  padding: 0 16px;
  margin-top: 16px;
}
</style>

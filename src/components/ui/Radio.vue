<template lang="pug">
.radio
  .option(
    v-for="option in options"
    @click="select(option)"
    :class="{ selected: option.value === value }"
  ) {{ option.label }}
</template>
<script>
export default {
  name: 'Radio',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    select(option) {
      this.$emit('input', option.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.radio {
  display: inline-flex;
}

.option {
  border: 1px solid #1580dd;
  color: #1580dd;
  border-right: none;
  width: 100px;
  padding: 6px 20px;
  cursor: pointer;
  transition: background .2s ease-out;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-right: 1px solid #1580dd;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    background: rgba(21, 128, 221, .15);
  }

  &.selected {
    color: #fff;
    background: #1580dd;
  }
}
</style>

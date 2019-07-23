<template lang="pug">
.tariff
  .tariff__header
    .tariff__name {{ tariff.name }}
    .tariff__period
      radio(
        v-if="group.options && group.options.periods"
        :options="group.options.periods"
        v-model="period"
      )
  .tariff__body
    order(:price="tariff.price" :period="period" @order="order")
  .tariff__footer
    ul.tariff__features
      li.feature(v-for="(feature, idx) in tariff.features" :key="idx" :class="{ important: feature.important }") {{ feature.text }}
</template>
<script>
import Order from '@/components/Order.vue';
import Radio from '@/components/ui/Radio.vue';

export default {
  name: 'Tariff',
  components: {
    Order,
    Radio,
  },
  props: {
    tariff: {
      type: Object,
      required: true,
    },
    groupPeriod: {
      type: String,
      default: null,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      period: this.groupPeriod,
    };
  },
  watch: {
    groupPeriod(newPeriod) {
      this.period = newPeriod;
    },
  },
  methods: {
    order(order) {
      console.log({
        tariff: this.tariff.name,
        ...order,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tariff__period {
  height: auto;
  margin: 15px 0;
  display: none;

  @media screen and (max-width: 1023px) {
    display: block;
  }
}

.tariff__name {
  padding: 14px 0;
  background: #62b2eb;
  color: #fff;
  position: relative;
  font-size: 18px;
  font-weight: 700;
}

.tariff__features {
  margin: 0;
  padding: 28px 10px;
  list-style: none;

  .feature {
    padding: 5px 0;

    &.important {
      font-weight: 700;
    }
  }
}
</style>

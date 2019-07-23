<template lang="pug">
.tariff-group(:style="groupStyle")
  .tariff-group__header
    h2.tariff-group__title {{ group.name }}
    p.tariff-group__description {{ group.description }}
    .tariff-group__period
      radio(
        v-if="group.options && group.options.periods"
        :options="group.options.periods"
        v-model="period"
      )
  .tariff-group__tariffs
    tariff.tariff(v-for="(tariff, idx) in group.tariffs" :key="idx" :tariff="tariff" :group-period="period" :group="group")
</template>
<script>
import Tariff from '@/components/Tariff.vue';
import Radio from '@/components/ui/Radio.vue';

const BASE_WIDTH = 450;

export default {
  name: 'TariffGroup',
  components: {
    Tariff,
    Radio,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      period: 'month',
    };
  },
  computed: {
    groupStyle() {
      return {
        flexBasis: `${BASE_WIDTH * this.group.tariffs.length}px`,
        maxWidth: `${BASE_WIDTH * this.group.tariffs.length}px`,
      };
    },
  },
}
</script>
<style lang="scss" scoped>
.tariff-group {
  flex: 0 1 450px;
  padding: 22px 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(40,40,37,.15);
  max-width: 450px;
  margin-right: 30px;

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }

  .tariff {
    border-right: 1px solid #979797;

    &:last-child {
      border-right: none;
    }
  }

  @media screen and (max-width: 1023px) {
    margin: 0 auto 15px;
    flex: 0 1 450px!important;
    max-width: 450px!important;

    &:last-child {
      margin-bottom: 0;
      margin-right: auto;
    }
  }
}

.tariff-group__title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.tariff-group__description {
  font-size: 14px;
  color: #4a4a4a;
  height: 40px;
  padding: 0 10px;
  margin: 0;
}

.tariff-group__period {
  height: 60px;

  @media screen and (max-width: 1023px) {
    display: none;
  }
}

.tariff-group__tariffs {
  display: flex;

  @media screen and (max-width: 1023px) {
    display: block;
  }
}
</style>

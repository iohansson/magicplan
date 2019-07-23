<template lang="pug">
.buy
  h1 Find the Pricing Model that Fits Your Needs the Best.
  .tariff-groups
    tariff-group(v-for="(group, idx) in tariffs" :key="idx" :group="group")
</template>

<script>
import TariffGroup from '@/components/TariffGroup.vue';
import tariffs from '@/data/tariffs';

export default {
  name: 'Buy',
  components: {
    TariffGroup,
  },
  computed: {
    tariffs() {
      return tariffs;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buy {
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  text-align: center;
  padding: 0 10px;
}

h1 {
  padding: 45px 20px;
  margin: 0;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.1;
  color: #1580dd;
}

.tariff-groups {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30px 15px;

  @media screen and (max-width: 1023px) {
    display: block;
    padding: 0 10px;
  }
}
</style>

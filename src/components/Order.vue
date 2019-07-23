<template lang="pug">
.order
  .order__buy(v-if="price.custom")
    .buy__price on request
    .buy__unit--placeholder
    button.buy__action(@click="order('contact')") {{ price.labels.action }}
  .order__buy(v-else)
    .buy__price €{{ pricePerMonth }}
    .buy__unit {{ price.labels.perUnit }}
    button.buy__action(@click="toggleDetails") {{ price.labels.action }}
  .divider
  .order__calc(v-if="showDetails && price.unitDependant && !price.custom")
    .calc__label {{ price.labels.units }}:
    .calc__quantity
      button.less(@click="quantity -= 1" :disabled="quantity === 1")
        svg(viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg")
          path(d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-224c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h224c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0")
      input(v-model.number="quantity" size="2")
      button.more(@click="quantity += 1")
        svg(viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg")
          path(d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0")
    .calc__total €{{ total }}
  .order__sum(v-if="showDetails && !price.unitDependant && !price.custom" v-html="infoString")
  .order__payment(v-if="showDetails")
    .order__payment-option(@click="order('paypal')")
      img(src="https://cloud.magic-plan.com/img/svgs/paypal_logo.svg")
    .order__payment-option-divider or
    .order__payment-option(@click="order('card')") credit card
</template>
<script>
import { round } from '@/utils';

export default {
  name: 'Order',
  props: {
    price: {
      type: Object,
      required: true,
    },
    period: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showDetails: false,
      quantity: 1,
    };
  },
  computed: {
    pricePerMonth() {
      return this.period === 'year'
        ? round(this.currentPrice / 12, 2)
        : this.currentPrice;
    },
    currentPrice() {
      if (!this.price.periodical) return this.price.unit;
      return this.price[this.period];
    },
    total() {
      return (this.currentPrice * this.quantity).toFixed(2);
    },
    infoString() {
      return this.period === 'year'
        ? `€${this.currentPrice} / Year`
        : '&nbsp;';
    },
  },
  methods: {
    order(payment) {
      const order = this.price.custom
        ? { payment }
        : {
          payment,
          quantity: this.quantity,
          total: this.total,
          period: this.price.periodical ? this.period : 'irrelevant',
          units: this.price.labels.units,
        };
      this.$emit('order', order);
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>
<style lang="scss" scoped>
.order__buy {
  padding: 14px 0 28px;
}

.buy__price {
  font-size: 36px;
}

.buy__unit {
  padding-bottom: 12px;

  &--placeholder {
    height: 32px;
  }
}

.buy__action {
  width: 160px;
  box-shadow: none;
  border: 1px solid #1580dd;
  transition: background .2s ease-out;
  background-color: #1580dd;
  border-radius: 4px;
  color: #fff;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.42857143;
  user-select: none;

  &:hover {
    background-color: #1165ae;
    border-color: #1165ae;
  }
}

.order__calc, .order__sum {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
  color: #6d6d6d;
}

.order__sum {
  justify-content: center;
  padding: 22px 18px;
}

.calc__quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .less, .more {
    cursor: pointer;
    font-size: 24px;
    line-height: 1px;
    font-weight: 700;
    user-select: none;

    width: 24px;
    height: 24px;
    padding: 0;
    flex-shrink: 0;
    border: none;
    background: transparent;
    outline: none;

    svg {
      width: 24px;
      height: 24px;
      transition: fill .2s ease-out;
      fill: #1580dd;
    }

    &:hover {
      svg {
        fill: #1165ae;
      }
    }

    &:disabled {
      cursor: disabled;

      svg {
        fill: #f6f6f6;
      }
    }
  }

  input {
    appearance: none;
    border: none;
    text-align: center;
    font-size: 24px;
    line-height: 28px;
    user-select: none;
    outline: none;
    width: 100%;
    height: 28px;
    padding: 0;
    border-bottom: 1px solid #f6f6f6;
    margin: 0 4px;

    &:hover, &:focus {
      border-bottom-color: #979797;
    }
  }
}

.order__payment {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 28px;
  background: #f6f6f6;
}

.order__payment-option {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;
  background-color: transparent;
  border: 1px solid #1580dd;
  color: #1580dd;
  border-radius: 4px;
  transition: background-color .2s ease-out;
  cursor: pointer;
  user-select: none;
  padding: 8px 14px;

  &:hover {
    background-color: rgba(21, 128, 221, .15);
  }
}

.order__payment-option-divider {
  margin: 6px 0;
}
</style>

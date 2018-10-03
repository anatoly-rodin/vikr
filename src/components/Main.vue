<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="swiper-container lots-list">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide lots-list__item"
                             v-show="getLots.length > 0"
                             v-for="(lot, index) in getLots"
                             :key="index">
                            <div class="lots-list__image">
                                <img :src=" 'http://vickrey.openbs.ru:81/images/lots/' + lot.imageName" alt="" v-if="lot.imageName">
                                <img src="https://via.placeholder.com/350x400" v-else>
                            </div>
                            <div class="lots-list__content">
                                <form class="form-inline lots-list__form"
                                      v-on:submit.prevent
                                      v-if="isAuthorized && isCanSetBid"
                                      style="text-align: center; margin-top: 30px;">
                                    <div class="form-group">
                                        <label class="sr-only">Amount (in dollars)</label>
                                        <div class="input-group">
                                            <div class="input-group-addon">$</div>
                                            <input type="text"
                                                   v-model="userBid"
                                                   class="form-control"
                                                   placeholder="1 000 000">
                                        </div>
                                    </div>
                                    <button @click="setBid(lot.id)"
                                            type="submit"
                                            class="btn btn-primary">Bid!</button>
                                </form>
                                <div class="lots-list__about">
                                    <h1>{{ lot.title }}</h1>
                                    <p>{{ lot.description }}</p>
                                    <p>status: {{ lot.status }}</p>
                                    <p>Updated: {{ getFormattedDate(lot.updatedAt) }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide lots-list__item" v-show="getLots.length < 0">
                            <div class="lots-list__image">
                                <img src="https://via.placeholder.com/350x400">
                            </div>
                            <div class="lots-list__content">
                                <span>Активных лотов нет</span>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import moment from 'moment';
    export default {
        name: "Main",
        components: {},
        data() {
            return {
                userBid: 0,
                swiper: null
            }
        },
        created() {
            this.$store.dispatch('getActualLots');
        },
        mounted() {
            let self = this;
            
            self.$nextTick(function () {
                self.swiper = new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    centeredSlides: true,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            });
        },
        updated: function () {
            let self = this;
            
            this.$nextTick(function () {
                self.swiper.update(true);
            });
        },
        methods: {
            setBid(data) {
                this.$store.dispatch('setBid', { lotId: data.toString(), amount: +this.userBid });
                this.userBid = 0;
            },
            getFormattedDate(utcDate) {
                return moment.parseZone(utcDate).format('DD-MM-YY');
            }
        },
        computed: {
            getLots() {
                return this.$store.state.actualLots;
            },
            isAuthorized() {
                return this.$store.state.access;
            },
            isCanSetBid() {
                return this.$store.getters.canSetBid;
            }
        }
    }
</script>
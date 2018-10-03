<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'MyLots' }" class="btn btn-primary btn-sm">
                    <i class="glyphicon glyphicon-arrow-left"></i>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h1>Lot details</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="height: 400px;">
                <img v-if="lot.imageName"
                     :src=" 'http://vickrey.openbs.ru:81/images/lots/' + lot.imageName"
                     style="display: flex; max-width: 100%; max-height: 100%;"
                     alt="">
                <span v-else>
                    <img src="https://via.placeholder.com/350x150" alt="">
                </span>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h1>{{ lot.title }}</h1>
                <p>{{ lot.description }}</p>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-12">
                <p>Status: {{ lot.status }}</p>
                <p>Date: </p>
                <p>Interest: </p>
                <p>Buy on date: </p>
                <p>Updated: {{ getFormattedDate(lot.updatedAt) }}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';

    export default {
        name: "lotInfo",
        data() {
            return {
            
            }
        },
        methods: {
            getFormattedDate(utcDate) {
                return moment.parseZone(utcDate).format('DD-MM-YY');
            }
        },
        computed: {
            lot() {
                return this.$store.getters.getLot(this.$route.params.lotId);
            }
        }
    }
</script>
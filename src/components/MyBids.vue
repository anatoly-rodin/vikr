<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>My bids</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Lot Name</th>
                            <th>Status</th>
                            <th>Winning bid</th>
                            <th>Interest</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(bid, index) in getBids" :key="index">
                            <td>{{ bid.title }}</td>
                            <td>{{ bid.status }}</td>
                            <td>{{ bid.amount }} $</td>
                            <td>{{ bid.interest }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MyBids',
        data() {
            return {}
        },
        created() {
            this.$store.dispatch('getUserBids');
        },
        methods: {},
        computed: {
            getBids() {
                return this.$store.state.userBids;
            }
        }
    }
</script>
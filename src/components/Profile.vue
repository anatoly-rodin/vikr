<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>Bids history</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Painting name</th>
                            <th>Status</th>
                            <th>Winning bid</th>
                            <th>Interest</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(bid, index) in getUserBids" :key="index">
                            <td>Painting 1</td>
                            <td>WON</td>
                            <td>1 000 000 $</td>
                            <td>1200 $</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "profile",
        data() {
            return {}
        },
        created() {
            this.$store.dispatch('getUserBids');
        },
        computed: {
            getUserBids() {
                return this.$store.state.userBids;
            }
        }
    }
</script>
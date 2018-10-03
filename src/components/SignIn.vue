<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1 style="text-align:center;">Sign In</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form form-login" v-on:submit.prevent>
                    <div class="form-group" :class="{ 'has-error': name.hasError }">
                        <label class="control-label" for="signin__name">Name</label>
                        <input
                                v-model="name.value"
                                id="signin__name"
                                class="form-control"
                                type="text"
                                placeholder="Имя">
                        <span class="help-block" v-if="name.hasError">Требуется указать имя (более 3-х символов).</span>
                    </div>
                    <div class="form-group" :class="{ 'has-error': password.hasError }">
                        <label class="control-label" for="signin__pass">Password</label>
                        <input
                                v-model="password.value"
                                id="signin__pass"
                                class="form-control"
                                type="password"
                                placeholder="Пароль">
                        <span class="help-block" v-if="password.hasError">Требуется указать пароль (более 5-ти символов).</span>
                    </div>
                    <button
                            class="btn btn-primary"
                            @click="sendSignInForm"
                            type="submit">Sign In</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'SignIn',
        data() {
            return {
                name: {
                    value: '',
                    hasError: false
                },
                password: {
                    value: '',
                    hasError: false
                }
            }
        },
        methods: {
            sendSignInForm() {
                if (this.checkForm()) {
                    this.$store.dispatch('signIn', { username: this.name.value, password: this.password.value })
                }
            },
            checkForm() {
                if (this.name.value.length < 3) {
                    this.name.hasError = true;
                } else {
                    this.name.hasError = false;
                }
    
                if (this.password.value.length < 5) {
                    this.password.hasError = true;
                } else {
                    this.password.hasError = false;
                }
        
                return !this.name.hasError && !this.password.hasError;
            }
        }
    }
</script>
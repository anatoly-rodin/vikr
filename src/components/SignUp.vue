<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1 style="text-align:center;">Sign Up</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form form-signup" v-on:submit.prevent>
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
                    <div class="form-group" :class="{ 'has-error': email.hasError }">
                        <label class="control-label" for="signin__email">E-mail</label>
                        <input
                                v-model="email.value"
                                id="signin__email"
                                class="form-control"
                                type="text"
                                placeholder="Почта">
                        <span class="help-block" v-if="email.hasError">Не валидный e-mail.</span>
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
                    <div class="form-group" :class="{ 'has-error': password2.hasError }">
                        <label class="control-label" for="signin__pass">Password again</label>
                        <input
                                v-model="password2.value"
                                id="signin__pass2"
                                class="form-control"
                                type="password"
                                placeholder="Еще раз пароль">
                        <span class="help-block" v-if="password2.hasError">Пароли должны совпадать</span>
                    </div>
                    <button
                            class="btn btn-primary"
                            @click="sendSignUpForm"
                            type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Signup",
        data () {
            return {
                name: {
                    value: '',
                    hasError: false
                },
                email: {
                    value: '',
                    hasError: false
                },
                password: {
                    value: '',
                    hasError: false
                },
                password2: {
                    value: '',
                    hasError: false
                }
            }
        },
        watch: {
            name: {
                handler(val) {
                    this.name.value = val.value.trim();
                },
                deep: true
            },
            email: {
                handler(val) {
                    this.email.value = val.value.trim();
                },
                deep: true
            },
            password: {
                handler(val) {
                    this.password.value = val.value.trim();
                },
                deep: true
            },
            password2: {
                handler(val) {
                    this.password2.value = val.value.trim();
                },
                deep: true
            }
        },
        methods: {
            sendSignUpForm(e) {
                e.preventDefault();
                this.checkForm() ?
                    this.$store.dispatch('signUp', { name: this.name.value, email: this.email.value, password: this.password.value }) : '';
            },
            checkForm() {
                (this.name.value.length < 3) ?
                    this.name.hasError = true :
                    this.name.hasError = false;
                
                (!(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(this.email.value)) ?
                    this.email.hasError = true :
                    this.email.hasError = false;
        
                (this.password.value.length < 5) ?
                    this.password.hasError = true :
                    this.password.hasError = false;
    
                (this.password.value !== this.password2.value) ?
                    this.password2.hasError = true :
                    this.password2.hasError = false;
        
                return !this.name.hasError && !this.email.hasError && !this.password.hasError && !this.password2.hasError;
            }
        }
    }
</script>
<template>
    <view class="cu-form-group" :class="className" :style=style >
        <view class="title">{{ term}}</view>
        <input :placeholder="place" :name="name" :value="value" v-bind:input="value" v-on:input="$emit('input', $event.target.value)"></input>
    </view>
</template>

<script>
    export default {
        name: "uni-cuinput",
        model: {
            prop: 'value',
            event: 'test'
        },
        data(){
          return{
              test: {
                 "background-color": "red"
              }
          }
        },
        props: {
            term: {
                type: String,
                default: ''
            },
            place: {
                type: String,
                default: '请输入'
            },
            name: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: ''
            },
            // 暂时必须是字符串类型
            style: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style>
    .cu-form-group .title {
        min-width: calc(4em + 15px);
    }
</style>

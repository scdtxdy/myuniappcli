<template>
    <view>
        <cu-custom bgColor="bg-gradual-pink" :isBack="false">
            <block slot="backText">返回</block>
            <block slot="content">首页</block>
        </cu-custom>
        <!-- :rules="rules" -->
        <uni-forms v-model="formData" ref="form" validate-trigger="bind" @submit="submit" err-show-type="undertext" @validate="validate">
            <uni-group title="基本信息">
                <uni-forms-item required name="name" label="用户名">
                    <input type="text" v-model="formData.name" class="uni-input-border" placeholder="请输入用户名" @input="binddata('name',$event.detail.value)">
                </uni-forms-item>
                <uni-forms-item required name="age" label="年龄">
                    <input type="text" :value="formData.age" class="uni-input-border" placeholder="请输入年龄" @input="binddata('age',$event.detail.value)">
                </uni-forms-item>
                <uni-forms-item required name="email" label="邮箱">
                    <input type="text" :value="formData.email" class="uni-input-border" placeholder="请输入邮箱" @blur="binddata('email',$event.detail.value)">
                </uni-forms-item>
                <uni-forms-item label="详细信息">
                    <switch :checked="formData.checked" @change="change" />
                </uni-forms-item>
            </uni-group>
            <template v-if="formData.checked">
                <uni-group title="详细信息">
                    <uni-forms-item required name="sex" label="性别">
                        <radio-group @change="binddata('sex',$event.detail.value)">
                            <label class="label-box">
                                <radio class="transform-scale" :checked="formData.sex === '0'" value="0" /><text>男</text>
                            </label>
                            <label class="label-box">
                                <radio class="transform-scale" :checked="formData.sex === '1'" value="1" /><text>女</text>
                            </label>
                        </radio-group>
                    </uni-forms-item>
                    <uni-forms-item required name="hobby" label="兴趣爱好">
                        <checkbox-group @change="binddata('hobby',$event.detail.value)">
                            <label class="label-box" v-for="item in hobby" :key="item.value">
                                <checkbox class="transform-scale" :checked="formData.hobby.indexOf(item.value) !== -1" :value="item.value" /><text>{{item.name}}</text>
                            </label>

                        </checkbox-group>
                    </uni-forms-item>
                    <uni-forms-item name="remarks" label="备注">
                        <textarea type="text" v-model="formData.remarks" :maxlength="50" class="uni-textarea-border" placeholder="请输入备注" @input="binddata('remarks',$event.detail.value)"></textarea>
                    </uni-forms-item>
                </uni-group>

            </template>

            <!-- 直接使用组件自带submit、reset 方法，小程序不生效 -->
            <!-- <button class="button" form-type="submit">Submit</button>-->
            <button class="button" @click="reset('form')">Reset</button>
            <view class="example">
                <button class="button" @click="submitForm('form')">校验表单</button>
                <button class="button" @click="validateField('form')">只校验用户名和邮箱项</button>
                <button class="button" @click="clearValidate('form','name')">移除用户名的校验结果</button>
                <button class="button" @click="clearValidate('form')">移除全部表单校验结果</button>
            </view>
        </uni-forms>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    name: '',
                    age: '',
                    email: "",
                    sex: '',
                    hobby: [],
                    remarks: "",
                    checked: false
                },
                hobby: [{
                    name: '足球',
                    value: "0"
                }, {
                    name: '篮球',
                    value: "1"
                }, {
                    name: '游泳',
                    value: "2"
                }],
                show: false,
                rules: {
                    name: {
                        rules: [{
                            // required: true,
                            errorMessage: '请输入用户名',
                        }, {
                            minLength: 3,
                            maxLength: 15,
                            errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
                        }]
                    },
                    age: {
                        rules: [{
                            required: true,
                            errorMessage: '请填写年龄',
                        }, {
                            format: 'number',
                            errorMessage: '年龄必须是数字',
                        }, {
                            minimum: 18,
                            maximum: 30,
                            errorMessage: '年龄应该大于 {minimum} 岁，小于 {maximum} 岁',
                        }]
                    },
                    email: {
                        rules: [{
                            format: 'email',
                            errorMessage: '请输入正确的邮箱地址',
                            trigger: 'blur'
                        }]
                    },
                    sex: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择性别',
                            trigger: "blur"
                        }]
                    },
                    hobby: {
                        rules: [{
                            required: true,
                            errorMessage: '请选择兴趣',
                            trigger: "blur"
                        }, {
                            validateFunction: function(rule, value, data, callback) {
                                if (value.length < 2) {
                                    callback(new Error('请至少勾选两个兴趣爱好'))
                                }
                                return true
                            }
                        }]
                    }
                }
            }
        },
        methods: {
            change(event) {
                this.formData.checked = event.detail.value
            },

            /**
             * 触发校验
             * @param {Object} event
             */
            validate(event) {
                // TODO 返回校验结果
                // console.log('触发校验：', event);
            },

            /**
             * 表单提交
             * @param {Object} event
             */
            submit(event) {
                const {
                    errors,
                    value
                } = event.detail
                if (errors) {
                    console.error('验证失败', errors);
                    return
                }
                uni.showToast({
                    title: '验证成功'
                })
                console.log("表单的值:", value);
            },

            /**
             * 手动提交
             * @param {Object} form
             */
            submitForm(form) {
                this.$refs[form].submit()
            },

            reset(form){
                this.formData = {name: '',
                    age: '',
                    email: "",
                    sex: '',
                    hobby: [],
                    remarks: "",
                    checked: true}
            },
            /**
             * 部分表单校验
             * @param {Object} form
             */
            validateField(form) {
                this.$refs[form].validateField(['name', 'email'], (errors) => {
                    console.log(errors);
                    if (errors) {
                        uni.showToast({
                            title: '验证成功'
                        })
                    }
                })
            },

            /**
             * 清除表单校验
             * @param {Object} form
             * @param {Object} name
             */
            clearValidate(form, name) {
                if (!name) name = []
                this.$refs[form].clearValidate(name)
            }
        },
        onLoad() {
            uni.showLoading()
            // this.formData 应该包含所有需要校验的表单
            // 模拟异步请求数据
            setTimeout(() => {

                this.formData = {
                    name: 'LiMing',
                    age: 1,
                    email: "",
                    sex: '',
                    hobby: ['0', '2'],
                    remarks: "热爱学习，热爱生活",
                    checked: true
                }

                uni.hideLoading()
            }, 1000)
        },
        onReady() {
            this.$refs.form.setRules(this.rules)
        }
    }
</script>

<style lang="scss">
    view {
        font-size: 14px;
        line-height: inherit;
    }

    .example {
        padding: 0 15px 15px;
    }

    .example-info {
        padding: 15px;
        color: #3b4144;
        background: #ffffff;
    }

    .example-body {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0;
        font-size: 14px;
        background-color: #ffffff;
    }

    /* #endif */
    .example {
        padding: 0 15px;
    }

    .example-info {
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        padding: 15px;
        color: #3b4144;
        background-color: #ffffff;
        font-size: 14px;
        line-height: 20px;
    }

    .example-info-text {
        font-size: 14px;
        line-height: 20px;
        color: #3b4144;
    }

    .example-body {
        flex-direction: column;
        padding: 15px;
        background-color: #ffffff;
    }

    .word-btn-white {
        font-size: 18px;
        color: #FFFFFF;
    }

    .word-btn {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        height: 48px;
        margin: 15px;
        background-color: #007AFF;
    }

    .word-btn--hover {
        background-color: #4ca2ff;
    }

    .example {
        padding: 0 10px 10px;
    }

    .uni-input-border,
    .uni-textarea-border {
        width: 100%;
        font-size: 14px;
        color: #666;
        border: 1px #e5e5e5 solid;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .uni-input-border {
        padding: 0 10px;
        height: 35px;
    }

    .uni-textarea-border {
        padding: 10px;
        height: 80px;
    }

    .label-box {
        margin-right: 10px;
    }

    .transform-scale {
        transform: scale(0.7);
    }

    .button {
        margin: 10px auto;
    }
</style>

<template>
	<div class="login">
		<i @click="goback" class="el-icon-arrow-left lgReturn"></i>
		<h2 class="lgTitle">外卖App</h2>
		<div class="lgLoginWay">
			<span :class="{loginOn:loginWay}" @click="loginWay = true">短信登录</span>
			<span :class="{loginOn:!loginWay}" @click="loginWay = false">密码登录</span>
		</div>

		<div class="lgLoginText" v-show="loginWay">
			<input type="number" value="" placeholder="手机号" v-model="phone">
			<a href="#" :class="{isPnt:isPress && codeIsP}" @click="getCode">
				{{codeTime <= 0 ? '获取验证码' : codeTime + 's后可再次获取'}}
			</a>
			<input type="text" value="" placeholder="验证码" v-model="code" />
			<p>
				温馨提示: 未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意<a href="#">《用户服务协议》</a>
			</p>
		</div>

		<div class="lgLoginText" v-show="!loginWay">
			<input type="text" v-model="name" placeholder="账号">
			<input type="password" maxlength="8" v-if="isPassWordHind" v-model="pwd" placeholder="密码" />
			<input type="text" maxlength="8" v-else v-model="pwd" placeholder="密码" />
			<el-switch v-model="isPassWordHind" active-color="#13ce66" inactive-color="#07bdff"
				class='lgSwitch'>
			</el-switch>
			<input type="text" v-model="captcha" placeholder="验证码" />
			<img @click="updateCode" ref="Captcha"  src="http://localhost:4000/captcha">
		</div>

		<button class="btn-login" type="button" @click="enter">登录</button>
		<a href="#">关于我们</a>
	</div>
</template>

<script>
	import {login_pwd,sendcode,login_sms} from '../../api/getData.js'
	
	export default {
		name: 'Login',
		data() {
			return {
				loginWay: true, //true为短信登录，false为密码登录
				isPassWordHind: true, //是否隐藏密码，true隐藏
				phone: '', //手机号码
				code: '', //短信登录验证码
				codeTime: 0, //获取验证码时间
				codeIsP: true, //获取验证码是否能点
				pwd: '', //密码
				name: '', //账号
				captcha: '' //密码登录验证码
			}
		},
		methods: {
			goback() {
				this.$router.back()
			},
			async getCode() {
				// 获取验证码
				if (this.codeTime > 0) return//执行中点击无效
				
				this.codeTime = 30
				// 是否能点
				this.codeIsP = false
				
				let setTime = setInterval(() => {
					if (this.codeTime <= 0) {
						clearInterval(setTime)
						this.codeIsP = true
					}
					this.codeTime--
				}, 1000)
				
				// 发送请求,向指定手机号发送验证码
				const result = await sendcode(this.phone)
				
				// 请求失败 成功code ==0 失败code==1
				if(result.data.code === 1){
					// 短信
					this.$alert(result.data.msg, '提醒', {
						confirmButtonText: '确定'
					});
					
					// 关闭定时器
					if(this.codeTime){
						this.codeTime = 0
						clearInterval(setTime)
						setTime = undefined
						this.codeIsP = true
					}
				}
			},
			// 登录
			async enter() {
				const {
					loginWay,
					phone,
					code,
					isPress,
					pwd,
					name,
					captcha,
					$alert,
				} = this
				let userLogin
				
				if (loginWay) {
					// 短信登录 失败
					if (!isPress) {
						// 手机号不正确
						$alert('手机号不正确', '提醒', {
							confirmButtonText: '确定'
						});
						return
					} else if (!/^\d{6}$/.test(code)) {
						// 验证码不正确
						$alert('验证码不正确', '提醒', {
							confirmButtonText: '确定'
						});
						return
					}
					
					// 发送异步请求,手机号登录
					userLogin = await login_sms({phone,code})
					
				} else {
					// 密码登录 失败
					if (!name) {
						// 不能为空
						$alert('用户名为空，用户名只能英文开头', '提醒', {
							confirmButtonText: '确定'
						});
						return
					} else if (!pwd) {
						// 密码不能为空
						$alert('密码不能为空', '提醒', {
							confirmButtonText: '确定'
						});
						return
					} else if (!/^[a-zA-Z0-9]{4}$/.test(captcha)) {
						//验证码
						$alert('验证码不能少于4位', '提醒', {
							confirmButtonText: '确定'
						});
						return
					}
					
					// 发送异步请求,密码登录
					userLogin = await login_pwd({name,pwd,captcha})
				}
				
				// 请求成功的code为0
				if(userLogin.data.code === 0){
					let user = userLogin.data.data
					// 成功去到个人中心
					this.$router.replace('/profile')
					// 将数据存到state
					this.$store.dispatch('getUser',{user})
				}else{
					$alert(userLogin.data.msg, '提醒', {
							confirmButtonText: '确定'
					});
					this.updateCode()
				}
			},
			// 更新图形验证码
			updateCode(){
				// 重新赋值一下src,结构内容不变不反应,更改参数即可
				this.$refs.Captcha.src = 'http://localhost:4000/captcha?time=' + Date.now() 
			}
			
			
		},
		computed: {
			isPress() {
				// 验证手机号是否正确
				return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
			}
		}
	}
</script>

<style>
	.login {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.lgReturn {
		position: absolute;
		left: 6px;
		top: 6px;
		font-size: 1.4rem;
		cursor: pointer;
	}

	.lgTitle {
		color: #009472;
		font-size: 2.1rem;
		margin-top: 50px;
	}

	.lgLoginWay {
		margin-bottom: 8px;
	}

	.lgLoginWay span {
		margin: 0 20px;
		cursor: pointer;
	}

	.loginOn {
		color: #009472;
		font-weight: 600;
		padding-bottom: 2px;
		border-bottom: 2px solid #009472;
	}

	.lgLoginText {
		position: relative;
		text-align: center;
		width: 100%;
	}

	.lgLoginText input {
		display: inline-block;
		width: 60%;
		height: 30px;
		border: 1px solid #F4F4F4;
		outline-style: none;
		margin: 6px 0;
		padding: 4px;
		transition: all .5s;
		appearance: textfield;
	}

	.lgLoginText input:hover,
	.lgLoginText input:focus {
		border-color: #018F72;
	}

	/* 去除number的基本样式 */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	/*获取验证码 */
	/* 不可使用 */
	.lgLoginText>a {
		position: absolute;
		right: 20%;
		top: 9%;
		z-index: 99;
		color: #c8c8c8;
		pointer-events: none;
	}

	/* 可使用 */
	.lgLoginText .isPnt {
		color: #757575;
		cursor: pointer;
		pointer-events: auto
	}

	.lgLoginText .isPnt:hover {
		color: #55aa00;
	}

	/* 账号输入框 */
	.lgLoginText>p {
		display: inline-block;
		font-size: .8rem;
		color: #BABABA;
		font-weight: 600;
		width: 40%;
	}

	.lgLoginText>p>a {
		color: #3A9E87;
	}

	/* 密码 */
	.lgLoginText>img {
		position: absolute;
		width: 100px;
		height: 30px;
		top: 74%;
		right: 20%;
		z-index: 99;
		cursor: pointer;
	}

	.lgLoginText .lgSwitch {
		position: absolute;
		top: 43%;
		right: 20%;
	}

	.btn-login {
		border: none;
		background-color: #42C56C;
		color: white;
		width: 60%;
		height: 30px;
		margin: 10px 0;
	}

	.btn-login:hover {
		background-color: #3bb361;
	}

	.login>a {
		font-size: .2rem;
		color: #BABABA;
	}
</style>

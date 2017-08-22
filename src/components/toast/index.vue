<template>
	<div class="toast">
		<i class="btn-close" @click="$modal.hide(name)"></i>
		<p>
			<slot></slot>
		</p>
	</div>
</template>

<script>
export default {

  name: 'index',

  props: {
  	name: String
  },

  created () {
  	setTimeout(() => {
  		this.$modal.hide(this.name);
  	}, 2500);
  }
};
</script>

<style lang="scss" scoped rel="stylesheet/scss">
	@import '../../scss/index.scss';
	.toast{
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		
		p{
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 15px;
			line-height: 1.4;
			box-sizing: border-box;
			text-align: center;
			color: #fff;
		}

		.btn-close{
			float: right;
			margin: 10px;
		}
	}
</style>
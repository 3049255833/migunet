<template>
	<modal :name="name" :width="width" class="m-modal">
		<div class="modal-sub-container">
			<div class="title">
				<h2>{{title||'标题'}}</h2>
				<i class="btn-close" @click="closeModal"></i>
			</div>
			<div class="content">
				<slot></slot>
			</div>
		</div>
	</modal>
</template>

<script>
export default {

  name: 'index',

  props: {
  	title: String,
  	name: String,
  	width: Number,
  	height: Number
  },

  methods: {
  	closeModal () {
  		this.$modal.hide(this.name);
  	}
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.m-modal{
		.v--modal-box{
			height: auto !important;
			top: 50% !important;
			transform: translateY(-50%);
			overflow: auto !important;
		}
	}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
	$parent-bg-color: rgba(0, 0, 0, 0.5);
	$title-bg-color: #4d4c50;
	$title-txt-color: #fff;
	$title-height: 40px;
	$container-bg-color: #fff;
	$min-width: 350px;
	$min-height: 180px;
	$padding: 15px;
	$border-radius-width: 5px;


	.modal-sub-container{
		width: 100%;
		height: 100%;

		.title{
			position: relative;
			width: 100%;
			height: $title-height;
			background-color: $title-bg-color;
			border-radius: $border-radius-width $border-radius-width 0 0;
			h2{
				color: $title-txt-color;
				line-height: $title-height;
				text-indent: 10px;
				font-size: 14px;
			}
			.btn-close{
				position: absolute;
				top: 14px;
				right: 12px;
			}
		}

		.content{
			min-width: $min-width - $padding*2;
			max-height: 400px;
			background-color: $container-bg-color;
			overflow: auto;
		}
	}
</style>
<template>
	<div class="modal-sub-container">
		<div class="title">
			<h2>{{title||'标题'}}</h2>
			<i class="btn-close" @click="closeModal"></i>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {

  name: 'index',

  props: {
  	title: String,
  	name: String 
  },

  methods: {
  	closeModal () {
  		this.bus.$emit('canHideModal',true);
  		this.$modal.hide(this.name);
  	}
  },

  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped rel="stylesheet/scss">
	$parent-bg-color: rgba(0, 0, 0, 0.5);
	$title-bg-color: white;
	$title-txt-color: #333;
	$title-height: 57px;
	$container-bg-color: #fff;
	$min-width: 350px;
	$min-height: 180px;
	$padding: 15px;
	$border-radius-width: 5px;
	div.modal-sub-container{
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
				font-size: 14px;
                margin: 0 30px;
                border-bottom: 1px solid #f0f0f0;
			}
			.btn-close{
				position: absolute;
				top: 20px;
				right: 33px;
                width: 15px;
                height: 15px;
                background: url('./btn-close.png') no-repeat;
                cursor: pointer;
			}
		}

		

		.content{
			min-width: $min-width - $padding*2;
			background-color: $container-bg-color;
		}
	}
</style>
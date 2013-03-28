/**
 * @author:   tony
 * @version:  v1.0.0
 * @license:  MIT
 * @name:     tPage分页插件
 */
var tPage;
(function($){
	tPage = function(obj, options){
		this.options = $.extend({}, this.defaults, options);
		this.options.pageCount = Math.ceil(this.options.pageLimit/this.options.pageOne);
		this.$pageBox = obj;
		this.init(this.options);
		return this;
	};
	
	// 定义公用的初始值
	tPage.prototype.defaults = {
		pageId: null, // page外框的id;
		pageOne: 10, // 每页显示几条数据;
		pageLimit: 1, // 一共有多少条数据;
		pageCount: 1, // 一共有多少页;
		pageCur: 1, // 当前页码;
		pageJson: {}, // 分页的相关数据(json);
		pageJson_textName: 'text', // 数据中对于text字段的描述文字;
		pageJson_hrefName: 'href', // 数据中对于href字段的描述文字;
		pageEvent: function(){}, // 翻页触发的事件;
		pageEventInit: false, // 加载翻页插件时执行回调函数，默认为关闭
		pageAttr: 'pageto' // 用于在html中储存相关的跳页数据;	
	};
	
	// 定义公用的初始值
	tPage.prototype.init = function(options){
		this.$prev = $('<a href="javascript:void(0);" class="page-prev"><span>上一页</span></a>')
					.attr(options.pageAttr, ((options.pageCur-1)<=0)?1:(options.pageCur-1));
		this.$content = $('<span>');
		this.$next = $('<a class="page-next" href="javascript:void(0);"><span>下一页</span></a>')
					.attr(options.pageAttr, ((options.pageCur+1)<=options.pageCount)?(options.pageCur+1):options.pageCount);
		this.$skip = $('<span class="page-skip"></span>');
		//this.$skipForm = $('<form>');
		this.$skipWords = $('<em>').text(options.pageCount);
		this.$skipInput = $('<input type="text" title="输入页码" value="" />');
		this.$skipSubmit = $('<button title="指定页码" type="submit">确定</button>');
		this.$skip.append('共', this.$skipWords, '页到第', this.$skipInput, '页', this.$skipSubmit);
		//this.$skip.append(this.$skipForm);
		this.$pageBox.append(this.$prev, this.$content, this.$next, this.$skip);
		this.go(options.pageCur);
		this.options.pageEventInit = true;
		var plugin = this;
		this.$pageBox.find('a').die('click')
							   .live('click', function(){
								   var pageto = parseInt($(this).attr(options.pageAttr));
								   if(!pageto){return;}
								   plugin.go(pageto);
							   });
		this.$skipSubmit.unbind('click')
						.bind('click', function(){
							var pageto = parseInt(plugin.$skipInput[0].value);
							if(pageto == parseInt(plugin.options.pageCur)){return;}
							plugin.go(pageto);
						});
		this.$skipInput.unbind('.page')
						.bind('propertychange.page input.page keydown.page', function(){
							this.value = this.value.replace(/[^\d.]/g,"");
						});
	};
	
	// 跳页
	tPage.prototype.go = function(pageto){
		var count = parseInt(this.options.pageCount);
		pageto = parseInt(pageto);
		pageto = (pageto<=0) ? 1 : pageto;
		pageto = (count<=pageto) ? count : pageto;
		if(pageto){
			this.options.pageCur = pageto;
		}
		this.setContent(this.options);
		if($.isFunction(this.options.pageEvent) && this.options.pageEventInit){
			this.options.pageEvent.call(this);
		}
	};
	
	// 重置'显示/隐藏'与'禁用/激活'按钮
	tPage.prototype.reset = function(options){
		this.$prev.removeClass('prev-no').attr(options.pageAttr, null);
		this.$next.removeClass('next-no').attr(options.pageAttr, null);
		this.$content.html('');
	};
	
	tPage.prototype.setContentArray = function(s, e, c){
		var tmp = [];
		for(var k=s; k<=e; k++){
			if(k == c){
				tmp.push('<strong class="page-cur">'+ k +'</strong>');
			}else{
				tmp.push('<a href="javascript:void(0);" '+ this.options.pageAttr +'="'+ k +'">'+ k +'</a>');
			}
		}
		return tmp;
	};

	// 生成分页的内容
	tPage.prototype.setContent = function(options){
		this.reset(options); // 分页状况reset
		var cur = parseInt(options.pageCur),
			count = parseInt(options.pageCount),
			start = cur-2,
			end = cur+2,
			contentArray = [];
		end = ((count - end)<=0) ? count : ((end-5)<0) ? 5 : end;
		start = (start<=0) ? 1 : (end-start<5) ? (end-4) : start;
		if(cur == 1){
			this.$prev.addClass('prev-no');
		}else{
			this.$prev.attr(options.pageAttr, cur-1);
		}		
		if(count<10){ // 如果页面数小于10页，全部显示
			contentArray = this.setContentArray(1, count, cur);
		}else{ // 如果页面数大于10页，按规则显示
			if(cur-6<0){
				contentArray = $.merge(contentArray, this.setContentArray(1, end, cur));
			}else{
				contentArray.push('<a href="javascript:void(0);" '+ options.pageAttr +'="1">1</a>');
				contentArray.push('<span class="page-break">...</span>');
				contentArray = $.merge(contentArray, this.setContentArray(start, end, cur));
			}
			if(cur+4-count<0){
				contentArray.push('<span class="page-break">...</span>');
				contentArray.push('<a href="javascript:void(0);" '+ options.pageAttr +'="'+ count +'">'+ count +'</a>');
			}else{
				contentArray = $.merge(contentArray, this.setContentArray(end+1, count, cur));
			}
		}		
		var contentHTML = contentArray.join('\n');
		this.$content.html(contentHTML);
		if(cur == count){
			this.$next.addClass('next-no');
			this.$skipInput[0].value = cur;
		}else{
			this.$next.attr(options.pageAttr, (cur+1));
			this.$skipInput[0].value = (cur+1);
		}			
	};
	
	// jQuery插件形式，快捷调用
	$.fn.tPage = function(options){
		new tPage($(this), options);
	};
})(jQuery);
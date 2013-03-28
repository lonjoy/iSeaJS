/**
 * $.fn.tWordCount 字数统计插件
 * @author tony
 */
;(function($){
	$.fn.tWordCount = function(options){
		var opts = $.extend({}, $.fn.tWordCount.defaultSettings, options || {});

		var limit = opts['limit'],
			counthtml = opts['template'].replace('%m', limit),
			countstyle = opts['countstyle'],
			initKey = opts['initKey'];
		var eventCommon = opts['callbacks']['common'],
			eventCrisis = opts['callbacks']['crisis'];

		return $(this).each(function(){
			var $elem = $(this),
				$count = opts['count'];
			if(!$count.length){return;}

			var checkCount = function (){
				var _tmp = $elem.val(),
					_length = _tmp.length;
				// callbacks['common']
				eventCommon.call($count[0]);
				if(countstyle==1){
					var _count = _length;
					if(limit<_count){
						$elem.val(_tmp.substring(0, limit));
						_count = limit;
						// callbacks['crisis']
						eventCrisis.call($count[0]);
					}
				}else{
					var _count = limit - _length;
					if(_count<0){
						$elem.val(_tmp.substring(0, limit));
						_count = 0;
						// callbacks['crisis']
						eventCrisis.call($count[0]);
					}
				}
				var _html = counthtml.replace('%n', _count);
				$count.html(_html);
			}
			// 默认加载一次
			if(initKey){
				setTimeout(checkCount, 100);
			}
			// 绑定即时监控事件
			// onpropertychange 这个事件是IE专用的，可以监控文本框的值是否改变（过在IE9下这个事件只能监控增加的内容而不能监控删除的内容）
			// oninput 这个事件是专门针对非IE浏览器的，效果和 onpropertychange 是一样的
			// onkeydown这个事件是为了解决onpropertychange 在IE9下存在的那个问题的
			$elem.die('.twc').live('propertychange.twc input.twc keydown.twc', checkCount);
		});		
	};
	$.fn.tWordCount.defaultSettings = {
		// 字数统计的jQuery对象
		count: null,
		// 字数的上限
		limit: 100,
		// 字数显示的模版
		template: '%n/%m',
		// 显示字数的模式，1为正数，-1为倒数
		countstyle: 1,
		// 插件初始化时，是否需要开始统计字数
		initKey: false,
		// callbacks 回调函数集合 this默认指向count(字数统计的jQuery对象)
		callbacks: {
			// 每次都执行的回调函数
			'common': function(){},
			// 达到临界值时执行的回调函数
			'crisis': function(){}
		}
	};
})(jQuery);

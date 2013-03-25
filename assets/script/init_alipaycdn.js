/**
 * SeaJS Config
 * v1.3.0
 * https://github.com/seajs/seajs/issues/262
 */
seajs.config({
	// 当模块标识很长时，可以使用 alias 配置来简化。
	alias : {
		// arale
		'baseDialog': 'arale/dialog/0.9.2/base-dialog'
		
		// gallery
		,'async': 'gallery/async/0.1.23/async.js'
		,'backbone': 'gallery/backbone/0.9.9/backbone.js'
		,'coffee': 'gallery/coffee/1.4.0/coffee-script.js'
		,'cookie': 'gallery/cookie/1.0.2/cookie.js'
		,'expect': 'gallery/expect/0.2.0/expect.js'
		,'handlebars': 'gallery/handlebars/1.0.0/handlebars.js'
		,'html5shiv': 'gallery/html5shiv/3.6.1/html5shiv.js'
		,'impress': 'gallery/impress/0.5.3/impress.js'
		,'iscroll': 'gallery/iscroll/4.2.5/iscroll.js'
		,'json': 'gallery/json/1.0.2/json.js'
		,'jquery': 'gallery/jquery/1.8.2/jquery.js'
		,'jquery-color': 'gallery/jquery-color/2.1.1/jquery-color.js'
		,'jsuri': 'gallery/jsuri/1.2.2/jsuri.js'
		,'juicer': 'gallery/juicer/0.6.4/juicer.js'
		,'keymaster': 'gallery/keymaster/1.0.2/keymaster.js'
		,'less': 'gallery/less/1.3.1/less.js'
		,'marked': 'gallery/marked/0.2.6/marked.js'
		//,'mocha': 'gallery/mocha/1.8.1/mocha.js'
		,'moment': 'gallery/moment/1.7.2/moment.js'
		//,'morris': 'gallery/morris/0.4.1/morris.js'
		,'mustache': 'gallery/mustache/0.7.0/mustache.js'
		,'raphael': 'gallery/raphael/2.1.0/raphael.js'
		,'scrollmonitor': 'gallery/scrollmonitor/1.0.0/scrollMonitor.js'
		,'selection': 'gallery/selection/0.9.0/selection.js'
		,'sinon': 'gallery/sinon/1.6.0/sinon.js'
		,'socketio': 'gallery/socketio/0.9.11/socketio.js'
		,'store': 'gallery/store/1.3.6/store.js'
		,'swfobject': 'gallery/swfobject/2.3.0/swfobject.js'
		,'underscore': 'gallery/underscore/1.4.4/underscore.js'
		,'zepto': 'gallery/zepto/1.0.1/zepto.js'
		,'zeroclipboard': 'gallery/zeroclipboard/1.1.6/zeroclipboard.js'
		,'ztree': 'gallery/ztree/3.5.2/ztree.js'
		
		// eagle
		//,'SWFUpload': 'gallery/swfupload/2.2.0/swfupload'
		//,'DD_belatedPNG': 'gallery/DD_belatedPNG/0.0.8a/DD_belatedPNG'
		//,'artDialog': 'gallery/artDialog/5.0.2/artDialog'		
	}

	// SeaJS 在解析顶级标识时，会相对 base 路径来解析。
	//  ,base: ''
	// 使用 preload 配置项，可以在普通模块加载前，提前加载并初始化好指定模块。
	,preload : [
	    Function.prototype.bind ? '' : 'es5-safe',
	    this.JSON ? '' : 'json',
	    this.jquery ? '' : 'jquery'
	]

	// 值为 true 时，加载器会使用 console.log 输出所有错误和调试信息。 默认为 false, 只输出关键信息。
	// 另外，还可以将 debug 值设为 2 . 这种情况下， 每个脚本请求都会加上唯一时间戳。这在测试期间很有用，可以强制浏览器每次都请求最新版本，免去 Ctrl + F5 之烦恼。
	// ,debug: true

	// 该配置可将某个文件映射到另一个。可用于在线调试，非常方便。
	//  ,map: [
	//    ['http://example.com/js/app/', 'http://localhost/js/app/']
	//  ]

	// 获取模块文件时，<script> 或 <link> 标签的 charset 属性。 默认是 utf-8 。
	//  ,charset: 'utf-8'
});
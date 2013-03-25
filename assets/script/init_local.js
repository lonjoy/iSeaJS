/**
 * SeaJS Config
 * localhost
 */

seajs.config({
	// 当模块标识很长时，可以使用 alias 配置来简化。
	alias : {
		// arale
		"calendar": "arale/calendar/0.8.4/calendar"
	    ,"fixed": "arale/fixed/1.0.1/fixed"
	    ,"autocomplete": "arale/autocomplete/1.2.0/autocomplete"
	    ,"base": "arale/base/1.0.1/base"
	    ,"class": "arale/class/1.0.0/class"
	    ,"color": "arale/color/1.0.0/color"
	    ,"cookie": "gallery/cookie/1.0.2/cookie"
	    ,"dialog": "arale/dialog/1.0.0/dialog"
	    ,"easing": "arale/easing/1.0.0/easing"
	    ,"events": "arale/events/1.0.0/events"
	    ,"iframe-shim": "arale/iframe-shim/1.0.0/iframe-shim"
	    ,"messenger": "arale/messenger/1.0.2/messenger"
	    ,"overlay": "arale/overlay/1.0.0/overlay"
	    ,"popup": "arale/popup/1.0.1/popup"
	    ,"position": "arale/position/1.0.0/position"
	    ,"select": "arale/select/0.9.0/select"
	    ,"switchable": "arale/switchable/0.9.12/switchable"
	    ,"tip": "arale/tip/1.1.0/tip"
	    ,"validator": "arale/validator/0.9.1/validator"
	    ,"placeholder": "arale/placeholder/1.0.1/placeholder"
	    ,"widget": "arale/widget/1.0.3/widget"
	    ,"iframe-uploader": "arale/iframe-uploader/0.9.1/iframe-uploader"
	    ,"event-simulate": "arale/event-simulate/1.0.0/event-simulate"
	    ,"uploadpic": "arale/uploadpic/1.0.0/uploadpic"
	    
	    // gallery
	    ,"jquery": "gallery/jquery/1.8.3/jquery"
	    ,"backbone": "gallery/backbone/0.9.9/backbone"
	    ,"mustache": "gallery/mustache/0.7.0/mustache"
	    ,"store": "gallery/store/1.3.6/store"
	    ,"marked": "gallery/marked/0.2.6/marked"
	    ,"raphael": "gallery/raphael/2.1.0/raphael"
	    ,"async": "gallery/async/0.1.23/async"
	    ,"socketio": "gallery/socketio/0.9.11/socketio"
	    ,"ztree": "gallery/ztree/3.5.2/ztree"
	    ,"handlebars": "gallery/handlebars/1.0.0/handlebars"
	    ,"iscroll": "gallery/iscroll/4.2.5/iscroll"
	    ,"less": "gallery/less/1.3.1/less"
	    ,"zepto": "gallery/zepto/1.0.1/zepto"
	    ,"underscore": "gallery/underscore/1.4.4/underscore"
	    ,"keymaster": "gallery/keymaster/1.0.2/keymaster"
	    ,"swfobject": "gallery/swfobject/2.3.0/swfobject"
	    ,"jquery-color": "gallery/jquery-color/2.1.1/jquery-color"
	    ,"moment": "gallery/moment/1.7.2/moment"
	    ,"html5shiv": "gallery/html5shiv/3.6.1/html5shiv"
	    ,"expect": "gallery/expect/0.2.0/expect"
	    ,"jsuri": "gallery/jsuri/1.2.2/jsuri"
	    ,"selection": "gallery/selection/0.9.0/selection"
	    ,"impress": "gallery/impress/0.5.3/impress"
	    ,"mocha": "gallery/mocha/1.8.1/mocha"
	    ,"juicer": "gallery/juicer/0.6.4/juicer"
	    ,"coffee": "gallery/coffee/1.4.0/coffee"
	    ,"zeroclipboard": "gallery/zeroclipboard/1.1.6/zeroclipboard"
	    ,"scrollmonitor": "gallery/scrollmonitor/1.0.0/scrollmonitor"
	    ,"sinon": "gallery/sinon/1.6.0/sinon"
	    ,"morris": "gallery/morris/0.4.1/morris"
	    ,"json": "gallery/json/1.0.3/json"
	}

	// 使用 preload 配置项，可以在普通模块加载前，提前加载并初始化好指定模块。
	,preload : [
		this.JSON ? '' : 'json'
		,this.jquery ? '' : 'jquery'
	]
});

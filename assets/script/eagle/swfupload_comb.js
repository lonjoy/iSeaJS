/**
 *  支持多个上传
 */
define(function(require, exports, module) {

	// 引用jQuery和SWFUpload
	var $ = require('$'),
		SWFUpload = require('SWFUpload');

	// 默认SWFUpload的配置信息
	var SWFUploadComb_config = {

	};

	// 定义公用的SWFUploadComb_elem配置信息
	var SWFUploadComb_elem = {
		'fileId': '',
		'fileName': '',
		'fileSize': '',
		'fileSrc': '',
		'fileUrl': '',
		'fileElem': null
	};
    
    var SWFUploadComb = function (){
    	this.elems = [];
    	this.cloneModel = null;
    }

    // 初始化
    SWFUploadComb.prototype.render = function(){

    }

    // 获取相对应的对象集合
    SWFUploadComb.prototype.getElem = function(id){
    	var plugin = this;
    	if(!id || !plugin.elems.length){
    		return false;
    	}
    	var _elem = null;
    	$.each(this.elems, function(i, n){
    		if(i.fileId === id){
    			_elem = i;
    		}
    	});
    	return _elem;
    }

    // 增加一个Elem
    SWFUploadComb.prototype.addElem = function(){
    }

    // 删除一个Elem
    SWFUploadComb.prototype.delElem = function(){
    }



    module.exports = SWFUploadComb;

});

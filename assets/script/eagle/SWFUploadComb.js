/**
 * SWFUploadComb
 */
define('eagle/SWFUploadComb.js', ['$', 'SWFUpload'], function(require, exports, module) {

  
    // 引用jQuery和SWFUpload
    var $ = require('$'),
        SWFUpload = require('SWFUpload');

    // 默认SWFUpload的配置信息
    var SWFUploadConfig = {
        	flash_url : "../../assets/base/scripts/gallery/swfupload/2.2.0/swfupload.swf",
			//upload_url: "http://127.0.0.1/UP360WebRebulid/UP360FreeMarker/templetes/default/module-model/Demos/upload.php",
			file_post_name: 'file',
			file_size_limit : '2000 MB',
			file_types : '*.*',
			file_types_description : 'All File',
			file_upload_limit : 0,
			file_queue_limit : 1,
			debug: true,
		
            // Button settings
			button_width: "0",
			button_height: "0",
			button_placeholder_id: "",
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,
			button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE
    	};

    var SWFUploadEvents = ['swfupload_loaded_handler','file_queued_handler','file_queue_error_handler','file_dialog_start_handler','file_dialog_complete_handler','upload_start_handler','upload_progress_handler','upload_error_handler','upload_success_handler','upload_complete_handler','queue_complete_handler'];
    // 定义公用的SWFUploadComb_elem配置信息
    var SWFUploadCombElem = {
            'id': '',
            'name': '',
            'size': '',
            'src': '',
            'url': '',
            'obj': null
        };
    
    var SWFUploadComb = function (args){
        this.elems = [];
    }

    // 初始化
    SWFUploadComb.prototype.render = function(id, configs){
        this.addElem(id, configs);
    }

    // 获取相对应的对象集合
    SWFUploadComb.prototype.getElem = function(id){
        var plugin = this;
        if(!id || !plugin.elems.length){
            return null;
        }        
        var _elem = null,
            _index = 0;
        $.each(plugin.elems, function(i, n){
            if(n['id'] === id){
                _elem = n;
                _index = i;
            }
        });
        return {'index':_index, 'elem': _elem};
    }

    // 增加一个Elem
    SWFUploadComb.prototype.addElem = function(id, configs){
        var plugin = this;
        if(!id || ((plugin.elems.length !== 0) && (plugin.getElem(id)['elem'] !== null))){
            return false;
        }
        var thisConfig = $.extend({}, SWFUploadConfig, configs);
        
        var tmpElem = $.extend({}, SWFUploadCombElem, {
                'id': id,
                'obj': new SWFUpload(thisConfig)
            });

        plugin.elems.push(tmpElem);
        
        plugin.onEvent(id, thisConfig);
    }

    // 增加一个Elem
    SWFUploadComb.prototype.onEvent = function(id, configs){
        var plugin = this;
        if(!id || (plugin.elems.length === 0) || (plugin.getElem(id)['elem'] === null)){
            return false;
        }
        var $uploadItem = $('#'+id);
        if(!$uploadItem.length){
            return false;
        }
        var $uploadText = $uploadItem.find('.fn-text').eq(0),
            $uploadSubmit = $uploadItem.find('.fn-submit').eq(0),
            $uploadDel = $uploadItem.find('.fn-del').eq(0),
            $uploadStatus = $uploadItem.find('.fn-status').eq(0);
        $uploadItem
            .on('fileDialogComplete.upload', function(selected, queued){
                if(queued != 0){                        
                    this.startUpload();
                    alert('1');
                }
            })
            .on('uploadStart.upload', function(file){
                $uploadText
                    .val(file.name)
                    .addClass('uploading');
                $uploadSubmit.addClass('disabled');
                uploadTest.getElem(itemId).setButtonDisabled(true);
                $uploadDel.addClass('disabled fn-none');
                $uploadStatus
                    .html(null)
                    .removeClass('fn-none');
                alert('2');
            })
            .on('uploadProgress.upload', function(file, bytesComplete, bytesTotal){
                var _precent = Math.ceil(bytesComplete/bytesTotal*100);
                $uploadStatus.html(_precent+'%');
            })
            .on('uploadError.upload', function(){
                $uploadStatus.html('上传失败了');
            })
            .on('uploadSuccess.upload', function(file, data){
                $uploadStatus.html('上传成功了');
            })
            .on('uploadComplete.upload', function(){
                $uploadStatus.fadeOut(500);
                $uploadSubmit.removeClass('disabled');
                uploadTest.getElem(itemId).setButtonDisabled(false);
                $uploadDel.removeClass('disabled fn-none');
            });

        $.each(SWFUploadEvents, function(i, v){
            var eventName = v.replace(/_handler$/, '').replace(/_([a-z])/g, function(){ return arguments[1].toUpperCase(); });
            configs[v] = function(){
                var event = $.Event(eventName);
                $uploadItem.trigger(event, $.makeArray(arguments));
                return !event.isDefaultPrevented();
            }
        });
    }

    // 删除一个Elem
    SWFUploadComb.prototype.delElem = function(id, callback){
        var plugin = this;
        if(!id){
            return false;
        }
        var getElem = plugin.getElem(id),
            thisElem = getElem['elem'],
            thisIndex = getElem['index'],
            $thisObj = thisElem['obj'];
        if((thisElem === null) || ($thisObj === null)){
            return false;
        }
        $thisObj.destroy();
        plugin.elems.splice(thisIndex, 1);
        callback();
    }



    module.exports = SWFUploadComb;
});


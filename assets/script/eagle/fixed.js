/**
 * fixed
 * 随屏滚动的插件
 */
define(function(require, exports, module) {

    // 引用jQuery
    var $ = require('$');
    
    // 判断IE6
    var isIE6 = (($.browser.msie) && ($.browser.version === '6.0'));

    // 公用DOM
    var $doc = $(document),
        $win = $(window),
        $cloneHolder = $('<div>');

    // 计算可视区域的尺寸及整个文档区的尺寸
    function getSystemAttr(){
        return [
            parseInt($doc.width(), 10),
            parseInt($doc.height(), 10),
            parseInt($win.width(), 10),
            parseInt($win.height(), 10)
        ]
    }
    var systemAttrs = getSystemAttr();
    // console.log(systemAttrs);

    // 用于保存可能修改到的样式
    var FIXEDStyles = {
        'position': null,
        'left': null,
        'right': null,
        'top': null,
        'bottom': null
    };

    // 默认Fixed的配置信息
    var FIXEDConfig = {
        // Fixed的id  '#id'
        'element': '',
        // 节点上边到页面顶部的距离
        'distanceToTop': 0,
        // 节点上边到页面顶部的距离
        'distanceLimit': 0,
        // 是否开启占位节点
        'placeHolder': true
    }

    // FIXED原型
    var FIXED = function (config){
        var _self = this;
        // 初始化配置
        _self.config = $.extend({}, FIXEDConfig, config);
        
        _self.cache = {
            'originalToTop': 0,
            'originStyles': {},
            'distanceToTop': 0,
            'prevElement': null,
            'parentElement': null,
            'parentRelativeElement': null,
            'parentToTop': 0,
            'placeholder': $cloneHolder
        }
    }

    // 初始化
    FIXED.prototype.render = function(){
        var _self = this;
        // 检测对象是否存在
        if(_self.config.element === '' || !$(_self.config.element).length){
            seajs.log('Error: element is null!');
            return;
        }
        // 初始化操作对象
        _self.$element = $(_self.config.element);
        
        // 一个元素只允许绑定一次
        if(_self.$element.data('on-fixed')){
            seajs.log('Error: element has fixed!');
            return;
        }

        // 初始化cache
        _self.setCache();
        // 初始化cache
        if(!isIE6){
            _self.scrollScreen();
        }else{
            _self.scrollScreenUnFixed();            
        }
        // 初始化cache
        _self.onEvent();
    }

    // 初始化cache
    FIXED.prototype.setCache = function(){
        var _self = this;
        
        // 记录元素原来的位置
        var originTop = parseInt(_self.$element.offset().top, 10);
        _self.cache.originTop = originTop;
        // console.log(_self.cache.originTop);

        // 修正过高的 distanceToTop
        var distanceToTop = parseInt(_self.config.distanceToTop, 10);
        distanceToTop = (distanceToTop <= originTop) ? distanceToTop : originTop;
        // 如果 body 有 top 属性, 消除这些位移
        var bodyToTop = parseInt($('body').css('top'), 10);
        if(!isNaN(bodyToTop)) {
            distanceToTop += bodyToTop;
        }
        _self.cache.distanceToTop = distanceToTop;
        // console.log(_self.cache.originalToTop);

        // 保存原有的样式
        for (var style in FIXEDStyles) {
            if (FIXEDStyles.hasOwnProperty(style)) {
                _self.cache.originStyles[style] = _self.$element.css(style);
            }
        }
        // console.log( _self.cache.originStyles);

        // 获取上一个节点
        var $prevElement = _self.$element.prev();
        while($prevElement.is(':hidden')) {
            $prevElement = $prevElement.prev();
            if($prevElement.length <= 0) {
                break;
            }
        }
        _self.cache.prevElement = $prevElement;
        // console.log( _self.cache.prevElement);

        // 计算父节点及其的上边到顶部距离
        var $parentElement = _self.$element.parent();
        if($parentElement.length !==0 ){
            var parentToTop = parseInt($parentElement.offset().top, 10),
                parentBorderTop = parseInt($parentElement.css('border-top'), 10),
                parentPaddingTop = parseInt($parentElement.css('padding-top'), 10);            
            _self.cache.parentElement = $parentElement;
            _self.cache.parentToTop = parentToTop + parentBorderTop + parentPaddingTop;
        }
        // console.log( _self.cache.parentToTop);

        // 初始化占位节点
        if(_self.config.placeHolder){
            _self.cache.placeholder.css({
                'width': _self.$element.outerWidth(),
                'height': _self.$element.outerHeight()
            })
        }

        // 
        if(isIE6){
            while($parentElement.css('position') !== 'relative'){
                if($parentElement[0].tagName === 'BODY'){
                    break;
                }
                $parentElement = $parentElement.parent();
            }
            _self.cache.parentRelativeElement = $parentElement;
            // console.log( _self.cache.prevElement);
        }

        return _self;
    }

    // 支持FIXED的浏览器
    FIXED.prototype.scrollScreen = function(){
        var _self = this;
        // 计算元素距离当前窗口上方的距离
        var distance = _self.cache.originTop - parseInt($doc.scrollTop(), 10);
        var distanceToTop = _self.cache.distanceToTop;
        // 当距离小于等于预设的值时
        // 将元素设为 fix 状态
        if (!_self.$element.data('_fixed') && distance <= distanceToTop) {
            if(_self.config.placeHolder){
                _self.cache.placeholder.insertBefore(_self.$element);
            }
            _self.$element.css({
                position: 'fixed',
                top: distanceToTop
            });
            _self.$element.data('_fixed', true);
        } else if (_self.$element.data('_fixed') && distance > distanceToTop) {
            // 恢复原有的样式
            if(_self.config.placeHolder){
                _self.cache.placeholder.remove();
            }
            _self.$element.css(_self.cache.originStyles);
            _self.$element.data('_fixed', false);
        }
    }

    // 非支持FIXED的浏览器
    FIXED.prototype.scrollScreenUnFixed = function(){
        var _self = this;
        _self.$element
        // 计算元素距离当前窗口上方的距离
        var docScrollTop = parseInt($doc.scrollTop(), 10);
        var distance = _self.cache.originTop - docScrollTop;
        var distanceToTop = _self.cache.distanceToTop;

        // 当距离小于等于预设的值时
        // 将元素设为 fix 状态
        if (distance <= distanceToTop) {
            if(_self.config.placeHolder){
                _self.cache.placeholder.insertBefore(_self.$element);
            }
            distanceToTop += docScrollTop;
            var $parentRelativeElement = _self.cache.parentRelativeElement;
            if($parentRelativeElement !== null){
                var extraTop = parseInt($parentRelativeElement.offset().top, 10) + parseInt($parentRelativeElement.css('border-top'), 10);
                if(!isNaN(extraTop)) {
                    distanceToTop -= extraTop;
                }
            }
            _self.$element.css({
                position: 'absolute',
                top: distanceToTop
            }).find('li').eq(0).html(distanceToTop);
        } else if (distance > distanceToTop) {
            // 恢复原有的样式
            if(_self.config.placeHolder){
                _self.cache.placeholder.remove();
            }
            _self.$element.css(_self.cache.originStyles);
        }
    }

    // 一个Elem
    FIXED.prototype.onEvent = function(){
        var _self = this;
        if(!isIE6){
            $win.on('scroll', function(){
                _self.scrollScreen();
            })
        }else{
            $win.on('scroll', function(){
                _self.scrollScreenUnFixed();
            })
        }
    }

    module.exports = FIXED;
});

/* Example
var fixedTest = new Fixed({
    'element': '#fixedTest',
    'distanceToTop': 10
}).render();
*/
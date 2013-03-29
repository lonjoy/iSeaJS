/**
 * @author tony
 * @url http://arturadib.com/hello-backbonejs/docs/2.html
 */
define(function(require, exports, module) {
	var Backbone = require('backbone'),
		$ = require('$'),
		_ = require('underscore');
		
	var ListView = Backbone.View.extend({
			// attaches `this.el` to an existing element.
			// 将 `el` 指向  `$('body')`
			el: $('body')
			
			// initialize(): Automatically called upon instantiation.
			// Where you make all types of bindings, excluding UI events, such as clicks, etc.
			,initialize: function(){
				// fixes loss of context for 'this' within methods
				// 绑定 `render` 的事件到  `this`
				_.bindAll(this, 'render');
				
				// not all views are self-rendering. This one is.
				this.render();
			}
			
			// render(): Function in charge of rendering the entire view in this.el.
			// Needs to be manually called by the user.
			,render: function(){
				$(this.el).append("<ul> <li>hello world</li> </ul>");
			}
			
		});
		
	module.exports = ListView;
});

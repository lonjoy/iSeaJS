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
			
			// 
			,events: {
				'click #add_btn': 'addItem'
			}
			
			// initialize(): Automatically called upon instantiation.
			// Where you make all types of bindings, excluding UI events, such as clicks, etc.
			,initialize: function(){
				// fixes loss of context for 'this' within methods
				// 绑定 `render` 的事件到  `this`
				_.bindAll(this, 'render', 'addItem');
				
				this.counter = 0;
				
				// not all views are self-rendering. This one is.
				this.render();
			}
			
			// render(): Function in charge of rendering the entire view in this.el.
			// Needs to be manually called by the user.
			,render: function(){
				$(this.el)
					.append('<input type="button" value="addItem" id="add_btn" />')
					.append('<ul id="add_list"></ul>');
			}
			
			,addItem: function(){
				this.counter++;
				$('#add_list', this.el).append('<li>hello world!#'+ this.counter +'</li>');
			}
			
		});
		
	module.exports = ListView;
});

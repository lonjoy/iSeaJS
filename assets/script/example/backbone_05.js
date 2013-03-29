/**
 * @author tony
 * @url http://arturadib.com/hello-backbonejs/docs/5.html
 */
define(function(require, exports, module) {
	var Backbone = require('backbone'),
		$ = require('$'),
		_ = require('underscore');
		
	Backbone.sync = function(method, model, success, error){
			success();
		};
	
	var Item = Backbone.Model.extend({
			defaults: {
				part1: 'hello',
				part2: 'world'
			}
		});
	
	var List = Backbone.Collection.extend({
			model: Item
		});
	
	var ItemView = Backbone.View.extend({
			tagName: 'li'
			
			,events:{
				'click a.swap': 'swap',
				'click a.delete': 'remove'
			}
			
			,initialize: function(){
				_.bindAll(this, 'render', 'unrender', 'swap', 'remove');
				
				this.model.on('change', this.render);
				this.model.on('remove', this.unrender);
			}
			
			,render: function(){
				var tpl = [
						'<span>',
							this.model.get('part1') + '&nbsp;' + this.model.get('part2'),
						'</span>',
						'&nbsp;&nbsp;&nbsp;&nbsp;',
						'<span style="color:blue;">[<a href="javascript:void(0);" class="swap" style="color:blue;">swap</a>]</span>',
						'&nbsp;',
						'<span style="color:red;">[<a href="javascript:void(0);" class="delete" style="color:red;">delete</a>]</span>'
					].join('');
				$(this.el).html(tpl);
				return this;
			}
			
			,unrender: function(){
				$(this.el).remove();
			}
			
			,swap: function(){
				var swapped = {
					part1: this.model.get('part2'),
					part2: this.model.get('part1')
				};
				this.model.set(swapped);
			}
			
			,remove: function(){
				this.model.destroy();
			}
		});
	
	var ListView = Backbone.View.extend({
			// attaches `this.el` to an existing element.
			// 将 `el` 指向  `$('body')`
			el: $('body')
			
			// 
			,events: {
				'click #add_btn': 'addItem'
			}
			
			,initialize: function(){
				_.bindAll(this, 'render', 'addItem', 'appendItem');
				
				this.collection = new List();
				this.collection.on('add', this.appendItem);
				
				this.counter = 0;

				this.render();
			}
			
			,render: function(){
				var self = this;
				
				$(this.el)
					.append('<input type="button" value="addItem" id="add_btn" />')
					.append('<ul id="add_list"></ul>');
				
				_(this.collection.models).each(function(item){
					self.appendItem(item);
				}, this);
			}
			
			,addItem: function(){
				this.counter++;
				var item = new Item();
				item.set({
					part2: item.get('part2') + '#' +  this.counter
				});
				this.collection.add(item);
			}
			
			,appendItem: function(item){
				var itemView = new ItemView({
						model: item
					});
				$('#add_list', this.el).append(itemView.render().el);
			}
			
		});
		
	module.exports = ListView;
});

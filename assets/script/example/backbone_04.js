/**
 * @author tony
 * @url http://arturadib.com/hello-backbonejs/docs/4.html
 */
define(function(require, exports, module) {
	var Backbone = require('backbone'),
		$ = require('$'),
		_ = require('underscore');
		
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
			
			,initialize: function(){
				console.log('ItemView - initialize');
				_.bindAll(this, 'render');
			}
			
			,render: function(){
				console.log('ItemView - render');
				$(this.el).html('<span>'+ this.model.get('part1') + this.model.get('part2') +'</span>');
				return this;
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
				console.log('ListView - initialize');
				_.bindAll(this, 'render', 'addItem', 'appendItem');
				
				this.collection = new List();
				this.collection.on('add', this.appendItem);
				
				this.counter = 0;

				this.render();
			}
			
			,render: function(){
				console.log('ListView - render');
				var self = this;
				
				$(this.el)
					.append('<input type="button" value="addItem" id="add_btn" />')
					.append('<ul id="add_list"></ul>');
				
				_(this.collection.models).each(function(item){
					self.appendItem(item);
				}, this);
			}
			
			,addItem: function(){
				console.log('ListView - addItem');
				this.counter++;
				var item = new Item();
				item.set({
					part2: item.get('part2') + this.counter
				});
				this.collection.add(item);
			}
			
			,appendItem: function(item){
				console.log('ListView - appendItem');
				var itemView = new ItemView({
						model: item
					});
					console.log(itemView.render().el);
				$('#add_list', this.el).append(itemView.render().el);
			}
			
		});
		
	module.exports = ListView;
});

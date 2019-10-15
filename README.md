![Travis (.com)](https://img.shields.io/travis/com/t1m0thy-michael/d?style=for-the-badge) 
![Coveralls github](https://img.shields.io/coveralls/github/t1m0thy-michael/d?style=for-the-badge) 
![GitHub last commit](https://img.shields.io/github/last-commit/t1m0thy-michael/d?style=for-the-badge) 
![npm](https://img.shields.io/npm/v/@t1m0thy_michael/d?style=for-the-badge&color=informational) 
![GitHub](https://img.shields.io/github/license/t1m0thy-michael/d?style=for-the-badge&color=informational) 

# d: dom Awesomeness

## First a warning...
**dom** is very much a work in progress. Backwards compatibility... well, there isn't any. I do not recommend using this on production sites or apps. Star the repo and keep an eye out for v1.0.0!

This documentation is a very early outline. I hope it gives an idea of what **dom** is all about. Please raise issues and suggest features and if you'd like to help even better :)

There is much more to DOM than is covered here - I will get tutorials written as soon as I can.

#### What?

A way to easily and concisely define and manipulate a UI. 

**dom** is designed to work best in conjunction with **@t1mothy_michael/e** (or other eventbus module).

#### Examples
**DomObjects** can be created in a number of ways.
* You can select existing element(s) ```dom('.myClass')```
* You can pass an existing Node/HTMLElement object ```dom(myElement)```
* Dom Definitions allow you to describe a new element in detail (see the basic &lt;p&gt; example below)
* You can pass an array of one or more of these items dom(['#myID', { div: 'hi!' }, myElement])


##### Lets create a &lt;p&gt; tag that responds to a click event
```js
const myFirstElement = dom({
	p: 'Hello World',
	id: 'welcome',
	classes: ['c1', 'c2'],
	on: {
		event: 'click',
		fn: function (e) {
			this.colour('red')
		},
	}
}).appendTo('body')
```
But what if we want to publish an event to tell anything else that might be listening that its been clicked? We can add event bus details to the ```on``` property;
```js
on: {
	event: 'click', 			// when this happens...
	topic: 'test/topic', 			// ...publish this topic...
	data:  					// ...with this data.... (can be a static value instead of a function)
	fn: function (e) { 			// ... and do this
		this.colour('green')
	}
}
```
What if our element needs to do something if another &lt;p&gt; tag has been clicked? We'd add the ```sub``` property to its definition:
```js
sub: {
	topic: 'test/topic',			// when this topic is published...
	fn: function (data, ctx, topic) {	// do this
		if (this.element !== ctx.element){
			this.colour('red')
		}
	}
}
```
Putting that together might look a bit like this;
```js
const createThingToClick = (txt) => dom({
	p: txt,
	on: {
		event: 'click',
		fn: function (e) {
			this.colour('green')
		},
		topic: 'test/topic',
	},
	sub: {
		topic: 'test/topic',
		fn: function (data, ctx, topic) {
			if (ctx.element !== this.element) {
				this.colour('red')
			}
		}
	}
})

const allMyElements = dom([
	createThingToClick('one'),
	createThingToClick('two'),
	createThingToClick('three'),
	createThingToClick('four'),
]).appendTo('body')


allMyElements.on({
	event: 'dblclick',
	fn: function () {
		this.colour('blue')
	}
})
```
Lets break that down; We have a function that creates new elements with the same behaviours - turn green on click and tell all the others to do their thing (that is turn red). To easily append them all to the document body we pass them as an array to dom(). As a bonus this gives us a new dom object containing all of our &lt;p&gt; tags so just for fun we give them all an extra behaviour to turn blue on a double click.

It is possible to define nested structures in a dom definition:
```js
dom({
	div: [
		{ h1: 'title' },
		{ p: 'some text' },
		{ div: [
			{div: [
				...etc...etc...etc
			]}
		]}
	]
})
```
^ **Just because you can, doesn't mean that you should**. Nesting like that can get ugly quickly. It's recommended to define elements separately and then compose larger structures from them afterwards. 

##### An input example
```js
dom({
	input: 'initial value',
	dflt: 'default value'
	on: [
		{ event: 'keydown' fn: onKeydown},
		{ event: 'blur' fn: onBlur},
		{ event: 'click' fn: onClick},
	],
	sub: [
		{ topic: 'form/submission', fn: doValidate },
		{ topic: 'form/reset', fn: doReset },
	]
}).appendTo('body')
```
Simple to define multiple behaviours for an element. The above input has different initial value and default. The ```doReset()``` function might be as simple as this:
```js
const doReset = function () {
	this.dflt()
}
```
Do also allows you to define a validator for an element which can either be called ```dom('#myInput').validate()``` or would fire automatically when you do ```dom(#myInput').formValues()```. Form values is a great method that returns an object listing all of the forms values ready sorted and validated like this:
```
{
	form: form,
	all: { fieldname: value },
	input: { fieldname: value },
	select: { fieldname: value },
	textarea: { fieldname: value },
	submitID: form.id,
	submitValue: form.value,
	failedValidation: {fieldname: value}
}
```

### Thats is for now.... more docs to follow

PS: here a list of dom object methods
```js
addClass 
appendAfter 
appendBefore 
appendFirstChild 
appendLastChild 
appendTo 
attr // sets element attributes
background // Background CSS stuff & async loading of image bg and average brightness 
backgroundColour
change // trigger change event, more event shorthand methods to come
child // select children of current element(s) by selector
click // trigger click event
colour
data // sets dom data attribute - this is not a 'data-' element attribute
deselect // select elements
dflt // restore or set default on input elements
disable
empty // removes all child elements, unsubscribing them from any eventbus topics
enable
eventbus // property. access to registered eventbus object
fireEvent 
formValues // form magic
getBounding // wrapper on getBoundingBox
hasClass 
height
hide
id
innerHTML
innerText
is // fiter currently selected elemments
isAppended
not // fiter currently selected elemments
on // events
parent
remove // see empty but for this element
removeClass
replace
replaceClass
scrollMore 
scrollTop
select
show
sibling
style
sub // subscribe to event topics
toString
toggleClass
updateSelect
validate // form stuff
value
width

dom.registerPlugin() // add methods to the DomObject
```

and these are the properties that can be added to a dom definition:
```js
attr
content // use with tag:
id
disabled
background
classes
data
dflt
height
href
htmlFor
max
min
name
on
options
placeholder
size
src
step
style
sub
target
tag: // can be replaced by a, span, div, input etc...
type
value
validate
width
```
in addition to these tag: / content: pair of properties can be replaced with specific tag names as shown in the examples above

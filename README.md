# ju-string

Simple utility for the String javascript object

This can be used standalone too, in browser or with nodejs.

It is part of the ju (Javascript Utilities) collection.

## Status

[![Build Status](https://travis-ci.org/sylvaincombes/ju-string.svg)](https://travis-ci.org/sylvaincombes/ju-string) [![Coverage Status](https://img.shields.io/coveralls/sylvaincombes/ju-string.svg)](https://coveralls.io/r/sylvaincombes/ju-string) 

[![browser support](https://ci.testling.com/sylvaincombes/ju-string.png)
](https://ci.testling.com/sylvaincombes/ju-string)

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## What it is

It's a simple string utility to make the everyday job easier.

- Open source, [MIT Licence](LICENSE)
- no dependency, can be used standalone
- doesn't pollute the native javascript String object
- usable in browser or with [nodejs](http://nodejs.org/)
- made with [browserify](http://browserify.org/)
- build with [grunt](http://gruntjs.com/)
- unit tested with [tape](https://github.com/substack/tape) and [testling](https://ci.testling.com/)
- simple examples provided in the [examples](examples) folder
- api doc made with [jsdoc](http://usejsdoc.org/) see [doc](doc/index.html)

## Why another lib

I know there are already a gazillion of open source javascript libraries out there, so why another one again ?

Because I want these :
 
- decoupled in small components
- simple, limited to what I found useful (purely subjective)
- standalone when possible
- usable in browsers and nodejs
- choice of my own naming, knowledge of internals ...

And I wanted to play and learn with some toys too like build system, testing, ci, npm ...


## How to start

### In browser

1. In your html page include the javascript :
    
    	<script type="text/javascript" src="../build/ju/string.min.js"></script>
    
    
2. You're ready, start using with for example :
	
    	ju.string.trim('   my value    ');
    	
    	
### In nodejs

1. Install with npm
		
		npm install ju-string

2. Use it in your code

		var s = require('ju-string');
		s.trim('   my value    ');



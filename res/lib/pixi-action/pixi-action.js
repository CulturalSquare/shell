!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),o=i(r),u=n(3),s=i(u),a=n(4),c=n(6),l=n(7),f=n(8),h=n(9),p=n(10),y=n(11),_=n(12),b=n(13),v=n(14),d=n(15),m=n(16),O={ActionManager:s.default,MoveTo:a.MoveTo,MoveBy:a.MoveBy,ScaleTo:c.ScaleTo,ScaleBy:c.ScaleBy,RotateTo:l.RotateTo,RotateBy:l.RotateBy,FadeIn:f.FadeIn,FadeOut:f.FadeOut,SkewTo:h.SkewTo,SkewBy:h.SkewBy,PivotTo:p.PivotTo,PivotBy:p.PivotBy,Blink:y.Blink,TintTo:_.TintTo,TintBy:_.TintBy,Repeat:b.Repeat,Sequence:v.Sequence,DelayTime:d.DelayTime,CallFunc:m.CallFunc};o.default.actionManager||(o.default.actionManager=new s.default,o.default.action=O),e.default=O},function(t,e){t.exports=PIXI},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(2),c=i(a),l=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i._id="_"+c.default.utils.uuid(),i.sprite=t,i.action=n,i._started=!1,i._ended=!1,i._active=!1,i}return u(e,t),s(e,[{key:"update",value:function(t,e){this._started||(this.emit("start",e),this._started=!0,this._active=!0),this._ended=this.action.update(this.sprite,t,e),this._ended&&this._active&&(this.emit("end",e),this._active=!1)}},{key:"isEnded",value:function(){return this._ended}}]),e}(c.default.utils.EventEmitter),f=function(){function t(){r(this,t),this.actions={},this._actionsToDelete=[],this._last=0}return s(t,[{key:"update",value:function(t){var e=void 0;t||0===t?e=1e3*t:(e=this._getDeltaMS(),t=e/1e3);for(var n in this.actions){var i=this.actions[n];i.update(t,e),i.isEnded()&&this._actionsToDelete.push(i)}if(this._actionsToDelete.length){for(var r=0;r<this._actionsToDelete.length;r++)this._remove(this._actionsToDelete[r]);this._actionsToDelete.length=0}}},{key:"runAction",value:function(t,e){var n=new l(t,e);return this.actions[n._id]=n,n}},{key:"cancelAction",value:function(t){this._actionsToDelete.push(t)}},{key:"_remove",value:function(t){delete this.actions[t._id]}},{key:"_getDeltaMS",value:function(){0===this._last&&(this._last=Date.now());var t=Date.now(),e=t-this._last;return this._last=t,e}}]),t}();e.default=f},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.MoveBy=e.MoveTo=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.MoveTo=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.position,r=(this.x-i.x)/this._time*n,o=(this.y-i.y)/this._time*n;return t.x+=r,t.y+=o,this._time-=n,this._time<=0&&(t.x=this.x,t.y=this.y,this.reset(),!0)}}]),e}(c.default),e.MoveBy=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time,this.tx=null,this.ty=null}},{key:"update",value:function(t,e,n){var i=t.position;null!==this.tx&&null!==this.ty||(this.tx=i.x+this.x,this.ty=i.y+this.y);var r=(this.tx-i.x)/this._time*n,o=(this.ty-i.y)/this._time*n;return t.x+=r,t.y+=o,this._time-=n,this._time<=0&&(t.x=this.tx,t.y=this.ty,this.reset(),!0)}}]),e}(c.default)},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(){n(this,t)}return i(t,[{key:"reset",value:function(){}},{key:"update",value:function(t,e,n){if(!t)throw"Action obejct is not valid."}}]),t}();e.default=r},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.ScaleBy=e.ScaleTo=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.ScaleTo=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.scale,r=(this.x-i.x)/this._time*n,o=(this.y-i.y)/this._time*n;return t.scale.x+=r,t.scale.y+=o,this._time-=n,this._time<=0&&(t.scale.x=this.x,t.scale.y=this.y,this.reset(),!0)}}]),e}(c.default),e.ScaleBy=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time,this.tx=null,this.ty=null}},{key:"update",value:function(t,e,n){var i=t.scale;null!==this.tx&&null!==this.ty||(this.tx=i.x+this.x,this.ty=i.y+this.y);var r=(this.tx-i.x)/this._time*n,o=(this.ty-i.y)/this._time*n;return t.scale.x+=r,t.scale.y+=o,this._time-=n,this._time<=0&&(t.scale.x=this.tx,t.scale.y=this.ty,this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.RotateBy=e.RotateTo=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.RotateTo=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.time=1e3*n,i.rotation=t,i.reset(),i}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.rotation,r=(this.rotation-i)/this._time*n;return t.rotation+=r,this._time-=n,this._time<=0&&(t.rotation=this.rotation,this.reset(),!0)}}]),e}(c.default),e.RotateBy=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.time=1e3*n,i.rotation=t,i.reset(),i}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time,this.trotation=null}},{key:"update",value:function(t,e,n){var i=t.rotation;null===this.trotation&&(this.trotation=i+this.rotation);var r=(this.trotation-i)/this._time*n;return t.rotation+=r,this._time-=n,this._time<=0&&(t.rotation=this.trotation,this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.FadeOut=e.FadeIn=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.FadeIn=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.time=1e3*t,n.alpha=1,n.reset(),n}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.alpha,r=(this.alpha-i)/this._time*n;return t.alpha+=r,this._time-=n,this._time<=0&&(t.alpha=this.alpha,this.reset(),!0)}}]),e}(c.default),e.FadeOut=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.time=1e3*t,n.alpha=0,n.reset(),n}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.alpha,r=(this.alpha-i)/this._time*n;return t.alpha+=r,this._time-=n,this._time<=0&&(t.alpha=this.alpha,this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.SkewBy=e.SkewTo=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.SkewTo=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.skew,r=(this.x-i.x)/this._time*n,o=(this.y-i.y)/this._time*n;return t.skew.x+=r,t.skew.y+=o,this._time-=n,this._time<=0&&(t.skew.x=this.x,t.skew.y=this.y,this.reset(),!0)}}]),e}(c.default),e.SkewBy=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time,this.tx=null,this.ty=null}},{key:"update",value:function(t,e,n){var i=t.skew;null!==this.tx&&null!==this.ty||(this.tx=i.x+this.x,this.ty=i.y+this.y);var r=(this.tx-i.x)/this._time*n,o=(this.ty-i.y)/this._time*n;return t.skew.x+=r,t.skew.y+=o,this._time-=n,this._time<=0&&(t.skew.x=this.tx,t.skew.y=this.ty,this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.PivotBy=e.PivotTo=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.PivotTo=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.pivot,r=(this.x-i.x)/this._time*n,o=(this.y-i.y)/this._time*n;return t.pivot.x+=r,t.pivot.y+=o,this._time-=n,this._time<=0&&(t.pivot.x=this.x,t.pivot.y=this.y,this.reset(),!0)}}]),e}(c.default),e.PivotBy=function(t){function e(t,n,i){r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return u.time=1e3*i,u.x=t,u.y=n,u.reset(),u}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time,this.tx=null,this.ty=null}},{key:"update",value:function(t,e,n){var i=t.pivot;null!==this.tx&&null!==this.ty||(this.tx=i.x+this.x,this.ty=i.y+this.y);var r=(this.tx-i.x)/this._time*n,o=(this.ty-i.y)/this._time*n;return t.pivot.x+=r,t.pivot.y+=o,this._time-=n,this._time<=0&&(t.pivot.x=this.tx,t.pivot.y=this.ty,this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Blink=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.Blink=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.time=1e3*n,i.count=t,i.reset(),i}return u(e,t),s(e,[{key:"reset",value:function(){this._count=2*this.count,this._gap=this.time/this._count,this._timer=0}},{key:"update",value:function(t,e,n){t.visible;return this._timer<=0?(t.visible=!t.visible,this._timer=this._gap,this._count--):this._timer-=n,this._count<=0&&(this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.TintBy=e.TintTo=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.TintTo=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.time=1e3*n,i.tint=t,i.reset(),i}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){var i=t.tint,r=(this.tint-i)/this._time*n;return t.tint+=r,this._time-=n,this._time<=0&&(t.tint=this.tint,this.reset(),!0)}}]),e}(c.default),e.TintBy=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.time=1e3*n,i.tint=t,i.reset(),i}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time,this.ttint=null}},{key:"update",value:function(t,e,n){var i=t.tint;null===this.ttint&&(this.ttint=i+this.tint);var r=(this.ttint-i)/this._time*n;return t.tint+=r,this._time-=n,this._time<=0&&(t.tint=this.ttint,this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Repeat=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.Repeat=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.action=t,i.count=n,i.reset(),i}return u(e,t),s(e,[{key:"reset",value:function(){this._count=this.count,this._count||(this._count=1/0)}},{key:"update",value:function(t,e,n){var i=this.action.update(t,e,n);return i&&(this.action.reset(),this._count--),this._count<=0&&(this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Sequence=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.Sequence=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.actions=t,n.reset(),n}return u(e,t),s(e,[{key:"reset",value:function(){this._index=0}},{key:"update",value:function(t,e,n){if(this._index>=this.actions.length)return!0;var i=this.actions[this._index],r=i.update(t,e,n);return r&&(i.reset(),this._index++),!1}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.DelayTime=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.DelayTime=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.time=1e3*t,n.reset(),n}return u(e,t),s(e,[{key:"reset",value:function(){this._time=this.time}},{key:"update",value:function(t,e,n){return this._time-=n,this._time<=0&&(this.reset(),!0)}}]),e}(c.default)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.CallFunc=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=n(5),c=i(a);e.CallFunc=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.func=t||function(){},n.reset(),n}return u(e,t),s(e,[{key:"reset",value:function(){}},{key:"update",value:function(t,e,n){return this.func(),this.reset(),!0}}]),e}(c.default)}]);
//# sourceMappingURL=pixi-action.js.map
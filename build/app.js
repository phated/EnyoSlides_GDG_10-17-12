
// minifier: path aliases

enyo.path.addPaths({slidedeck: "/home/phated/github/enyo-slides/enyo/../lib/slidedeck/", onyx: "/home/phated/github/enyo-slides/enyo/../lib/onyx/", onyx: "/home/phated/github/enyo-slides/enyo/../lib/onyx/source/", layout: "/home/phated/github/enyo-slides/enyo/../lib/layout/", socket: "/home/phated/github/enyo-slides/enyo/../lib/socket/", layout: "/home/phated/github/enyo-slides/enyo/../lib/layout/", onyx: "/home/phated/github/enyo-slides/enyo/../lib/onyx/", onyx: "/home/phated/github/enyo-slides/enyo/../lib/onyx/source/", socket: "/home/phated/github/enyo-slides/enyo/../lib/socket/", socket: "/home/phated/github/enyo-slides/enyo/../lib/socket/", presentation: "../source/../presentation/"});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
ondown: "downHandler",
onclick: ""
},
downHandler: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !0;
},
tap: function(e, t) {
return !this.disabled;
}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v"
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
});
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
var e = this.orient == "v" ? "height" : "width", t = this.hasNode();
t && (t.style[e] = this.$.client.domStyles[e] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling ? this.createComponents(this.childComponents, {
isChrome: !0
}) : enyo.nop, this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop;
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop, this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop, this.removeClass("onyx-menu-up"), this.floating ? enyo.noop : this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: i.left - (e.left + e.width - r)
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
tag: "div",
classes: "onyx-menu-item",
events: {
onSelect: ""
},
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e !== undefined && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e)), this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected");
var t = this.$.flyweight.fetchRowNode(this.selected);
this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
highlander: !0,
defaultKind: "onyx.RadioButton"
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.valueChanged();
},
valueChanged: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return this.tapped = !0, this.animateTo(n), !0;
}
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.removeFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
statics: {
addFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r != undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.setClassAttribute(e.getClassAttribute()) : e.addClass(t);
}), e.removeClass(t);
}
},
removeFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r != undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.removeClass(t) : e.setClassAttribute(e.getClassAttribute());
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
fit: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu",
prepend: !0
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r = undefined, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex != undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex == undefined && (c.toolbarIndex = t);
}
}
});

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: ""
},
events: {
onSetupItem: ""
},
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
bottomUp: !1,
create: function() {
this.inherited(arguments), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
var t = this.fetchRowNode(e);
t && (this.setupItem(e), t.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(e) {
if (this.hasNode()) {
var t = this.node.querySelectorAll('[index="' + e + '"]');
return t && t[0];
}
},
rowForEvent: function(e) {
var t = e.target, n = this.hasNode().id;
while (t && t.parentNode && t.id != n) {
var r = t.getAttribute && t.getAttribute("index");
if (r !== null) return Number(r);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n = t && t.querySelectorAll("#" + e.id);
n = n && n[0], e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1
},
events: {
onSetupItem: ""
},
handlers: {
onAnimateFinish: "animateFinish"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
} ]
} ],
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
generatePage: function(e, t) {
this.page = e;
var n = this.$.generator.rowOffset = this.rowsPerPage * this.page, r = this.$.generator.count = Math.min(this.count - n, this.rowsPerPage), i = this.$.generator.generateChildHtml();
t.setContent(i);
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
o != s && s > 0 && (this.pageHeights[e] = s, this.portSize += s - o);
}
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 == 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0), s = i % 2 == 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0), t && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return {
no: t,
height: r,
pos: n + r
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
return this.pageHeights[e] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments);
return this.update(this.getScrollTop()), n;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToRow: function(e) {
var t = Math.floor(e / this.rowsPerPage), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.inherited(arguments);
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath, i = r.y;
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath;
e.setScrollY(e.y - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0, this.$.strategy.$.scrollMath.setScrollY(this.pullHeight), this.$.strategy.$.scrollMath.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
calcArrangementDifference: function(e, t, n, r) {},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android) {
var i = t.left, s = t.top, i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r;
enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n == 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex, t = this.container.toIndex;
this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var r;
for (var i = 0, s = 0, o, u; u = e[i]; i++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (r = u);
if (r) {
var a = n.width - s;
r.width = a >= 0 ? a : r.width;
}
for (var i = 0, f = t.left, o, u; u = e[i]; i++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n = this.container.getPanels(), r = this.container.clamp(t), i = this.containerBounds.width;
for (var s = r, o = 0, u; u = n[s]; s++) {
o += u.width + u.marginWidth;
if (o > i) break;
}
var a = i - o, f = 0;
if (a > 0) {
var l = r;
for (var s = r - 1, c = 0, u; u = n[s]; s--) {
c += u.width + u.marginWidth;
if (a - c <= 0) {
f = a - c, r = s;
break;
}
}
}
for (var s = 0, h = this.containerPadding.left + f, p, u; u = n[s]; s++) p = u.width + u.marginWidth, s < r ? this.arrangeControl(u, {
left: -p
}) : (this.arrangeControl(u, {
left: Math.floor(h)
}), h += p);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o; o = n[r]; r++) this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
if (this.container.getPanels().length == 1) {
var n = {};
n[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], n);
return;
}
var r = Math.floor(this.container.getPanels().length / 2), i = this.getOrderedControls(Math.floor(t) - r), s = this.containerBounds[this.axisSize] - this.margin - this.margin, o = this.margin - s * r;
for (var u = 0, a, n, f; a = i[u]; u++) n = {}, n[this.axisPosition] = o, this.arrangeControl(a, n), o += s;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
removeControl: function(e) {
this.inherited(arguments), this.controls.length > 1 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels();
return e[this.index];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), this.dragging || (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// $lib/socket.io-client/dist/socket.io.js

var io = "undefined" == typeof module ? {} : module.exports;

(function() {
(function(e, t) {
var n = e;
n.version = "0.9.10", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function(e, r) {
var i = n.util.parseUri(e), s, o;
t && t.location && (i.protocol = i.protocol || t.location.protocol.slice(0, -1), i.host = i.host || (t.document ? t.document.domain : t.location.hostname), i.port = i.port || t.location.port), s = n.util.uniqueUri(i);
var u = {
host: i.host,
secure: "https" == i.protocol,
port: i.port || ("https" == i.protocol ? 443 : 80),
query: i.query || ""
};
n.util.merge(u, r);
if (u["force new connection"] || !n.sockets[s]) o = new n.Socket(u);
return !u["force new connection"] && o && (n.sockets[s] = o), o = o || n.sockets[s], o.of(i.path.length > 1 ? i.path : "");
};
})("object" == typeof module ? module.exports : this.io = {}, this), function(e, t) {
var n = e.util = {}, r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, i = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
n.parseUri = function(e) {
var t = r.exec(e || ""), n = {}, s = 14;
while (s--) n[i[s]] = t[s] || "";
return n;
}, n.uniqueUri = function(e) {
var n = e.protocol, r = e.host, i = e.port;
return "document" in t ? (r = r || document.domain, i = i || (n == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)) : (r = r || "localhost", !i && n == "https" && (i = 443)), (n || "http") + "://" + r + ":" + (i || 80);
}, n.query = function(e, t) {
var r = n.chunkQuery(e || ""), i = [];
n.merge(r, n.chunkQuery(t || ""));
for (var s in r) r.hasOwnProperty(s) && i.push(s + "=" + r[s]);
return i.length ? "?" + i.join("&") : "";
}, n.chunkQuery = function(e) {
var t = {}, n = e.split("&"), r = 0, i = n.length, s;
for (; r < i; ++r) s = n[r].split("="), s[0] && (t[s[0]] = s[1]);
return t;
};
var s = !1;
n.load = function(e) {
if ("document" in t && document.readyState === "complete" || s) return e();
n.on(t, "load", e, !1);
}, n.on = function(e, t, n, r) {
e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r);
}, n.request = function(e) {
if (e && "undefined" != typeof XDomainRequest) return new XDomainRequest;
if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
if (!e) try {
return new (window[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
} catch (t) {}
return null;
}, "undefined" != typeof window && n.load(function() {
s = !0;
}), n.defer = function(e) {
if (!n.ua.webkit || "undefined" != typeof importScripts) return e();
n.load(function() {
setTimeout(e, 100);
});
}, n.merge = function(t, r, i, s) {
var o = s || [], u = typeof i == "undefined" ? 2 : i, a;
for (a in r) r.hasOwnProperty(a) && n.indexOf(o, a) < 0 && (typeof t[a] != "object" || !u ? (t[a] = r[a], o.push(r[a])) : n.merge(t[a], r[a], u - 1, o));
return t;
}, n.mixin = function(e, t) {
n.merge(e.prototype, t.prototype);
}, n.inherit = function(e, t) {
function n() {}
n.prototype = t.prototype, e.prototype = new n;
}, n.isArray = Array.isArray || function(e) {
return Object.prototype.toString.call(e) === "[object Array]";
}, n.intersect = function(e, t) {
var r = [], i = e.length > t.length ? e : t, s = e.length > t.length ? t : e;
for (var o = 0, u = s.length; o < u; o++) ~n.indexOf(i, s[o]) && r.push(s[o]);
return r;
}, n.indexOf = function(e, t, n) {
for (var r = e.length, n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++) ;
return r <= n ? -1 : n;
}, n.toArray = function(e) {
var t = [];
for (var n = 0, r = e.length; n < r; n++) t.push(e[n]);
return t;
}, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
try {
var e = new XMLHttpRequest;
} catch (t) {
return !1;
}
return e.withCredentials != undefined;
}(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
}("undefined" != typeof io ? io : module.exports, this), function(e, t) {
function n() {}
e.EventEmitter = n, n.prototype.on = function(e, n) {
return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [ this.$events[e], n ] : this.$events[e] = n, this;
}, n.prototype.addListener = n.prototype.on, n.prototype.once = function(e, t) {
function r() {
n.removeListener(e, r), t.apply(this, arguments);
}
var n = this;
return r.listener = t, this.on(e, r), this;
}, n.prototype.removeListener = function(e, n) {
if (this.$events && this.$events[e]) {
var r = this.$events[e];
if (t.util.isArray(r)) {
var i = -1;
for (var s = 0, o = r.length; s < o; s++) if (r[s] === n || r[s].listener && r[s].listener === n) {
i = s;
break;
}
if (i < 0) return this;
r.splice(i, 1), r.length || delete this.$events[e];
} else (r === n || r.listener && r.listener === n) && delete this.$events[e];
}
return this;
}, n.prototype.removeAllListeners = function(e) {
return e === undefined ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this);
}, n.prototype.listeners = function(e) {
return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [ this.$events[e] ]), this.$events[e];
}, n.prototype.emit = function(e) {
if (!this.$events) return !1;
var n = this.$events[e];
if (!n) return !1;
var r = Array.prototype.slice.call(arguments, 1);
if ("function" == typeof n) n.apply(this, r); else {
if (!t.util.isArray(n)) return !1;
var i = n.slice();
for (var s = 0, o = i.length; s < o; s++) i[s].apply(this, r);
}
return !0;
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(exports, nativeJSON) {
"use strict";
function f(e) {
return e < 10 ? "0" + e : e;
}
function date(e, t) {
return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null;
}
function quote(e) {
return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
var t = meta[e];
return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}) + '"' : '"' + e + '"';
}
function str(e, t) {
var n, r, i, s, o = gap, u, a = t[e];
a instanceof Date && (a = date(e)), typeof rep == "function" && (a = rep.call(t, e, a));
switch (typeof a) {
case "string":
return quote(a);
case "number":
return isFinite(a) ? String(a) : "null";
case "boolean":
case "null":
return String(a);
case "object":
if (!a) return "null";
gap += indent, u = [];
if (Object.prototype.toString.apply(a) === "[object Array]") {
s = a.length;
for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i;
}
if (rep && typeof rep == "object") {
s = rep.length;
for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
} else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i;
}
}
if (nativeJSON && nativeJSON.parse) return exports.JSON = {
parse: nativeJSON.parse,
stringify: nativeJSON.stringify
};
var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b": "\\b",
"	": "\\t",
"\n": "\\n",
"\f": "\\f",
"\r": "\\r",
'"': '\\"',
"\\": "\\\\"
}, rep;
JSON.stringify = function(e, t, n) {
var r;
gap = "", indent = "";
if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " "; else typeof n == "string" && (indent = n);
rep = t;
if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
"": e
});
throw new Error("JSON.stringify");
}, JSON.parse = function(text, reviver) {
function walk(e, t) {
var n, r, i = e[t];
if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
return reviver.call(e, t, i);
}
var j;
text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}));
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
"": j
}, "") : j;
throw new SyntaxError("JSON.parse");
};
}("undefined" != typeof io ? io : module.exports, typeof JSON != "undefined" ? JSON : undefined), function(e, t) {
var n = e.parser = {}, r = n.packets = [ "disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop" ], i = n.reasons = [ "transport not supported", "client not handshaken", "unauthorized" ], s = n.advice = [ "reconnect" ], o = t.JSON, u = t.util.indexOf;
n.encodePacket = function(e) {
var t = u(r, e.type), n = e.id || "", a = e.endpoint || "", f = e.ack, l = null;
switch (e.type) {
case "error":
var c = e.reason ? u(i, e.reason) : "", h = e.advice ? u(s, e.advice) : "";
if (c !== "" || h !== "") l = c + (h !== "" ? "+" + h : "");
break;
case "message":
e.data !== "" && (l = e.data);
break;
case "event":
var p = {
name: e.name
};
e.args && e.args.length && (p.args = e.args), l = o.stringify(p);
break;
case "json":
l = o.stringify(e.data);
break;
case "connect":
e.qs && (l = e.qs);
break;
case "ack":
l = e.ackId + (e.args && e.args.length ? "+" + o.stringify(e.args) : "");
}
var d = [ t, n + (f == "data" ? "+" : ""), a ];
return l !== null && l !== undefined && d.push(l), d.join(":");
}, n.encodePayload = function(e) {
var t = "";
if (e.length == 1) return e[0];
for (var n = 0, r = e.length; n < r; n++) {
var i = e[n];
t += "\ufffd" + i.length + "\ufffd" + e[n];
}
return t;
};
var a = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
n.decodePacket = function(e) {
var t = e.match(a);
if (!t) return {};
var n = t[2] || "", e = t[5] || "", u = {
type: r[t[1]],
endpoint: t[4] || ""
};
n && (u.id = n, t[3] ? u.ack = "data" : u.ack = !0);
switch (u.type) {
case "error":
var t = e.split("+");
u.reason = i[t[0]] || "", u.advice = s[t[1]] || "";
break;
case "message":
u.data = e || "";
break;
case "event":
try {
var f = o.parse(e);
u.name = f.name, u.args = f.args;
} catch (l) {}
u.args = u.args || [];
break;
case "json":
try {
u.data = o.parse(e);
} catch (l) {}
break;
case "connect":
u.qs = e || "";
break;
case "ack":
var t = e.match(/^([0-9]+)(\+)?(.*)/);
if (t) {
u.ackId = t[1], u.args = [];
if (t[3]) try {
u.args = t[3] ? o.parse(t[3]) : [];
} catch (l) {}
}
break;
case "disconnect":
case "heartbeat":
}
return u;
}, n.decodePayload = function(e) {
if (e.charAt(0) == "\ufffd") {
var t = [];
for (var r = 1, i = ""; r < e.length; r++) e.charAt(r) == "\ufffd" ? (t.push(n.decodePacket(e.substr(r + 1).substr(0, i))), r += Number(i) + 1, i = "") : i += e.charAt(r);
return t;
}
return [ n.decodePacket(e) ];
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t) {
function n(e, t) {
this.socket = e, this.sessid = t;
}
e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function() {
return !0;
}, n.prototype.onData = function(e) {
this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
if (e !== "") {
var n = t.parser.decodePayload(e);
if (n && n.length) for (var r = 0, i = n.length; r < i; r++) this.onPacket(n[r]);
}
return this;
}, n.prototype.onPacket = function(e) {
return this.socket.setHeartbeatTimeout(), e.type == "heartbeat" ? this.onHeartbeat() : (e.type == "connect" && e.endpoint == "" && this.onConnect(), e.type == "error" && e.advice == "reconnect" && (this.isOpen = !1), this.socket.onPacket(e), this);
}, n.prototype.setCloseTimeout = function() {
if (!this.closeTimeout) {
var e = this;
this.closeTimeout = setTimeout(function() {
e.onDisconnect();
}, this.socket.closeTimeout);
}
}, n.prototype.onDisconnect = function() {
return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this;
}, n.prototype.onConnect = function() {
return this.socket.onConnect(), this;
}, n.prototype.clearCloseTimeout = function() {
this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null);
}, n.prototype.clearTimeouts = function() {
this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout);
}, n.prototype.packet = function(e) {
this.send(t.parser.encodePacket(e));
}, n.prototype.onHeartbeat = function(e) {
this.packet({
type: "heartbeat"
});
}, n.prototype.onOpen = function() {
this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen();
}, n.prototype.onClose = function() {
var e = this;
this.isOpen = !1, this.socket.onClose(), this.onDisconnect();
}, n.prototype.prepareUrl = function() {
var e = this.socket.options;
return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid;
}, n.prototype.ready = function(e, t) {
t.call(this);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r(e) {
this.options = {
port: 80,
secure: !1,
document: "document" in n ? document : !1,
resource: "socket.io",
transports: t.transports,
"connect timeout": 1e4,
"try multiple transports": !0,
reconnect: !0,
"reconnection delay": 500,
"reconnection limit": Infinity,
"reopen delay": 3e3,
"max reconnection attempts": 10,
"sync disconnect on unload": !1,
"auto connect": !0,
"flash policy port": 10843,
manualFlush: !1
}, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1;
if (this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
var r = this;
t.util.on(n, "beforeunload", function() {
r.disconnectSync();
}, !1);
}
this.options["auto connect"] && this.connect();
}
function i() {}
e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function(e) {
return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), e !== "" && this.namespaces[e].packet({
type: "connect"
})), this.namespaces[e];
}, r.prototype.publish = function() {
this.emit.apply(this, arguments);
var e;
for (var t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments));
}, r.prototype.handshake = function(e) {
function s(t) {
t instanceof Error ? (n.connecting = !1, n.onError(t.message)) : e.apply(null, t.split(":"));
}
var n = this, r = this.options, o = [ "http" + (r.secure ? "s" : "") + ":/", r.host + ":" + r.port, r.resource, t.protocol, t.util.query(this.options.query, "t=" + +(new Date)) ].join("/");
if (this.isXDomain() && !t.util.ua.hasCORS) {
var u = document.getElementsByTagName("script")[0], a = document.createElement("script");
a.src = o + "&jsonp=" + t.j.length, u.parentNode.insertBefore(a, u), t.j.push(function(e) {
s(e), a.parentNode.removeChild(a);
});
} else {
var f = t.util.request();
f.open("GET", o, !0), this.isXDomain() && (f.withCredentials = !0), f.onreadystatechange = function() {
f.readyState == 4 && (f.onreadystatechange = i, f.status == 200 ? s(f.responseText) : f.status == 403 ? n.onError(f.responseText) : (n.connecting = !1, !n.reconnecting && n.onError(f.responseText)));
}, f.send(null);
}
}, r.prototype.getTransport = function(e) {
var n = e || this.transports, r;
for (var i = 0, s; s = n[i]; i++) if (t.Transport[s] && t.Transport[s].check(this) && (!this.isXDomain() || t.Transport[s].xdomainCheck(this))) return new t.Transport[s](this, this.sessionid);
return null;
}, r.prototype.connect = function(e) {
if (this.connecting) return this;
var n = this;
return n.connecting = !0, this.handshake(function(r, i, s, o) {
function u(e) {
n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e);
if (!n.transport) return n.publish("connect_failed");
n.transport.ready(n, function() {
n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
if (!n.connected) {
n.connecting = !1;
if (n.options["try multiple transports"]) {
var e = n.transports;
while (e.length > 0 && e.splice(0, 1)[0] != n.transport.name) ;
e.length ? u(e) : n.publish("connect_failed");
}
}
}, n.options["connect timeout"]));
});
}
n.sessionid = r, n.closeTimeout = s * 1e3, n.heartbeatTimeout = i * 1e3, n.transports || (n.transports = n.origTransports = o ? t.util.intersect(o.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), u(n.transports), n.once("connect", function() {
clearTimeout(n.connectTimeoutTimer), e && typeof e == "function" && e();
});
}), this;
}, r.prototype.setHeartbeatTimeout = function() {
clearTimeout(this.heartbeatTimeoutTimer);
if (this.transport && !this.transport.heartbeats()) return;
var e = this;
this.heartbeatTimeoutTimer = setTimeout(function() {
e.transport.onClose();
}, this.heartbeatTimeout);
}, r.prototype.packet = function(e) {
return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this;
}, r.prototype.setBuffer = function(e) {
this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer());
}, r.prototype.flushBuffer = function() {
this.transport.payload(this.buffer), this.buffer = [];
}, r.prototype.disconnect = function() {
if (this.connected || this.connecting) this.open && this.of("").packet({
type: "disconnect"
}), this.onDisconnect("booted");
return this;
}, r.prototype.disconnectSync = function() {
var e = t.util.request(), n = [ "http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid ].join("/") + "/?disconnect=1";
e.open("GET", n, !1), e.send(null), this.onDisconnect("booted");
}, r.prototype.isXDomain = function() {
var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
return this.options.host !== n.location.hostname || this.options.port != e;
}, r.prototype.onConnect = function() {
this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"));
}, r.prototype.onOpen = function() {
this.open = !0;
}, r.prototype.onClose = function() {
this.open = !1, clearTimeout(this.heartbeatTimeoutTimer);
}, r.prototype.onPacket = function(e) {
this.of(e.endpoint).onPacket(e);
}, r.prototype.onError = function(e) {
e && e.advice && e.advice === "reconnect" && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e);
}, r.prototype.onDisconnect = function(e) {
var t = this.connected, n = this.connecting;
this.connected = !1, this.connecting = !1, this.open = !1;
if (t || n) this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect());
}, r.prototype.reconnect = function() {
function i() {
if (e.connected) {
for (var t in e.namespaces) e.namespaces.hasOwnProperty(t) && "" !== t && e.namespaces[t].packet({
type: "connect"
});
e.publish("reconnect", e.transport.name, e.reconnectionAttempts);
}
clearTimeout(e.reconnectionTimer), e.removeListener("connect_failed", s), e.removeListener("connect", s), e.reconnecting = !1, delete e.reconnectionAttempts, delete e.reconnectionDelay, delete e.reconnectionTimer, delete e.redoTransports, e.options["try multiple transports"] = n;
}
function s() {
if (!e.reconnecting) return;
if (e.connected) return i();
if (e.connecting && e.reconnecting) return e.reconnectionTimer = setTimeout(s, 1e3);
e.reconnectionAttempts++ >= t ? e.redoTransports ? (e.publish("reconnect_failed"), i()) : (e.on("connect_failed", s), e.options["try multiple transports"] = !0, e.transports = e.origTransports, e.transport = e.getTransport(), e.redoTransports = !0, e.connect()) : (e.reconnectionDelay < r && (e.reconnectionDelay *= 2), e.connect(), e.publish("reconnecting", e.reconnectionDelay, e.reconnectionAttempts), e.reconnectionTimer = setTimeout(s, e.reconnectionDelay));
}
this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
var e = this, t = this.options["max reconnection attempts"], n = this.options["try multiple transports"], r = this.options["reconnection limit"];
this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(s, this.reconnectionDelay), this.on("connect", s);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n(e, t) {
this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets = 0, this.acks = {};
}
function r(e, t) {
this.namespace = e, this.name = t;
}
e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function() {
return this.socket.of.apply(this.socket, arguments);
}, n.prototype.packet = function(e) {
return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this;
}, n.prototype.send = function(e, t) {
var n = {
type: this.flags.json ? "json" : "message",
data: e
};
return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n);
}, n.prototype.emit = function(e) {
var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1], r = {
type: "event",
name: e
};
return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r);
}, n.prototype.disconnect = function() {
return this.name === "" ? this.socket.disconnect() : (this.packet({
type: "disconnect"
}), this.$emit("disconnect")), this;
}, n.prototype.onPacket = function(e) {
function r() {
n.packet({
type: "ack",
args: t.util.toArray(arguments),
ackId: e.id
});
}
var n = this;
switch (e.type) {
case "connect":
this.$emit("connect");
break;
case "disconnect":
this.name === "" ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
break;
case "message":
case "json":
var i = [ "message", e.data ];
e.ack == "data" ? i.push(r) : e.ack && this.packet({
type: "ack",
ackId: e.id
}), this.$emit.apply(this, i);
break;
case "event":
var i = [ e.name ].concat(e.args);
e.ack == "data" && i.push(r), this.$emit.apply(this, i);
break;
case "ack":
this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
break;
case "error":
e.advice ? this.socket.onError(e) : e.reason == "unauthorized" ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason);
}
}, r.prototype.send = function() {
this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments);
}, r.prototype.emit = function() {
this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r(e) {
t.Transport.apply(this, arguments);
}
e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open = function() {
var e = t.util.query(this.socket.options.query), r = this, i;
return i || (i = n.MozWebSocket || n.WebSocket), this.websocket = new i(this.prepareUrl() + e), this.websocket.onopen = function() {
r.onOpen(), r.socket.setBuffer(!1);
}, this.websocket.onmessage = function(e) {
r.onData(e.data);
}, this.websocket.onclose = function() {
r.onClose(), r.socket.setBuffer(!0);
}, this.websocket.onerror = function(e) {
r.onError(e);
}, this;
}, t.util.ua.iDevice ? r.prototype.send = function(e) {
var t = this;
return setTimeout(function() {
t.websocket.send(e);
}, 0), this;
} : r.prototype.send = function(e) {
return this.websocket.send(e), this;
}, r.prototype.payload = function(e) {
for (var t = 0, n = e.length; t < n; t++) this.packet(e[t]);
return this;
}, r.prototype.close = function() {
return this.websocket.close(), this;
}, r.prototype.onError = function(e) {
this.socket.onError(e);
}, r.prototype.scheme = function() {
return this.socket.options.secure ? "wss" : "ws";
}, r.check = function() {
return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n;
}, r.xdomainCheck = function() {
return !0;
}, t.transports.push("websocket");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n() {
t.Transport.websocket.apply(this, arguments);
}
e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
var e = this, n = arguments;
return WebSocket.__addTask(function() {
t.Transport.websocket.prototype.open.apply(e, n);
}), this;
}, n.prototype.send = function() {
var e = this, n = arguments;
return WebSocket.__addTask(function() {
t.Transport.websocket.prototype.send.apply(e, n);
}), this;
}, n.prototype.close = function() {
return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this;
}, n.prototype.ready = function(e, r) {
function i() {
var t = e.options, i = t["flash policy port"], o = [ "http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf" ];
n.loaded || (typeof WEB_SOCKET_SWF_LOCATION == "undefined" && (WEB_SOCKET_SWF_LOCATION = o.join("/")), i !== 843 && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + i), WebSocket.__initialize(), n.loaded = !0), r.call(s);
}
var s = this;
if (document.body) return i();
t.util.load(i);
}, n.check = function() {
return typeof WebSocket != "undefined" && "__initialize" in WebSocket && !!swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1;
}, n.xdomainCheck = function() {
return !0;
}, typeof window != "undefined" && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
if ("undefined" != typeof window) var swfobject = function() {
function C() {
if (b) return;
try {
var e = a.getElementsByTagName("body")[0].appendChild(U("span"));
e.parentNode.removeChild(e);
} catch (t) {
return;
}
b = !0;
var n = c.length;
for (var r = 0; r < n; r++) c[r]();
}
function k(e) {
b ? e() : c[c.length] = e;
}
function L(t) {
if (typeof u.addEventListener != e) u.addEventListener("load", t, !1); else if (typeof a.addEventListener != e) a.addEventListener("load", t, !1); else if (typeof u.attachEvent != e) z(u, "onload", t); else if (typeof u.onload == "function") {
var n = u.onload;
u.onload = function() {
n(), t();
};
} else u.onload = t;
}
function A() {
l ? O() : M();
}
function O() {
var n = a.getElementsByTagName("body")[0], r = U(t);
r.setAttribute("type", i);
var s = n.appendChild(r);
if (s) {
var o = 0;
(function() {
if (typeof s.GetVariable != e) {
var t = s.GetVariable("$version");
t && (t = t.split(" ")[1].split(","), T.pv = [ parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10) ]);
} else if (o < 10) {
o++, setTimeout(arguments.callee, 10);
return;
}
n.removeChild(r), s = null, M();
})();
} else M();
}
function M() {
var t = h.length;
if (t > 0) for (var n = 0; n < t; n++) {
var r = h[n].id, i = h[n].callbackFn, s = {
success: !1,
id: r
};
if (T.pv[0] > 0) {
var o = R(r);
if (o) if (W(h[n].swfVersion) && !(T.wk && T.wk < 312)) V(r, !0), i && (s.success = !0, s.ref = _(r), i(s)); else if (h[n].expressInstall && D()) {
var u = {};
u.data = h[n].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
var a = {}, f = o.getElementsByTagName("param"), l = f.length;
for (var c = 0; c < l; c++) f[c].getAttribute("name").toLowerCase() != "movie" && (a[f[c].getAttribute("name")] = f[c].getAttribute("value"));
P(u, a, r, i);
} else H(o), i && i(s);
} else {
V(r, !0);
if (i) {
var p = _(r);
p && typeof p.SetVariable != e && (s.success = !0, s.ref = p), i(s);
}
}
}
}
function _(n) {
var r = null, i = R(n);
if (i && i.nodeName == "OBJECT") if (typeof i.SetVariable != e) r = i; else {
var s = i.getElementsByTagName(t)[0];
s && (r = s);
}
return r;
}
function D() {
return !w && W("6.0.65") && (T.win || T.mac) && !(T.wk && T.wk < 312);
}
function P(t, n, r, i) {
w = !0, g = i || null, y = {
success: !1,
id: r
};
var o = R(r);
if (o) {
o.nodeName == "OBJECT" ? (v = B(o), m = null) : (v = o, m = r), t.id = s;
if (typeof t.width == e || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) t.width = "310";
if (typeof t.height == e || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) t.height = "137";
a.title = a.title.slice(0, 47) + " - Flash Player Installation";
var f = T.ie && T.win ? [ "Active" ].concat("").join("X") : "PlugIn", l = "MMredirectURL=" + u.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + a.title;
typeof n.flashvars != e ? n.flashvars += "&" + l : n.flashvars = l;
if (T.ie && T.win && o.readyState != 4) {
var c = U("div");
r += "SWFObjectNew", c.setAttribute("id", r), o.parentNode.insertBefore(c, o), o.style.display = "none", function() {
o.readyState == 4 ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10);
}();
}
j(t, n, r);
}
}
function H(e) {
if (T.ie && T.win && e.readyState != 4) {
var t = U("div");
e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(B(e), t), e.style.display = "none", function() {
e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
}();
} else e.parentNode.replaceChild(B(e), e);
}
function B(e) {
var n = U("div");
if (T.win && T.ie) n.innerHTML = e.innerHTML; else {
var r = e.getElementsByTagName(t)[0];
if (r) {
var i = r.childNodes;
if (i) {
var s = i.length;
for (var o = 0; o < s; o++) (i[o].nodeType != 1 || i[o].nodeName != "PARAM") && i[o].nodeType != 8 && n.appendChild(i[o].cloneNode(!0));
}
}
}
return n;
}
function j(n, r, s) {
var o, u = R(s);
if (T.wk && T.wk < 312) return o;
if (u) {
typeof n.id == e && (n.id = s);
if (T.ie && T.win) {
var a = "";
for (var f in n) n[f] != Object.prototype[f] && (f.toLowerCase() == "data" ? r.movie = n[f] : f.toLowerCase() == "styleclass" ? a += ' class="' + n[f] + '"' : f.toLowerCase() != "classid" && (a += " " + f + '="' + n[f] + '"'));
var l = "";
for (var c in r) r[c] != Object.prototype[c] && (l += '<param name="' + c + '" value="' + r[c] + '" />');
u.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + ">" + l + "</object>", p[p.length] = n.id, o = R(n.id);
} else {
var h = U(t);
h.setAttribute("type", i);
for (var d in n) n[d] != Object.prototype[d] && (d.toLowerCase() == "styleclass" ? h.setAttribute("class", n[d]) : d.toLowerCase() != "classid" && h.setAttribute(d, n[d]));
for (var v in r) r[v] != Object.prototype[v] && v.toLowerCase() != "movie" && F(h, v, r[v]);
u.parentNode.replaceChild(h, u), o = h;
}
}
return o;
}
function F(e, t, n) {
var r = U("param");
r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r);
}
function I(e) {
var t = R(e);
t && t.nodeName == "OBJECT" && (T.ie && T.win ? (t.style.display = "none", function() {
t.readyState == 4 ? q(e) : setTimeout(arguments.callee, 10);
}()) : t.parentNode.removeChild(t));
}
function q(e) {
var t = R(e);
if (t) {
for (var n in t) typeof t[n] == "function" && (t[n] = null);
t.parentNode.removeChild(t);
}
}
function R(e) {
var t = null;
try {
t = a.getElementById(e);
} catch (n) {}
return t;
}
function U(e) {
return a.createElement(e);
}
function z(e, t, n) {
e.attachEvent(t, n), d[d.length] = [ e, t, n ];
}
function W(e) {
var t = T.pv, n = e.split(".");
return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1;
}
function X(n, r, i, s) {
if (T.ie && T.mac) return;
var o = a.getElementsByTagName("head")[0];
if (!o) return;
var u = i && typeof i == "string" ? i : "screen";
s && (E = null, S = null);
if (!E || S != u) {
var f = U("style");
f.setAttribute("type", "text/css"), f.setAttribute("media", u), E = o.appendChild(f), T.ie && T.win && typeof a.styleSheets != e && a.styleSheets.length > 0 && (E = a.styleSheets[a.styleSheets.length - 1]), S = u;
}
T.ie && T.win ? E && typeof E.addRule == t && E.addRule(n, r) : E && typeof a.createTextNode != e && E.appendChild(a.createTextNode(n + " {" + r + "}"));
}
function V(e, t) {
if (!x) return;
var n = t ? "visible" : "hidden";
b && R(e) ? R(e).style.visibility = n : X("#" + e, "visibility:" + n);
}
function $(t) {
var n = /[\\\"<>\.;]/, r = n.exec(t) != null;
return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t;
}
var e = "undefined", t = "object", n = "Shockwave Flash", r = "ShockwaveFlash.ShockwaveFlash", i = "application/x-shockwave-flash", s = "SWFObjectExprInst", o = "onreadystatechange", u = window, a = document, f = navigator, l = !1, c = [ A ], h = [], p = [], d = [], v, m, g, y, b = !1, w = !1, E, S, x = !0, T = function() {
var s = typeof a.getElementById != e && typeof a.getElementsByTagName != e && typeof a.createElement != e, o = f.userAgent.toLowerCase(), c = f.platform.toLowerCase(), h = c ? /win/.test(c) : /win/.test(o), p = c ? /mac/.test(c) : /mac/.test(o), d = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, v = !1, m = [ 0, 0, 0 ], g = null;
if (typeof f.plugins != e && typeof f.plugins[n] == t) g = f.plugins[n].description, g && (typeof f.mimeTypes == e || !f.mimeTypes[i] || !!f.mimeTypes[i].enabledPlugin) && (l = !0, v = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), m[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof u[[ "Active" ].concat("Object").join("X")] != e) try {
var y = new (window[[ "Active" ].concat("Object").join("X")])(r);
y && (g = y.GetVariable("$version"), g && (v = !0, g = g.split(" ")[1].split(","), m = [ parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10) ]));
} catch (b) {}
return {
w3: s,
pv: m,
wk: d,
ie: v,
win: h,
mac: p
};
}(), N = function() {
if (!T.w3) return;
(typeof a.readyState != e && a.readyState == "complete" || typeof a.readyState == e && (a.getElementsByTagName("body")[0] || a.body)) && C(), b || (typeof a.addEventListener != e && a.addEventListener("DOMContentLoaded", C, !1), T.ie && T.win && (a.attachEvent(o, function() {
a.readyState == "complete" && (a.detachEvent(o, arguments.callee), C());
}), u == top && function() {
if (b) return;
try {
a.documentElement.doScroll("left");
} catch (e) {
setTimeout(arguments.callee, 0);
return;
}
C();
}()), T.wk && function() {
if (b) return;
if (!/loaded|complete/.test(a.readyState)) {
setTimeout(arguments.callee, 0);
return;
}
C();
}(), L(C));
}(), J = function() {
T.ie && T.win && window.attachEvent("onunload", function() {
var e = d.length;
for (var t = 0; t < e; t++) d[t][0].detachEvent(d[t][1], d[t][2]);
var n = p.length;
for (var r = 0; r < n; r++) I(p[r]);
for (var i in T) T[i] = null;
T = null;
for (var s in swfobject) swfobject[s] = null;
swfobject = null;
});
}();
return {
registerObject: function(e, t, n, r) {
if (T.w3 && e && t) {
var i = {};
i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, h[h.length] = i, V(e, !1);
} else r && r({
success: !1,
id: e
});
},
getObjectById: function(e) {
if (T.w3) return _(e);
},
embedSWF: function(n, r, i, s, o, u, a, f, l, c) {
var h = {
success: !1,
id: r
};
T.w3 && !(T.wk && T.wk < 312) && n && r && i && s && o ? (V(r, !1), k(function() {
i += "", s += "";
var p = {};
if (l && typeof l === t) for (var d in l) p[d] = l[d];
p.data = n, p.width = i, p.height = s;
var v = {};
if (f && typeof f === t) for (var m in f) v[m] = f[m];
if (a && typeof a === t) for (var g in a) typeof v.flashvars != e ? v.flashvars += "&" + g + "=" + a[g] : v.flashvars = g + "=" + a[g];
if (W(o)) {
var y = j(p, v, r);
p.id == r && V(r, !0), h.success = !0, h.ref = y;
} else {
if (u && D()) {
p.data = u, P(p, v, r, c);
return;
}
V(r, !0);
}
c && c(h);
})) : c && c(h);
},
switchOffAutoHideShow: function() {
x = !1;
},
ua: T,
getFlashPlayerVersion: function() {
return {
major: T.pv[0],
minor: T.pv[1],
release: T.pv[2]
};
},
hasFlashPlayerVersion: W,
createSWF: function(e, t, n) {
return T.w3 ? j(e, t, n) : undefined;
},
showExpressInstall: function(e, t, n, r) {
T.w3 && D() && P(e, t, n, r);
},
removeSWF: function(e) {
T.w3 && I(e);
},
createCSS: function(e, t, n, r) {
T.w3 && X(e, t, n, r);
},
addDomLoadEvent: k,
addLoadEvent: L,
getQueryParamValue: function(e) {
var t = a.location.search || a.location.hash;
if (t) {
/\?/.test(t) && (t = t.split("?")[1]);
if (e == null) return $(t);
var n = t.split("&");
for (var r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return $(n[r].substring(n[r].indexOf("=") + 1));
}
return "";
},
expressInstallCallback: function() {
if (w) {
var e = R(s);
e && v && (e.parentNode.replaceChild(v, e), m && (V(m, !0), T.ie && T.win && (v.style.display = "block")), g && g(y)), w = !1;
}
}
};
}();
(function() {
if ("undefined" == typeof window || window.WebSocket) return;
var e = window.console;
if (!e || !e.log || !e.error) e = {
log: function() {},
error: function() {}
};
if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
e.error("Flash Player >= 10.0.0 is required.");
return;
}
location.protocol == "file:" && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(e, t, n, r, i) {
var s = this;
s.__id = WebSocket.__nextId++, WebSocket.__instances[s.__id] = s, s.readyState = WebSocket.CONNECTING, s.bufferedAmount = 0, s.__events = {}, t ? typeof t == "string" && (t = [ t ]) : t = [], setTimeout(function() {
WebSocket.__addTask(function() {
WebSocket.__flash.create(s.__id, e, t, n || null, r || 0, i || null);
});
}, 0);
}, WebSocket.prototype.send = function(e) {
if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
return t < 0 ? !0 : (this.bufferedAmount += t, !1);
}, WebSocket.prototype.close = function() {
if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) return;
this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id);
}, WebSocket.prototype.addEventListener = function(e, t, n) {
e in this.__events || (this.__events[e] = []), this.__events[e].push(t);
}, WebSocket.prototype.removeEventListener = function(e, t, n) {
if (!(e in this.__events)) return;
var r = this.__events[e];
for (var i = r.length - 1; i >= 0; --i) if (r[i] === t) {
r.splice(i, 1);
break;
}
}, WebSocket.prototype.dispatchEvent = function(e) {
var t = this.__events[e.type] || [];
for (var n = 0; n < t.length; ++n) t[n](e);
var r = this["on" + e.type];
r && r(e);
}, WebSocket.prototype.__handleEvent = function(e) {
"readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol);
var t;
if (e.type == "open" || e.type == "error") t = this.__createSimpleEvent(e.type); else if (e.type == "close") t = this.__createSimpleEvent("close"); else {
if (e.type != "message") throw "unknown event type: " + e.type;
var n = decodeURIComponent(e.message);
t = this.__createMessageEvent("message", n);
}
this.dispatchEvent(t);
}, WebSocket.prototype.__createSimpleEvent = function(e) {
if (document.createEvent && window.Event) {
var t = document.createEvent("Event");
return t.initEvent(e, !1, !1), t;
}
return {
type: e,
bubbles: !1,
cancelable: !1
};
}, WebSocket.prototype.__createMessageEvent = function(e, t) {
if (document.createEvent && window.MessageEvent && !window.opera) {
var n = document.createEvent("MessageEvent");
return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n;
}
return {
type: e,
data: t,
bubbles: !1,
cancelable: !1
};
}, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(e) {
WebSocket.__addTask(function() {
WebSocket.__flash.loadManualPolicyFile(e);
});
}, WebSocket.__initialize = function() {
if (WebSocket.__flash) return;
WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation);
if (!window.WEB_SOCKET_SWF_LOCATION) {
e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
return;
}
var t = document.createElement("div");
t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
var n = document.createElement("div");
n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
hasPriority: !0,
swliveconnect: !0,
allowScriptAccess: "always"
}, null, function(t) {
t.success || e.error("[WebSocket] swfobject.embedSWF failed");
});
}, WebSocket.__onFlashInitialized = function() {
setTimeout(function() {
WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
WebSocket.__tasks = [];
}, 0);
}, WebSocket.__onFlashEvent = function() {
return setTimeout(function() {
try {
var t = WebSocket.__flash.receiveEvents();
for (var n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n]);
} catch (r) {
e.error(r);
}
}, 0), !0;
}, WebSocket.__log = function(t) {
e.log(decodeURIComponent(t));
}, WebSocket.__error = function(t) {
e.error(decodeURIComponent(t));
}, WebSocket.__addTask = function(e) {
WebSocket.__flash ? e() : WebSocket.__tasks.push(e);
}, WebSocket.__isFlashLite = function() {
if (!window.navigator || !window.navigator.mimeTypes) return !1;
var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
return !e || !e.enabledPlugin || !e.enabledPlugin.filename ? !1 : e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1;
}, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
WebSocket.__initialize();
}, !1) : window.attachEvent("onload", function() {
WebSocket.__initialize();
}));
})(), function(e, t, n) {
function r(e) {
if (!e) return;
t.Transport.apply(this, arguments), this.sendBuffer = [];
}
function i() {}
e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function() {
return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this;
}, r.prototype.payload = function(e) {
var n = [];
for (var r = 0, i = e.length; r < i; r++) n.push(t.parser.encodePacket(e[r]));
this.send(t.parser.encodePayload(n));
}, r.prototype.send = function(e) {
return this.post(e), this;
}, r.prototype.post = function(e) {
function r() {
this.readyState == 4 && (this.onreadystatechange = i, t.posting = !1, this.status == 200 ? t.socket.setBuffer(!1) : t.onClose());
}
function s() {
this.onload = i, t.socket.setBuffer(!1);
}
var t = this;
this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = s : this.sendXHR.onreadystatechange = r, this.sendXHR.send(e);
}, r.prototype.close = function() {
return this.onClose(), this;
}, r.prototype.request = function(e) {
var n = t.util.request(this.socket.isXDomain()), r = t.util.query(this.socket.options.query, "t=" + +(new Date));
n.open(e || "GET", this.prepareUrl() + r, !0);
if (e == "POST") try {
n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain";
} catch (i) {}
return n;
}, r.prototype.scheme = function() {
return this.socket.options.secure ? "https" : "http";
}, r.check = function(e, r) {
try {
var i = t.util.request(r), s = n.XDomainRequest && i instanceof XDomainRequest, o = e && e.options && e.options.secure ? "https:" : "http:", u = o != n.location.protocol;
if (i && (!s || !u)) return !0;
} catch (a) {}
return !1;
}, r.xdomainCheck = function(e) {
return r.check(e, !0);
};
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n(e) {
t.Transport.XHR.apply(this, arguments);
}
e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
this.doc = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
var e = this.doc.createElement("div");
e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
var n = this, r = t.util.query(this.socket.options.query, "t=" + +(new Date));
this.iframe.src = this.prepareUrl() + r, t.util.on(window, "unload", function() {
n.destroy();
});
}, n.prototype._ = function(e, t) {
this.onData(e);
try {
var n = t.getElementsByTagName("script")[0];
n.parentNode.removeChild(n);
} catch (r) {}
}, n.prototype.destroy = function() {
if (this.iframe) {
try {
this.iframe.src = "about:blank";
} catch (e) {}
this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage();
}
}, n.prototype.close = function() {
return this.destroy(), t.Transport.XHR.prototype.close.call(this);
}, n.check = function(e) {
if (typeof window != "undefined" && [ "Active" ].concat("Object").join("X") in window) try {
var n = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile");
return n && t.Transport.XHR.check(e);
} catch (r) {}
return !1;
}, n.xdomainCheck = function() {
return !1;
}, t.transports.push("htmlfile");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r() {
t.Transport.XHR.apply(this, arguments);
}
function i() {}
e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = "xhr-polling", r.prototype.heartbeats = function() {
return !1;
}, r.prototype.open = function() {
var e = this;
return t.Transport.XHR.prototype.open.call(e), !1;
}, r.prototype.get = function() {
function t() {
this.readyState == 4 && (this.onreadystatechange = i, this.status == 200 ? (e.onData(this.responseText), e.get()) : e.onClose());
}
function r() {
this.onload = i, this.onerror = i, e.onData(this.responseText), e.get();
}
function s() {
e.onClose();
}
if (!this.isOpen) return;
var e = this;
this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = r, this.xhr.onerror = s) : this.xhr.onreadystatechange = t, this.xhr.send(null);
}, r.prototype.onClose = function() {
t.Transport.XHR.prototype.onClose.call(this);
if (this.xhr) {
this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
try {
this.xhr.abort();
} catch (e) {}
this.xhr = null;
}
}, r.prototype.ready = function(e, n) {
var r = this;
t.util.defer(function() {
n.call(r);
});
}, t.transports.push("xhr-polling");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t, n) {
function i(e) {
t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
var n = this;
t.j.push(function(e) {
n._(e);
});
}
var r = n.document && "MozAppearance" in n.document.documentElement.style;
e["jsonp-polling"] = i, t.util.inherit(i, t.Transport["xhr-polling"]), i.prototype.name = "jsonp-polling", i.prototype.post = function(e) {
function a() {
f(), n.socket.setBuffer(!1);
}
function f() {
n.iframe && n.form.removeChild(n.iframe);
try {
u = document.createElement('<iframe name="' + n.iframeId + '">');
} catch (e) {
u = document.createElement("iframe"), u.name = n.iframeId;
}
u.id = n.iframeId, n.form.appendChild(u), n.iframe = u;
}
var n = this, r = t.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
if (!this.form) {
var i = document.createElement("form"), s = document.createElement("textarea"), o = this.iframeId = "socketio_iframe_" + this.index, u;
i.className = "socketio", i.style.position = "absolute", i.style.top = "0px", i.style.left = "0px", i.style.display = "none", i.target = o, i.method = "POST", i.setAttribute("accept-charset", "utf-8"), s.name = "d", i.appendChild(s), document.body.appendChild(i), this.form = i, this.area = s;
}
this.form.action = this.prepareUrl() + r, f(), this.area.value = t.JSON.stringify(e);
try {
this.form.submit();
} catch (l) {}
this.iframe.attachEvent ? u.onreadystatechange = function() {
n.iframe.readyState == "complete" && a();
} : this.iframe.onload = a, this.socket.setBuffer(!0);
}, i.prototype.get = function() {
var e = this, n = document.createElement("script"), i = t.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + i, n.onerror = function() {
e.onClose();
};
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(n, s), this.script = n, r && setTimeout(function() {
var e = document.createElement("iframe");
document.body.appendChild(e), document.body.removeChild(e);
}, 100);
}, i.prototype._ = function(e) {
return this.onData(e), this.isOpen && this.get(), this;
}, i.prototype.ready = function(e, n) {
var i = this;
if (!r) return n.call(this);
t.util.load(function() {
n.call(i);
});
}, i.check = function() {
return "document" in n;
}, i.xdomainCheck = function() {
return !0;
}, t.transports.push("jsonp-polling");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
})();

// source/Socket.js

enyo.kind({
name: "Socket",
kind: enyo.Component,
address: window.location.host,
connOptions: {},
socket: null,
init: {
on: {}
},
on: function(e, t) {
var n, r;
if (enyo.isString(e) && enyo.isFunction(t)) n = e, r = t, this.socket.on(n, r); else if (e === Object(e)) for (n in e) e.hasOwnProperty(n) && (r = e[n], this.socket.on(n, enyo.bind(this, r)));
},
emit: null,
create: function() {
this.inherited(arguments), this.socket = io.connect(this.address, this.connOptions), this.on(this.init.on), this.emit = enyo.bind(this.socket, this.socket.emit);
}
});

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: ""
},
events: {
onSetupItem: ""
},
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
bottomUp: !1,
create: function() {
this.inherited(arguments), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
var t = this.fetchRowNode(e);
t && (this.setupItem(e), t.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(e) {
if (this.hasNode()) {
var t = this.node.querySelectorAll('[index="' + e + '"]');
return t && t[0];
}
},
rowForEvent: function(e) {
var t = e.target, n = this.hasNode().id;
while (t && t.parentNode && t.id != n) {
var r = t.getAttribute && t.getAttribute("index");
if (r !== null) return Number(r);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n = t && t.querySelectorAll("#" + e.id);
n = n && n[0], e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1
},
events: {
onSetupItem: ""
},
handlers: {
onAnimateFinish: "animateFinish"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
} ]
} ],
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
generatePage: function(e, t) {
this.page = e;
var n = this.$.generator.rowOffset = this.rowsPerPage * this.page, r = this.$.generator.count = Math.min(this.count - n, this.rowsPerPage), i = this.$.generator.generateChildHtml();
t.setContent(i);
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
o != s && s > 0 && (this.pageHeights[e] = s, this.portSize += s - o);
}
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 == 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0), s = i % 2 == 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0), t && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return {
no: t,
height: r,
pos: n + r
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
return this.pageHeights[e] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments);
return this.update(this.getScrollTop()), n;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToRow: function(e) {
var t = Math.floor(e / this.rowsPerPage), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.inherited(arguments);
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath, i = r.y;
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath;
e.setScrollY(e.y - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0, this.$.strategy.$.scrollMath.setScrollY(this.pullHeight), this.$.strategy.$.scrollMath.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
calcArrangementDifference: function(e, t, n, r) {},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android) {
var i = t.left, s = t.top, i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r;
enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n == 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex, t = this.container.toIndex;
this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var r;
for (var i = 0, s = 0, o, u; u = e[i]; i++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (r = u);
if (r) {
var a = n.width - s;
r.width = a >= 0 ? a : r.width;
}
for (var i = 0, f = t.left, o, u; u = e[i]; i++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n = this.container.getPanels(), r = this.container.clamp(t), i = this.containerBounds.width;
for (var s = r, o = 0, u; u = n[s]; s++) {
o += u.width + u.marginWidth;
if (o > i) break;
}
var a = i - o, f = 0;
if (a > 0) {
var l = r;
for (var s = r - 1, c = 0, u; u = n[s]; s--) {
c += u.width + u.marginWidth;
if (a - c <= 0) {
f = a - c, r = s;
break;
}
}
}
for (var s = 0, h = this.containerPadding.left + f, p, u; u = n[s]; s++) p = u.width + u.marginWidth, s < r ? this.arrangeControl(u, {
left: -p
}) : (this.arrangeControl(u, {
left: Math.floor(h)
}), h += p);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o; o = n[r]; r++) this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
if (this.container.getPanels().length == 1) {
var n = {};
n[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], n);
return;
}
var r = Math.floor(this.container.getPanels().length / 2), i = this.getOrderedControls(Math.floor(t) - r), s = this.containerBounds[this.axisSize] - this.margin - this.margin, o = this.margin - s * r;
for (var u = 0, a, n, f; a = i[u]; u++) n = {}, n[this.axisPosition] = o, this.arrangeControl(a, n), o += s;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
removeControl: function(e) {
this.inherited(arguments), this.controls.length > 1 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels();
return e[this.index];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), this.dragging || (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
ondown: "downHandler",
onclick: ""
},
downHandler: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !0;
},
tap: function(e, t) {
return !this.disabled;
}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v"
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
});
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
var e = this.orient == "v" ? "height" : "width", t = this.hasNode();
t && (t.style[e] = this.$.client.domStyles[e] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling ? this.createComponents(this.childComponents, {
isChrome: !0
}) : enyo.nop, this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop;
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop, this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop, this.removeClass("onyx-menu-up"), this.floating ? enyo.noop : this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: i.left - (e.left + e.width - r)
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
tag: "div",
classes: "onyx-menu-item",
events: {
onSelect: ""
},
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e !== undefined && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e)), this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected");
var t = this.$.flyweight.fetchRowNode(this.selected);
this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
highlander: !0,
defaultKind: "onyx.RadioButton"
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.valueChanged();
},
valueChanged: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return this.tapped = !0, this.animateTo(n), !0;
}
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.removeFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
statics: {
addFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r != undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.setClassAttribute(e.getClassAttribute()) : e.addClass(t);
}), e.removeClass(t);
}
},
removeFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r != undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.removeClass(t) : e.setClassAttribute(e.getClassAttribute());
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
fit: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu",
prepend: !0
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r = undefined, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex != undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex == undefined && (c.toolbarIndex = t);
}
}
});

// PulloutToolbar.js

enyo.kind({
name: "sugardave.PulloutToolbar",
kind: enyo.Popup,
floating: !0,
centered: !1,
modal: !1,
edge: "left",
classes: "pullout-toolbar enyo-unselectable",
published: {
autoCollapse: !0,
pulltabPosition: -1
},
create: function() {
this.inherited(arguments), this.pulltabPositionChanged();
},
initComponents: function() {
var e = [ "top", "right", "bottom", "left" ], t;
for (var n in e) t = e[n], this.removeClass(t);
this.removeClass("horizontal"), this.removeClass("vertical"), this.createClient(), this.addClass(this.edge);
switch (this.edge) {
case "top":
case "bottom":
this.$.clientWrapper.setLayoutKind(enyo.FittableColumnsLayout), this.addClass("horizontal"), this.$.slider.setLayoutKind(enyo.FittableRowsLayout), this.$.client.setLayoutKind(enyo.FittableColumnsLayout);
break;
case "right":
case "left":
this.$.clientWrapper.setLayoutKind(enyo.FittableRowsLayout), this.addClass("vertical"), this.$.slider.setLayoutKind(enyo.FittableColumnsLayout), this.$.client.setLayoutKind(enyo.FittableRowsLayout);
}
this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), setTimeout(enyo.bind(this, "setSlider", 0));
},
pulltabPositionChanged: function() {
var e = [ "left", "top", "center", "right", "bottom" ], t, n = this.edge === "left" || this.edge === "right" ? "vertical" : "horizontal";
for (var r in e) t = e[r], this.$.pulltab.removeClass(t);
switch (this.pulltabPosition) {
case -1:
t = n === "vertical" ? "top" : "left";
break;
case 0:
t = "center";
break;
case 1:
t = n === "vertical" ? "bottom" : "right";
}
this.$.pulltab.addClass(t);
},
createClient: function() {
var e = [];
this.createComponent({
name: "slider",
kind: enyo.Slideable,
overMoving: !1,
onChange: "checkState",
classes: "slider"
});
switch (this.edge) {
case "top":
case "left":
e = [ {
name: "clientWrapper",
components: [ {
name: "client",
fit: !0,
classes: "onyx-toolbar onyx-toolbar-inline"
} ]
}, {
name: "pulltab",
kind: enyo.Control,
classes: "onyx-toolbar pulltab",
ontap: "toggleToolbar",
components: [ {
kind: "onyx.Grabber",
classes: "grabber"
} ]
} ];
break;
case "bottom":
case "right":
e = [ {
name: "pulltab",
kind: enyo.Control,
classes: "onyx-toolbar pulltab",
ontap: "toggleToolbar",
components: [ {
kind: "onyx.Grabber",
classes: "grabber"
} ]
}, {
name: "clientWrapper",
components: [ {
name: "client",
fit: !0,
classes: "onyx-toolbar onyx-toolbar-inline"
} ]
} ];
}
this.$.slider.createComponents(e, {
owner: this
});
},
hide: function(e) {
(this.autoCollapse || e) && this.collapse(!e);
},
show: function() {
this.inherited(arguments);
},
collapse: function(e) {
var t = this.hasClass("left") || this.hasClass("top") ? this.$.slider.getMin() : this.$.slider.getMax();
e ? this.$.slider.animateTo(t) : this.$.slider.setValue(t);
},
expand: function(e) {
this.log();
var t = this.hasClass("left") || this.hasClass("top") ? this.$.slider.getMax() : this.$.slider.getMin();
e ? this.$.slider.animateTo(t) : this.$.slider.setValue(t);
},
toggleToolbar: function() {
this.log(), this.hasClass("collapsed") ? this.expand(!0) : this.collapse(!0);
},
setSlider: function() {
var e = this.$.slider, t = e.hasNode(), n = t.clientWidth, r = t.clientHeight, i, s, o, u, a;
switch (this.edge) {
case "top":
i = "v", s = "px", u = 0, o = -r;
break;
case "right":
i = "h", s = "%", u = 100, o = 0;
break;
case "bottom":
i = "v", s = "%", u = 100, o = 0;
break;
case "left":
i = "h", s = "px", u = 0, o = -n;
}
e.setAxis(i), e.setUnit(s), e.setMin(o), e.setMax(u);
},
checkState: function() {
this.log();
switch (this.edge) {
case "top":
case "left":
this.$.slider.isAtMax() ? this.removeClass("collapsed") : this.$.slider.isAtMin() && this.addClass("collapsed");
break;
case "bottom":
case "right":
this.$.slider.isAtMin() ? this.removeClass("collapsed") : this.$.slider.isAtMax() && this.addClass("collapsed");
}
}
});

// $lib/socket.io-client/dist/socket.io.js

var io = "undefined" == typeof module ? {} : module.exports;

(function() {
(function(e, t) {
var n = e;
n.version = "0.9.10", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function(e, r) {
var i = n.util.parseUri(e), s, o;
t && t.location && (i.protocol = i.protocol || t.location.protocol.slice(0, -1), i.host = i.host || (t.document ? t.document.domain : t.location.hostname), i.port = i.port || t.location.port), s = n.util.uniqueUri(i);
var u = {
host: i.host,
secure: "https" == i.protocol,
port: i.port || ("https" == i.protocol ? 443 : 80),
query: i.query || ""
};
n.util.merge(u, r);
if (u["force new connection"] || !n.sockets[s]) o = new n.Socket(u);
return !u["force new connection"] && o && (n.sockets[s] = o), o = o || n.sockets[s], o.of(i.path.length > 1 ? i.path : "");
};
})("object" == typeof module ? module.exports : this.io = {}, this), function(e, t) {
var n = e.util = {}, r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, i = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
n.parseUri = function(e) {
var t = r.exec(e || ""), n = {}, s = 14;
while (s--) n[i[s]] = t[s] || "";
return n;
}, n.uniqueUri = function(e) {
var n = e.protocol, r = e.host, i = e.port;
return "document" in t ? (r = r || document.domain, i = i || (n == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)) : (r = r || "localhost", !i && n == "https" && (i = 443)), (n || "http") + "://" + r + ":" + (i || 80);
}, n.query = function(e, t) {
var r = n.chunkQuery(e || ""), i = [];
n.merge(r, n.chunkQuery(t || ""));
for (var s in r) r.hasOwnProperty(s) && i.push(s + "=" + r[s]);
return i.length ? "?" + i.join("&") : "";
}, n.chunkQuery = function(e) {
var t = {}, n = e.split("&"), r = 0, i = n.length, s;
for (; r < i; ++r) s = n[r].split("="), s[0] && (t[s[0]] = s[1]);
return t;
};
var s = !1;
n.load = function(e) {
if ("document" in t && document.readyState === "complete" || s) return e();
n.on(t, "load", e, !1);
}, n.on = function(e, t, n, r) {
e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r);
}, n.request = function(e) {
if (e && "undefined" != typeof XDomainRequest) return new XDomainRequest;
if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
if (!e) try {
return new (window[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
} catch (t) {}
return null;
}, "undefined" != typeof window && n.load(function() {
s = !0;
}), n.defer = function(e) {
if (!n.ua.webkit || "undefined" != typeof importScripts) return e();
n.load(function() {
setTimeout(e, 100);
});
}, n.merge = function(t, r, i, s) {
var o = s || [], u = typeof i == "undefined" ? 2 : i, a;
for (a in r) r.hasOwnProperty(a) && n.indexOf(o, a) < 0 && (typeof t[a] != "object" || !u ? (t[a] = r[a], o.push(r[a])) : n.merge(t[a], r[a], u - 1, o));
return t;
}, n.mixin = function(e, t) {
n.merge(e.prototype, t.prototype);
}, n.inherit = function(e, t) {
function n() {}
n.prototype = t.prototype, e.prototype = new n;
}, n.isArray = Array.isArray || function(e) {
return Object.prototype.toString.call(e) === "[object Array]";
}, n.intersect = function(e, t) {
var r = [], i = e.length > t.length ? e : t, s = e.length > t.length ? t : e;
for (var o = 0, u = s.length; o < u; o++) ~n.indexOf(i, s[o]) && r.push(s[o]);
return r;
}, n.indexOf = function(e, t, n) {
for (var r = e.length, n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++) ;
return r <= n ? -1 : n;
}, n.toArray = function(e) {
var t = [];
for (var n = 0, r = e.length; n < r; n++) t.push(e[n]);
return t;
}, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
try {
var e = new XMLHttpRequest;
} catch (t) {
return !1;
}
return e.withCredentials != undefined;
}(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
}("undefined" != typeof io ? io : module.exports, this), function(e, t) {
function n() {}
e.EventEmitter = n, n.prototype.on = function(e, n) {
return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [ this.$events[e], n ] : this.$events[e] = n, this;
}, n.prototype.addListener = n.prototype.on, n.prototype.once = function(e, t) {
function r() {
n.removeListener(e, r), t.apply(this, arguments);
}
var n = this;
return r.listener = t, this.on(e, r), this;
}, n.prototype.removeListener = function(e, n) {
if (this.$events && this.$events[e]) {
var r = this.$events[e];
if (t.util.isArray(r)) {
var i = -1;
for (var s = 0, o = r.length; s < o; s++) if (r[s] === n || r[s].listener && r[s].listener === n) {
i = s;
break;
}
if (i < 0) return this;
r.splice(i, 1), r.length || delete this.$events[e];
} else (r === n || r.listener && r.listener === n) && delete this.$events[e];
}
return this;
}, n.prototype.removeAllListeners = function(e) {
return e === undefined ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this);
}, n.prototype.listeners = function(e) {
return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [ this.$events[e] ]), this.$events[e];
}, n.prototype.emit = function(e) {
if (!this.$events) return !1;
var n = this.$events[e];
if (!n) return !1;
var r = Array.prototype.slice.call(arguments, 1);
if ("function" == typeof n) n.apply(this, r); else {
if (!t.util.isArray(n)) return !1;
var i = n.slice();
for (var s = 0, o = i.length; s < o; s++) i[s].apply(this, r);
}
return !0;
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(exports, nativeJSON) {
"use strict";
function f(e) {
return e < 10 ? "0" + e : e;
}
function date(e, t) {
return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null;
}
function quote(e) {
return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
var t = meta[e];
return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}) + '"' : '"' + e + '"';
}
function str(e, t) {
var n, r, i, s, o = gap, u, a = t[e];
a instanceof Date && (a = date(e)), typeof rep == "function" && (a = rep.call(t, e, a));
switch (typeof a) {
case "string":
return quote(a);
case "number":
return isFinite(a) ? String(a) : "null";
case "boolean":
case "null":
return String(a);
case "object":
if (!a) return "null";
gap += indent, u = [];
if (Object.prototype.toString.apply(a) === "[object Array]") {
s = a.length;
for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i;
}
if (rep && typeof rep == "object") {
s = rep.length;
for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
} else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i;
}
}
if (nativeJSON && nativeJSON.parse) return exports.JSON = {
parse: nativeJSON.parse,
stringify: nativeJSON.stringify
};
var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b": "\\b",
"	": "\\t",
"\n": "\\n",
"\f": "\\f",
"\r": "\\r",
'"': '\\"',
"\\": "\\\\"
}, rep;
JSON.stringify = function(e, t, n) {
var r;
gap = "", indent = "";
if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " "; else typeof n == "string" && (indent = n);
rep = t;
if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
"": e
});
throw new Error("JSON.stringify");
}, JSON.parse = function(text, reviver) {
function walk(e, t) {
var n, r, i = e[t];
if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
return reviver.call(e, t, i);
}
var j;
text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}));
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
"": j
}, "") : j;
throw new SyntaxError("JSON.parse");
};
}("undefined" != typeof io ? io : module.exports, typeof JSON != "undefined" ? JSON : undefined), function(e, t) {
var n = e.parser = {}, r = n.packets = [ "disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop" ], i = n.reasons = [ "transport not supported", "client not handshaken", "unauthorized" ], s = n.advice = [ "reconnect" ], o = t.JSON, u = t.util.indexOf;
n.encodePacket = function(e) {
var t = u(r, e.type), n = e.id || "", a = e.endpoint || "", f = e.ack, l = null;
switch (e.type) {
case "error":
var c = e.reason ? u(i, e.reason) : "", h = e.advice ? u(s, e.advice) : "";
if (c !== "" || h !== "") l = c + (h !== "" ? "+" + h : "");
break;
case "message":
e.data !== "" && (l = e.data);
break;
case "event":
var p = {
name: e.name
};
e.args && e.args.length && (p.args = e.args), l = o.stringify(p);
break;
case "json":
l = o.stringify(e.data);
break;
case "connect":
e.qs && (l = e.qs);
break;
case "ack":
l = e.ackId + (e.args && e.args.length ? "+" + o.stringify(e.args) : "");
}
var d = [ t, n + (f == "data" ? "+" : ""), a ];
return l !== null && l !== undefined && d.push(l), d.join(":");
}, n.encodePayload = function(e) {
var t = "";
if (e.length == 1) return e[0];
for (var n = 0, r = e.length; n < r; n++) {
var i = e[n];
t += "\ufffd" + i.length + "\ufffd" + e[n];
}
return t;
};
var a = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
n.decodePacket = function(e) {
var t = e.match(a);
if (!t) return {};
var n = t[2] || "", e = t[5] || "", u = {
type: r[t[1]],
endpoint: t[4] || ""
};
n && (u.id = n, t[3] ? u.ack = "data" : u.ack = !0);
switch (u.type) {
case "error":
var t = e.split("+");
u.reason = i[t[0]] || "", u.advice = s[t[1]] || "";
break;
case "message":
u.data = e || "";
break;
case "event":
try {
var f = o.parse(e);
u.name = f.name, u.args = f.args;
} catch (l) {}
u.args = u.args || [];
break;
case "json":
try {
u.data = o.parse(e);
} catch (l) {}
break;
case "connect":
u.qs = e || "";
break;
case "ack":
var t = e.match(/^([0-9]+)(\+)?(.*)/);
if (t) {
u.ackId = t[1], u.args = [];
if (t[3]) try {
u.args = t[3] ? o.parse(t[3]) : [];
} catch (l) {}
}
break;
case "disconnect":
case "heartbeat":
}
return u;
}, n.decodePayload = function(e) {
if (e.charAt(0) == "\ufffd") {
var t = [];
for (var r = 1, i = ""; r < e.length; r++) e.charAt(r) == "\ufffd" ? (t.push(n.decodePacket(e.substr(r + 1).substr(0, i))), r += Number(i) + 1, i = "") : i += e.charAt(r);
return t;
}
return [ n.decodePacket(e) ];
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t) {
function n(e, t) {
this.socket = e, this.sessid = t;
}
e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function() {
return !0;
}, n.prototype.onData = function(e) {
this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
if (e !== "") {
var n = t.parser.decodePayload(e);
if (n && n.length) for (var r = 0, i = n.length; r < i; r++) this.onPacket(n[r]);
}
return this;
}, n.prototype.onPacket = function(e) {
return this.socket.setHeartbeatTimeout(), e.type == "heartbeat" ? this.onHeartbeat() : (e.type == "connect" && e.endpoint == "" && this.onConnect(), e.type == "error" && e.advice == "reconnect" && (this.isOpen = !1), this.socket.onPacket(e), this);
}, n.prototype.setCloseTimeout = function() {
if (!this.closeTimeout) {
var e = this;
this.closeTimeout = setTimeout(function() {
e.onDisconnect();
}, this.socket.closeTimeout);
}
}, n.prototype.onDisconnect = function() {
return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this;
}, n.prototype.onConnect = function() {
return this.socket.onConnect(), this;
}, n.prototype.clearCloseTimeout = function() {
this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null);
}, n.prototype.clearTimeouts = function() {
this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout);
}, n.prototype.packet = function(e) {
this.send(t.parser.encodePacket(e));
}, n.prototype.onHeartbeat = function(e) {
this.packet({
type: "heartbeat"
});
}, n.prototype.onOpen = function() {
this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen();
}, n.prototype.onClose = function() {
var e = this;
this.isOpen = !1, this.socket.onClose(), this.onDisconnect();
}, n.prototype.prepareUrl = function() {
var e = this.socket.options;
return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid;
}, n.prototype.ready = function(e, t) {
t.call(this);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r(e) {
this.options = {
port: 80,
secure: !1,
document: "document" in n ? document : !1,
resource: "socket.io",
transports: t.transports,
"connect timeout": 1e4,
"try multiple transports": !0,
reconnect: !0,
"reconnection delay": 500,
"reconnection limit": Infinity,
"reopen delay": 3e3,
"max reconnection attempts": 10,
"sync disconnect on unload": !1,
"auto connect": !0,
"flash policy port": 10843,
manualFlush: !1
}, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1;
if (this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
var r = this;
t.util.on(n, "beforeunload", function() {
r.disconnectSync();
}, !1);
}
this.options["auto connect"] && this.connect();
}
function i() {}
e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function(e) {
return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), e !== "" && this.namespaces[e].packet({
type: "connect"
})), this.namespaces[e];
}, r.prototype.publish = function() {
this.emit.apply(this, arguments);
var e;
for (var t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments));
}, r.prototype.handshake = function(e) {
function s(t) {
t instanceof Error ? (n.connecting = !1, n.onError(t.message)) : e.apply(null, t.split(":"));
}
var n = this, r = this.options, o = [ "http" + (r.secure ? "s" : "") + ":/", r.host + ":" + r.port, r.resource, t.protocol, t.util.query(this.options.query, "t=" + +(new Date)) ].join("/");
if (this.isXDomain() && !t.util.ua.hasCORS) {
var u = document.getElementsByTagName("script")[0], a = document.createElement("script");
a.src = o + "&jsonp=" + t.j.length, u.parentNode.insertBefore(a, u), t.j.push(function(e) {
s(e), a.parentNode.removeChild(a);
});
} else {
var f = t.util.request();
f.open("GET", o, !0), this.isXDomain() && (f.withCredentials = !0), f.onreadystatechange = function() {
f.readyState == 4 && (f.onreadystatechange = i, f.status == 200 ? s(f.responseText) : f.status == 403 ? n.onError(f.responseText) : (n.connecting = !1, !n.reconnecting && n.onError(f.responseText)));
}, f.send(null);
}
}, r.prototype.getTransport = function(e) {
var n = e || this.transports, r;
for (var i = 0, s; s = n[i]; i++) if (t.Transport[s] && t.Transport[s].check(this) && (!this.isXDomain() || t.Transport[s].xdomainCheck(this))) return new t.Transport[s](this, this.sessionid);
return null;
}, r.prototype.connect = function(e) {
if (this.connecting) return this;
var n = this;
return n.connecting = !0, this.handshake(function(r, i, s, o) {
function u(e) {
n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e);
if (!n.transport) return n.publish("connect_failed");
n.transport.ready(n, function() {
n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
if (!n.connected) {
n.connecting = !1;
if (n.options["try multiple transports"]) {
var e = n.transports;
while (e.length > 0 && e.splice(0, 1)[0] != n.transport.name) ;
e.length ? u(e) : n.publish("connect_failed");
}
}
}, n.options["connect timeout"]));
});
}
n.sessionid = r, n.closeTimeout = s * 1e3, n.heartbeatTimeout = i * 1e3, n.transports || (n.transports = n.origTransports = o ? t.util.intersect(o.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), u(n.transports), n.once("connect", function() {
clearTimeout(n.connectTimeoutTimer), e && typeof e == "function" && e();
});
}), this;
}, r.prototype.setHeartbeatTimeout = function() {
clearTimeout(this.heartbeatTimeoutTimer);
if (this.transport && !this.transport.heartbeats()) return;
var e = this;
this.heartbeatTimeoutTimer = setTimeout(function() {
e.transport.onClose();
}, this.heartbeatTimeout);
}, r.prototype.packet = function(e) {
return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this;
}, r.prototype.setBuffer = function(e) {
this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer());
}, r.prototype.flushBuffer = function() {
this.transport.payload(this.buffer), this.buffer = [];
}, r.prototype.disconnect = function() {
if (this.connected || this.connecting) this.open && this.of("").packet({
type: "disconnect"
}), this.onDisconnect("booted");
return this;
}, r.prototype.disconnectSync = function() {
var e = t.util.request(), n = [ "http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid ].join("/") + "/?disconnect=1";
e.open("GET", n, !1), e.send(null), this.onDisconnect("booted");
}, r.prototype.isXDomain = function() {
var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
return this.options.host !== n.location.hostname || this.options.port != e;
}, r.prototype.onConnect = function() {
this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"));
}, r.prototype.onOpen = function() {
this.open = !0;
}, r.prototype.onClose = function() {
this.open = !1, clearTimeout(this.heartbeatTimeoutTimer);
}, r.prototype.onPacket = function(e) {
this.of(e.endpoint).onPacket(e);
}, r.prototype.onError = function(e) {
e && e.advice && e.advice === "reconnect" && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e);
}, r.prototype.onDisconnect = function(e) {
var t = this.connected, n = this.connecting;
this.connected = !1, this.connecting = !1, this.open = !1;
if (t || n) this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect());
}, r.prototype.reconnect = function() {
function i() {
if (e.connected) {
for (var t in e.namespaces) e.namespaces.hasOwnProperty(t) && "" !== t && e.namespaces[t].packet({
type: "connect"
});
e.publish("reconnect", e.transport.name, e.reconnectionAttempts);
}
clearTimeout(e.reconnectionTimer), e.removeListener("connect_failed", s), e.removeListener("connect", s), e.reconnecting = !1, delete e.reconnectionAttempts, delete e.reconnectionDelay, delete e.reconnectionTimer, delete e.redoTransports, e.options["try multiple transports"] = n;
}
function s() {
if (!e.reconnecting) return;
if (e.connected) return i();
if (e.connecting && e.reconnecting) return e.reconnectionTimer = setTimeout(s, 1e3);
e.reconnectionAttempts++ >= t ? e.redoTransports ? (e.publish("reconnect_failed"), i()) : (e.on("connect_failed", s), e.options["try multiple transports"] = !0, e.transports = e.origTransports, e.transport = e.getTransport(), e.redoTransports = !0, e.connect()) : (e.reconnectionDelay < r && (e.reconnectionDelay *= 2), e.connect(), e.publish("reconnecting", e.reconnectionDelay, e.reconnectionAttempts), e.reconnectionTimer = setTimeout(s, e.reconnectionDelay));
}
this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
var e = this, t = this.options["max reconnection attempts"], n = this.options["try multiple transports"], r = this.options["reconnection limit"];
this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(s, this.reconnectionDelay), this.on("connect", s);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n(e, t) {
this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets = 0, this.acks = {};
}
function r(e, t) {
this.namespace = e, this.name = t;
}
e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function() {
return this.socket.of.apply(this.socket, arguments);
}, n.prototype.packet = function(e) {
return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this;
}, n.prototype.send = function(e, t) {
var n = {
type: this.flags.json ? "json" : "message",
data: e
};
return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n);
}, n.prototype.emit = function(e) {
var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1], r = {
type: "event",
name: e
};
return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r);
}, n.prototype.disconnect = function() {
return this.name === "" ? this.socket.disconnect() : (this.packet({
type: "disconnect"
}), this.$emit("disconnect")), this;
}, n.prototype.onPacket = function(e) {
function r() {
n.packet({
type: "ack",
args: t.util.toArray(arguments),
ackId: e.id
});
}
var n = this;
switch (e.type) {
case "connect":
this.$emit("connect");
break;
case "disconnect":
this.name === "" ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
break;
case "message":
case "json":
var i = [ "message", e.data ];
e.ack == "data" ? i.push(r) : e.ack && this.packet({
type: "ack",
ackId: e.id
}), this.$emit.apply(this, i);
break;
case "event":
var i = [ e.name ].concat(e.args);
e.ack == "data" && i.push(r), this.$emit.apply(this, i);
break;
case "ack":
this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
break;
case "error":
e.advice ? this.socket.onError(e) : e.reason == "unauthorized" ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason);
}
}, r.prototype.send = function() {
this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments);
}, r.prototype.emit = function() {
this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r(e) {
t.Transport.apply(this, arguments);
}
e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open = function() {
var e = t.util.query(this.socket.options.query), r = this, i;
return i || (i = n.MozWebSocket || n.WebSocket), this.websocket = new i(this.prepareUrl() + e), this.websocket.onopen = function() {
r.onOpen(), r.socket.setBuffer(!1);
}, this.websocket.onmessage = function(e) {
r.onData(e.data);
}, this.websocket.onclose = function() {
r.onClose(), r.socket.setBuffer(!0);
}, this.websocket.onerror = function(e) {
r.onError(e);
}, this;
}, t.util.ua.iDevice ? r.prototype.send = function(e) {
var t = this;
return setTimeout(function() {
t.websocket.send(e);
}, 0), this;
} : r.prototype.send = function(e) {
return this.websocket.send(e), this;
}, r.prototype.payload = function(e) {
for (var t = 0, n = e.length; t < n; t++) this.packet(e[t]);
return this;
}, r.prototype.close = function() {
return this.websocket.close(), this;
}, r.prototype.onError = function(e) {
this.socket.onError(e);
}, r.prototype.scheme = function() {
return this.socket.options.secure ? "wss" : "ws";
}, r.check = function() {
return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n;
}, r.xdomainCheck = function() {
return !0;
}, t.transports.push("websocket");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n() {
t.Transport.websocket.apply(this, arguments);
}
e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
var e = this, n = arguments;
return WebSocket.__addTask(function() {
t.Transport.websocket.prototype.open.apply(e, n);
}), this;
}, n.prototype.send = function() {
var e = this, n = arguments;
return WebSocket.__addTask(function() {
t.Transport.websocket.prototype.send.apply(e, n);
}), this;
}, n.prototype.close = function() {
return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this;
}, n.prototype.ready = function(e, r) {
function i() {
var t = e.options, i = t["flash policy port"], o = [ "http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf" ];
n.loaded || (typeof WEB_SOCKET_SWF_LOCATION == "undefined" && (WEB_SOCKET_SWF_LOCATION = o.join("/")), i !== 843 && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + i), WebSocket.__initialize(), n.loaded = !0), r.call(s);
}
var s = this;
if (document.body) return i();
t.util.load(i);
}, n.check = function() {
return typeof WebSocket != "undefined" && "__initialize" in WebSocket && !!swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1;
}, n.xdomainCheck = function() {
return !0;
}, typeof window != "undefined" && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
if ("undefined" != typeof window) var swfobject = function() {
function C() {
if (b) return;
try {
var e = a.getElementsByTagName("body")[0].appendChild(U("span"));
e.parentNode.removeChild(e);
} catch (t) {
return;
}
b = !0;
var n = c.length;
for (var r = 0; r < n; r++) c[r]();
}
function k(e) {
b ? e() : c[c.length] = e;
}
function L(t) {
if (typeof u.addEventListener != e) u.addEventListener("load", t, !1); else if (typeof a.addEventListener != e) a.addEventListener("load", t, !1); else if (typeof u.attachEvent != e) z(u, "onload", t); else if (typeof u.onload == "function") {
var n = u.onload;
u.onload = function() {
n(), t();
};
} else u.onload = t;
}
function A() {
l ? O() : M();
}
function O() {
var n = a.getElementsByTagName("body")[0], r = U(t);
r.setAttribute("type", i);
var s = n.appendChild(r);
if (s) {
var o = 0;
(function() {
if (typeof s.GetVariable != e) {
var t = s.GetVariable("$version");
t && (t = t.split(" ")[1].split(","), T.pv = [ parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10) ]);
} else if (o < 10) {
o++, setTimeout(arguments.callee, 10);
return;
}
n.removeChild(r), s = null, M();
})();
} else M();
}
function M() {
var t = h.length;
if (t > 0) for (var n = 0; n < t; n++) {
var r = h[n].id, i = h[n].callbackFn, s = {
success: !1,
id: r
};
if (T.pv[0] > 0) {
var o = R(r);
if (o) if (W(h[n].swfVersion) && !(T.wk && T.wk < 312)) V(r, !0), i && (s.success = !0, s.ref = _(r), i(s)); else if (h[n].expressInstall && D()) {
var u = {};
u.data = h[n].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
var a = {}, f = o.getElementsByTagName("param"), l = f.length;
for (var c = 0; c < l; c++) f[c].getAttribute("name").toLowerCase() != "movie" && (a[f[c].getAttribute("name")] = f[c].getAttribute("value"));
P(u, a, r, i);
} else H(o), i && i(s);
} else {
V(r, !0);
if (i) {
var p = _(r);
p && typeof p.SetVariable != e && (s.success = !0, s.ref = p), i(s);
}
}
}
}
function _(n) {
var r = null, i = R(n);
if (i && i.nodeName == "OBJECT") if (typeof i.SetVariable != e) r = i; else {
var s = i.getElementsByTagName(t)[0];
s && (r = s);
}
return r;
}
function D() {
return !w && W("6.0.65") && (T.win || T.mac) && !(T.wk && T.wk < 312);
}
function P(t, n, r, i) {
w = !0, g = i || null, y = {
success: !1,
id: r
};
var o = R(r);
if (o) {
o.nodeName == "OBJECT" ? (v = B(o), m = null) : (v = o, m = r), t.id = s;
if (typeof t.width == e || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) t.width = "310";
if (typeof t.height == e || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) t.height = "137";
a.title = a.title.slice(0, 47) + " - Flash Player Installation";
var f = T.ie && T.win ? [ "Active" ].concat("").join("X") : "PlugIn", l = "MMredirectURL=" + u.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + a.title;
typeof n.flashvars != e ? n.flashvars += "&" + l : n.flashvars = l;
if (T.ie && T.win && o.readyState != 4) {
var c = U("div");
r += "SWFObjectNew", c.setAttribute("id", r), o.parentNode.insertBefore(c, o), o.style.display = "none", function() {
o.readyState == 4 ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10);
}();
}
j(t, n, r);
}
}
function H(e) {
if (T.ie && T.win && e.readyState != 4) {
var t = U("div");
e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(B(e), t), e.style.display = "none", function() {
e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
}();
} else e.parentNode.replaceChild(B(e), e);
}
function B(e) {
var n = U("div");
if (T.win && T.ie) n.innerHTML = e.innerHTML; else {
var r = e.getElementsByTagName(t)[0];
if (r) {
var i = r.childNodes;
if (i) {
var s = i.length;
for (var o = 0; o < s; o++) (i[o].nodeType != 1 || i[o].nodeName != "PARAM") && i[o].nodeType != 8 && n.appendChild(i[o].cloneNode(!0));
}
}
}
return n;
}
function j(n, r, s) {
var o, u = R(s);
if (T.wk && T.wk < 312) return o;
if (u) {
typeof n.id == e && (n.id = s);
if (T.ie && T.win) {
var a = "";
for (var f in n) n[f] != Object.prototype[f] && (f.toLowerCase() == "data" ? r.movie = n[f] : f.toLowerCase() == "styleclass" ? a += ' class="' + n[f] + '"' : f.toLowerCase() != "classid" && (a += " " + f + '="' + n[f] + '"'));
var l = "";
for (var c in r) r[c] != Object.prototype[c] && (l += '<param name="' + c + '" value="' + r[c] + '" />');
u.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + ">" + l + "</object>", p[p.length] = n.id, o = R(n.id);
} else {
var h = U(t);
h.setAttribute("type", i);
for (var d in n) n[d] != Object.prototype[d] && (d.toLowerCase() == "styleclass" ? h.setAttribute("class", n[d]) : d.toLowerCase() != "classid" && h.setAttribute(d, n[d]));
for (var v in r) r[v] != Object.prototype[v] && v.toLowerCase() != "movie" && F(h, v, r[v]);
u.parentNode.replaceChild(h, u), o = h;
}
}
return o;
}
function F(e, t, n) {
var r = U("param");
r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r);
}
function I(e) {
var t = R(e);
t && t.nodeName == "OBJECT" && (T.ie && T.win ? (t.style.display = "none", function() {
t.readyState == 4 ? q(e) : setTimeout(arguments.callee, 10);
}()) : t.parentNode.removeChild(t));
}
function q(e) {
var t = R(e);
if (t) {
for (var n in t) typeof t[n] == "function" && (t[n] = null);
t.parentNode.removeChild(t);
}
}
function R(e) {
var t = null;
try {
t = a.getElementById(e);
} catch (n) {}
return t;
}
function U(e) {
return a.createElement(e);
}
function z(e, t, n) {
e.attachEvent(t, n), d[d.length] = [ e, t, n ];
}
function W(e) {
var t = T.pv, n = e.split(".");
return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1;
}
function X(n, r, i, s) {
if (T.ie && T.mac) return;
var o = a.getElementsByTagName("head")[0];
if (!o) return;
var u = i && typeof i == "string" ? i : "screen";
s && (E = null, S = null);
if (!E || S != u) {
var f = U("style");
f.setAttribute("type", "text/css"), f.setAttribute("media", u), E = o.appendChild(f), T.ie && T.win && typeof a.styleSheets != e && a.styleSheets.length > 0 && (E = a.styleSheets[a.styleSheets.length - 1]), S = u;
}
T.ie && T.win ? E && typeof E.addRule == t && E.addRule(n, r) : E && typeof a.createTextNode != e && E.appendChild(a.createTextNode(n + " {" + r + "}"));
}
function V(e, t) {
if (!x) return;
var n = t ? "visible" : "hidden";
b && R(e) ? R(e).style.visibility = n : X("#" + e, "visibility:" + n);
}
function $(t) {
var n = /[\\\"<>\.;]/, r = n.exec(t) != null;
return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t;
}
var e = "undefined", t = "object", n = "Shockwave Flash", r = "ShockwaveFlash.ShockwaveFlash", i = "application/x-shockwave-flash", s = "SWFObjectExprInst", o = "onreadystatechange", u = window, a = document, f = navigator, l = !1, c = [ A ], h = [], p = [], d = [], v, m, g, y, b = !1, w = !1, E, S, x = !0, T = function() {
var s = typeof a.getElementById != e && typeof a.getElementsByTagName != e && typeof a.createElement != e, o = f.userAgent.toLowerCase(), c = f.platform.toLowerCase(), h = c ? /win/.test(c) : /win/.test(o), p = c ? /mac/.test(c) : /mac/.test(o), d = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, v = !1, m = [ 0, 0, 0 ], g = null;
if (typeof f.plugins != e && typeof f.plugins[n] == t) g = f.plugins[n].description, g && (typeof f.mimeTypes == e || !f.mimeTypes[i] || !!f.mimeTypes[i].enabledPlugin) && (l = !0, v = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), m[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof u[[ "Active" ].concat("Object").join("X")] != e) try {
var y = new (window[[ "Active" ].concat("Object").join("X")])(r);
y && (g = y.GetVariable("$version"), g && (v = !0, g = g.split(" ")[1].split(","), m = [ parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10) ]));
} catch (b) {}
return {
w3: s,
pv: m,
wk: d,
ie: v,
win: h,
mac: p
};
}(), N = function() {
if (!T.w3) return;
(typeof a.readyState != e && a.readyState == "complete" || typeof a.readyState == e && (a.getElementsByTagName("body")[0] || a.body)) && C(), b || (typeof a.addEventListener != e && a.addEventListener("DOMContentLoaded", C, !1), T.ie && T.win && (a.attachEvent(o, function() {
a.readyState == "complete" && (a.detachEvent(o, arguments.callee), C());
}), u == top && function() {
if (b) return;
try {
a.documentElement.doScroll("left");
} catch (e) {
setTimeout(arguments.callee, 0);
return;
}
C();
}()), T.wk && function() {
if (b) return;
if (!/loaded|complete/.test(a.readyState)) {
setTimeout(arguments.callee, 0);
return;
}
C();
}(), L(C));
}(), J = function() {
T.ie && T.win && window.attachEvent("onunload", function() {
var e = d.length;
for (var t = 0; t < e; t++) d[t][0].detachEvent(d[t][1], d[t][2]);
var n = p.length;
for (var r = 0; r < n; r++) I(p[r]);
for (var i in T) T[i] = null;
T = null;
for (var s in swfobject) swfobject[s] = null;
swfobject = null;
});
}();
return {
registerObject: function(e, t, n, r) {
if (T.w3 && e && t) {
var i = {};
i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, h[h.length] = i, V(e, !1);
} else r && r({
success: !1,
id: e
});
},
getObjectById: function(e) {
if (T.w3) return _(e);
},
embedSWF: function(n, r, i, s, o, u, a, f, l, c) {
var h = {
success: !1,
id: r
};
T.w3 && !(T.wk && T.wk < 312) && n && r && i && s && o ? (V(r, !1), k(function() {
i += "", s += "";
var p = {};
if (l && typeof l === t) for (var d in l) p[d] = l[d];
p.data = n, p.width = i, p.height = s;
var v = {};
if (f && typeof f === t) for (var m in f) v[m] = f[m];
if (a && typeof a === t) for (var g in a) typeof v.flashvars != e ? v.flashvars += "&" + g + "=" + a[g] : v.flashvars = g + "=" + a[g];
if (W(o)) {
var y = j(p, v, r);
p.id == r && V(r, !0), h.success = !0, h.ref = y;
} else {
if (u && D()) {
p.data = u, P(p, v, r, c);
return;
}
V(r, !0);
}
c && c(h);
})) : c && c(h);
},
switchOffAutoHideShow: function() {
x = !1;
},
ua: T,
getFlashPlayerVersion: function() {
return {
major: T.pv[0],
minor: T.pv[1],
release: T.pv[2]
};
},
hasFlashPlayerVersion: W,
createSWF: function(e, t, n) {
return T.w3 ? j(e, t, n) : undefined;
},
showExpressInstall: function(e, t, n, r) {
T.w3 && D() && P(e, t, n, r);
},
removeSWF: function(e) {
T.w3 && I(e);
},
createCSS: function(e, t, n, r) {
T.w3 && X(e, t, n, r);
},
addDomLoadEvent: k,
addLoadEvent: L,
getQueryParamValue: function(e) {
var t = a.location.search || a.location.hash;
if (t) {
/\?/.test(t) && (t = t.split("?")[1]);
if (e == null) return $(t);
var n = t.split("&");
for (var r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return $(n[r].substring(n[r].indexOf("=") + 1));
}
return "";
},
expressInstallCallback: function() {
if (w) {
var e = R(s);
e && v && (e.parentNode.replaceChild(v, e), m && (V(m, !0), T.ie && T.win && (v.style.display = "block")), g && g(y)), w = !1;
}
}
};
}();
(function() {
if ("undefined" == typeof window || window.WebSocket) return;
var e = window.console;
if (!e || !e.log || !e.error) e = {
log: function() {},
error: function() {}
};
if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
e.error("Flash Player >= 10.0.0 is required.");
return;
}
location.protocol == "file:" && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(e, t, n, r, i) {
var s = this;
s.__id = WebSocket.__nextId++, WebSocket.__instances[s.__id] = s, s.readyState = WebSocket.CONNECTING, s.bufferedAmount = 0, s.__events = {}, t ? typeof t == "string" && (t = [ t ]) : t = [], setTimeout(function() {
WebSocket.__addTask(function() {
WebSocket.__flash.create(s.__id, e, t, n || null, r || 0, i || null);
});
}, 0);
}, WebSocket.prototype.send = function(e) {
if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
return t < 0 ? !0 : (this.bufferedAmount += t, !1);
}, WebSocket.prototype.close = function() {
if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) return;
this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id);
}, WebSocket.prototype.addEventListener = function(e, t, n) {
e in this.__events || (this.__events[e] = []), this.__events[e].push(t);
}, WebSocket.prototype.removeEventListener = function(e, t, n) {
if (!(e in this.__events)) return;
var r = this.__events[e];
for (var i = r.length - 1; i >= 0; --i) if (r[i] === t) {
r.splice(i, 1);
break;
}
}, WebSocket.prototype.dispatchEvent = function(e) {
var t = this.__events[e.type] || [];
for (var n = 0; n < t.length; ++n) t[n](e);
var r = this["on" + e.type];
r && r(e);
}, WebSocket.prototype.__handleEvent = function(e) {
"readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol);
var t;
if (e.type == "open" || e.type == "error") t = this.__createSimpleEvent(e.type); else if (e.type == "close") t = this.__createSimpleEvent("close"); else {
if (e.type != "message") throw "unknown event type: " + e.type;
var n = decodeURIComponent(e.message);
t = this.__createMessageEvent("message", n);
}
this.dispatchEvent(t);
}, WebSocket.prototype.__createSimpleEvent = function(e) {
if (document.createEvent && window.Event) {
var t = document.createEvent("Event");
return t.initEvent(e, !1, !1), t;
}
return {
type: e,
bubbles: !1,
cancelable: !1
};
}, WebSocket.prototype.__createMessageEvent = function(e, t) {
if (document.createEvent && window.MessageEvent && !window.opera) {
var n = document.createEvent("MessageEvent");
return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n;
}
return {
type: e,
data: t,
bubbles: !1,
cancelable: !1
};
}, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(e) {
WebSocket.__addTask(function() {
WebSocket.__flash.loadManualPolicyFile(e);
});
}, WebSocket.__initialize = function() {
if (WebSocket.__flash) return;
WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation);
if (!window.WEB_SOCKET_SWF_LOCATION) {
e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
return;
}
var t = document.createElement("div");
t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
var n = document.createElement("div");
n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
hasPriority: !0,
swliveconnect: !0,
allowScriptAccess: "always"
}, null, function(t) {
t.success || e.error("[WebSocket] swfobject.embedSWF failed");
});
}, WebSocket.__onFlashInitialized = function() {
setTimeout(function() {
WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
WebSocket.__tasks = [];
}, 0);
}, WebSocket.__onFlashEvent = function() {
return setTimeout(function() {
try {
var t = WebSocket.__flash.receiveEvents();
for (var n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n]);
} catch (r) {
e.error(r);
}
}, 0), !0;
}, WebSocket.__log = function(t) {
e.log(decodeURIComponent(t));
}, WebSocket.__error = function(t) {
e.error(decodeURIComponent(t));
}, WebSocket.__addTask = function(e) {
WebSocket.__flash ? e() : WebSocket.__tasks.push(e);
}, WebSocket.__isFlashLite = function() {
if (!window.navigator || !window.navigator.mimeTypes) return !1;
var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
return !e || !e.enabledPlugin || !e.enabledPlugin.filename ? !1 : e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1;
}, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
WebSocket.__initialize();
}, !1) : window.attachEvent("onload", function() {
WebSocket.__initialize();
}));
})(), function(e, t, n) {
function r(e) {
if (!e) return;
t.Transport.apply(this, arguments), this.sendBuffer = [];
}
function i() {}
e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function() {
return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this;
}, r.prototype.payload = function(e) {
var n = [];
for (var r = 0, i = e.length; r < i; r++) n.push(t.parser.encodePacket(e[r]));
this.send(t.parser.encodePayload(n));
}, r.prototype.send = function(e) {
return this.post(e), this;
}, r.prototype.post = function(e) {
function r() {
this.readyState == 4 && (this.onreadystatechange = i, t.posting = !1, this.status == 200 ? t.socket.setBuffer(!1) : t.onClose());
}
function s() {
this.onload = i, t.socket.setBuffer(!1);
}
var t = this;
this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = s : this.sendXHR.onreadystatechange = r, this.sendXHR.send(e);
}, r.prototype.close = function() {
return this.onClose(), this;
}, r.prototype.request = function(e) {
var n = t.util.request(this.socket.isXDomain()), r = t.util.query(this.socket.options.query, "t=" + +(new Date));
n.open(e || "GET", this.prepareUrl() + r, !0);
if (e == "POST") try {
n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain";
} catch (i) {}
return n;
}, r.prototype.scheme = function() {
return this.socket.options.secure ? "https" : "http";
}, r.check = function(e, r) {
try {
var i = t.util.request(r), s = n.XDomainRequest && i instanceof XDomainRequest, o = e && e.options && e.options.secure ? "https:" : "http:", u = o != n.location.protocol;
if (i && (!s || !u)) return !0;
} catch (a) {}
return !1;
}, r.xdomainCheck = function(e) {
return r.check(e, !0);
};
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n(e) {
t.Transport.XHR.apply(this, arguments);
}
e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
this.doc = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
var e = this.doc.createElement("div");
e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
var n = this, r = t.util.query(this.socket.options.query, "t=" + +(new Date));
this.iframe.src = this.prepareUrl() + r, t.util.on(window, "unload", function() {
n.destroy();
});
}, n.prototype._ = function(e, t) {
this.onData(e);
try {
var n = t.getElementsByTagName("script")[0];
n.parentNode.removeChild(n);
} catch (r) {}
}, n.prototype.destroy = function() {
if (this.iframe) {
try {
this.iframe.src = "about:blank";
} catch (e) {}
this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage();
}
}, n.prototype.close = function() {
return this.destroy(), t.Transport.XHR.prototype.close.call(this);
}, n.check = function(e) {
if (typeof window != "undefined" && [ "Active" ].concat("Object").join("X") in window) try {
var n = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile");
return n && t.Transport.XHR.check(e);
} catch (r) {}
return !1;
}, n.xdomainCheck = function() {
return !1;
}, t.transports.push("htmlfile");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r() {
t.Transport.XHR.apply(this, arguments);
}
function i() {}
e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = "xhr-polling", r.prototype.heartbeats = function() {
return !1;
}, r.prototype.open = function() {
var e = this;
return t.Transport.XHR.prototype.open.call(e), !1;
}, r.prototype.get = function() {
function t() {
this.readyState == 4 && (this.onreadystatechange = i, this.status == 200 ? (e.onData(this.responseText), e.get()) : e.onClose());
}
function r() {
this.onload = i, this.onerror = i, e.onData(this.responseText), e.get();
}
function s() {
e.onClose();
}
if (!this.isOpen) return;
var e = this;
this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = r, this.xhr.onerror = s) : this.xhr.onreadystatechange = t, this.xhr.send(null);
}, r.prototype.onClose = function() {
t.Transport.XHR.prototype.onClose.call(this);
if (this.xhr) {
this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
try {
this.xhr.abort();
} catch (e) {}
this.xhr = null;
}
}, r.prototype.ready = function(e, n) {
var r = this;
t.util.defer(function() {
n.call(r);
});
}, t.transports.push("xhr-polling");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t, n) {
function i(e) {
t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
var n = this;
t.j.push(function(e) {
n._(e);
});
}
var r = n.document && "MozAppearance" in n.document.documentElement.style;
e["jsonp-polling"] = i, t.util.inherit(i, t.Transport["xhr-polling"]), i.prototype.name = "jsonp-polling", i.prototype.post = function(e) {
function a() {
f(), n.socket.setBuffer(!1);
}
function f() {
n.iframe && n.form.removeChild(n.iframe);
try {
u = document.createElement('<iframe name="' + n.iframeId + '">');
} catch (e) {
u = document.createElement("iframe"), u.name = n.iframeId;
}
u.id = n.iframeId, n.form.appendChild(u), n.iframe = u;
}
var n = this, r = t.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
if (!this.form) {
var i = document.createElement("form"), s = document.createElement("textarea"), o = this.iframeId = "socketio_iframe_" + this.index, u;
i.className = "socketio", i.style.position = "absolute", i.style.top = "0px", i.style.left = "0px", i.style.display = "none", i.target = o, i.method = "POST", i.setAttribute("accept-charset", "utf-8"), s.name = "d", i.appendChild(s), document.body.appendChild(i), this.form = i, this.area = s;
}
this.form.action = this.prepareUrl() + r, f(), this.area.value = t.JSON.stringify(e);
try {
this.form.submit();
} catch (l) {}
this.iframe.attachEvent ? u.onreadystatechange = function() {
n.iframe.readyState == "complete" && a();
} : this.iframe.onload = a, this.socket.setBuffer(!0);
}, i.prototype.get = function() {
var e = this, n = document.createElement("script"), i = t.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + i, n.onerror = function() {
e.onClose();
};
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(n, s), this.script = n, r && setTimeout(function() {
var e = document.createElement("iframe");
document.body.appendChild(e), document.body.removeChild(e);
}, 100);
}, i.prototype._ = function(e) {
return this.onData(e), this.isOpen && this.get(), this;
}, i.prototype.ready = function(e, n) {
var i = this;
if (!r) return n.call(this);
t.util.load(function() {
n.call(i);
});
}, i.check = function() {
return "document" in n;
}, i.xdomainCheck = function() {
return !0;
}, t.transports.push("jsonp-polling");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
})();

// source/Socket.js

enyo.kind({
name: "Socket",
kind: enyo.Component,
address: window.location.host,
connOptions: {},
socket: null,
init: {
on: {}
},
on: function(e, t) {
var n, r;
if (enyo.isString(e) && enyo.isFunction(t)) n = e, r = t, this.socket.on(n, r); else if (e === Object(e)) for (n in e) e.hasOwnProperty(n) && (r = e[n], this.socket.on(n, enyo.bind(this, r)));
},
emit: null,
create: function() {
this.inherited(arguments), this.socket = io.connect(this.address, this.connOptions), this.on(this.init.on), this.emit = enyo.bind(this.socket, this.socket.emit);
}
});

// source/questions-pullout.js

enyo.kind({
name: "QuestionsPullout",
tag: null,
components: [ {
name: "pullouttoolbar",
kind: "sugardave.PulloutToolbar",
classes: "questions-pullout",
edge: "right",
pulltabPosition: -1,
autoDismiss: !1,
components: [ {
content: "Ask a Question:"
}, {
kind: "onyx.InputDecorator",
classes: "name-decorator",
components: [ {
name: "nameInput",
kind: "Input",
placeholder: "Please Enter Your Name"
} ]
}, {
kind: "onyx.InputDecorator",
components: [ {
name: "questionInput",
kind: "TextArea",
style: "height: 8em;",
placeholder: "Enter Your Question Here"
} ]
}, {
name: "submitQuestionButton",
kind: "onyx.Button",
classes: "onyx-blue",
content: "Submit Question",
onclick: "submitQuestion"
} ]
} ],
socket: null,
create: function() {
this.inherited(arguments), this.socket = new Socket({
address: window.location.protocol + "//" + window.location.hostname + ":2233",
init: {
on: {
updateQuestions: enyo.bind(this, "doQuestionReceived")
}
}
});
},
rendered: function() {
this.inherited(arguments), this.$.pullouttoolbar.show(), setTimeout(enyo.bind(this.$.pullouttoolbar, "collapse", 0));
},
submitQuestion: function() {
var e = this.$.nameInput.getValue().trim(), t = this.$.questionInput.getValue().trim();
e && t && (this.socket.emit("newQuestion", {
name: e,
question: t
}), this.$.nameInput.setValue(""), this.$.questionInput.setValue(""));
},
events: {
onQuestionReceived: ""
}
});

// CodeEditor.js

enyo.kind({
name: "CodeEditor",
kind: "Control",
tag: "textarea",
published: {
url: "",
value: ""
},
events: {
onLoad: ""
},
create: function() {
this.inherited(arguments), this.valueChanged(), this.urlChanged();
},
urlChanged: function() {
this.url && (new enyo.Ajax({
url: this.url,
handleAs: "text"
})).response(this, "receive").go();
},
receive: function(e, t) {
this.setValue(t), this.doLoad({
code: t
});
},
valueChanged: function() {
this.setAttribute("value", this.value), this.hasNode() && (this.hasNode().value = this.value);
},
getValue: function() {
return this.hasNode() ? this.node.value : this.getAttribute("value");
}
});

// CodePlayer.js

enyo.kind({
name: "CodePlayer",
kind: "Control",
evalCode: function(inCode) {
eval(inCode);
},
go: function(e) {
this.destroyClientControls();
try {
this.evalCode(e), this.createComponent({
kind: "Sample"
}), this.hasNode() && this.render();
} catch (t) {
console.error("Error creating code: " + t);
}
}
});

// Exampler.js

enyo.kind({
name: "Exampler",
kind: "Control",
style: "background: #ABABAB",
published: {
url: ""
},
components: [ {
classes: "enyo-fit",
classes: "tabbar",
style: "overflow: hidden; height: 40px;",
components: [ {
name: "outputTab",
classes: "active tab",
content: "Output",
ontap: "outputTap"
}, {
name: "codeTab",
classes: "tab",
content: "Code",
ontap: "editorTap"
} ]
}, {
kind: "CodePlayer",
classes: "enyo-fit",
style: "top: 40px;"
}, {
kind: "CodeEditor",
classes: "enyo-fit",
style: "top: 40px;",
onLoad: "go",
showing: !1
} ],
create: function() {
this.inherited(arguments), this.addClass("theme-fu"), this.urlChanged();
},
urlChanged: function() {
this.$.codeEditor.setUrl(this.url);
},
go: function() {
this.$.codePlayer.go(this.$.codeEditor.getValue());
},
editorTap: function() {
this.showHideEditor(!0);
},
outputTap: function() {
this.go(), this.showHideEditor(!1);
},
showHideEditor: function(e) {
this.$.codeEditor.setShowing(e), this.$.codePlayer.setShowing(!e), this.$.codeTab.addRemoveClass("active", e), this.$.outputTab.addRemoveClass("active", !e);
}
});

// source/BoxTurnArranger.js

enyo.kind({
name: "enyo.BoxTurnArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective more-arrangers-bfhidden",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
destroy: function() {
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) this.boxTurnControl(n, 0, 0, 1, 1), n.setShowing(!0), n.resized();
this.inherited(arguments);
},
arrange: function(e, t) {
for (var n = 0, r, i, s, o, u; r = e[n]; n++) {
u = n == 0 ? 1 : 0;
if (enyo.dom.canAccelerate) {
switch (n) {
case 0:
i = 0;
break;
case 1:
i = 90;
break;
case e.length - 1:
i = -90;
}
this.arrangeControl(r, {
angle: i,
opacity: u
});
} else {
switch (n) {
case 0:
s = 0, o = 1;
break;
case 1:
s = 50, o = 0;
break;
case e.length - 1:
s = -50, o = 0;
}
this.arrangeControl(r, {
transform: s,
scale: o,
opacity: u
});
}
}
},
start: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && n.resized();
this.vendor || (this.vendor = this.getVendor());
},
finish: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.angle, r = t.transform, i = t.scale, s = t.opacity;
s != null && this.boxTurnControl(e, n, r, i, s);
},
boxTurnControl: function(e, t, n, r, i) {
var s = i;
if (enyo.dom.canAccelerate) {
var o = t;
e.applyStyle(this.vendor + "transform-origin", "50% 50% -" + this.containerBounds.width / 2 + "px"), e.applyStyle(this.vendor + "transform", "translateZ(-" + this.containerBounds.width / 2 + "px) rotateY(" + o + "deg)");
} else {
var u = n, a = r;
e.applyStyle(this.vendor + "transform", "translateX(" + u + "%) scale(" + a + ", 1)");
}
e.applyStyle("opacity", s);
},
getVendor: function() {
var e = "", t = [ "transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform" ], n = document.createElement("div");
for (i = 0; i < t.length; i++) {
if (typeof n.style[t[i]] != "undefined") {
e = t[i];
break;
}
e = null;
}
switch (e) {
case "transform":
e = "";
break;
case "WebkitTransform":
e = "-webkit-";
break;
case "MozTransform":
e = "-moz-";
break;
case "OTransform":
e = "-o-";
break;
case "msTransform":
e = "-ms-";
}
return e;
}
});

// source/HFlipArranger.js

enyo.kind({
name: "enyo.HFlipArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective more-arrangers-bfhidden",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
destroy: function() {
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) this.flipifyControl(n, 0, 1), n.setShowing(!0), n.resized();
this.inherited(arguments);
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n == 0 ? 1 : 0, enyo.dom.canAccelerate ? (n == 0 && (i = 0), n == 1 && n != e.length && (i = 180), n == e.length - 1 && (i = -180), this.arrangeControl(r, {
angle: i,
opacity: s
})) : (i = n == 0 ? 1 : -1, this.arrangeControl(r, {
angle: i,
opacity: s
}));
},
start: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && n.resized();
this.vendor || (this.vendor = this.getVendor());
},
finish: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.angle, r = t.opacity;
n != null && r != null && this.flipifyControl(e, n, r);
},
flipifyControl: function(e, t, n) {
var r = t, i = n;
enyo.dom.canAccelerate ? e.applyStyle(this.vendor + "transform", "rotateY(" + r + "deg)") : (r <= 0 ? e.applyStyle("display", "none") : e.applyStyle("display", "block"), e.applyStyle(this.vendor + "transform", "scale(" + r + ",1)")), e.applyStyle("opacity", i);
},
getVendor: function() {
var e = "", t = [ "transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform" ], n = document.createElement("div");
for (i = 0; i < t.length; i++) {
if (typeof n.style[t[i]] != "undefined") {
e = t[i];
break;
}
e = null;
}
switch (e) {
case "transform":
e = "";
break;
case "WebkitTransform":
e = "-webkit-";
break;
case "MozTransform":
e = "-moz-";
break;
case "OTransform":
e = "-o-";
break;
case "msTransform":
e = "-ms-";
}
return e;
}
});

// source/PageSpinArranger.js

enyo.kind({
name: "enyo.PageSpinArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
destroy: function() {
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) this.boxTurnControl(n, 0, 1, 1), n.setShowing(!0), n.resized();
this.inherited(arguments);
},
arrange: function(e, t) {
for (var n = 0, r, i, s, o; r = e[n]; n++) {
o = n == 0 ? 1 : 0;
if (enyo.dom.canAccelerate) {
switch (n) {
case 0:
i = 0;
break;
case 1:
i = 90;
break;
case e.length - 1:
i = -90;
}
this.arrangeControl(r, {
angle: i,
opacity: o
});
} else s = n == 0 ? 1 : 0, this.arrangeControl(r, {
scale: s,
opacity: o
});
}
},
start: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && n.resized();
this.vendor || (this.vendor = this.getVendor());
},
finish: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.angle, r = t.scale, i = t.opacity;
i != null && this.boxTurnControl(e, n, r, i);
},
boxTurnControl: function(e, t, n, r) {
var i = r;
if (enyo.dom.canAccelerate) {
var s = t;
e.applyStyle(this.vendor + "transform-origin", "0 50% 0"), e.applyStyle(this.vendor + "transform", "rotateY(" + s + "deg)");
} else {
var o = n;
enyo.log(this.vendor), e.applyStyle(this.vendor + "transform-origin", "0 50%"), e.applyStyle(this.vendor + "transform", "scale(" + o + ", 1)");
}
e.applyStyle("opacity", i);
},
getVendor: function() {
var e = "", t = [ "transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform" ], n = document.createElement("div");
for (i = 0; i < t.length; i++) {
if (typeof n.style[t[i]] != "undefined") {
e = t[i];
break;
}
e = null;
}
switch (e) {
case "transform":
e = "";
break;
case "WebkitTransform":
e = "-webkit-";
break;
case "MozTransform":
e = "-moz-";
break;
case "OTransform":
e = "-o-";
break;
case "msTransform":
e = "-ms-";
}
return e;
}
});

// source/PageTurnArranger.js

enyo.kind({
name: "enyo.PageTurnArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit more-arrangers-perspective",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
destroy: function() {
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) this.boxTurnControl(n, 0, 0, 0, 1), n.setShowing(!0), n.resized();
this.inherited(arguments);
},
arrange: function(e, t) {
for (var n = 0, r, i, s, o, u; r = e[n]; n++) i = n == 0 ? 1 : 0, u = n == e.length - 1 ? 0 : 1, enyo.dom.canAccelerate ? (s = n == e.length - 1 ? -90 : 0, this.arrangeControl(r, {
zindex: i,
angle: s,
opacity: u
})) : (o = n == e.length - 1 ? -0.2 : 1, this.arrangeControl(r, {
scale: o,
opacity: u
}));
},
start: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && n.resized();
this.vendor || (this.vendor = this.getVendor());
},
finish: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.angle, r = t.scale, i = t.zindex, s = t.opacity;
s != null && this.boxTurnControl(e, n, r, i, s);
},
boxTurnControl: function(e, t, n, r, i) {
var s = i, o = r;
if (enyo.dom.canAccelerate) {
var u = t;
e.applyStyle(this.vendor + "transform-origin", "0 50% 0"), e.applyStyle(this.vendor + "transform", "rotateY(" + u + "deg) translateZ(" + o + "px)"), e.applyStyle("z-index", -s);
} else {
var a = n;
e.applyStyle(this.vendor + "transform-origin", "0 50%"), e.applyStyle(this.vendor + "transform", "scale(" + a + ", 1)"), e.applyStyle("z-index", -s);
}
e.applyStyle("opacity", s);
},
getVendor: function() {
var e = "", t = [ "transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform" ], n = document.createElement("div");
for (i = 0; i < t.length; i++) {
if (typeof n.style[t[i]] != "undefined") {
e = t[i];
break;
}
e = null;
}
switch (e) {
case "transform":
e = "";
break;
case "WebkitTransform":
e = "-webkit-";
break;
case "MozTransform":
e = "-moz-";
break;
case "OTransform":
e = "-o-";
break;
case "msTransform":
e = "-ms-";
}
return e;
}
});

// source/PushPopArranger.js

enyo.kind({
name: "enyo.PushPopArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
destroy: function() {
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) this.pushPopControl(n, 0, 1), n.setShowing(!0), n.resized();
this.inherited(arguments);
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) {
s = n == 0 ? 1 : 0;
switch (n) {
case 0:
i = 1;
break;
case 1:
i = .66;
break;
case e.length - 1:
i = 1.33;
}
this.arrangeControl(r, {
scale: i,
opacity: s
});
}
},
start: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && n.resized();
this.vendor || (this.vendor = this.getVendor());
},
finish: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.scale, r = t.opacity;
n != null && r != null && this.pushPopControl(e, n, r);
},
pushPopControl: function(e, t, n) {
var r = t, i = n;
enyo.dom.canAccelerate ? e.applyStyle(this.vendor + "transform", "scale3d(" + r + "," + r + ",1)") : e.applyStyle(this.vendor + "transform", "scale(" + r + "," + r + ")"), e.applyStyle("opacity", i);
},
getVendor: function() {
var e = "", t = [ "transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform" ], n = document.createElement("div");
for (i = 0; i < t.length; i++) {
if (typeof n.style[t[i]] != "undefined") {
e = t[i];
break;
}
e = null;
}
switch (e) {
case "transform":
e = "";
break;
case "WebkitTransform":
e = "-webkit-";
break;
case "MozTransform":
e = "-moz-";
break;
case "OTransform":
e = "-o-";
break;
case "msTransform":
e = "-ms-";
}
return e;
}
});

// source/SladeArranger.js

enyo.kind({
name: "enyo.SladeArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
destroy: function() {
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) this.pushPopControl(n, 0, 1), n.setShowing(!0), n.resized();
this.inherited(arguments);
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) {
s = n == 0 ? 1 : 0;
switch (n) {
case 0:
i = 0;
break;
case 1:
i = 50;
break;
case e.length - 1:
i = -50;
}
this.arrangeControl(r, {
translate: i,
opacity: s
});
}
},
start: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && n.resized();
},
finish: function() {
this.inherited(arguments);
var e = this.container.children;
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.translate, r = t.opacity;
n != null && r != null && this.sladeControl(e, n, r);
},
sladeControl: function(e, t, n) {
var r = t, i = n;
enyo.dom.canAccelerate ? (e.applyStyle("-webkit-transform", "translate3d(" + r + "%,0,0)"), e.applyStyle("-moz-transform", "translate3d(" + r + "%,0,0)"), e.applyStyle("-o-transform", "translate3d(" + r + "%,0,0)"), e.applyStyle("-ms-transform", "translate3d(" + r + "%,0,0)")) : (e.applyStyle("-webkit-transform", "translate(" + r + "%,0)"), e.applyStyle("-moz-transform", "translate(" + r + "%,0)"), e.applyStyle("-o-transform", "translate(" + r + "%,0)"), e.applyStyle("-ms-transform", "translate(" + r + "%,0)")), e.applyStyle("opacity", i);
}
});

// $lib/socket.io-client/dist/socket.io.js

var io = "undefined" == typeof module ? {} : module.exports;

(function() {
(function(e, t) {
var n = e;
n.version = "0.9.10", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function(e, r) {
var i = n.util.parseUri(e), s, o;
t && t.location && (i.protocol = i.protocol || t.location.protocol.slice(0, -1), i.host = i.host || (t.document ? t.document.domain : t.location.hostname), i.port = i.port || t.location.port), s = n.util.uniqueUri(i);
var u = {
host: i.host,
secure: "https" == i.protocol,
port: i.port || ("https" == i.protocol ? 443 : 80),
query: i.query || ""
};
n.util.merge(u, r);
if (u["force new connection"] || !n.sockets[s]) o = new n.Socket(u);
return !u["force new connection"] && o && (n.sockets[s] = o), o = o || n.sockets[s], o.of(i.path.length > 1 ? i.path : "");
};
})("object" == typeof module ? module.exports : this.io = {}, this), function(e, t) {
var n = e.util = {}, r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, i = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
n.parseUri = function(e) {
var t = r.exec(e || ""), n = {}, s = 14;
while (s--) n[i[s]] = t[s] || "";
return n;
}, n.uniqueUri = function(e) {
var n = e.protocol, r = e.host, i = e.port;
return "document" in t ? (r = r || document.domain, i = i || (n == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)) : (r = r || "localhost", !i && n == "https" && (i = 443)), (n || "http") + "://" + r + ":" + (i || 80);
}, n.query = function(e, t) {
var r = n.chunkQuery(e || ""), i = [];
n.merge(r, n.chunkQuery(t || ""));
for (var s in r) r.hasOwnProperty(s) && i.push(s + "=" + r[s]);
return i.length ? "?" + i.join("&") : "";
}, n.chunkQuery = function(e) {
var t = {}, n = e.split("&"), r = 0, i = n.length, s;
for (; r < i; ++r) s = n[r].split("="), s[0] && (t[s[0]] = s[1]);
return t;
};
var s = !1;
n.load = function(e) {
if ("document" in t && document.readyState === "complete" || s) return e();
n.on(t, "load", e, !1);
}, n.on = function(e, t, n, r) {
e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r);
}, n.request = function(e) {
if (e && "undefined" != typeof XDomainRequest) return new XDomainRequest;
if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
if (!e) try {
return new (window[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
} catch (t) {}
return null;
}, "undefined" != typeof window && n.load(function() {
s = !0;
}), n.defer = function(e) {
if (!n.ua.webkit || "undefined" != typeof importScripts) return e();
n.load(function() {
setTimeout(e, 100);
});
}, n.merge = function(t, r, i, s) {
var o = s || [], u = typeof i == "undefined" ? 2 : i, a;
for (a in r) r.hasOwnProperty(a) && n.indexOf(o, a) < 0 && (typeof t[a] != "object" || !u ? (t[a] = r[a], o.push(r[a])) : n.merge(t[a], r[a], u - 1, o));
return t;
}, n.mixin = function(e, t) {
n.merge(e.prototype, t.prototype);
}, n.inherit = function(e, t) {
function n() {}
n.prototype = t.prototype, e.prototype = new n;
}, n.isArray = Array.isArray || function(e) {
return Object.prototype.toString.call(e) === "[object Array]";
}, n.intersect = function(e, t) {
var r = [], i = e.length > t.length ? e : t, s = e.length > t.length ? t : e;
for (var o = 0, u = s.length; o < u; o++) ~n.indexOf(i, s[o]) && r.push(s[o]);
return r;
}, n.indexOf = function(e, t, n) {
for (var r = e.length, n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++) ;
return r <= n ? -1 : n;
}, n.toArray = function(e) {
var t = [];
for (var n = 0, r = e.length; n < r; n++) t.push(e[n]);
return t;
}, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
try {
var e = new XMLHttpRequest;
} catch (t) {
return !1;
}
return e.withCredentials != undefined;
}(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
}("undefined" != typeof io ? io : module.exports, this), function(e, t) {
function n() {}
e.EventEmitter = n, n.prototype.on = function(e, n) {
return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [ this.$events[e], n ] : this.$events[e] = n, this;
}, n.prototype.addListener = n.prototype.on, n.prototype.once = function(e, t) {
function r() {
n.removeListener(e, r), t.apply(this, arguments);
}
var n = this;
return r.listener = t, this.on(e, r), this;
}, n.prototype.removeListener = function(e, n) {
if (this.$events && this.$events[e]) {
var r = this.$events[e];
if (t.util.isArray(r)) {
var i = -1;
for (var s = 0, o = r.length; s < o; s++) if (r[s] === n || r[s].listener && r[s].listener === n) {
i = s;
break;
}
if (i < 0) return this;
r.splice(i, 1), r.length || delete this.$events[e];
} else (r === n || r.listener && r.listener === n) && delete this.$events[e];
}
return this;
}, n.prototype.removeAllListeners = function(e) {
return e === undefined ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this);
}, n.prototype.listeners = function(e) {
return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [ this.$events[e] ]), this.$events[e];
}, n.prototype.emit = function(e) {
if (!this.$events) return !1;
var n = this.$events[e];
if (!n) return !1;
var r = Array.prototype.slice.call(arguments, 1);
if ("function" == typeof n) n.apply(this, r); else {
if (!t.util.isArray(n)) return !1;
var i = n.slice();
for (var s = 0, o = i.length; s < o; s++) i[s].apply(this, r);
}
return !0;
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(exports, nativeJSON) {
"use strict";
function f(e) {
return e < 10 ? "0" + e : e;
}
function date(e, t) {
return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null;
}
function quote(e) {
return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
var t = meta[e];
return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}) + '"' : '"' + e + '"';
}
function str(e, t) {
var n, r, i, s, o = gap, u, a = t[e];
a instanceof Date && (a = date(e)), typeof rep == "function" && (a = rep.call(t, e, a));
switch (typeof a) {
case "string":
return quote(a);
case "number":
return isFinite(a) ? String(a) : "null";
case "boolean":
case "null":
return String(a);
case "object":
if (!a) return "null";
gap += indent, u = [];
if (Object.prototype.toString.apply(a) === "[object Array]") {
s = a.length;
for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i;
}
if (rep && typeof rep == "object") {
s = rep.length;
for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
} else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i;
}
}
if (nativeJSON && nativeJSON.parse) return exports.JSON = {
parse: nativeJSON.parse,
stringify: nativeJSON.stringify
};
var JSON = exports.JSON = {}, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b": "\\b",
"	": "\\t",
"\n": "\\n",
"\f": "\\f",
"\r": "\\r",
'"': '\\"',
"\\": "\\\\"
}, rep;
JSON.stringify = function(e, t, n) {
var r;
gap = "", indent = "";
if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " "; else typeof n == "string" && (indent = n);
rep = t;
if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
"": e
});
throw new Error("JSON.stringify");
}, JSON.parse = function(text, reviver) {
function walk(e, t) {
var n, r, i = e[t];
if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
return reviver.call(e, t, i);
}
var j;
text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}));
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
"": j
}, "") : j;
throw new SyntaxError("JSON.parse");
};
}("undefined" != typeof io ? io : module.exports, typeof JSON != "undefined" ? JSON : undefined), function(e, t) {
var n = e.parser = {}, r = n.packets = [ "disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop" ], i = n.reasons = [ "transport not supported", "client not handshaken", "unauthorized" ], s = n.advice = [ "reconnect" ], o = t.JSON, u = t.util.indexOf;
n.encodePacket = function(e) {
var t = u(r, e.type), n = e.id || "", a = e.endpoint || "", f = e.ack, l = null;
switch (e.type) {
case "error":
var c = e.reason ? u(i, e.reason) : "", h = e.advice ? u(s, e.advice) : "";
if (c !== "" || h !== "") l = c + (h !== "" ? "+" + h : "");
break;
case "message":
e.data !== "" && (l = e.data);
break;
case "event":
var p = {
name: e.name
};
e.args && e.args.length && (p.args = e.args), l = o.stringify(p);
break;
case "json":
l = o.stringify(e.data);
break;
case "connect":
e.qs && (l = e.qs);
break;
case "ack":
l = e.ackId + (e.args && e.args.length ? "+" + o.stringify(e.args) : "");
}
var d = [ t, n + (f == "data" ? "+" : ""), a ];
return l !== null && l !== undefined && d.push(l), d.join(":");
}, n.encodePayload = function(e) {
var t = "";
if (e.length == 1) return e[0];
for (var n = 0, r = e.length; n < r; n++) {
var i = e[n];
t += "\ufffd" + i.length + "\ufffd" + e[n];
}
return t;
};
var a = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
n.decodePacket = function(e) {
var t = e.match(a);
if (!t) return {};
var n = t[2] || "", e = t[5] || "", u = {
type: r[t[1]],
endpoint: t[4] || ""
};
n && (u.id = n, t[3] ? u.ack = "data" : u.ack = !0);
switch (u.type) {
case "error":
var t = e.split("+");
u.reason = i[t[0]] || "", u.advice = s[t[1]] || "";
break;
case "message":
u.data = e || "";
break;
case "event":
try {
var f = o.parse(e);
u.name = f.name, u.args = f.args;
} catch (l) {}
u.args = u.args || [];
break;
case "json":
try {
u.data = o.parse(e);
} catch (l) {}
break;
case "connect":
u.qs = e || "";
break;
case "ack":
var t = e.match(/^([0-9]+)(\+)?(.*)/);
if (t) {
u.ackId = t[1], u.args = [];
if (t[3]) try {
u.args = t[3] ? o.parse(t[3]) : [];
} catch (l) {}
}
break;
case "disconnect":
case "heartbeat":
}
return u;
}, n.decodePayload = function(e) {
if (e.charAt(0) == "\ufffd") {
var t = [];
for (var r = 1, i = ""; r < e.length; r++) e.charAt(r) == "\ufffd" ? (t.push(n.decodePacket(e.substr(r + 1).substr(0, i))), r += Number(i) + 1, i = "") : i += e.charAt(r);
return t;
}
return [ n.decodePacket(e) ];
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t) {
function n(e, t) {
this.socket = e, this.sessid = t;
}
e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function() {
return !0;
}, n.prototype.onData = function(e) {
this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
if (e !== "") {
var n = t.parser.decodePayload(e);
if (n && n.length) for (var r = 0, i = n.length; r < i; r++) this.onPacket(n[r]);
}
return this;
}, n.prototype.onPacket = function(e) {
return this.socket.setHeartbeatTimeout(), e.type == "heartbeat" ? this.onHeartbeat() : (e.type == "connect" && e.endpoint == "" && this.onConnect(), e.type == "error" && e.advice == "reconnect" && (this.isOpen = !1), this.socket.onPacket(e), this);
}, n.prototype.setCloseTimeout = function() {
if (!this.closeTimeout) {
var e = this;
this.closeTimeout = setTimeout(function() {
e.onDisconnect();
}, this.socket.closeTimeout);
}
}, n.prototype.onDisconnect = function() {
return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this;
}, n.prototype.onConnect = function() {
return this.socket.onConnect(), this;
}, n.prototype.clearCloseTimeout = function() {
this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null);
}, n.prototype.clearTimeouts = function() {
this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout);
}, n.prototype.packet = function(e) {
this.send(t.parser.encodePacket(e));
}, n.prototype.onHeartbeat = function(e) {
this.packet({
type: "heartbeat"
});
}, n.prototype.onOpen = function() {
this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen();
}, n.prototype.onClose = function() {
var e = this;
this.isOpen = !1, this.socket.onClose(), this.onDisconnect();
}, n.prototype.prepareUrl = function() {
var e = this.socket.options;
return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid;
}, n.prototype.ready = function(e, t) {
t.call(this);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r(e) {
this.options = {
port: 80,
secure: !1,
document: "document" in n ? document : !1,
resource: "socket.io",
transports: t.transports,
"connect timeout": 1e4,
"try multiple transports": !0,
reconnect: !0,
"reconnection delay": 500,
"reconnection limit": Infinity,
"reopen delay": 3e3,
"max reconnection attempts": 10,
"sync disconnect on unload": !1,
"auto connect": !0,
"flash policy port": 10843,
manualFlush: !1
}, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1;
if (this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
var r = this;
t.util.on(n, "beforeunload", function() {
r.disconnectSync();
}, !1);
}
this.options["auto connect"] && this.connect();
}
function i() {}
e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function(e) {
return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), e !== "" && this.namespaces[e].packet({
type: "connect"
})), this.namespaces[e];
}, r.prototype.publish = function() {
this.emit.apply(this, arguments);
var e;
for (var t in this.namespaces) this.namespaces.hasOwnProperty(t) && (e = this.of(t), e.$emit.apply(e, arguments));
}, r.prototype.handshake = function(e) {
function s(t) {
t instanceof Error ? (n.connecting = !1, n.onError(t.message)) : e.apply(null, t.split(":"));
}
var n = this, r = this.options, o = [ "http" + (r.secure ? "s" : "") + ":/", r.host + ":" + r.port, r.resource, t.protocol, t.util.query(this.options.query, "t=" + +(new Date)) ].join("/");
if (this.isXDomain() && !t.util.ua.hasCORS) {
var u = document.getElementsByTagName("script")[0], a = document.createElement("script");
a.src = o + "&jsonp=" + t.j.length, u.parentNode.insertBefore(a, u), t.j.push(function(e) {
s(e), a.parentNode.removeChild(a);
});
} else {
var f = t.util.request();
f.open("GET", o, !0), this.isXDomain() && (f.withCredentials = !0), f.onreadystatechange = function() {
f.readyState == 4 && (f.onreadystatechange = i, f.status == 200 ? s(f.responseText) : f.status == 403 ? n.onError(f.responseText) : (n.connecting = !1, !n.reconnecting && n.onError(f.responseText)));
}, f.send(null);
}
}, r.prototype.getTransport = function(e) {
var n = e || this.transports, r;
for (var i = 0, s; s = n[i]; i++) if (t.Transport[s] && t.Transport[s].check(this) && (!this.isXDomain() || t.Transport[s].xdomainCheck(this))) return new t.Transport[s](this, this.sessionid);
return null;
}, r.prototype.connect = function(e) {
if (this.connecting) return this;
var n = this;
return n.connecting = !0, this.handshake(function(r, i, s, o) {
function u(e) {
n.transport && n.transport.clearTimeouts(), n.transport = n.getTransport(e);
if (!n.transport) return n.publish("connect_failed");
n.transport.ready(n, function() {
n.connecting = !0, n.publish("connecting", n.transport.name), n.transport.open(), n.options["connect timeout"] && (n.connectTimeoutTimer = setTimeout(function() {
if (!n.connected) {
n.connecting = !1;
if (n.options["try multiple transports"]) {
var e = n.transports;
while (e.length > 0 && e.splice(0, 1)[0] != n.transport.name) ;
e.length ? u(e) : n.publish("connect_failed");
}
}
}, n.options["connect timeout"]));
});
}
n.sessionid = r, n.closeTimeout = s * 1e3, n.heartbeatTimeout = i * 1e3, n.transports || (n.transports = n.origTransports = o ? t.util.intersect(o.split(","), n.options.transports) : n.options.transports), n.setHeartbeatTimeout(), u(n.transports), n.once("connect", function() {
clearTimeout(n.connectTimeoutTimer), e && typeof e == "function" && e();
});
}), this;
}, r.prototype.setHeartbeatTimeout = function() {
clearTimeout(this.heartbeatTimeoutTimer);
if (this.transport && !this.transport.heartbeats()) return;
var e = this;
this.heartbeatTimeoutTimer = setTimeout(function() {
e.transport.onClose();
}, this.heartbeatTimeout);
}, r.prototype.packet = function(e) {
return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this;
}, r.prototype.setBuffer = function(e) {
this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer());
}, r.prototype.flushBuffer = function() {
this.transport.payload(this.buffer), this.buffer = [];
}, r.prototype.disconnect = function() {
if (this.connected || this.connecting) this.open && this.of("").packet({
type: "disconnect"
}), this.onDisconnect("booted");
return this;
}, r.prototype.disconnectSync = function() {
var e = t.util.request(), n = [ "http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid ].join("/") + "/?disconnect=1";
e.open("GET", n, !1), e.send(null), this.onDisconnect("booted");
}, r.prototype.isXDomain = function() {
var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
return this.options.host !== n.location.hostname || this.options.port != e;
}, r.prototype.onConnect = function() {
this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"));
}, r.prototype.onOpen = function() {
this.open = !0;
}, r.prototype.onClose = function() {
this.open = !1, clearTimeout(this.heartbeatTimeoutTimer);
}, r.prototype.onPacket = function(e) {
this.of(e.endpoint).onPacket(e);
}, r.prototype.onError = function(e) {
e && e.advice && e.advice === "reconnect" && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e);
}, r.prototype.onDisconnect = function(e) {
var t = this.connected, n = this.connecting;
this.connected = !1, this.connecting = !1, this.open = !1;
if (t || n) this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect());
}, r.prototype.reconnect = function() {
function i() {
if (e.connected) {
for (var t in e.namespaces) e.namespaces.hasOwnProperty(t) && "" !== t && e.namespaces[t].packet({
type: "connect"
});
e.publish("reconnect", e.transport.name, e.reconnectionAttempts);
}
clearTimeout(e.reconnectionTimer), e.removeListener("connect_failed", s), e.removeListener("connect", s), e.reconnecting = !1, delete e.reconnectionAttempts, delete e.reconnectionDelay, delete e.reconnectionTimer, delete e.redoTransports, e.options["try multiple transports"] = n;
}
function s() {
if (!e.reconnecting) return;
if (e.connected) return i();
if (e.connecting && e.reconnecting) return e.reconnectionTimer = setTimeout(s, 1e3);
e.reconnectionAttempts++ >= t ? e.redoTransports ? (e.publish("reconnect_failed"), i()) : (e.on("connect_failed", s), e.options["try multiple transports"] = !0, e.transports = e.origTransports, e.transport = e.getTransport(), e.redoTransports = !0, e.connect()) : (e.reconnectionDelay < r && (e.reconnectionDelay *= 2), e.connect(), e.publish("reconnecting", e.reconnectionDelay, e.reconnectionAttempts), e.reconnectionTimer = setTimeout(s, e.reconnectionDelay));
}
this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
var e = this, t = this.options["max reconnection attempts"], n = this.options["try multiple transports"], r = this.options["reconnection limit"];
this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(s, this.reconnectionDelay), this.on("connect", s);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n(e, t) {
this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets = 0, this.acks = {};
}
function r(e, t) {
this.namespace = e, this.name = t;
}
e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function() {
return this.socket.of.apply(this.socket, arguments);
}, n.prototype.packet = function(e) {
return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this;
}, n.prototype.send = function(e, t) {
var n = {
type: this.flags.json ? "json" : "message",
data: e
};
return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n);
}, n.prototype.emit = function(e) {
var t = Array.prototype.slice.call(arguments, 1), n = t[t.length - 1], r = {
type: "event",
name: e
};
return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r);
}, n.prototype.disconnect = function() {
return this.name === "" ? this.socket.disconnect() : (this.packet({
type: "disconnect"
}), this.$emit("disconnect")), this;
}, n.prototype.onPacket = function(e) {
function r() {
n.packet({
type: "ack",
args: t.util.toArray(arguments),
ackId: e.id
});
}
var n = this;
switch (e.type) {
case "connect":
this.$emit("connect");
break;
case "disconnect":
this.name === "" ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
break;
case "message":
case "json":
var i = [ "message", e.data ];
e.ack == "data" ? i.push(r) : e.ack && this.packet({
type: "ack",
ackId: e.id
}), this.$emit.apply(this, i);
break;
case "event":
var i = [ e.name ].concat(e.args);
e.ack == "data" && i.push(r), this.$emit.apply(this, i);
break;
case "ack":
this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
break;
case "error":
e.advice ? this.socket.onError(e) : e.reason == "unauthorized" ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason);
}
}, r.prototype.send = function() {
this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments);
}, r.prototype.emit = function() {
this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments);
};
}("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r(e) {
t.Transport.apply(this, arguments);
}
e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open = function() {
var e = t.util.query(this.socket.options.query), r = this, i;
return i || (i = n.MozWebSocket || n.WebSocket), this.websocket = new i(this.prepareUrl() + e), this.websocket.onopen = function() {
r.onOpen(), r.socket.setBuffer(!1);
}, this.websocket.onmessage = function(e) {
r.onData(e.data);
}, this.websocket.onclose = function() {
r.onClose(), r.socket.setBuffer(!0);
}, this.websocket.onerror = function(e) {
r.onError(e);
}, this;
}, t.util.ua.iDevice ? r.prototype.send = function(e) {
var t = this;
return setTimeout(function() {
t.websocket.send(e);
}, 0), this;
} : r.prototype.send = function(e) {
return this.websocket.send(e), this;
}, r.prototype.payload = function(e) {
for (var t = 0, n = e.length; t < n; t++) this.packet(e[t]);
return this;
}, r.prototype.close = function() {
return this.websocket.close(), this;
}, r.prototype.onError = function(e) {
this.socket.onError(e);
}, r.prototype.scheme = function() {
return this.socket.options.secure ? "wss" : "ws";
}, r.check = function() {
return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n;
}, r.xdomainCheck = function() {
return !0;
}, t.transports.push("websocket");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n() {
t.Transport.websocket.apply(this, arguments);
}
e.flashsocket = n, t.util.inherit(n, t.Transport.websocket), n.prototype.name = "flashsocket", n.prototype.open = function() {
var e = this, n = arguments;
return WebSocket.__addTask(function() {
t.Transport.websocket.prototype.open.apply(e, n);
}), this;
}, n.prototype.send = function() {
var e = this, n = arguments;
return WebSocket.__addTask(function() {
t.Transport.websocket.prototype.send.apply(e, n);
}), this;
}, n.prototype.close = function() {
return WebSocket.__tasks.length = 0, t.Transport.websocket.prototype.close.call(this), this;
}, n.prototype.ready = function(e, r) {
function i() {
var t = e.options, i = t["flash policy port"], o = [ "http" + (t.secure ? "s" : "") + ":/", t.host + ":" + t.port, t.resource, "static/flashsocket", "WebSocketMain" + (e.isXDomain() ? "Insecure" : "") + ".swf" ];
n.loaded || (typeof WEB_SOCKET_SWF_LOCATION == "undefined" && (WEB_SOCKET_SWF_LOCATION = o.join("/")), i !== 843 && WebSocket.loadFlashPolicyFile("xmlsocket://" + t.host + ":" + i), WebSocket.__initialize(), n.loaded = !0), r.call(s);
}
var s = this;
if (document.body) return i();
t.util.load(i);
}, n.check = function() {
return typeof WebSocket != "undefined" && "__initialize" in WebSocket && !!swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1;
}, n.xdomainCheck = function() {
return !0;
}, typeof window != "undefined" && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), t.transports.push("flashsocket");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
if ("undefined" != typeof window) var swfobject = function() {
function C() {
if (b) return;
try {
var e = a.getElementsByTagName("body")[0].appendChild(U("span"));
e.parentNode.removeChild(e);
} catch (t) {
return;
}
b = !0;
var n = c.length;
for (var r = 0; r < n; r++) c[r]();
}
function k(e) {
b ? e() : c[c.length] = e;
}
function L(t) {
if (typeof u.addEventListener != e) u.addEventListener("load", t, !1); else if (typeof a.addEventListener != e) a.addEventListener("load", t, !1); else if (typeof u.attachEvent != e) z(u, "onload", t); else if (typeof u.onload == "function") {
var n = u.onload;
u.onload = function() {
n(), t();
};
} else u.onload = t;
}
function A() {
l ? O() : M();
}
function O() {
var n = a.getElementsByTagName("body")[0], r = U(t);
r.setAttribute("type", i);
var s = n.appendChild(r);
if (s) {
var o = 0;
(function() {
if (typeof s.GetVariable != e) {
var t = s.GetVariable("$version");
t && (t = t.split(" ")[1].split(","), T.pv = [ parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10) ]);
} else if (o < 10) {
o++, setTimeout(arguments.callee, 10);
return;
}
n.removeChild(r), s = null, M();
})();
} else M();
}
function M() {
var t = h.length;
if (t > 0) for (var n = 0; n < t; n++) {
var r = h[n].id, i = h[n].callbackFn, s = {
success: !1,
id: r
};
if (T.pv[0] > 0) {
var o = R(r);
if (o) if (W(h[n].swfVersion) && !(T.wk && T.wk < 312)) V(r, !0), i && (s.success = !0, s.ref = _(r), i(s)); else if (h[n].expressInstall && D()) {
var u = {};
u.data = h[n].expressInstall, u.width = o.getAttribute("width") || "0", u.height = o.getAttribute("height") || "0", o.getAttribute("class") && (u.styleclass = o.getAttribute("class")), o.getAttribute("align") && (u.align = o.getAttribute("align"));
var a = {}, f = o.getElementsByTagName("param"), l = f.length;
for (var c = 0; c < l; c++) f[c].getAttribute("name").toLowerCase() != "movie" && (a[f[c].getAttribute("name")] = f[c].getAttribute("value"));
P(u, a, r, i);
} else H(o), i && i(s);
} else {
V(r, !0);
if (i) {
var p = _(r);
p && typeof p.SetVariable != e && (s.success = !0, s.ref = p), i(s);
}
}
}
}
function _(n) {
var r = null, i = R(n);
if (i && i.nodeName == "OBJECT") if (typeof i.SetVariable != e) r = i; else {
var s = i.getElementsByTagName(t)[0];
s && (r = s);
}
return r;
}
function D() {
return !w && W("6.0.65") && (T.win || T.mac) && !(T.wk && T.wk < 312);
}
function P(t, n, r, i) {
w = !0, g = i || null, y = {
success: !1,
id: r
};
var o = R(r);
if (o) {
o.nodeName == "OBJECT" ? (v = B(o), m = null) : (v = o, m = r), t.id = s;
if (typeof t.width == e || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) t.width = "310";
if (typeof t.height == e || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) t.height = "137";
a.title = a.title.slice(0, 47) + " - Flash Player Installation";
var f = T.ie && T.win ? [ "Active" ].concat("").join("X") : "PlugIn", l = "MMredirectURL=" + u.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + a.title;
typeof n.flashvars != e ? n.flashvars += "&" + l : n.flashvars = l;
if (T.ie && T.win && o.readyState != 4) {
var c = U("div");
r += "SWFObjectNew", c.setAttribute("id", r), o.parentNode.insertBefore(c, o), o.style.display = "none", function() {
o.readyState == 4 ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10);
}();
}
j(t, n, r);
}
}
function H(e) {
if (T.ie && T.win && e.readyState != 4) {
var t = U("div");
e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(B(e), t), e.style.display = "none", function() {
e.readyState == 4 ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
}();
} else e.parentNode.replaceChild(B(e), e);
}
function B(e) {
var n = U("div");
if (T.win && T.ie) n.innerHTML = e.innerHTML; else {
var r = e.getElementsByTagName(t)[0];
if (r) {
var i = r.childNodes;
if (i) {
var s = i.length;
for (var o = 0; o < s; o++) (i[o].nodeType != 1 || i[o].nodeName != "PARAM") && i[o].nodeType != 8 && n.appendChild(i[o].cloneNode(!0));
}
}
}
return n;
}
function j(n, r, s) {
var o, u = R(s);
if (T.wk && T.wk < 312) return o;
if (u) {
typeof n.id == e && (n.id = s);
if (T.ie && T.win) {
var a = "";
for (var f in n) n[f] != Object.prototype[f] && (f.toLowerCase() == "data" ? r.movie = n[f] : f.toLowerCase() == "styleclass" ? a += ' class="' + n[f] + '"' : f.toLowerCase() != "classid" && (a += " " + f + '="' + n[f] + '"'));
var l = "";
for (var c in r) r[c] != Object.prototype[c] && (l += '<param name="' + c + '" value="' + r[c] + '" />');
u.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + ">" + l + "</object>", p[p.length] = n.id, o = R(n.id);
} else {
var h = U(t);
h.setAttribute("type", i);
for (var d in n) n[d] != Object.prototype[d] && (d.toLowerCase() == "styleclass" ? h.setAttribute("class", n[d]) : d.toLowerCase() != "classid" && h.setAttribute(d, n[d]));
for (var v in r) r[v] != Object.prototype[v] && v.toLowerCase() != "movie" && F(h, v, r[v]);
u.parentNode.replaceChild(h, u), o = h;
}
}
return o;
}
function F(e, t, n) {
var r = U("param");
r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r);
}
function I(e) {
var t = R(e);
t && t.nodeName == "OBJECT" && (T.ie && T.win ? (t.style.display = "none", function() {
t.readyState == 4 ? q(e) : setTimeout(arguments.callee, 10);
}()) : t.parentNode.removeChild(t));
}
function q(e) {
var t = R(e);
if (t) {
for (var n in t) typeof t[n] == "function" && (t[n] = null);
t.parentNode.removeChild(t);
}
}
function R(e) {
var t = null;
try {
t = a.getElementById(e);
} catch (n) {}
return t;
}
function U(e) {
return a.createElement(e);
}
function z(e, t, n) {
e.attachEvent(t, n), d[d.length] = [ e, t, n ];
}
function W(e) {
var t = T.pv, n = e.split(".");
return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2] ? !0 : !1;
}
function X(n, r, i, s) {
if (T.ie && T.mac) return;
var o = a.getElementsByTagName("head")[0];
if (!o) return;
var u = i && typeof i == "string" ? i : "screen";
s && (E = null, S = null);
if (!E || S != u) {
var f = U("style");
f.setAttribute("type", "text/css"), f.setAttribute("media", u), E = o.appendChild(f), T.ie && T.win && typeof a.styleSheets != e && a.styleSheets.length > 0 && (E = a.styleSheets[a.styleSheets.length - 1]), S = u;
}
T.ie && T.win ? E && typeof E.addRule == t && E.addRule(n, r) : E && typeof a.createTextNode != e && E.appendChild(a.createTextNode(n + " {" + r + "}"));
}
function V(e, t) {
if (!x) return;
var n = t ? "visible" : "hidden";
b && R(e) ? R(e).style.visibility = n : X("#" + e, "visibility:" + n);
}
function $(t) {
var n = /[\\\"<>\.;]/, r = n.exec(t) != null;
return r && typeof encodeURIComponent != e ? encodeURIComponent(t) : t;
}
var e = "undefined", t = "object", n = "Shockwave Flash", r = "ShockwaveFlash.ShockwaveFlash", i = "application/x-shockwave-flash", s = "SWFObjectExprInst", o = "onreadystatechange", u = window, a = document, f = navigator, l = !1, c = [ A ], h = [], p = [], d = [], v, m, g, y, b = !1, w = !1, E, S, x = !0, T = function() {
var s = typeof a.getElementById != e && typeof a.getElementsByTagName != e && typeof a.createElement != e, o = f.userAgent.toLowerCase(), c = f.platform.toLowerCase(), h = c ? /win/.test(c) : /win/.test(o), p = c ? /mac/.test(c) : /mac/.test(o), d = /webkit/.test(o) ? parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, v = !1, m = [ 0, 0, 0 ], g = null;
if (typeof f.plugins != e && typeof f.plugins[n] == t) g = f.plugins[n].description, g && (typeof f.mimeTypes == e || !f.mimeTypes[i] || !!f.mimeTypes[i].enabledPlugin) && (l = !0, v = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), m[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), m[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), m[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof u[[ "Active" ].concat("Object").join("X")] != e) try {
var y = new (window[[ "Active" ].concat("Object").join("X")])(r);
y && (g = y.GetVariable("$version"), g && (v = !0, g = g.split(" ")[1].split(","), m = [ parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10) ]));
} catch (b) {}
return {
w3: s,
pv: m,
wk: d,
ie: v,
win: h,
mac: p
};
}(), N = function() {
if (!T.w3) return;
(typeof a.readyState != e && a.readyState == "complete" || typeof a.readyState == e && (a.getElementsByTagName("body")[0] || a.body)) && C(), b || (typeof a.addEventListener != e && a.addEventListener("DOMContentLoaded", C, !1), T.ie && T.win && (a.attachEvent(o, function() {
a.readyState == "complete" && (a.detachEvent(o, arguments.callee), C());
}), u == top && function() {
if (b) return;
try {
a.documentElement.doScroll("left");
} catch (e) {
setTimeout(arguments.callee, 0);
return;
}
C();
}()), T.wk && function() {
if (b) return;
if (!/loaded|complete/.test(a.readyState)) {
setTimeout(arguments.callee, 0);
return;
}
C();
}(), L(C));
}(), J = function() {
T.ie && T.win && window.attachEvent("onunload", function() {
var e = d.length;
for (var t = 0; t < e; t++) d[t][0].detachEvent(d[t][1], d[t][2]);
var n = p.length;
for (var r = 0; r < n; r++) I(p[r]);
for (var i in T) T[i] = null;
T = null;
for (var s in swfobject) swfobject[s] = null;
swfobject = null;
});
}();
return {
registerObject: function(e, t, n, r) {
if (T.w3 && e && t) {
var i = {};
i.id = e, i.swfVersion = t, i.expressInstall = n, i.callbackFn = r, h[h.length] = i, V(e, !1);
} else r && r({
success: !1,
id: e
});
},
getObjectById: function(e) {
if (T.w3) return _(e);
},
embedSWF: function(n, r, i, s, o, u, a, f, l, c) {
var h = {
success: !1,
id: r
};
T.w3 && !(T.wk && T.wk < 312) && n && r && i && s && o ? (V(r, !1), k(function() {
i += "", s += "";
var p = {};
if (l && typeof l === t) for (var d in l) p[d] = l[d];
p.data = n, p.width = i, p.height = s;
var v = {};
if (f && typeof f === t) for (var m in f) v[m] = f[m];
if (a && typeof a === t) for (var g in a) typeof v.flashvars != e ? v.flashvars += "&" + g + "=" + a[g] : v.flashvars = g + "=" + a[g];
if (W(o)) {
var y = j(p, v, r);
p.id == r && V(r, !0), h.success = !0, h.ref = y;
} else {
if (u && D()) {
p.data = u, P(p, v, r, c);
return;
}
V(r, !0);
}
c && c(h);
})) : c && c(h);
},
switchOffAutoHideShow: function() {
x = !1;
},
ua: T,
getFlashPlayerVersion: function() {
return {
major: T.pv[0],
minor: T.pv[1],
release: T.pv[2]
};
},
hasFlashPlayerVersion: W,
createSWF: function(e, t, n) {
return T.w3 ? j(e, t, n) : undefined;
},
showExpressInstall: function(e, t, n, r) {
T.w3 && D() && P(e, t, n, r);
},
removeSWF: function(e) {
T.w3 && I(e);
},
createCSS: function(e, t, n, r) {
T.w3 && X(e, t, n, r);
},
addDomLoadEvent: k,
addLoadEvent: L,
getQueryParamValue: function(e) {
var t = a.location.search || a.location.hash;
if (t) {
/\?/.test(t) && (t = t.split("?")[1]);
if (e == null) return $(t);
var n = t.split("&");
for (var r = 0; r < n.length; r++) if (n[r].substring(0, n[r].indexOf("=")) == e) return $(n[r].substring(n[r].indexOf("=") + 1));
}
return "";
},
expressInstallCallback: function() {
if (w) {
var e = R(s);
e && v && (e.parentNode.replaceChild(v, e), m && (V(m, !0), T.ie && T.win && (v.style.display = "block")), g && g(y)), w = !1;
}
}
};
}();
(function() {
if ("undefined" == typeof window || window.WebSocket) return;
var e = window.console;
if (!e || !e.log || !e.error) e = {
log: function() {},
error: function() {}
};
if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
e.error("Flash Player >= 10.0.0 is required.");
return;
}
location.protocol == "file:" && e.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(e, t, n, r, i) {
var s = this;
s.__id = WebSocket.__nextId++, WebSocket.__instances[s.__id] = s, s.readyState = WebSocket.CONNECTING, s.bufferedAmount = 0, s.__events = {}, t ? typeof t == "string" && (t = [ t ]) : t = [], setTimeout(function() {
WebSocket.__addTask(function() {
WebSocket.__flash.create(s.__id, e, t, n || null, r || 0, i || null);
});
}, 0);
}, WebSocket.prototype.send = function(e) {
if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
var t = WebSocket.__flash.send(this.__id, encodeURIComponent(e));
return t < 0 ? !0 : (this.bufferedAmount += t, !1);
}, WebSocket.prototype.close = function() {
if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) return;
this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id);
}, WebSocket.prototype.addEventListener = function(e, t, n) {
e in this.__events || (this.__events[e] = []), this.__events[e].push(t);
}, WebSocket.prototype.removeEventListener = function(e, t, n) {
if (!(e in this.__events)) return;
var r = this.__events[e];
for (var i = r.length - 1; i >= 0; --i) if (r[i] === t) {
r.splice(i, 1);
break;
}
}, WebSocket.prototype.dispatchEvent = function(e) {
var t = this.__events[e.type] || [];
for (var n = 0; n < t.length; ++n) t[n](e);
var r = this["on" + e.type];
r && r(e);
}, WebSocket.prototype.__handleEvent = function(e) {
"readyState" in e && (this.readyState = e.readyState), "protocol" in e && (this.protocol = e.protocol);
var t;
if (e.type == "open" || e.type == "error") t = this.__createSimpleEvent(e.type); else if (e.type == "close") t = this.__createSimpleEvent("close"); else {
if (e.type != "message") throw "unknown event type: " + e.type;
var n = decodeURIComponent(e.message);
t = this.__createMessageEvent("message", n);
}
this.dispatchEvent(t);
}, WebSocket.prototype.__createSimpleEvent = function(e) {
if (document.createEvent && window.Event) {
var t = document.createEvent("Event");
return t.initEvent(e, !1, !1), t;
}
return {
type: e,
bubbles: !1,
cancelable: !1
};
}, WebSocket.prototype.__createMessageEvent = function(e, t) {
if (document.createEvent && window.MessageEvent && !window.opera) {
var n = document.createEvent("MessageEvent");
return n.initMessageEvent("message", !1, !1, t, null, null, window, null), n;
}
return {
type: e,
data: t,
bubbles: !1,
cancelable: !1
};
}, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(e) {
WebSocket.__addTask(function() {
WebSocket.__flash.loadManualPolicyFile(e);
});
}, WebSocket.__initialize = function() {
if (WebSocket.__flash) return;
WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation);
if (!window.WEB_SOCKET_SWF_LOCATION) {
e.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
return;
}
var t = document.createElement("div");
t.id = "webSocketContainer", t.style.position = "absolute", WebSocket.__isFlashLite() ? (t.style.left = "0px", t.style.top = "0px") : (t.style.left = "-100px", t.style.top = "-100px");
var n = document.createElement("div");
n.id = "webSocketFlash", t.appendChild(n), document.body.appendChild(t), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
hasPriority: !0,
swliveconnect: !0,
allowScriptAccess: "always"
}, null, function(t) {
t.success || e.error("[WebSocket] swfobject.embedSWF failed");
});
}, WebSocket.__onFlashInitialized = function() {
setTimeout(function() {
WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
for (var e = 0; e < WebSocket.__tasks.length; ++e) WebSocket.__tasks[e]();
WebSocket.__tasks = [];
}, 0);
}, WebSocket.__onFlashEvent = function() {
return setTimeout(function() {
try {
var t = WebSocket.__flash.receiveEvents();
for (var n = 0; n < t.length; ++n) WebSocket.__instances[t[n].webSocketId].__handleEvent(t[n]);
} catch (r) {
e.error(r);
}
}, 0), !0;
}, WebSocket.__log = function(t) {
e.log(decodeURIComponent(t));
}, WebSocket.__error = function(t) {
e.error(decodeURIComponent(t));
}, WebSocket.__addTask = function(e) {
WebSocket.__flash ? e() : WebSocket.__tasks.push(e);
}, WebSocket.__isFlashLite = function() {
if (!window.navigator || !window.navigator.mimeTypes) return !1;
var e = window.navigator.mimeTypes["application/x-shockwave-flash"];
return !e || !e.enabledPlugin || !e.enabledPlugin.filename ? !1 : e.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1;
}, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
WebSocket.__initialize();
}, !1) : window.attachEvent("onload", function() {
WebSocket.__initialize();
}));
})(), function(e, t, n) {
function r(e) {
if (!e) return;
t.Transport.apply(this, arguments), this.sendBuffer = [];
}
function i() {}
e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function() {
return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this;
}, r.prototype.payload = function(e) {
var n = [];
for (var r = 0, i = e.length; r < i; r++) n.push(t.parser.encodePacket(e[r]));
this.send(t.parser.encodePayload(n));
}, r.prototype.send = function(e) {
return this.post(e), this;
}, r.prototype.post = function(e) {
function r() {
this.readyState == 4 && (this.onreadystatechange = i, t.posting = !1, this.status == 200 ? t.socket.setBuffer(!1) : t.onClose());
}
function s() {
this.onload = i, t.socket.setBuffer(!1);
}
var t = this;
this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = s : this.sendXHR.onreadystatechange = r, this.sendXHR.send(e);
}, r.prototype.close = function() {
return this.onClose(), this;
}, r.prototype.request = function(e) {
var n = t.util.request(this.socket.isXDomain()), r = t.util.query(this.socket.options.query, "t=" + +(new Date));
n.open(e || "GET", this.prepareUrl() + r, !0);
if (e == "POST") try {
n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain";
} catch (i) {}
return n;
}, r.prototype.scheme = function() {
return this.socket.options.secure ? "https" : "http";
}, r.check = function(e, r) {
try {
var i = t.util.request(r), s = n.XDomainRequest && i instanceof XDomainRequest, o = e && e.options && e.options.secure ? "https:" : "http:", u = o != n.location.protocol;
if (i && (!s || !u)) return !0;
} catch (a) {}
return !1;
}, r.xdomainCheck = function(e) {
return r.check(e, !0);
};
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t) {
function n(e) {
t.Transport.XHR.apply(this, arguments);
}
e.htmlfile = n, t.util.inherit(n, t.Transport.XHR), n.prototype.name = "htmlfile", n.prototype.get = function() {
this.doc = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
var e = this.doc.createElement("div");
e.className = "socketio", this.doc.body.appendChild(e), this.iframe = this.doc.createElement("iframe"), e.appendChild(this.iframe);
var n = this, r = t.util.query(this.socket.options.query, "t=" + +(new Date));
this.iframe.src = this.prepareUrl() + r, t.util.on(window, "unload", function() {
n.destroy();
});
}, n.prototype._ = function(e, t) {
this.onData(e);
try {
var n = t.getElementsByTagName("script")[0];
n.parentNode.removeChild(n);
} catch (r) {}
}, n.prototype.destroy = function() {
if (this.iframe) {
try {
this.iframe.src = "about:blank";
} catch (e) {}
this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage();
}
}, n.prototype.close = function() {
return this.destroy(), t.Transport.XHR.prototype.close.call(this);
}, n.check = function(e) {
if (typeof window != "undefined" && [ "Active" ].concat("Object").join("X") in window) try {
var n = new (window[[ "Active" ].concat("Object").join("X")])("htmlfile");
return n && t.Transport.XHR.check(e);
} catch (r) {}
return !1;
}, n.xdomainCheck = function() {
return !1;
}, t.transports.push("htmlfile");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(e, t, n) {
function r() {
t.Transport.XHR.apply(this, arguments);
}
function i() {}
e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = "xhr-polling", r.prototype.heartbeats = function() {
return !1;
}, r.prototype.open = function() {
var e = this;
return t.Transport.XHR.prototype.open.call(e), !1;
}, r.prototype.get = function() {
function t() {
this.readyState == 4 && (this.onreadystatechange = i, this.status == 200 ? (e.onData(this.responseText), e.get()) : e.onClose());
}
function r() {
this.onload = i, this.onerror = i, e.onData(this.responseText), e.get();
}
function s() {
e.onClose();
}
if (!this.isOpen) return;
var e = this;
this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = r, this.xhr.onerror = s) : this.xhr.onreadystatechange = t, this.xhr.send(null);
}, r.prototype.onClose = function() {
t.Transport.XHR.prototype.onClose.call(this);
if (this.xhr) {
this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = i;
try {
this.xhr.abort();
} catch (e) {}
this.xhr = null;
}
}, r.prototype.ready = function(e, n) {
var r = this;
t.util.defer(function() {
n.call(r);
});
}, t.transports.push("xhr-polling");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(e, t, n) {
function i(e) {
t.Transport["xhr-polling"].apply(this, arguments), this.index = t.j.length;
var n = this;
t.j.push(function(e) {
n._(e);
});
}
var r = n.document && "MozAppearance" in n.document.documentElement.style;
e["jsonp-polling"] = i, t.util.inherit(i, t.Transport["xhr-polling"]), i.prototype.name = "jsonp-polling", i.prototype.post = function(e) {
function a() {
f(), n.socket.setBuffer(!1);
}
function f() {
n.iframe && n.form.removeChild(n.iframe);
try {
u = document.createElement('<iframe name="' + n.iframeId + '">');
} catch (e) {
u = document.createElement("iframe"), u.name = n.iframeId;
}
u.id = n.iframeId, n.form.appendChild(u), n.iframe = u;
}
var n = this, r = t.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
if (!this.form) {
var i = document.createElement("form"), s = document.createElement("textarea"), o = this.iframeId = "socketio_iframe_" + this.index, u;
i.className = "socketio", i.style.position = "absolute", i.style.top = "0px", i.style.left = "0px", i.style.display = "none", i.target = o, i.method = "POST", i.setAttribute("accept-charset", "utf-8"), s.name = "d", i.appendChild(s), document.body.appendChild(i), this.form = i, this.area = s;
}
this.form.action = this.prepareUrl() + r, f(), this.area.value = t.JSON.stringify(e);
try {
this.form.submit();
} catch (l) {}
this.iframe.attachEvent ? u.onreadystatechange = function() {
n.iframe.readyState == "complete" && a();
} : this.iframe.onload = a, this.socket.setBuffer(!0);
}, i.prototype.get = function() {
var e = this, n = document.createElement("script"), i = t.util.query(this.socket.options.query, "t=" + +(new Date) + "&i=" + this.index);
this.script && (this.script.parentNode.removeChild(this.script), this.script = null), n.async = !0, n.src = this.prepareUrl() + i, n.onerror = function() {
e.onClose();
};
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(n, s), this.script = n, r && setTimeout(function() {
var e = document.createElement("iframe");
document.body.appendChild(e), document.body.removeChild(e);
}, 100);
}, i.prototype._ = function(e) {
return this.onData(e), this.isOpen && this.get(), this;
}, i.prototype.ready = function(e, n) {
var i = this;
if (!r) return n.call(this);
t.util.load(function() {
n.call(i);
});
}, i.check = function() {
return "document" in n;
}, i.xdomainCheck = function() {
return !0;
}, t.transports.push("jsonp-polling");
}("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
})();

// source/Socket.js

enyo.kind({
name: "Socket",
kind: enyo.Component,
address: window.location.host,
connOptions: {},
socket: null,
init: {
on: {}
},
on: function(e, t) {
var n, r;
if (enyo.isString(e) && enyo.isFunction(t)) n = e, r = t, this.socket.on(n, r); else if (e === Object(e)) for (n in e) e.hasOwnProperty(n) && (r = e[n], this.socket.on(n, enyo.bind(this, r)));
},
emit: null,
create: function() {
this.inherited(arguments), this.socket = io.connect(this.address, this.connOptions), this.on(this.init.on), this.emit = enyo.bind(this.socket, this.socket.emit);
}
});

// source/Navbar.js

enyo.kind({
name: "slidedeck.Navbar",
kind: "onyx.Toolbar",
layoutKind: "FittableColumnsLayout",
components: [ {
kind: "onyx.Button",
allowHtml: !0,
content: "&larr; Back",
onclick: "previousSlide"
}, {
name: "followAlongToggle",
kind: "onyx.ToggleButton",
value: !0,
onChange: "followAlong"
}, {
kind: "onyx.ProgressBar",
name: "slidesProgress",
position: "0",
style: "height: 12px; margin: 10px !important;",
fit: !0
}, {
kind: "onyx.Button",
allowHtml: !0,
content: "Next &rarr;",
onclick: "nextSlide"
} ],
socket: null,
create: function() {
this.inherited(arguments), this.socket = new Socket;
var e = this.owner.$.slidesPanes.getPanels().length;
this.$.slidesProgress.max = e, this.updateProgress();
},
updateProgress: function() {
"use strict";
var e = this.owner.$.slidesPanes.index + 1;
this.$.slidesProgress.animateProgressTo(e), this.socket.emit("slideChanged", this.owner.$.slidesPanes.index);
},
nextSlide: function() {
"use strict";
this.owner.$.slidesPanes.next();
},
previousSlide: function() {
"use strict";
this.owner.$.slidesPanes.previous();
},
joinViewer: function() {
"use strict";
this.socket.emit("joinViewer");
},
leaveViewer: function() {
"use strict";
this.socket.emit("leaveViewer");
},
followAlong: function() {
"use strict";
this.$.followAlongToggle.getValue() ? this.joinViewer() : this.leaveViewer();
}
});

// source/Slide.js

enyo.kind({
name: "slidedeck.Slide",
kind: "enyo.Control",
classes: "slide"
});

// source/CodeSlide.js

enyo.kind({
kind: "slidedeck.Slide",
name: "slidedeck.CodeSlide",
layoutKind: "enyo.FittableRowsLayout",
published: {
codeSamples: [],
title: "Playground"
},
components: [ {
kind: "onyx.Toolbar",
name: "titleBar",
content: "Playground"
}, {
fit: !0,
kind: "enyo.FittableColumns",
components: [ {
fit: !0,
kind: "enyo.FittableRows",
style: "padding: 5px;",
components: [ {
kind: "enyo.FittableColumns",
style: "width: 100%; margin-bottom: 5px;",
components: [ {
fit: !0,
kind: "enyo.Select",
name: "sampleSelect",
classes: "onyx-button",
style: "padding-bottom: 5px;"
}, {
kind: "onyx.Button",
name: "loadFile",
style: "margin: 0 0 0 10px;",
onclick: "loadFile",
content: "Load"
} ]
}, {
fit: !0,
kind: "CodeEditor",
style: "width: 100%; font-size: 2em;"
}, {
kind: "onyx.Button",
content: "Make it so!",
style: "width: 100%;",
onclick: "renderIntoSandbox"
} ]
}, {
fit: !0,
kind: "CodePlayer",
style: "width: 50%; padding: 10px;",
go: function(e) {
this.destroyClientControls();
try {
var t = e.replace(/\s/g, ""), n = /\S*?name:("|')(\w+)(\1)\S*/g.exec(t), r = n[2];
this.evalCode(e), this.createComponent({
kind: r
}), this.hasNode() && this.render();
} catch (i) {
console.error("Error creating code: " + i);
}
}
} ]
} ],
create: function() {
this.inherited(arguments), this.setTitle(this.title);
},
setTitle: function(e) {
this.$.titleBar.content = e;
},
renderIntoSandbox: function(e) {
this.$.codePlayer.go(this.$.codeEditor.getValue());
},
setCodeSamples: function(e) {
for (var t = 0; t < e.length; t++) {
var n = e[t];
this.$.sampleSelect.createComponent({
kind: "enyo.Option",
content: n,
value: n
});
}
this.$.sampleSelect.render();
},
loadFile: function() {
var e = this.$.sampleSelect.getValue();
this.$.codeEditor.setUrl("$presentation/assets/code/" + e + ".js");
}
});

// source/SlidesPane.js

enyo.kind({
kind: "Panels",
name: "slidedeck.SlidesPane",
arrangerKind: "HFlipArranger",
addSlide: function(e) {
"use strict";
var t = this.createComponent(e, {
owner: this
});
this.render();
},
goToSlide: function(e) {
"use strict";
this.setIndex(e);
}
});

// source/Slidedeck.js

enyo.kind({
name: "slidedeck.Main",
components: [ {
name: "mainLayout",
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
kind: "QuestionsPullout",
onQuestionReceived: "updateQuestions"
}, {
kind: "slidedeck.SlidesPane",
name: "slidesPanes",
fit: !0,
onTransitionFinish: "updateProgress"
} ]
} ],
navbar: !0,
socket: null,
slides: [],
create: function() {
this.inherited(arguments), enyo.forEach(this.slides, this.setupSlide, this), this.socket = new Socket({
init: {
on: {
changeSlide: this.changeSlide
}
}
}), this.navbar && this.$.mainLayout.createComponent({
name: "navbar",
kind: "slidedeck.Navbar"
}, {
owner: this
}), window.location.search === "?presenter" ? this.joinPresenter() : this.$.navbar.joinViewer();
},
setupSlide: function(e) {
"use strict";
this.$.slidesPanes.addSlide({
kind: e
});
},
changeSlide: function(e) {
"use strict";
this.$.followAlongToggle.value && this.$.slidesPanes.goToSlide(e);
},
joinPresenter: function() {
"use strict";
this.$.followAlongToggle.setDisabled(!0), this.socket.emit("setPresenter");
},
updateProgress: function() {
"use strict";
this.$.navbar.updateProgress();
},
updateQuestions: function(e, t) {
"use strict";
this.$.slidesPanes.$.questions.addQuestion(t);
}
});

// title.js

enyo.kind({
kind: "slidedeck.Slide",
name: "title",
classes: "title-slide",
components: [ {
tag: "div",
classes: "title-text",
components: [ {
tag: "h1",
content: "EnyoJS as a Framework for Great Justice"
}, {
tag: "h2",
content: "Blaine Bublitz and Ryan Rix"
}, {
tag: "h2",
content: "(@BlaineBublitz and @rrrrrrrix)"
}, {
tag: "h2",
content: "http://phxmobi.nodester.com"
}, {
tag: "h2",
content: "21 June 2012"
} ]
} ]
});

// whatIsIt.js

enyo.kind({
kind: "slidedeck.Slide",
name: "whatIsIt",
components: [ {
kind: "onyx.Toolbar",
content: "What Is Enyo?"
}, {
tag: "h1",
classes: "center",
content: "Another F#^%&*g JavaScript Framework!?!?"
}, {
kind: "enyo.Image",
src: "$presentation/assets/dojo-logo.png",
classes: "left-logo vendor-logo",
style: "top: 25%;"
}, {
kind: "enyo.Image",
src: "$presentation/assets/kendo-logo.png",
classes: "left-logo vendor-logo",
style: "top: 45%;"
}, {
kind: "enyo.Image",
src: "$presentation/assets/sencha-logo.png",
classes: "left-logo vendor-logo",
style: "top: 65%;"
}, {
kind: "enyo.Image",
src: "$presentation/assets/wink-logo.png",
classes: "right-logo vendor-logo",
style: "top: 35%;"
}, {
kind: "enyo.Image",
src: "$presentation/assets/jquery-mobile-logo.png",
classes: "right-logo vendor-logo",
style: "top: 70%;"
}, {
kind: "enyo.Image",
src: "$presentation/assets/enyo-logo.png",
style: "display: block; margin: 0 auto;"
} ]
});

// aboutUs.js

enyo.kind({
kind: "slidedeck.Slide",
name: "aboutUs",
components: [ {
kind: "onyx.Toolbar",
content: "We Are Kind Of Awesome"
}, {
kind: "enyo.FittableColumns",
components: [ {
fit: !0,
name: "left_div",
components: [ {
components: [ {
components: [ {
kind: "enyo.Image",
classes: "right-photo",
src: "$presentation/assets/images/blaine.jpg"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Blaine Bublitz"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Kind of a big deal"
}, {
tag: "li",
content: "Co-founded Iced Development"
}, {
tag: "li",
content: "Contributor to EnyoJS"
}, {
tag: "li",
content: "Works on JavaScript/HTML5 and Node.js"
}, {
tag: "Likes complicated front-end JavaScript projects"
}, {
tag: "li",
content: "Does a lot of toolchain development"
}, {
tag: "li",
content: "Developed tooling for EnyoJS for easier and faster development"
}, {
tag: "li",
content: "Interested in Responsive/mobile-first design"
} ]
} ]
} ]
} ]
} ]
}, {
style: "text-align: center;",
components: [ {
tag: "a",
attributes: {
href: "http://iceddev.com"
},
content: "Iced Dev"
}, {
tag: "span",
content: " - "
}, {
tag: "a",
attributes: {
href: "http://github.com/phated"
},
content: "Github"
}, {
tag: "span",
content: " - "
}, {
tag: "a",
attributes: {
href: "http://twitter.com/BlaineBublitz"
},
content: "Blaine on Twitter"
}, {
tag: "span",
content: " - "
}, {
tag: "a",
attributes: {
href: "http://twitter.com/iceddev"
},
content: "Iced on Twitter"
} ]
} ]
}, {
name: "right_div",
style: "width: 50%;",
components: [ {
components: [ {
kind: "enyo.Image",
classes: "right-photo",
src: "$presentation/assets/images/ryan_headshot_med.jpg"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Ryan Rix"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Also, kind of a big deal"
}, {
tag: "li",
content: "HeatSync Labs operations team member"
}, {
tag: "li",
content: "Open Source Contributor"
}, {
tag: "li",
content: "Qt and Enyo Developer"
}, {
tag: "li",
content: "Day job: Freelance DevOps plus JavaScript and Ruby on Rails dev."
}, {
tag: "li",
content: "At night: 3D Printer, Rocketry, Hacker/Maker"
} ]
} ]
} ]
} ]
}, {
style: "text-align: center;",
components: [ {
tag: "a",
attributes: {
href: "http://rix.si"
},
content: "The blagosphere"
}, {
tag: "span",
content: " - "
}, {
tag: "a",
attributes: {
href: "http://github.com/rrix"
},
content: "Github"
}, {
tag: "span",
content: " - "
}, {
tag: "a",
attributes: {
href: "http://twitter.com/rrrrrrrix"
},
content: "Tweeters"
}, {
tag: "span",
content: " - "
}, {
tag: "a",
attributes: {
href: "http://heatsynclabs.org"
},
content: "HeatSync Labs"
} ]
} ]
} ]
} ]
});

// enyoHistory.js

enyo.kind({
kind: "slidedeck.Slide",
name: "enyoHistory",
components: [ {
kind: "onyx.Toolbar",
content: "A Little History Lesson"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "2009 - Mojo Framework on Palm Pre"
}, {
tag: "li",
content: "2011 - Enyo 1.0 on HP Touchpad"
}, {
tag: "li",
content: "2012 (January) - Enyo 2.0-beta1 (and 1.0) released under Apache 2.0 License"
}, {
tag: "li",
content: "2012 (February) - Enyo 2.0-beta2 released"
}, {
tag: "li",
content: "2012 (March) - Enyo 2.0-beta3, Onyx, and fittable layouts released"
}, {
tag: "li",
content: "2012 (April) - Enyo 2.0-beta4 and PhoneGap/Cordova support released"
}, {
tag: "li",
content: "2012 (June) - Enyo 2.0-beta5, new layouts/onyx widgets, and bootplate released"
}, {
tag: "li",
content: "2012 (July) - Enyo 2.0-GA, new onyx widgets, bug fixes and sampler app released"
}, {
tag: "li",
content: "2012 (August) - Enyo 2.0.1, enyo.load & enyo.singleton, bug fixes and more documentation"
} ]
} ]
});

// benefits.js

enyo.kind({
kind: "slidedeck.Slide",
name: "benefits",
components: [ {
kind: "onyx.Toolbar",
content: "What Are The Benefits?"
}, {
kind: "enyo.FittableColumns",
components: [ {
tag: "ul",
fit: !0,
components: [ {
tag: "li",
content: "Object-Oriented abstraction"
}, {
tag: "li",
content: "Focus on components"
}, {
tag: "li",
content: "Package-based loader"
}, {
tag: "li",
content: "Onyx widget library"
}, {
tag: "li",
content: "Layout library for complicated layouts"
}, {
tag: "li",
components: [ {
content: "Awesome community"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Tons of Support"
}, {
tag: "li",
content: "Community Gallery of user components"
} ]
} ]
}, {
tag: "li",
content: "Best of all - no HTML!"
} ]
}, {
style: "width: 400px;",
components: [ {
kind: "enyo.Image",
src: "$presentation/assets/images/onix-inherits.png"
} ]
} ]
} ]
});

// community.js

enyo.kind({
kind: "slidedeck.Slide",
name: "community",
components: [ {
kind: "onyx.Popup",
name: "teamPopup",
style: "width:100%",
components: [ {
kind: "enyo.Image",
style: "width:100%; height:100%; display: block; margin 0 auto;",
src: "$presentation/assets/images/enyojs-team.jpg",
onclick: "hidePopup"
} ]
}, {
kind: "onyx.Toolbar",
content: "The Awesome Enyo Community"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Getting help is easy"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
tag: "a",
attributes: {
href: "http://forums.enyojs.com/categories/enyo-2"
},
content: "EnyoJS forums"
} ]
}, {
tag: "li",
content: "#EnyoJS on Freenode"
} ]
} ]
}, {
tag: "li",
content: "Team Enyo is Awesome"
}, {
style: "height: 300px;",
kind: "enyo.Image",
src: "$presentation/assets/images/enyojs-team.jpg",
onclick: "popupTeam"
} ]
} ],
popupTeam: function(e) {
this.$.teamPopup.show();
},
hidePopup: function(e) {
this.$.teamPopup.hide();
}
});

// oop.js

enyo.kind({
kind: "slidedeck.Slide",
name: "oop",
components: [ {
kind: "onyx.Toolbar",
content: "Object-Orientation in Enyo"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Components"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Everything is components..."
}, {
tag: "li",
content: "...Components are everything"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "enyo.Control"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Basic building blocks"
}, {
tag: "li",
content: "Abstraction of HTML elements"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "Encapsulation"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Components inside components inside components"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "this.$"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Hash of references to sub-components"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "enyo.kind"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Generates constructors that can inherit or be inherited"
} ]
} ]
} ]
} ]
});

// packageLoader.js

enyo.kind({
kind: "slidedeck.Slide",
name: "packageLoader",
components: [ {
kind: "onyx.Toolbar",
content: "Package Loader"
}, {
kind: "enyo.FittableColumns",
components: [ {
style: "width: 50%;",
components: [ {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Why a custom loader?"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Less tags to write in HTML"
}, {
tag: "li",
content: "Uniform way to include files"
}, {
tag: "li",
content: "Allows for structured apps"
}, {
tag: "li",
content: "Encapsulate standalone packages"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "What can be loaded?"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Scripts"
}, {
tag: "li",
content: "Stylesheets"
}, {
tag: "li",
content: "Packages"
}, {
tag: "li",
content: "Even from external sources!"
} ]
} ]
} ]
} ]
}, {
fit: !0,
components: [ {
kind: "Selection",
onSelect: "select",
onDeselect: "deselect"
}, {
kind: "Scroller",
fit: !0,
style: "font-size: 1.4em;",
components: [ {
kind: "Node",
icon: "$presentation/assets/images/folder-open.png",
content: "Project",
expandable: !0,
expanded: !0,
onExpand: "nodeExpand",
onNodeTap: "nodeTap",
components: [ {
icon: "$presentation/assets/images/file.png",
content: "package.js"
}, {
icon: "$presentation/assets/images/file.png",
content: "index.html"
}, {
icon: "$presentation/assets/images/folder.png",
content: "enyo",
expandable: !0,
components: [ {
icon: "$presentation/assets/images/folder.png",
content: "__A Bunch of Enyo Directories__"
}, {
icon: "$presentation/assets/images/file.png",
content: "package.js"
}, {
icon: "$presentation/assets/images/file.png",
content: "enyo.js"
}, {
icon: "$presentation/assets/images/file.png",
content: "loader.js"
} ]
}, {
icon: "$presentation/assets/images/folder.png",
content: "lib",
expandable: !0,
components: [ {
icon: "$presentation/assets/images/folder.png",
content: "layout",
expandable: !0,
components: [ {
icon: "$presentation/assets/images/folder.png",
content: "__A Bunch of Layout Directories__"
}, {
icon: "$presentation/assets/images/file.png",
content: "package.js"
} ]
}, {
icon: "$presentation/assets/images/folder.png",
content: "onyx",
expandable: !0,
components: [ {
icon: "$presentation/assets/images/folder.png",
content: "__A Bunch of Onyx Directories__"
}, {
icon: "$presentation/assets/images/file.png",
content: "package.js"
} ]
}, {
icon: "$presentation/assets/images/folder.png",
content: "canvas",
expandable: !0,
components: [ {
icon: "$presentation/assets/images/file.png",
content: "package.js"
} ]
}, {
icon: "$presentation/assets/images/folder.png",
content: "extra",
expandable: !0,
components: [ {
icon: "$presentation/assets/images/folder.png",
content: "__A Bunch of Extra Directories__"
}, {
icon: "$presentation/assets/images/file.png",
content: "package.js"
} ]
} ]
} ]
} ]
} ]
} ]
} ],
nodeExpand: function(e, t) {
e.setIcon("$presentation/assets/images/" + (e.expanded ? "folder-open.png" : "folder.png"));
},
nodeTap: function(e, t) {
var n = t.originator;
this.$.selection.select(n.id, n);
},
select: function(e, t) {
t.data.$.caption.applyStyle("background-color", "lightblue");
},
deselect: function(e, t) {
t.data.$.caption.applyStyle("background-color", null);
}
});

// kindsPlayground.js

enyo.kind({
kind: "slidedeck.CodeSlide",
name: "kindsPlayground",
create: function() {
this.inherited(arguments), this.setCodeSamples([ "sample1", "sample2", "sample3", "sample4" ]), this.setTitle("Kinds Playground");
}
});

// onyxWhy.js

enyo.kind({
kind: "slidedeck.Slide",
name: "onyxWhy",
components: [ {
kind: "onyx.Toolbar",
content: "Onyx: Because plain widgets are boring"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Leverage Enyo kinds"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Combine components naturally"
}, {
tag: "li",
components: [ {
kind: "onyx.Button",
content: "Building new widgets is the same as anything else"
} ]
} ]
} ]
}, {
tag: "li",
content: "Elegant styling"
}, {
tag: "li",
components: [ {
content: "Easy to customise"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Everything is CSS"
}, {
tag: "li",
content: "Sub-kinds make awesome easy"
} ]
} ]
} ]
} ]
});

// onyxPlayground.js

enyo.kind({
kind: "slidedeck.CodeSlide",
name: "onyxPlayground",
create: function() {
this.inherited(arguments), this.setCodeSamples([ "onyxButtonsSimple", "onyxPopup", "onyxSlidersAndProgress", "onyxControls" ]), this.setTitle("Onyx Widget Playground");
}
});

// layoutLibrary.js

enyo.kind({
kind: "slidedeck.Slide",
name: "layoutLibrary",
components: [ {
kind: "onyx.Toolbar",
content: "Layouts, For Fun and Profit"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Make your apps look more... app-like"
}, {
tag: "ul",
components: [ {
tag: "li",
components: [ {
content: "Fittable"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "enyo.FittableColumns && enyo.FittableColumnsLayout"
}, {
tag: "li",
content: "enyo.FittableRows && enyo.FittableRowsLayout"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "List"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "enyo.FlyweightRepeater"
}, {
tag: "li",
content: "enyo.List"
} ]
} ]
}, {
tag: "li",
content: "Slideable"
}, {
tag: "li",
components: [ {
content: "Panels"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "arrangers (Card, CardSlideIn, Carousel, Collapsing, Others)"
}, {
tag: "li",
components: [ {
tag: "a",
content: "more-arrangers (https://github.com/ShiftyAxel/more-arrangers)",
attributes: {
href: "https://github.com/ShiftyAxel/more-arrangers"
}
} ]
} ]
} ]
}, {
tag: "li",
content: "Tree"
} ]
} ]
} ]
} ]
});

// bootplate.js

enyo.kind({
kind: "slidedeck.Slide",
name: "bootplate",
components: [ {
kind: "onyx.Toolbar",
components: [ {
style: "text-decoration: line-through;",
content: "Bootstrap, Boilerplate, Boilerstrap, "
}, {
content: "Bootplate Your Project!"
} ]
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Starter template for an Enyo project"
}, {
tag: "li",
content: "Includes all Enyo + Onyx/Layout"
}, {
tag: "li",
components: [ {
content: "Easy to obtain"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Can be cloned from Github (libs as submodules)"
}, {
tag: "li",
content: "Or downloaded with source code from http://enyojs.com"
} ]
} ]
}, {
tag: "li",
content: "Scaffolds packages into correct directory structure"
}, {
tag: "li",
content: "Allows for easy deployment/packaging"
}, {
tag: "li",
content: "Contains API Viewer for quick reference"
}, {
tag: "li",
content: "Includes easy-to-overlook code"
} ]
} ]
});

// communityGallery.js

enyo.kind({
kind: "slidedeck.Slide",
name: "communityGallery",
components: [ {
kind: "onyx.Toolbar",
content: "Enhancements: Community Style"
}, {
kind: "enyo.FittableColumns",
components: [ {
tag: "ul",
fit: !0,
components: [ {
tag: "li",
components: [ {
content: "Community Gallery"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "User submitted add-ons, libraries or packages"
}, {
tag: "li",
content: "Hosted on Github Pages"
}, {
tag: "li",
content: "Uses pull requests to submit projects"
} ]
} ]
}, {
tag: "li",
components: [ {
content: "What types of projects are there?"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Widgets"
}, {
tag: "li",
content: "Storage/Database Adapters"
}, {
tag: "li",
content: "Request Adapters"
}, {
tag: "li",
content: "Layout Kinds"
}, {
tag: "li",
content: "Assertions"
}, {
tag: "li",
content: "Even a keyboard and joystick!"
} ]
} ]
}, {
tag: "li",
components: [ {
tag: "a",
content: "http://enyojs.com/gallery/",
attributes: {
href: "http://enyojs.com/gallery/"
}
} ]
} ]
}, {
style: "width: 300px;",
components: [ {
kind: "enyo.Image",
src: "$presentation/assets/images/gts.DatePicker.jpg"
}, {
kind: "enyo.Image",
src: "$presentation/assets/images/MachiApps.ColorPicker.jpg"
}, {
kind: "enyo.Image",
src: "$presentation/assets/images/gts.Keyboard.jpg"
} ]
} ]
} ]
});

// deployment.js

enyo.kind({
kind: "slidedeck.Slide",
name: "deployment",
components: [ {
kind: "onyx.Toolbar",
content: "Deployment"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Requires Node.js"
}, {
tag: "li",
content: "Concatenates and minifies CSS & JS"
}, {
tag: "li",
content: "enyo.css, enyo.js, app.css, app.js"
}, {
tag: "li",
content: "PhoneGap/Cordova support (Events Wrapper Kind - extra/phonegap)"
}, {
tag: "li",
components: [ {
tag: "a",
content: "Platform specific deployment",
attributes: {
href: "https://github.com/enyojs/enyo/wiki/Platform-Specific-Deployment"
}
} ]
} ]
} ]
});

// enyoFuture.js

enyo.kind({
kind: "slidedeck.Slide",
name: "enyoFuture",
components: [ {
kind: "onyx.Toolbar",
content: "Back to the Future of Enyo"
}, {
kind: "enyo.FittableColumns",
components: [ {
tag: "ul",
fit: !0,
components: [ {
tag: "li",
components: [ {
content: "Enyo"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Release Candidate 1 is on the horizon - hopefully next month"
}, {
tag: "li",
content: "More Onyx widgets"
}, {
tag: "li",
content: "Some kind of templating - looking at Mustache"
}, {
tag: "li",
content: "Wrapping more 3rd party libraries"
} ]
} ]
} ]
}, {
tag: "ul",
style: "width: 50%;",
components: [ {
tag: "li",
components: [ {
content: "Ares (Browser-based IDE for Enyo apps)"
}, {
tag: "ul",
components: [ {
tag: "li",
content: "Drag-and-drop UI editor"
}, {
tag: "li",
content: "Code completion"
}, {
tag: "li",
content: "Components to extend local and cloud storage"
} ]
} ]
} ]
} ]
}, {
kind: "enyo.Image",
src: "$presentation/assets/images/back-to-the-future.png",
style: "display: block; margin: 0 auto;"
} ]
});

// questions.js

enyo.kind({
kind: "slidedeck.Slide",
name: "questions",
components: [ {
kind: "onyx.Toolbar",
content: "Questions??"
}, {
name: "questionList",
kind: "Scroller",
classes: "enyo-fit",
touch: !0,
style: "margin: 60px 0 10px; font-size: 2em;"
} ],
addQuestion: function(e) {
"use strict";
this.$.questionList.createComponent({
content: enyo.macroize("{$name}: {$question}", e),
style: "margin: 0 50px;"
}), this.render();
}
});

// EnyoSlides.js

enyo.kind({
name: "EnyoSlides",
kind: "slidedeck.Main",
slides: [ "title", "aboutUs", "whatIsIt", "enyoHistory", "benefits", "community", "oop", "packageLoader", "kindsPlayground", "onyxWhy", "onyxPlayground", "layoutLibrary", "bootplate", "communityGallery", "deployment", "enyoFuture", "questions" ]
});

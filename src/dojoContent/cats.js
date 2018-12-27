define(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/dom-class",
        "dojo/topic",
        "dijit/Tooltip",
        "dojo/_base/lang",
        "dojo/text!./templates/cats_template.html",
        "dijit/form/Select"
    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        domClass,
        topic,
        Tooltip,
        lang,
        template
    ) {
        return declare(
            [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
            {
                templateString: template,
                constructor: function(){
                    console.log("1111");
                },
                postCreate: function () {
                    console.log("Hello")
                }
            }
        );
    }
);


//# sourceURL=cats.js

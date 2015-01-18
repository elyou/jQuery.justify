;(function ( $, window, document, undefined ) {
    var pluginName = "justify",
        defaults = {
            //elementsPerRow: -1
        };
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            this.distribute(this.element, this.options);//call distribute
        },

        fixWidth: function(el, w, contWidth) {
            var elements=$(el).find('.toBeDistributed');
            var extraWidth=(contWidth-w)/elements.length;
            console.log(w + " " +contWidth);
            console.log(elements);
                    
            $(elements).each(function(){
                $(this).removeClass('toBeDistributed');       
                $(this).width($(this).width()+extraWidth);
                $(this).css("display","inline-block");   

            });
        },
        distribute: function(el, options) {
            var _t=this;
            var contWidth=$(el).width();
            var w=0;//width of elements within one row 
            var childs=$(el).children();
            $(childs).each(function(){
                    __t=$(this);
                    if((w+__t.outerWidth(true))<contWidth){
                        w=w+__t.outerWidth(true);
                       __t.addClass("toBeDistributed");
                    }else{
                        _t.fixWidth(el, w, contWidth);
                        w=__t.outerWidth(true);
                        __t.addClass("toBeDistributed");
                    }
            });
             _t.fixWidth(el, w, contWidth);
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
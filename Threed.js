var Threed = {};
(function($,Threed){

    Threed.addThreed = function(o){
        this.options={
            selector:null,
            backgroundcolor: "rgba(127, 202, 255, 0.3)",
            opacity: 0.5,
            thickness: 30,
            background_image:"",
            back_cover:false
        }

        $.extend(this.options,o);

        // Defining jQuery Objects
        $content = $(this.options.selector);
        $parent = $content.parent();

        // Defining Global Variables
        var index = $("[class^='cubewrapper']").length;
        var contentWidth = $content.width();
        var contentHeight = $content.height();
        var color =  this.options.backgroundcolor;
        var boxopacity = this.options.opacity;
        var thickness = this.options.thickness;
        var isbackcovered = this.options.back_cover;
        var sides = ["left","right","top","bottom","back","cover","front"];
        var wrapperstate={  width:contentWidth,
                            height:contentHeight
                          };
        var title = $content.find("h2").text();
        // Defining Customized HTML elements
        var cubewrapper = $('<div></div>')
                        .addClass("cubewrapper_"+index)
                        .addClass("initstate")
                        .attr("index", index)
                        .css(wrapperstate);

        if($content.prev().length){
            cubewrapper.insertAfter($content.prev());
        }else{
            cubewrapper.prependTo($parent);
        }         

        $content.appendTo(cubewrapper);
        $content.addClass("front");                
        var left = $('<div></div>').addClass("left").appendTo(cubewrapper);
        var right = $('<div></div>').addClass("right").appendTo(cubewrapper);
        var top = $('<div></div>').addClass("top").appendTo(cubewrapper);
        var bottom = $('<div></div>').addClass("bottom").appendTo(cubewrapper);
        var back = $('<div></div>').addClass("back").appendTo(cubewrapper);
        if(isbackcovered){
            $('<h3>'+title+'</h3>').appendTo(back);
        }
        var cover = $('<div></div>').addClass("cover").appendTo(cubewrapper);

        // Adding CSS attributes foreach side
        for(var i=0;i<sides.length;i++){
            _addcss(sides[i]);
        }

        _initEvents();

        function _initEvents(){
            cubewrapper.hover(function(){
                $(this).addClass("hover");
            },function(){
                $(this).removeClass("hover");
            });
        }

        function _addcss(className){
            var width = contentWidth,
                height = contentHeight,
                transform = "",
                backgroundcolor = color, 
                opacity = boxopacity,
                transform_origin = "";
                margin_bottom = Number($content.css("margin-bottom").split("px")[0]),
                space = " ",
                selector = ".cubewrapper_"+index+space+"."+className;
            switch(className){
                case "left":
                    width = thickness;
                    transform = "translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateY(90deg)";
                    transform_origin = "left";
                    break;
                case "right":
                    width = thickness;
                    transform = "translateX("+contentWidth+"px)"+space+"translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateY(90deg)";
                    transform_origin = "left";
                    break;
                case "top":
                    height = thickness;
                    transform = "translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateX(-90deg)";
                    transform_origin = "top";
                    break;
                case "bottom":
                    height = thickness;
                    transform = "translateY("+(-margin_bottom)+"px)"+space+"rotateX(-90deg)";
                    transform_origin = "top";
                    break;
                case "back":
                    transform = "translateZ("+(-thickness)+"px)"+space+"translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateY(180deg)";
                    transform_origin = "center";
                    if(isbackcovered){
                        var innerHeight = $(selector+space+"h3").innerHeight(); 
                        opacity = 1;
                        backgroundcolor = "rgba(127, 202, 255, 0.96)";
                        $(selector+space+"h3").css("text-align","center");
                        $(selector+space+"h3").css("top",(height/2)-innerHeight);
                    }
                    break;
                case "cover":
                    transform = "translateY("+(-contentHeight-margin_bottom)+"px)";
                    transform_origin = "center";
                    break;
                case "front":
                    transform = "translateZ("+(-thickness/2)+"px)";
                    $(selector).css("transform",transform);
                    return;
                default:
                    // do nothing
                    break;                
            }
            $(selector).css("width",width);
            $(selector).css("height",height);
            $(selector).css("transform",transform);
            $(selector).css("background-color", backgroundcolor);
            $(selector).css("opacity",opacity);
            $(selector).css("transform-origin",transform_origin);
        }
    }
})(jQuery,Threed);
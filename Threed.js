var Threed = {};
(function($,Threed){

    Threed.addThreed = function(o){
        this.options={
            selector:null,
            backgroundcolor: "rgba(127, 202, 255, 0.3)",
            opacity: 0.5,
            thickness: 30,
            background_image:"",
            back_cover:false,
            link_item:false
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
        var linkitem = this.options.link_item;
        var sides = ["left","right","top","bottom","back","cover","front"];
        var wrapperstate={  width:contentWidth,
                            height:contentHeight
                         };
        var title = $content.find("h2").text();
        var wrapperclass = "cubewrapper_"+index;
        var cubewrapper;

        _initSides();
        _initEvents();

        if(linkitem){
            addCubeLinker(cubewrapper);
        }

        function _initSides(){ 
            // Defining Customized HTML elements
            cubewrapper = $('<div></div>')
                        .addClass(wrapperclass)
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
        }

        function _initEvents(){
            // Adding transition when hover
            if(linkitem){

            }else{
                cubewrapper.bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                  },
                  mouseleave: function() {
                    $(this).removeClass("hover");
                  }
                });
            }
        }

        function addCubeLinker(item){
            var cubelinkerleft = $('<div></div>').addClass('cubelinkerleft_'+index).addClass('connector').insertBefore(item);
            var front = $('<div></div>').addClass("front_link").appendTo(cubelinkerleft);
                left = $('<div></div>').addClass("left_link").appendTo(cubelinkerleft);
                right = $('<div></div>').addClass("right_link").appendTo(cubelinkerleft);
                back = $('<div></div>').addClass("back_link").appendTo(cubelinkerleft);
            cubelinkerleft.children().each(function(){
                _addcss($(this).attr("class"),'cubelinkerleft_'+index);
            });

            var cubelinkerright = $('<div></div>').addClass('cubelinkerright_'+index).addClass('connector').insertBefore(item);
            var front = $('<div></div>').addClass("front_link").appendTo(cubelinkerright);
                left = $('<div></div>').addClass("left_link").appendTo(cubelinkerright);
                right = $('<div></div>').addClass("right_link").appendTo(cubelinkerright);
                back = $('<div></div>').addClass("back_link").appendTo(cubelinkerright);
                
                cubelinkerright.children().each(function(){
                    _addcss($(this).attr("class"),'cubelinkerright_'+index);
                });
        }

        function _addcss(className,parentClass){
            var width = contentWidth,
                height = contentHeight,
                transform = "",
                backgroundcolor = color, 
                opacity = boxopacity,
                transform_origin = "";
                margin_bottom = Number($content.css("margin-bottom").split("px")[0]),
                space = " ",
                selector = ".cubewrapper_"+index+space+"."+className;

                if(className.split('_')[1] === "link"){
                    var linkwidth = contentWidth/12;
                    height = margin_bottom;
                    selector = "."+parentClass+space+"."+className;
                }

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
                    // Transform the content into the cube
                    transform = "translateZ("+(-thickness/2)+"px)";
                    $(selector).css("transform",transform);
                    return;

                // These Classes are for connectors between main div and sub divs
                case "front_link":
                    width= linkwidth;
                    transform = parentClass.split('_')[0] === "cubelinkerleft" ? "translateX("+contentWidth/6+"px)" : "translateX("+(contentWidth-(contentWidth/6+linkwidth))+"px)";
                    transform += "translateY("+(-margin_bottom)+"px)";
                    opacity = 0.8;
                    break;
                case "left_link":
                    width = thickness;
                    transform = parentClass.split('_')[0] === "cubelinkerleft" ? "translateX("+contentWidth/6+"px)" : "translateX("+(contentWidth-(contentWidth/6+linkwidth))+"px)";
                    transform += "translateY(-"+margin_bottom+"px) rotateY(90deg)";
                    break;
                case "right_link":
                    width = thickness;
                    transform = parentClass.split('_')[0] === "cubelinkerleft" ? "translateX("+(contentWidth/6+linkwidth)+"px)" : "translateX("+(contentWidth-(contentWidth/6+linkwidth))+"px)";
                    transform += "translateY(-"+margin_bottom+"px) rotateY(90deg)";
                    break;
                case "back_link":
                    width= linkwidth;
                    transform = parentClass.split('_')[0] === "cubelinkerleft" ? "translateX("+contentWidth/6+"px)" : "translateX("+(contentWidth-(contentWidth/6+linkwidth))+"px)";
                    transform += "translateY(-"+margin_bottom+"px) translateZ("+(-thickness)+"px)";
                    opacity = 0.8;
                    break;
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

    Threed.addGroupThreed = function(o){
       this.options={
            selector:null,
            backgroundcolor: "rgba(127, 202, 255, 0.3)",
            opacity: 0.5,
            thickness: 30,
            background_image:"",
            back_cover:false,
            link_item:false
        }

        $.extend(this.options,o);

        // Defining jQuery Objects
        $content = $(this.options.selector);
        $parent = $content.parent();
        $items = $(this.options.selector+" .item");


        // Defining Global Variables
        var index = $("[class^='cubegroup']").length;
        var cubegroup = $('<div></div>')
                        .addClass("cubegroup_"+index)
                        .addClass("groupstate");

        // Initialize HTML structure
        for(var i=1;i<$items.length;i++){
            var sectioncontainer = $('<section></section>').addClass("subsection").addClass("subsection_"+i);
            var sectioninner = $('<div></div>').addClass("subsection-inner");
            var contentcontainer = $('<div></div>').addClass("content");

            contentcontainer.appendTo(sectioninner);
            sectioninner.appendTo(sectioncontainer);
            $items.eq(i).appendTo(contentcontainer);
            sectioncontainer.appendTo(cubegroup);
        }
        if($content.prev().length){
            cubegroup.insertAfter($content.prev());
        }else{
            cubegroup.prependTo($parent);
        }
        $content.prependTo(cubegroup);
        $(this.options.selector+" .divider").remove();

        // Rendering cubes
        Threed.addThreed(this.options);

        for(var i=1;i<$items.length;i++){
            this.options.selector = ".cubegroup_"+index+" ."+"subsection_"+i;
            this.options.link_item = true;
            Threed.addThreed(this.options);
        }

        // Binding events
        cubegroup.children().eq(0).unbind(); // Unbind first div event
        cubegroup.hover(function(){
                $(this).addClass("hover");
            },function(){
                $(this).removeClass("hover");
        });
       // cubegroup.css("transition","transform 1s ease-in");
        var transitionduration = 1;
        cubegroup.children().each(function(index,element){
            cubegroup.hover(function(){
                $(element).addClass("hover");
            },function(){
                $(element).removeClass("hover");
            });
            $(element).css("transition","transform "+transitionduration+"s ease-in");
            transitionduration +=0.1;
        });


    }

})(jQuery,Threed);
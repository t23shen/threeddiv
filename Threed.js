var Threed = {};
(function($,Threed){

    Threed.addThreed = function(o){
        this.options={
            selector:null,
            backgroundcolor: "#90caf9",
            opacity: 0.5,
            thickness: 30,
            background_image:"",
            back_cover:false,
            initCSS: "initstate",
            link_item:false,
            cube_wall:false
        }

        $.extend(this.options,o);

        // Defining jQuery Objects
        $content = $(this.options.selector);
        $parent = $content.parent();

        // Defining Global Variables
        var elementSelector = this.options.selector;
        var index = $("[class^='cubewrapper']").length;
        var contentWidth = $content.width();
        var contentHeight = $content.height();
        var color =  this.options.backgroundcolor;
        var boxopacity = this.options.opacity;
        var thickness = this.options.thickness;
        var isbackcovered = this.options.back_cover;
        var linkitem = this.options.link_item;
        var initCSSClass = this.options.initCSS;
        var iscubewall = this.options.cube_wall;

        var sides = ["left","right","top","bottom","back","cover","front"];
        var wrapperstate={  width:contentWidth,
                            height:contentHeight
                         };
        var title = $content.find("h2").text().toUpperCase();
        var wrapperclass = "cubewrapper_"+index;
        var cubewrapper;
        var backCoverColor = "#90caf9";
        var iconClass = {
            "education":"fa fa-graduation-cap",
            "about":"fa fa-quote-left",
            "basic":"fa fa-info",
            "skills":"fa fa-check-square-o",
            "languages":"fa fa-language",
            "latest":"fa fa-star",
            "github":"fa fa-github-alt",
            "other":"fa fa-reorder",
            "music":"fa fa-headphones",
            "work":"fa fa-briefcase",
            "credits":"fa fa-heart"
        }
        _initSides();
        _initEvents();

        if(linkitem){
            addCubeLinker(cubewrapper);
        }

        function _initSides(){ 
            // Defining Customized HTML elements
            cubewrapper = $('<div></div>')
                        .addClass(wrapperclass)
                        .addClass(initCSSClass)
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
                var icon = iconClass[title.toLowerCase().split(" ")[0]];
                $('<i class="'+icon+'"></i>').appendTo(back);
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

            }else if(iscubewall){
                cubewrapper.bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("wallhover");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    $(this).removeClass("wallhover");
                    $(this).css("z-index",999);

                  }
                });
            }else{
                cubewrapper.bind({
                  click: function() {
                    $(this).removeClass("hover");
                    $(this).addClass("active");
                    $(elementSelector).css("transform","translateZ(1px)");
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                    //$(this).removeClass("unhover");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    //$(this).removeClass("hover");
                    //$(this).addClass("unhover");
                    /*if(isended){
                        $(this).removeClass("hover");
                        $(this).css("z-index",999);
                        isended=false;
                    }*/
                  }
                });
                cubewrapper.bind('transitionend',function(){
                    $(this).removeClass('hover');
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
                    transform = iscubewall? "rotateY(90deg)":"translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateY(90deg)";
                    transform_origin = "left";
                    break;
                case "right":
                    width = thickness;
                    transform = iscubewall? "translateX("+contentWidth+"px)"+space+"rotateY(90deg)":"translateX("+contentWidth+"px)"+space+"translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateY(90deg)";
                    transform_origin = "left";
                    break;
                case "top":
                    height = thickness;
                    transform = iscubewall? "rotateX(-90deg)":"translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateX(-90deg)";
                    transform_origin = "top";
                    break;
                case "bottom":
                    height = thickness;
                    transform = iscubewall? "translateY("+(contentHeight)+"px)"+space+"rotateX(-90deg)":"translateY("+(-margin_bottom)+"px)"+space+"rotateX(-90deg)";
                    transform_origin = "top";
                    break;
                case "back":
                    transform = iscubewall? "translateZ("+(-thickness)+"px)"+space+"rotateY(180deg)":"translateZ("+(-thickness)+"px)"+space+"translateY("+(-contentHeight-margin_bottom)+"px)"+space+"rotateY(180deg)";
                    transform_origin = "center";
                    if(isbackcovered){
                        var innerHeight = $(selector+space+"h3").innerHeight(); 
                        opacity = 0.95;
                        backgroundcolor = backCoverColor;
                        $(selector+space+"h3").css("text-align","center");
                        $(selector+space+"h3").css("top",(height/2)-innerHeight);
                        $(selector+space+"i").css("top",(height/2)-innerHeight);
                    }
                    break;
                case "cover":
                    transform = iscubewall? "":"translateY("+(-contentHeight-margin_bottom)+"px)";
                    transform_origin = "center";
                    break;
                case "front":
                    // Transform the content into the cube
                    if(iscubewall){
                        $(selector).hide();
                    }else{
                        transform = "translateZ("+(-thickness/2)+"px)";
                        $(selector).css("transform",transform);
                    }
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
            initCSS: "groupinitstate",
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
                        .addClass("containerstate");

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
                $(this).addClass("containerhover");
                $(this).css("z-index",1000);
            },function(){
                $(this).removeClass("containerhover");
                $(this).css("z-index",999);

        });

        var transitionduration = 1;
        cubegroup.children().each(function(index,element){
            cubegroup.hover(function(){
                $(element).addClass("grouphover");
                $(this).css("z-index",1000);
            },function(){
                $(element).removeClass("grouphover");
                $(this).css("z-index",999);
            });
            $(element).css("transition","transform "+transitionduration+"s ease-in");
            transitionduration +=0.1;
        });
    }

    Threed.addFormat = function(o){
        this.options={
            container_selector:null,
            back_flip:false,
            scale:0.6
        }

        $.extend(this.options,o);

        // Defining global variables
        var containerClass = this.options.container_selector;
        var containerWidth = $(containerClass).outerWidth();
        var scale = this.options.scale;
        var middleSpace = 6;//px
        var elementSpace = 10;//px
        var elementTopSpace = 0;
        var elementPrevHeight;
        var originPos = {
            "left":{},
            "right":{}
        }

        // Defining jQuery Objects
        $leftColumn = $(containerClass+' .primary');
        $rightColumn = $(containerClass+' .secondary');

        // Calculate left and right width to center the elements
        var leftElementWidth = ($leftColumn.children().eq(0).width())*scale;
        var rightElementWidth = ($rightColumn.children().eq(0).width())*scale;
        var spaceWidth = (containerWidth-(leftElementWidth+rightElementWidth))/2;

        // Assume all elements have equal width and aligned
        var leftElementOffset=(spaceWidth-$leftColumn.children().eq(0).position().left)-middleSpace;
        var rightElementOffset=(spaceWidth-($rightColumn.outerWidth()-$rightColumn.children().eq(0).position().left-rightElementWidth))-middleSpace;
 
        // Correcting Left and Right ELement's positions
        $leftColumn.children().each(function(index,element){
            var classname = $(element).attr("class").split(" ")[0];
            originPos.left[classname] = $(element).offset();

            var elementPositionTop = $(element).position().top;
            // First element
            if(elementPositionTop!=0){
                elementTopSpace= elementTopSpace+elementPrevHeight+elementSpace;
                $(element).css("top",-(elementPositionTop-elementTopSpace));
            }
            elementPrevHeight = $(element).height()*scale;
            $(element).css("left",leftElementOffset);

            //rebind events
            $(element).unbind().bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                    $(this).css("transform","translateX("+(-leftElementOffset)+"px) rotateY(0deg) rotateZ(0deg) scale(1)");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    $(this).removeClass("hover");
                    $(this).css("transform","translateX(0px) rotateY(180deg) rotateZ(0deg) scale(0.6)");
                    $(this).css("z-index",999);

                  }
                });
        });

        elementTopSpace = 0; //Reset variable to 0
        $rightColumn.children().each(function(index,element){
            var classname = $(element).attr("class").split(" ")[0];
            originPos.right[classname] = $(element).offset();

            var elementPositionTop = $(element).position().top;
            // First element
            if(elementPositionTop!=0){
                elementTopSpace=elementTopSpace+elementPrevHeight+elementSpace;
                $(element).css("top",-(elementPositionTop-elementTopSpace));
            }
            elementPrevHeight = $(element).height()*scale;
            $(element).css("right",rightElementOffset);

            //rebind events
            $(element).unbind().bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                    $(this).css("transform","translateX("+(rightElementOffset)+"px) rotateY(0deg) rotateZ(0deg) scale(1)");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    $(this).removeClass("hover");
                    $(this).css("transform","translateX(0px) rotateY(180deg) rotateZ(0deg) scale(0.6)");
                    $(this).css("z-index",999);

                  }
                });
        });

    }

    Threed.addSideWalls = function(o){
        this.options={
            container_selector:null,
            middle_space:6,
            scale:0.6,
            cube_wall:true,
            initCSS:"",
            thickness:0
        }

        $.extend(this.options,o);
        $body = $("body");
        
        // Defining global variables
        var containerClass = this.options.container_selector;
        var scale = this.options.scale;
        var middleSpace = this.options.middle_space;
        var leftElementWidth = $(containerClass+' .primary').children().eq(0).width();
        var rightElementWidth = $(containerClass+' .secondary').children().eq(0).width();
        var leftRealWidth = leftElementWidth*scale;
        var rightRealWidth = rightElementWidth*scale;

        var wallWidth = ($body.width()-$(containerClass+" .row").width())/2;
        var wallHeight = $(containerClass+" .row").height();
        var wallLength = 800;
        var rotateY = Math.atan((($(containerClass+" .row").width()-(leftRealWidth+rightRealWidth+middleSpace*2))/2)/wallLength)*(180/Math.PI);
        var rotateX = 5;

        $("<div></div>").addClass("left-wall").css({width:wallWidth,
                                                    height:wallHeight
                                                    }).prependTo($(containerClass));
        $("<div></div>").addClass("right-wall").css({width:wallWidth,
                                                    height:wallHeight
                                                    }).prependTo($(containerClass));
        // Positioning
        this.options.initCSS="leftstate";
        this.options.selector=".left-wall";
        this.options.thickness=wallLength;                             
        Threed.addThreed(this.options);
        this.options.initCSS="rightstate";
        this.options.selector=".right-wall";
        Threed.addThreed(this.options);
        $('.leftstate').css("transform","rotateX(5deg) rotateY("+(-rotateY)+"deg)");
        $('.rightstate').css("transform","rotateX(5deg) rotateY("+rotateY+"deg)");

        // Ajusting the container position respect to the wall
        // The five pixels are the offset
        var top = (Math.sin(rotateX*Math.PI/180)*wallLength)+5;
        $('.main').css("top",top);
    }

    Threed.correctSpacing = function(o){
        this.options={
            container_selector:null,
            scale:1
        }

        $.extend(this.options,o);

        // Defining global variables
        var containerClass = this.options.container_selector;
        var containerWidth = $(containerClass).outerWidth();
        var scale = this.options.scale;
        var middleSpace = 6;//px
        var elementSpace = 10;//px
        var elementTopSpace = 0;
        var elementPrevHeight;

        // Defining jQuery Objects
        $leftColumn = $(containerClass+' .secondary');
        $rightColumn = $(containerClass+' .third');
        $middleColumn = $(containerClass+ ' .primary');
 
        // Correcting Left Col ELement's positions
        $leftColumn.children().each(function(index,element){
            var elementPositionTop = $(element).position().top;
            // First element
            if(elementPositionTop!=0){
                elementTopSpace= elementTopSpace+elementPrevHeight+elementSpace;
                $(element).css("top",-(elementPositionTop-elementTopSpace));
            }
            elementPrevHeight = $(element).height()*scale;
            $(element).css("left",30-middleSpace);

            //rebind events
 /*           $(element).unbind().bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                    $(this).css("transform","translateX("+(-leftElementOffset)+"px) rotateY(0deg) rotateZ(0deg) scale(1)");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    $(this).removeClass("hover");
                    $(this).css("transform","translateX(0px) rotateY(180deg) rotateZ(0deg) scale(0.6)");
                    $(this).css("z-index",999);

                  }
                });*/
        });

        // Correcting Right Col ELement's positions
        elementTopSpace = 0; //Reset variable to 0
        $rightColumn.children().each(function(index,element){
            var elementPositionTop = $(element).position().top;
            // First element
            if(elementPositionTop!=0){
                elementTopSpace=elementTopSpace+elementPrevHeight+elementSpace;
                $(element).css("top",-(elementPositionTop-elementTopSpace));
            }
            elementPrevHeight = $(element).height()*scale;
            $(element).css("right",30-middleSpace);

            //rebind events
/*            $(element).unbind().bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                    $(this).css("transform","translateX("+(rightElementOffset)+"px) rotateY(0deg) rotateZ(0deg) scale(1)");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    $(this).removeClass("hover");
                    $(this).css("transform","translateX(0px) rotateY(180deg) rotateZ(0deg) scale(0.6)");
                    $(this).css("z-index",999);

                  }
                });*/
        });

        // Correcting middle Col ELement's positions
        elementTopSpace = 0; //Reset variable to 0
        $middleColumn.children().each(function(index,element){
            var elementPositionTop = $(element).position().top;
            // First element
            if(elementPositionTop!=0){
                elementTopSpace=elementTopSpace+elementPrevHeight+elementSpace;
                $(element).css("top",-(elementPositionTop-elementTopSpace));
            }
            elementPrevHeight = $(element).height()*scale;

            //rebind events
/*            $(element).unbind().bind({
                  click: function() {
                    //$( this ).addClass( "active" );
                  },
                  mouseenter: function() {
                    $(this).addClass("hover");
                    $(this).css("transform","translateX("+(rightElementOffset)+"px) rotateY(0deg) rotateZ(0deg) scale(1)");
                    $(this).css("z-index",1000);
                  },
                  mouseleave: function() {
                    $(this).removeClass("hover");
                    $(this).css("transform","translateX(0px) rotateY(180deg) rotateZ(0deg) scale(0.6)");
                    $(this).css("z-index",999);

                  }
                });*/
        });

    }
})(jQuery,Threed);

var MugedaSlide = function(options){
    this.options = options || {}
    
    this.activeFrame = null;
    this.bufferFrame = null;
    this.cacheFrame = null;
    this.activeIndex = undefined;
    this.navBar = null;
    this.container = null;
    this.aciveNode = null;
    this.pendingTimer = null;
    this.navLeft = null;
    this.navRight = null;
    this.started = false;

    this.tip = null;
    var self = this;

    this.dataCache = [];    // store mugeda animation data

    this.cacheCreation = function () {
        for (var i = 0; i < self.options.data.length; i++) {
            (function () {
                var data = self.options.data[i]

                if (data["mode"] === "mugedaLoader") {
                    var url = data['url'],
                        loader = new Mugeda.CreationLoader(url),
                        data = self.dataCache[i] = {
                            control: loader,
                            div: null,
                            canPlay: false
                        }

                    loader.autoPlay = false;
                    loader.onload = function () {
                        data.div = this.dom;
                    }
                    loader.canPlay = function () {
                        data.canPlay = true;
                    }
                    loader.load();
                }
            })();
        }     
    }
    this.cacheCreation()
    
    this.start = function(idx){
        if(!this.options.holder){
            console.log('Missing holder div. Exiting...');
            return; 
        }
        if(!this.container){
            var div = document.createElement('div');
            div.id = "mslide_container";
            div.style.width = this.options.width + "px";
            div.style.height = this.options.height + "px";
            
            this.container = div;
            
            function onHover(event){
                if(!self.navLeft || !self.navRight)
                    return; 
                    
                self.navLeft.className = "active";
                self.navRight.className = "active";
                setTimeout(function(){
                    self.navLeft.className = "inactive";
                    self.navRight.className = "inactive";
                }, 2000);
            }
            
            this.container.addEventListener('mousestart', onHover);
            this.container.addEventListener('mouseover', onHover);
            this.container.addEventListener('touchstart', onHover);
            this.options.holder.appendChild(this.container);
        }        
        
        if(!this.options.width || !this.options.height){
            console.log('Invalid holder size. Exiting...');
            return; 
        }
        
        if(!this.options.data || !this.options.data.length){
            console.log('Invalid data. Exiting...');
            return; 
        }
        
        this.switchTo(idx);     
    };
    
    this.next = function(){
        this.switchTo(this.activeIndex+1);     
    };
    this.prev = function(){
        this.switchTo(this.activeIndex-1);     
    };
    
    this.loadData = function(frame, idx){
        var data = self.options.data[idx];
        while (frame.firstChild) {
            frame.removeChild(frame.firstChild);
        }
        frame.appendChild(self.dataCache[idx].div)

        if(!self.started){
            setTimeout(function () { self.dataCache[self.activeIndex].control.play(); }, 500);
            self.started = true;
        }
        
        //frame.innerHTML = "<iframe id='mslide_frame' style='border:none;margin:0;padding:0;width:100%;height:100%;display:block;' src='"+data.url+" ' ></iframe>";
    };
    
    this.switchTo = function(idx){
        function validateIdx(idx){
            idx = idx || 0;
            if(idx < 0)
                idx = self.options.data.length - 1;
            else if(idx >= self.options.data.length)
                idx = 0;
            return idx;
        }
            
        function onTransitionEnd(event){
            var frame = this;

            if(!frame.isActive && frame.innerHTML){
                var nextId = validateIdx(self.activeIndex+1);
                self.loadData(frame, nextId);
                frame.className = "mslide_slide";
            }
            else if(frame.isActive){
                if(self.options.callback)
                    self.options.callback(self.dataCache[self.activeIndex], 'ready');
            }
        }
                
        idx = validateIdx(idx);
        
        if(idx === this.activeIndex)
            return;
        
        // wait until data is ready
        var data = self.options.data[idx]
        if (data["mode"] === "mugedaLoader") {
            var cache = self.dataCache[idx];
            if (cache && !cache.canPlay) {
                setTimeout(function () { self.switchTo.call(self, idx) }, 100)
                return
            }
        }
            
        if(this.pendingTimer){
            clearTimeout(this.pendingTimer);
            this.pendingTimer = null;
        }
        
        var initial = false;
        if(!this.activeFrame){
            initial = true;
            var div = document.createElement('div');
            // div.id = "mslide_active";

            div.className = "mslide_slide mslide_motion";
            this.activeFrame = div;
            this.activeFrame.isActive = true;
            
            self.loadData(this.activeFrame, idx);
            this.container.appendChild(div);

            this.activeFrame.addEventListener('transitionend', onTransitionEnd);
            this.activeFrame.addEventListener('webkitTransitionEnd', onTransitionEnd);
            this.activeFrame.addEventListener('oTransitionEnd', onTransitionEnd);
            this.activeFrame.addEventListener('otransitionend', onTransitionEnd);
            this.activeFrame.addEventListener('MSTransitionEnd', onTransitionEnd);
        }    
        
        if(!this.bufferFrame){
            var div = document.createElement('div');
           // div.id = "mslide_buffer";

            div.className = "mslide_slide";
            this.bufferFrame = div;
            this.bufferFrame.isActive = false;
            this.bufferFrame.style.left = this.options.width + "px";
            this.bufferFrame.style.opacity = 0;
            
            self.loadData(this.bufferFrame, idx+1);
            this.container.appendChild(div);
            
            this.bufferFrame.addEventListener('transitionend', onTransitionEnd);
            this.bufferFrame.addEventListener('webkitTransitionEnd', onTransitionEnd);
            this.bufferFrame.addEventListener('oTransitionEnd', onTransitionEnd);
            this.bufferFrame.addEventListener('otransitionend', onTransitionEnd);
            this.bufferFrame.addEventListener('MSTransitionEnd', onTransitionEnd);
        }        
        
        if(!this.cacheFrame){
            var div = document.createElement('div');

            div.className = "mslide_cache";
            this.cacheFrame = div;
            this.cacheFrame.style.width = "1px";
            this.cacheFrame.style.height = "1px";
            this.cacheFrame.style.display = "none";
            this.container.appendChild(div);
            
            this.bufferFrame.addEventListener('transitionend', onTransitionEnd);
            this.bufferFrame.addEventListener('webkitTransitionEnd', onTransitionEnd);
            this.bufferFrame.addEventListener('oTransitionEnd', onTransitionEnd);
            this.bufferFrame.addEventListener('otransitionend', onTransitionEnd);
            this.bufferFrame.addEventListener('MSTransitionEnd', onTransitionEnd);
        }  
        
        if(!this.tip){
            var div = document.createElement('div');
            div.id = "mslide_tip";
            div.textContent = this.options.tip || "";
            this.tip  = div;
            this.container.appendChild(div);
        }
        
        if(!this.navLeft){
            var div = document.createElement('div');
            div.id = "mslide_nav_left";
            this.navLeft  = div;
            this.container.appendChild(div);
            this.navLeft.onclick = function(){
                self.prev();
            };
        }     

        if(!this.navRight){
            var div = document.createElement('div');
            div.id = "mslide_nav_right";
            this.navRight  = div;
            this.container.appendChild(div);
            this.navRight.onclick = function(){
                self.next();
            };
        }  

        setTimeout(function(){
            self.navLeft.className = "inactive";
            self.navRight.className = "inactive";
        }, 2000);        
        
        if(!initial){
            // Switch active/buffer frame
            var temp = self.activeFrame;            
            self.activeFrame = self.bufferFrame;
            self.bufferFrame = temp;
            
            var moveLeft = this.activeIndex < idx;
            this.activeFrame.style.left = (moveLeft ? this.options.width : -this.options.width) + "px";
            
            setTimeout(function(){
                self.bufferFrame.className = "mslide_slide mslide_motion";
                self.bufferFrame.style.left = (moveLeft ? -self.options.width : self.options.width) + "px";
                self.bufferFrame.isActive = false;
                self.bufferFrame.style.opacity = 0;
            
                self.activeFrame.className = "mslide_slide mslide_motion";
                self.activeFrame.style.left = 0;
                self.activeFrame.isActive = true;
                self.activeFrame.style.opacity = 1.;
            }, 100);
        }            
        
        self.loadData(this.activeFrame, idx);
        
        if(!this.navBar){
            var navSize = 32;
            var margin = 8;
            var div = document.createElement('div');
            div.id = "mslide_navbar";
            div.align = "center";
            
            this.navBar = div;
            
            var len = this.options.data.length;
            var nodeSize = navSize - 2*margin;
            for(var i=0;i<len;i++){
                var node = document.createElement('div');
                node.id = "mslide_nav_"+i;
                node.className = "mslide_node " + (i == idx ? "mslide_active_node" : "mslide_inactive_node");
                if(i == idx)
                    this.aciveNode = node;
               
                this.navBar.appendChild(node);
            }
            this.container.appendChild(this.navBar);
            
            this.navBar.onclick = function(event){
                var obj = event.target;
                var sep = obj.id.split('mslide_nav_');
                var idx = -1;
                if(sep.length == 2)
                    idx = parseInt(sep[1]);
                if(idx >=0){
                    self.switchTo(idx);
                }
            }
        } 
        else{
            var node = document.getElementById("mslide_nav_"+idx);
            if(node){
                if(self.aciveNode){
                    node.className = "mslide_node mslide_active_node";
                    self.aciveNode.className = "mslide_node mslide_inactive_node";
                    self.aciveNode = node;
                }
            }
        }

        this.pendingTimer = setTimeout(function(){
            self.switchTo(++idx);  
        }, self.options.span);
        
        this.activeIndex = idx;

    };
}

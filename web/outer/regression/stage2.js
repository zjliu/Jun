var s2=
{
	"cases":[
	{
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Basic--"
    },
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Fetching default page",
        "uri":"/",
        "expected_body":[
            {"mode":"regex","value":"showLoginPop"},
            {"mode":"regex","value":"javascript:getAccesscodeHelp"}
        ],      
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Fetching index page",
        "uri":"/index.php", 
        "expected_body":[
            {"mode":"regex","value":"showLoginPop"},
            {"mode":"regex","value":"javascript:getAccesscodeHelp"}
        ],
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Fetching help page",
        "uri":"/help.php", 
        "expected_body":[
            {"mode":"regex","value":"class=\"helpBox\""},
            {"mode":"regex","value":"openVideoPopup"}
        ],      
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Fetching about page",
        "uri":"/about.php", 
        "expected_body":[
            {"mode":"regex","value":"#about"},
            {"mode":"regex","value":"#contact"}
        ],      
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    }, 

    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Logging in (GET)",
        "uri":"/login.php?username=61862992-0b8d-465b-8c14-586119c9744d&password=3f4da77b-2be4-4f5c-861f-fadea97962bf", 
        "type":"TBA", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "user_greeting":{"mode":"match", "value":"61862992-0b8d-465b-8c14-586119c9744d"}
           
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Logging in (POST)",
        "uri":"/login.php", 
   
        "data":{
            "username":"61862992-0b8d-465b-8c14-586119c9744d", 
            "password":"3f4da77b-2be4-4f5c-861f-fadea97962bf",
            "user_greeting":{"mode":"match", "value":"61862992-0b8d-465b-8c14-586119c9744d"}
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Logging out",
        "uri":"/logout.php", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },     

    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Publish animation",
        "uri":"/works/publish/##LOCAL_CRID#",       
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "version":{"mode":"match", "value":"1.0"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }, 

    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Unpublish animation",
        "uri":"/works/unpublish/##LOCAL_CRID#",       
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "version":{"mode":"match", "value":"1.0"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }, 
    {
        "_dividor":"==================================================================================================",
        "description": "Getting anilist",
        "uri":"/anilist.php",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\<div\\sclass=\"albumlist\""},
            {"mode":"regex","value":"\\<li\\sid=\"c_\\$\\{ref_id\\}\"\\>"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },  
    

    {
        "_dividor":"==================================================================================================",
        "description": "Getting detail",
        "uri":"/anidetail.php?crid=##LOCAL_CRID#",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\<iframe\\ssrc=\"\/client/preview.html\\?id=[A-Fa-f0-9]{24}"},
            {"mode":"regex","value":"\\<a\\shref=\"/animation/edit/[A-Fa-f0-9]{24}"}
            
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },     
    
    {
        "_dividor":"==================================================================================================",
        "description": "Listing (animation)",
        "uri":"/creatives.php",
        "user":"regusert",

        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "creatives":{"mode":"array","value":""}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },  
    
    {
        "_dividor":"==================================================================================================",
        "description": "Listing (templates)",
        "uri":"/creatives.php?type=template",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "creatives":{"mode":"array","value":""}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }, 

    {
        "_dividor":"==================================================================================================",
        "description": "Listing (udata)",
        "uri":"/udata_list.php",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "phpThumb",
        "uri":"/phpThumb.php?src=https%3A%2F%2Flocalhost%2Fthumb.php%3Frid%3D5075bc2a0b50f1e518000189&w=160&h=120&f=png",
        
        "expected_headers":{
            "content-type":"image/png"
        }
    },     
    
    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--API--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Creating new animation",
        "uri":"/works/new",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\<iframe\\s.*\\/client\\/ha.php\\?"}
            
        ],      
        
        "expected_headers": {
            "content-type":"text/html"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Editing an animation",
        "uri":"/works/edit/##LOCAL_CRID#",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\<iframe\\s.*\\/client\\/ha.php\\?"}
            
        ],      
        
        "expected_headers": {
            "content-type":"text/html"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Previewing an animation",
        "uri":"/works/preview/##LOCAL_CRID#",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\<iframe\\s.*src=\"\/client/preview\\.html\\?"}
            
        ],
        "expected_headers":{
            "content-type":"text/html"
        }

    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Previewing an animation (token w/o auth)",
        "uri":"/client/preview.html?id=79c5f256",

        "expected_body":[
            {"mode":"regex","value":"script\\s.*js/mugeda_player_0\\.1\\.0"},
            {"mode":"regex","value":"id=\"loading_text\""}
            
        ],
        "expected_headers":{
            "content-type":"text/html"
        }
    }, 
    
    { 
        "_dividor":"==================================================================================================",
        "description": "Loading js (w/ gzip)",
        "uri":"/client/js/defines.js",
   
        
        "expected_headers": {
            "content-type":"application/x-javascript",
            "content-encoding":"gzip"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Listing (API animation)",
        "uri":"/works/list",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "page":{"mode":"regex", "value":"\\d+"},
            "cpp":{"mode":"regex", "value":"\\d+"},
            "data":{"mode":"regex", "value":"[A-Fa-f0-9]{24}"},
            "total":{"mode":"regex", "value":"\\d+"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Setting status",
        "uri":"/works/set_status/##LOCAL_CRID#?value=1",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"regex", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting status",
        "uri":"/works/get_status/##LOCAL_CRID#",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"regex", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting thumbnail",
        "uri":"/works/thumbnail/##LOCAL_CRID#",
        "user":"regusert",
        
        "expected_headers":{
            "content-type":"image/png"
        }
    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting invitation",
        "uri":"/invitation.php", 
        "type":"TBA",

        "expected_body":[ 
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    }, 

    {
        "_dividor":"==================================================================================================",
        "description": "Signning up",
        "uri":"/signup.php?access_code=4BaV7Jtg", 
        "type":"TBA",

        "expected_body":[
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    }, 
    
    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Template--"
    },    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Creating new template",
        "uri":"/template/new",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\/client\\/ha.php\\?"},
            {"mode":"regex","value":"\\/feature.php"}
        ],    
        
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Editing a template",
        "uri":"/template/edit/##LOCAL_TRID#",
        "user":"regusert",

        "expected_body":[
            {"mode":"regex","value":"\\/client\\/ha.php\\?"},
            {"mode":"regex","value":"\\/feature.php"}
        ],        
        
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Listing (template animation)",
        "uri":"/template/list",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "page":{"mode":"regex", "value":"\\d+"},
            "cpp":{"mode":"regex", "value":"\\d+"},
            "total":{"mode":"regex", "value":"\\d+"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Instantiate template",
        "uri":"/template_detail.php?trid=##LOCAL_TRID#",
        "user":"regusert",
        "type":"TBA",

        "expected_body":[
            {"mode":"regex","value":"src=\"\/client/preview.html\\?id=5056c5e0698863544c000009\""}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    }, 

    {
        "_dividor":"==================================================================================================",
        "description": "Getting thumbnail",
        "uri":"/template/thumbnail/##LOCAL_TRID#",
        "user":"regusert",
        
        "expected_headers":{
            "content-type":"image/png"
        }
    },

    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Asset--"
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Listing",
        "uri":"/asset/list",
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "page":{"mode":"regex", "value":"\\d+"},
            "cpp":{"mode":"regex", "value":"\\d+"},
            "data":{"mode":"regex", "value":"[A-Fa-f0-9]{24}"},
            "total":{"mode":"regex", "value":"\\d+"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting asset",
        "uri":"/asset/50109433f4800311f9000021",
        "user":"regusert",
        
        "expected_headers":{
            "content-type":"image/png"
        }
    },

    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Save/Delete--"
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving animation (wrong user)",
        "uri":"/myani/save",
        "user":"reguser1",

        "data":{
            "title":"test", 
            "width":600,
            "height":400,
            "type":"animation",
            "keepVersion":1,
            "contentid":"4fa72e87f48003106c00532b",
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "tt":"test",
                "cl":"rgb(255, 255, 255)",
                "ly":[{"id":0,"nm":"Layer_0","un":[{"id":"2cqxwvm0y7","lI":0,"fS":0,"fC":1,"ad":false,"ob":[],"kf":[{"id":0,"md":0,"tw":"","pm":{"fI":"0;0,144,200,255,1;;","m":"L0;R0;T0;B0;S0;P0;E0;N0;X1;Y1;O0;W1;A1;C#0683ff"}}],"hK":[]}]}],
                "zI":"i0,0,0,0,1",
                "symLayers":[],
                "zip":1
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":7},
            "error":{"mode":"regex", "value":"Access\\sauthorization\\sfailed"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving animation (w/o auth)",
        "uri":"/myani/save",

        "data":{
            "title":"test", 
            "width":600,
            "height":400,
            "type":"animation",
            "keepVersion":1,
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "tt":"test",
                "cl":"rgb(255, 255, 255)",
                "ly":[{"id":0,"nm":"Layer_0","un":[{"id":"2cqxwvm0y7","lI":0,"fS":0,"fC":1,"ad":false,"ob":[],"kf":[{"id":0,"md":0,"tw":"","pm":{"fI":"0;0,144,200,255,1;;","m":"L0;R0;T0;B0;S0;P0;E0;N0;X1;Y1;O0;W1;A1;C#0683ff"}}],"hK":[]}]}],
                "zI":"i0,0,0,0,1",
                "symLayers":[],
                "zip":1
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":2},
            "error":{"mode":"regex", "value":"Missing\\suser\\stoken"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving animation (with _id)",
        "uri":"/myani/save",
        "user":"regusert",
        "get_crid":"rec_id",

        "data":{
            "rec_id":"##LOCAL_CRID#",
            "title":"test",
            "width":600,
            "height":400,
            "type":"animation",
            "keepVersion":1,
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "tt":"test",
                "cl":"rgb(255, 255, 255)",
                "ly":[{"id":0,"nm":"Layer_0","un":[{"id":"2cqxwvm0y7","lI":0,"fS":0,"fC":1,"ad":false,"ob":[],"kf":[{"id":0,"md":0,"tw":"","pm":{"fI":"0;0,144,200,255,1;;","m":"L0;R0;T0;B0;S0;P0;E0;N0;X1;Y1;O0;W1;A1;C#0683ff"}}],"hK":[]}]}],
                "zI":"i0,0,0,0,1",
                "symLayers":[],
                "zip":1
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "revisions":{"mode":"array","value":""},
            "contentid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Removing animation (not exist)",
        "uri":"/works/delete/5079d9b1d0feb7ef0a000000",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"match", "value":"5079d9b1d0feb7ef0a000000"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Removing animation (no id)",
        "uri":"/works/delete/",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":3},
            "error":{"mode":"regex", "value":"crid"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Saving template (wrong user)",
        "uri":"/myani/save",
        "user":"reguser1",

        "data":{
            "title":"test", 
            "width":600,
            "height":400,
            "type":"template",
            "keepVersion":1,
            "contentid":"4fa72e87f48003106c00532b",
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "tt":"test",
                "cl":"rgb(255, 255, 255)",
                "ly":[{"id":0,"nm":"Layer_0","un":[{"id":"2cqxwvm0y7","lI":0,"fS":0,"fC":1,"ad":false,"ob":[],"kf":[{"id":0,"md":0,"tw":"","pm":{"fI":"0;0,144,200,255,1;;","m":"L0;R0;T0;B0;S0;P0;E0;N0;X1;Y1;O0;W1;A1;C#0683ff"}}],"hK":[]}]}],
                "zI":"i0,0,0,0,1",
                "symLayers":[],
                "zip":1
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":7},
            "error":{"mode":"match", "regex":"Access\\sauthorization\\sfailed"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving template (w/o auth)",
        "uri":"/myani/save",

        "data":{
            "title":"test", 
            "width":600,
            "height":400,
            "type":"template",
            "keepVersion":1,
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "tt":"test",
                "cl":"rgb(255, 255, 255)",
                "ly":[{"id":0,"nm":"Layer_0","un":[{"id":"2cqxwvm0y7","lI":0,"fS":0,"fC":1,"ad":false,"ob":[],"kf":[{"id":0,"md":0,"tw":"","pm":{"fI":"0;0,144,200,255,1;;","m":"L0;R0;T0;B0;S0;P0;E0;N0;X1;Y1;O0;W1;A1;C#0683ff"}}],"hK":[]}]}],
                "zI":"i0,0,0,0,1",
                "symLayers":[],
                "zip":1
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":2},
            "error":{"mode":"match", "regex":"Missing\\suser\\stoken"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving template (with _id)",
        "uri":"/myani/save",
        "user":"regusert",
        "get_trid":"rec_id",

        "data":{
            "rec_id":"##LOCAL_TRID#", 
            "title":"test", 
            "width":600,
            "height":400,
            "type":"template",
            "keepVersion":1,
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "tt":"test",
                "cl":"rgb(255, 255, 255)",
                "ly":[{"id":0,"nm":"Layer_0","un":[{"id":"2cqxwvm0y7","lI":0,"fS":0,"fC":1,"ad":false,"ob":[],"kf":[{"id":0,"md":0,"tw":"","pm":{"fI":"0;0,144,200,255,1;;","m":"L0;R0;T0;B0;S0;P0;E0;N0;X1;Y1;O0;W1;A1;C#0683ff"}}],"hK":[]}]}],
                "zI":"i0,0,0,0,1",
                "symLayers":[],
                "zip":1
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "revisions":{"mode":"array","value":""},
            "contentid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Removing template (not exist)",
        "uri":"/template/delete/507a3f39d0feb70923000000",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"match", "value":"507a3f39d0feb70923000000"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Removing template (no id)",
        "uri":"/template/delete/",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":3},
            "error":{"mode":"regex", "value":"crid"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving page (with _id)",
        "uri":"/myani/save",
        "user":"regusert",
        "get_prid":"rec_id",

        "data":{
            "rec_id":"##LOCAL_PRID#", 
            "title":"Test Page", 
            "width":320,
            "height":480,
            "type":"page",
            "keepVersion":1,
            "thumbnail":"iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAYAAABll8ICAAAE1ElEQVR4Xu3UsQ0AIAwEMbL/0ASxwfWmJo31urnvHY8AAQJBYIQjaPlKgMAXEA5DIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQICAcNgAAQJZQDgymQMCBITDBggQyALCkckcECAgHDZAgEAWEI5M5oAAAeGwAQIEsoBwZDIHBAgIhw0QIJAFhCOTOSBAQDhsgACBLCAcmcwBAQLCYQMECGQB4chkDggQEA4bIEAgCwhHJnNAgIBw2AABAllAODKZAwIEhMMGCBDIAsKRyRwQICAcNkCAQBYQjkzmgAAB4bABAgSygHBkMgcECAiHDRAgkAWEI5M5IEBAOGyAAIEsIByZzAEBAsJhAwQIZAHhyGQOCBAQDhsgQCALCEcmc0CAgHDYAAECWUA4MpkDAgSEwwYIEMgCwpHJHBAgIBw2QIBAFhCOTOaAAAHhsAECBLKAcGQyBwQICIcNECCQBYQjkzkgQEA4bIAAgSwgHJnMAQECwmEDBAhkAeHIZA4IEBAOGyBAIAsIRyZzQIDAAvQGzgNs5o1YAAAAAElFTkSuQmCC",
            
            "data":{
                "vr":510,
                "pages": {"dummy":"Hello the world!"}
            }
        }, 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "revisions":{"mode":"array","value":""},
            "contentid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Loading a page (id w/ no auth)",
        "uri":"/myani/load?contentid=##PRID#&_=1349810526293",

        "expected_json":{
            "status":{"mode":"match", "value":2},
            "error":{"mode":"regex", "value":"Missing\\suser\\stoken"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },
    

    {
        "_dividor":"==================================================================================================",
        "description": "Loading a page (id w/ auth)",
        "uri":"/myani/load?contentid=##LOCAL_PRID#&_=1349810526293",
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },
    
    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Rewrite--"
    },

    
    {
        "_dividor":"==================================================================================================",
        "description": "Creating new animation",
        "uri":"/animation/new",
        "user":"regusert", 

        "expected_body":[
            {"mode":"regex","value":"\\/client\\/ha.php\\?"},
            {"mode":"regex","value":"\\/feature.php"}
            
        ],      
        
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Editing an animation",
        "uri":"/animation/edit/##LOCAL_CRID#",
        "user":"regusert", 

        "expected_body":[
            {"mode":"regex","value":"\\/client\\/ha.php\\?"},
            {"mode":"regex","value":"\\/feature.php"}
            
        ],      
        
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Exporting an animation (zip)",
        "uri":"/myani/export?aid=4fa72e87f48003106c00532b&refid=2ekhlbpj7a&fmt=canvas_zip&width=320&height=50",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"regex", "value":"Ok"},
            "download_url":{"mode":"regex", "value":"tmpfile\\.php\\?rid="}
        },
        
        "expected_headers": {
            "content-type":"application/json"
        }

    }, 
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Exporting an animation (map)",
        "uri":"/myani/export?aid=4fa72e87f48003106c00532b&refid=2ekhlbpj7a&fmt=canvas_map&width=320&height=50",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"regex", "value":"Ok"},
            "download_url":{"mode":"regex", "value":"tmpfile\\.php\\?rid="}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },     
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Uploading bundle",
        "uri":"/myani/importbundle",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.7333864646498114"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/rabbit.zip"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "ref_id":{"mode":"match","value":"0.7333864646498114"},
            "data":{"mode":"regex","value":"imageSrc"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },   
        
    {
        "_dividor":"==================================================================================================",
        "description": "Loading an animation (id w/ no auth)",
        "uri":"/myani/load?contentid=##LOCAL_CRID#&_=1349810526293",

        "expected_json":{
            "status":{"mode":"match", "value":2},
            "error":{"mode":"regex", "value":"Missing\\suser\\stoken"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },

    {
        "_dividor":"==================================================================================================",
        "description": "Loading an animation (id w/ auth)",
        "uri":"/myani/load?contentid=##LOCAL_CRID#&_=1349810526293",
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },

    {
        "_dividor":"==================================================================================================",
        "description": "Loading an animation (token w/o auth)",
        "uri":"/myani/load?contentid=79c5f256",
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "contentid":{"mode":"regex","value":"^[A-Fa-f0-9]{8}"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Listing works",
        "uri": "/myani/myworksapi?page=1&cpp=24",
        "user": "regusert",
        
        
        "expected_body":[
            {"mode":"regex","value":"\\[\\{\"id\":\"[A-Fa-f0-9]{24}\",\"title\":\".*\",.*\"thumbnail\":\"thumb\\.php\\?rid=[A-Fa-f0-9]{24}\""},
            {"mode":"regexnot","value":"\"thumb\\.php\\?rid=\""}
        ],  
        
        "expected_headers": {
            "content-type":"application/json"
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting an image (/udata)",
        "uri":"/udata/4fa725a3f48003106c002bb3/50620b546803fac0b500000c.png",
        
        "expected_headers": {
            "content-type":"image/png",
            "Cache-Control":"/max-age=/",
            "Content-Length":"65337"
        }

    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting an image (/client/udata)",
        "uri":"/client/udata/4fa725a3f48003106c002bb3/50620b546803fac0b500000c.png",
        
        "expected_headers": {
            "content-type":"image/png",
            "Cache-Control":"/max-age=/",
            "Content-Length":"65337"
        }

    },   

    {
        "_dividor":"==================================================================================================",
        "description": "Getting an image (/beginner/udata)",
        "uri":"/beginner/udata/4fa725a3f48003106c002bb3/50620b546803fac0b500000c.png",
        
        "expected_headers": {
            "content-type":"image/png",
            "Cache-Control":"/max-age=/",
            "Content-Length":"65337"
        }

    },     
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting an image (/works/udata)",
        "uri":"/works/udata/4fa725a3f48003106c002bb3/50620b546803fac0b500000c.png",
        
        "expected_headers": {
            "content-type":"image/png",
            "Cache-Control":"/max-age=/",
            "Content-Length":"65337"
        }

    },      
    
    {
        "_dividor":"==================================================================================================",
        "description": "Getting an image (/tempalte/udata)",
        "uri":"/tempalte/udata/4fa725a3f48003106c002bb3/50620b546803fac0b500000c.png",
        
        "expected_headers": {
            "content-type":"image/png",
            "Cache-Control":"/max-age=/",
            "Content-Length":"65337"
        }

    },     
      
    {
        "_dividor":"==================================================================================================",
        "description": "Getting an image (/dummy/udata)",
        "uri":"/dummy/udata/4fa725a3f48003106c002bb3/50620b546803fac0b500000c.png",
        
        "expected_headers": {
            "content-type":"image/png",
            "Cache-Control":"/max-age=/",
            "Content-Length":"65337"
        }

    },     
        
    {
        "_dividor":"==================================================================================================",
        "description": "Fetching asset image",
        "uri":"/asset/501094bdf4800311f9000218", 
        "expected_headers":{
            "content-type":"image/png"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving image (png)",
        "uri":"/myani/saveimage",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.33941601356491446",
            "folder_id":"520210787d498d7fed97b12b"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/mugeda_logo.png"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "ref_id":{"mode":"match","value":"0.33941601356491446"},
            "url":{"mode":"regex","value":"\\\/udata\\\/[A-Fa-f0-9]{24}\\\/[A-Fa-f0-9]{24}"},
            "rid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving image (gif)",
        "uri":"/myani/saveimage",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.33941601356491446",
            "folder_id":"520210787d498d7fed97b12b"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/tiger.gif"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "ref_id":{"mode":"match","value":"0.33941601356491446"},
            "url":{"mode":"regex","value":"\\\/udata\\\/[A-Fa-f0-9]{24}\\\/[A-Fa-f0-9]{24}"},
            "rid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving image (jpg)",
        "uri":"/myani/saveimage",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.33941601356491446",
            "folder_id":"520210787d498d7fed97b12b"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/tiger.jpg"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "ref_id":{"mode":"match","value":"0.33941601356491446"},
            "url":{"mode":"regex","value":"\\\/udata\\\/[A-Fa-f0-9]{24}\\\/[A-Fa-f0-9]{24}"},
            "rid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving image (txt)",
        "uri":"/myani/saveimage",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.11356491446",
            "folder_id":"520210787d498d7fed97b12b"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/dummy.txt"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":9},
            "error":{"mode":"regex", "value":"Unsupported\\sformat"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving image (no auth)",
        "uri":"/myani/saveimage",

        "data":{
            "type":"0", 
            "ref_id":"0.11356491446"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/mugeda_logo.png"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":2},
            "error":{"mode":"regex", "value":":Unknown\\suser"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving audio (ogg)",
        "uri":"/myani/saveaudio",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.12345"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/sample.ogg"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "ref_id":{"mode":"match","value":"0.12345"},
            "url":{"mode":"regex","value":"\\\/udata\\\/[A-Fa-f0-9]{24}\\\/[A-Fa-f0-9]{24}"},
            "rid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving audio (txt)",
        "uri":"/myani/saveaudio",
        "user":"regusert",

        "data":{
            "type":"0", 
            "ref_id":"0.12345"
        }, 
        
        "file":{
            "name":"file",
            "path":"resource/dummy.txt"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":9},
            "error":{"mode":"regex", "value":"Unsupported\\sformat"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    
    {
        "_dividor":"==================================================================================================",
        "description": "Sharing an animation (remove)",
        "uri":"/sharecode.php?crid=##LOCAL_CRID#&action=remove",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },

    {
        "_dividor":"==================================================================================================",
        "description": "Sharing an animation (get, empty sharecode)",
        "uri":"/sharecode.php?crid=##LOCAL_CRID#&action=get",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "description": "Sharing an animation (request)",
        "uri":"/sharecode.php?crid=##LOCAL_CRID#&action=request",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "share_code":{"mode":"regex", "value":"^[A-Fa-f0-9]{8}"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }
    }, 
    
    {
        "_dividor":"==================================================================================================",
        "description": "Sharing an animation (get)",
        "uri":"/sharecode.php?crid=##LOCAL_CRID#&action=get",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Sharing an animation (remove)",
        "uri":"/sharecode.php?crid=##LOCAL_CRID#&action=remove",
        "user":"regusert", 
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },     
        
        "expected_headers": {
            "content-type":"application/json"
        }

    },
      {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--REG  PART--"
    },
      {
        "_dividor":"======================================= REG  PART ===========================================================",
        "description": "Loading a login page",
        "uri":"/manage/", 
       "expected_body":[
            {"mode":"regex","value":"loginForm"},
            {"mode":"regex","value":"logCheck"}
        ],      
		 "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Apply Notice page",
        "uri":"/application_notice.php", 
       "expected_body":[
            {"mode":"regex","value":"dialog_invitation_response"},
            {"mode":"regex","value":"\\<a\\shref=\"/application\\.php\""}
        ],      
		 "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
      {
        "_dividor":"==========================================================================================================",
        "description": "Apply for an account",
        "uri":"/application.php", 
       "expected_body":[
            {"mode":"regex","value":"\\<a href=\"/application.php\\?apply_type=personal\""},
            {"mode":"regex","value":"\\<input type=\"radio\" name=\"server\" value=\"international\""}
        ],      
		 "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Apply account ok",
        "uri":"/application_ok.php", 
       "expected_body":[
            {"mode":"regex","value":"\\<a\\shref=\"index.php\""},
            {"mode":"regex","value":"reg_msg_box\\sstart"}
        ],      
		 "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
    {
        "_dividor":"==========================================================================================================",
        "description": "Signup account (Without AccessCode)",
        "uri":"/signup.php", 
       "expected_body":[
            {"mode":"regex","value":"\\<img\\sclass=\"center\"\\ssrc='/images/common/bad\\.png'"},
            {"mode":"regex","value":"\\<span.*class=.*prompt_msg"}
        ],      
		 "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Signup account",
        "uri":"/signup.php?access_code=D6H2BZ1L", 
       "expected_body":[
            {"mode":"regex","value":"\\<dt class=\"button_large\"\\>"},
            {"mode":"regex","value":"\\<a id=\"submit\" class=\"button_large\"\\>"}
        ],      
		 "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Signup ok(Directly Visit)",
        "uri":"/reg_ok.php", 
       "expected_body":[
            {"mode":"regex","value":"showLoginPop"},
            {"mode":"regex","value":"javascript:getAccesscodeHelp"}
        ],      
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Signup ok",
        "uri":"/reg_ok.php?force=true", 
       "expected_body":[
            {"mode":"regex","value":"\\<a\\shref=\"/help\\.php\""},
            {"mode":"regex","value":"\\<a\\shref=\"/anilist\\.php\""}
        ],      
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Fast Entrance (Without AccessCode)",
        "uri":"/fast_entrance.php", 
       "expected_body":[
            {"mode":"regex","value":"\\<img\\sclass=\"center\"\\ssrc='/images/common/bad\\.png'"},
            {"mode":"regex","value":"\\<span\\sclass='prompt_msg"}
        ],         
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Fast Entrance",
        "uri":"/fast_entrance.php?access_code=D6H2BZ1L", 
       "expected_body":[
            {"mode":"regex","value":"\\<input\\stype=\"password\"\\sname=\"pass\""},
            {"mode":"regex","value":"\\<input\\stype=\"text\"\\sid=\"email\""}
        ],         
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
     {
        "_dividor":"==========================================================================================================",
        "description": "Signup Validation (Email Not Available)",
        "uri":"/json.php", 
		 "data":{
            "action":"application", 
            "email":"iamarson@yahoo.com.tw"
        }, 
         "expected_json":{
            "status":{"mode":"match", "value":8},
            "error":{"mode":"regex", "value":"Internal\\serror.:error_duplicate_email"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
  {
        "_dividor":"==========================================================================================================",
        "description": "Signup Validation (Email Available)",
        "uri":"/json.php", 
		 "data":{
            "action":"application", 
            "email":"lucas_w@mugeda.com"
        }, 
         "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"regex", "value":"Ok"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
 {
        "_dividor":"==========================================================================================================",
        "description": "Signup Validation (Username Not Available)",
        "uri":"/json.php", 
        "data":{
            "action":"checkUsername", 
            "username":"lucas"
        }, 
         "expected_json":{
            "status":{"mode":"match", "value":8},
            "error":{"mode":"regex", "value":"Internal\\serror.:error_duplicate_username"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
 {
        "_dividor":"==========================================================================================================",
        "description": "Signup Validation (Username Available)",
        "uri":"/json.php", 
        "data":{
            "action":"checkUsername", 
            "username":"luuuuu"
        }, 
         "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"regex", "value":"Ok"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
 {
        "_dividor":"==========================================================================================================",
        "description": "Apply User (By Signature)",
        "uri":"/invite_manager.php", 
        "data":{
            "email":"regression@mugeda.com", 
            "business_site":"mugeda.com",
            "business_name":"mugeda",
            "last_name":"kind",
            "first_name":"ness",
            "captcha_code":"signature==9414a937137ab77113ddf8e616425d84"
        }, 
         "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
 {
        "_dividor":"==========================================================================================================",
        "description": "Apply User (Email contains '-')",
        "uri":"/invite_manager.php", 
        "data":{
            "email":"regression-test@mugeda-test.com", 
            "business_site":"mugeda-test.com",
            "business_name":"mugeda",
            "last_name":"kind",
            "first_name":"ness",
            "captcha_code":"signature==9414a937137ab77113ddf8e616425d84"
        }, 
         "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Language Switch To En (set)",
        "uri":"/index.php?dl=en", 
         "expected_body":[
            {"mode":"regex","value":"\\<img\\ssrc=\"/images/en/banner02\\.png"},
            {"mode":"regex","value":"\\<img\\ssrc=\"/images/en/banner03\\.png"}
        ],         
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Language Switch To zh_CN (set)",
        "uri":"/index.php?dl=zh_CN",
         "expected_body":[
            {"mode":"regex","value":"\\<img\\ssrc=\"/images/zh_CN/banner02\\.png"},
            {"mode":"regex","value":"\\<img\\ssrc=\"/images/zh_CN/banner03\\.png"}
        ],         
        "expected_headers": {
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Creative Publish",
        "uri":"/json.php",
        "user":"regusert",
        "get_crid":"crid",
        
        "data":{
            "action":"getShareCode",
            "crid":"##LOCAL_CRID#"
        }, 
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "share_code":{"mode":"regex", "value":"[A-Fa-f0-9]{8}"}
        },
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Template Detail API",
        "uri":"/template/customize/50af10ce508f3b9d0b000010",
        "user":"regusert",
        "expected_body":[
            {"mode":"regex","value":"\\<iframe\\sid='aniContent'\\ssrc=\"\/client/preview.html\\?id=[A-Fa-f0-9]{24}\""},
            {"mode":"regex","value":"\\<a\\shref=\"javascript:saveAnidata().*?\""}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--kids.mugeda.com--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "kids.mugeda.com, Ani List",
        "type":"target",
        "base_url":"kids.mugeda.com",
        "uri":"/beginner/anilist.php?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6;/beginner/anilist.php",
        "session":"session",
        
        "expected_body":[
            {"mode":"regex","value":"javascript:logout()"},
            {"mode":"regex","value":"javascript:create()"},
            {"mode":"regex","value":"pages_comment"},
            {"mode":"regex","value":"footlogo"}
        ],
        "expected_headers":{
            "content-type":"text/html",
            "cache-control":"max-age=604800"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "kids.mugeda.com, Create New",
        "type":"target",
        "base_url":"kids.mugeda.com",
        "uri":"/beginner/anilist.php?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6;/beginner/beginner_client/ui.php",
        "session":"session",
        
        "expected_body":[
            {"mode":"regex","value":"Page\\.init"},
            {"mode":"regex","value":"commandTip"},
            {"mode":"regex","value":"advancedOptions"},
            {"mode":"regex","value":"COMMAND_FlipHorizontal"}
        ],
        "expected_headers":{
            "content-type":"text/html",
            "cache-control":"max-age=604800"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "kids.mugeda.com, Ani Detail",
        "type":"target",
        "base_url":"kids.mugeda.com",
        "uri":"/beginner/anilist.php?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6;/beginner/anidetail.php?id=513838ea13022ca227000050&name=BUITest",
        "session":"session",
        
        "expected_body":[
            {"mode":"regex","value":"javascript:logout"},
            {"mode":"regex","value":"javascript:create"}
        ],
        "expected_headers":{
            "content-type":"text/html",
            "cache-control":"max-age=604800"
        }
    },
    
    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Multi-Accouts--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Add a Sub-member",
        "uri":"/multi_account.php?action=addMember&username=##GUID#&password=0000000&password2=0000000&first_name=regtest&last_name=regtest",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "version":{"mode":"match", "value":"1.0"},
            "username":{"mode":"regex", "value":"-"},
            "password":{"mode":"match", "value":"0000000"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Get Sub-member(s)",
        "uri":"/multi_account.php?action=getMembers",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Get Info",
        "uri":"/folder",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "public":{"mode":"array", "value":""},
            "private":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Get User Data List",
        "uri":"/udata_list.php",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "udata_list":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {

        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Campaigns--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Get Thumbnail",
        "uri":"/api_thumbnail.php?crid=50d2c5a64dcb68865d0000c6&thumbnail_ref_id=2",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "thumb_refid":{"mode":"match", "value":"50fe64a613022cd60e00001a"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Campaign Page (New Button)",
        "uri":"/camplist.php",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"href=\"\/campdetail.php\\?type=campaign\""},
            {"mode":"regex", "value":"class=\"small_btn\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Edit exist Campaign, 2ADs",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "get_buf_1":"crid",

        "data":{
            "crid":"##LOCAL_BUF_1#",
            "title":"EditCampaign-2ADs",
            "bannerId":"50af10ce508f3b9d0b000010",
            "expandedId":"50af11ae508f3ba30b00001f",
            "urlTarget":"external"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex", "value":"[0-9A-Fa-f]{24}"},
            "update_time":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Publish exist Campaign, 2ADs",
        "uri":"/map_publish.php?publish_type=campaign",
        "user":"regusert",
        "get_buf_1":"campId",

        "data":{
            "crid":"50af10ce508f3b9d0b000010",
            "campId":"##LOCAL_BUF_1#",
            "publish_time":"2013683345"
        },
        
        "expected_body":[
            {"mode":"regex", "value":"http:\/\/cdn.mugeda.com\/campaigns\/"}
        ],
        
        "expected_headers":{
            "content-type":["text/html"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Edit exist Campaign, URL",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "get_buf_2":"crid",

        "data":{
            "crid":"##LOCAL_BUF_2#",
            "title":"EditCampaign-URL",
            "bannerId":"50af10ce508f3b9d0b000010",
            "action":"link",
            "urlTarget":"external"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex", "value":"[0-9A-Fa-f]{24}"},
            "update_time":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Publish exist Campaign, URL",
        "uri":"/map_publish.php?publish_type=campaign",
        "user":"regusert",
        "get_buf_2":"campId",

        "data":{
            "crid":"50af10ce508f3b9d0b000010",
            "campId":"##LOCAL_BUF_2#",
            "publish_time":"2013683345"
        },
        
        "expected_body":[
            {"mode":"regex", "value":"http:\/\/cdn.mugeda.com\/campaigns\/"}
        ],
        
        "expected_headers":{
            "content-type":["text/html"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Edit exist Campaign, Action",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "get_buf_3":"crid",

        "data":{
            "crid":"##LOCAL_BUF_3#",
            "title":"EditCampaign-Action",
            "bannerId":"50af10ce508f3b9d0b000010",
            "action":"behavior",
            "urlTarget":"external",
            "behavior":"[{\"type\":\"sms\",\"name\":\"Short Message\",\"event\":\"click\",\"needInput\":1,\"param\":{\"event_name\":\"Phone\",\"phone_number\":\"13910000000\",\"sms_body\":\"Message\"},\"mode\":2}]"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex", "value":"[0-9A-Fa-f]{24}"},
            "update_time":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Publish exist Campaign, Action",
        "uri":"/map_publish.php?publish_type=campaign",
        "user":"regusert",
        "get_buf_3":"campId",

        "data":{
            "crid":"50af10ce508f3b9d0b000010",
            "campId":"##LOCAL_BUF_3#",
            "publish_time":"2013683345"
        },
        
        "expected_body":[
            {"mode":"regex", "value":"http:\/\/cdn.mugeda.com\/campaigns\/"}
        ],
        
        "expected_headers":{
            "content-type":["text/html"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Edit Campaign (Not Exist)",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "get_buf":"crid",

        "data":{
            "crid":"51bffcb60229b2d9e000ffff",
            "title":"WrongEditing",
            "bannerId":"50af10ce508f3b9d0b000010",
            "expandedId":"50af11ae508f3ba30b00001f",
            "urlTarget":"external"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":4},
            "error":{"mode":"match", "value":"Failed to locate requested resource.:empty creative"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {

        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Pages--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Create New Pages (Edit Pages)",
        "uri":"/pages/edit/",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex","value":"iframe id=\"editor\" src=\"\/pages\/index.php?"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Export Pages (Single Simple Page)",
        "uri":"/pages_exporter.php?crid=51f20ef4874f977f1f0000b2",
        "user":"regusert", 
        
        "content_check":"filenames",

        "expected_content":[
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"mugeda_pages_player.js"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"images\/"}
        ],
        
        "expected_headers":{
            "content-type":["application/zip"],
            "content-disposition":"attachment; filename=\"51f20ef4874f977f1f0000b2.zip\""
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Export Pages (Double Page with Animations)",
        "uri":"/pages_exporter.php?crid=51f23c0d13022cd25b0000ee",
        "user":"regusert", 
        
        "content_check":"filenames",

        "expected_content":[
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"mugeda_pages_player.js"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"images\/"},
            {"mode":"regex", "value":"ani-0\/"},
            {"mode":"regex", "value":"ani-1\/"}
        ],
        
        "expected_headers":{
            "content-type":["application/zip"],
            "content-disposition":"attachment; filename=\"51f23c0d13022cd25b0000ee.zip\""
        }
    },

    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--User Account--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "User Account, Edit",
        "uri":"/account/edit/",
        "user":"regusert", 

        "expected_body":[
            {"mode":"regexnot", "value":"\\<input\\stype=\"hidden\"\\sname=\"action\"\\svalue=\"update\"\\s\/\\>"},
            {"mode":"regex", "value":"regusert"},
            {"mode":"regex", "value":"\\<input\\stype=\"hidden\"\\sid=\"tb_business_size\"\\s\/\\>"}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "User Account, Edit (Wrong Signature)",
        "uri":"/account/edit/?&domain=mugeda&openid=9b46b4f8-1f7a-4564-9cf2-5f0e3f4e2177&signature=eadcc6b1354a6f1353a3dbb2286ad3a2",

        "expected_json":{
            "status":{"mode":"match", "value":2},
            "error":{"mode":"match", "value":"Missing user token in session.:Unknown user."}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "User Account, Edit (Action & Target)",
        "uri":"/account/edit/?action=update&target=www.google.com",
        "user":"regusert", 

        "expected_body":[
            {"mode":"regex", "value":"\\<input\\stype=\"hidden\"\\sname=\"action\"\\svalue=\"update\"\\s\/\\>"},
            {"mode":"regex", "value":"regusert"},
            {"mode":"regex", "value":"\\<input\\stype=\"hidden\"\\sid=\"tb_business_size\"\\s\/\\>"}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "User Account, Check Duplicate (Exist)",
        "uri":"/account/name_check?action=checkUsername&username=regusert",

        "expected_json":{
            "status":{"mode":"match", "value":8},
            "error":{"mode":"match", "value":"Internal error.:error_duplicate_username"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "User Account, Check Duplicate (Not Exist)",
        "uri":"/account/name_check?action=checkUsername&username=99c45600-0608-43bf-b4bf-6e1823d83563",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },
    
    {
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Payment--"
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Order Page, Not Sign In",
        "uri":"/user/buy/",

        "expected_body":[
            {"mode":"regex", "value":"\\<script\\ssrc=\"\/js\/signin.js"}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Order Page, Sign In",
        "uri":"/beginner/anilist.php?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6;/user/buy/",
        "session":"session",
        
        "expected_body":[
            {"mode":"regex", "value":"class=\"js-privacy-toggle\"\\sdata-type=\"1\""},
            {"mode":"regex", "value":"class=\"js-privacy-toggle\"\\sdata-type=\"2\""},
            {"mode":"regex", "value":"class=\"js-privacy-toggle\"\\sdata-type=\"3\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, Type 1 (New)",
        "uri":"/payment/?type=1&from=service",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"19\\.99\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, Type 1 (Renewal)",
        "uri":"/payment/?type=1&from=renewal",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"19\\.99\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, Type 2 (New)",
        "uri":"/payment/?type=2&from=service",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"59\\.99\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, Type 2 (Renewal)",
        "uri":"/payment/?type=2&from=renewal",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"59\\.99\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, Type 3 (New)",
        "uri":"/payment/?type=3&from=service",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, Type 3 (Renewal)",
        "uri":"/payment/?type=3&from=renewal",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"\""}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },
    
    {
        "_dividor":"==========================================================================================================",
        "description": "Payment Page, w/ error",
        "uri":"/payment/?type=3&from=service&error=d93d0218-02e6-4bef-b708-db34fbc3eff1",
        "user":"regusert",
        
        "expected_body":[
            {"mode":"regex", "value":"\\<div\\sclass=\"form_cards\"\\>"},
            {"mode":"regex", "value":"\\<input\\sname=\"amount\"\\stype=\"radio\"\\svalue=\"\""},
            {"mode":"regex", "value":"\\<div\\sclass=\"warning\\sprompt\""},
            {"mode":"regex", "value":"d93d0218-02e6-4bef-b708-db34fbc3eff1"}
        ],
        
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    }
	]
}

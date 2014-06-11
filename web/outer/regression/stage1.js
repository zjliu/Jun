var s1=
{
	"cases":[
		{
        "_dividor":"==================================================================================================",
        "description": "Saving Animation",
        "uri":"/myani/save",
        "user":"regusert",
        "set_crid":"crid",

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
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"},
            "revisions":{"mode":"array","value":""},
            "contentid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving Template",
        "uri":"/myani/save",
        "user":"regusert",
        "set_trid":"crid",

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
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"},
            "revisions":{"mode":"array","value":""},
            "contentid":{"mode":"regex","value":"^[A-Fa-f0-9]{24}$"}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Saving Page",
        "uri":"/myani/save",
        "user":"regusert",
        "set_prid":"crid",

        "data":{
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
        "description": "Create New Campaign, 2ADs",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "set_buf_1":"crid",

        "data":{
            "title":"NewCampaign-2ADs",
            "bannerId":"50af0e77508f3b8b0b00001b",
            "expandedId":"50af10ce508f3b9d0b000010",
            "urlTarget":"external"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex", "value":"[0-9A-Fa-f]{24}"},
            "revisions":{"mode":"regex", "value":"[0-9]{10}"},
            "update_time":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Create New Campaign, URL",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "set_buf_2":"crid",

        "data":{
            "title":"NewCampaign-URL",
            "bannerId":"50af0e77508f3b8b0b00001b",
            "action":"link",
            "urlTarget":"external"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex", "value":"[0-9A-Fa-f]{24}"},
            "revisions":{"mode":"regex", "value":"[0-9]{10}"},
            "update_time":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },
    
    {
        "_dividor":"==================================================================================================",
        "description": "Create New Campaign, Action",
        "uri":"/ide_save_campaign.php",
        "user":"regusert",
        "set_buf_3":"crid",

        "data":{
            "title":"NewCampaign-Action",
            "bannerId":"50af0e77508f3b8b0b00001b",
            "action":"behavior",
            "urlTarget":"external",
            "behavior":"[{\"type\":\"call\",\"name\":\"Make a Call\",\"event\":\"click\",\"needInput\":1,\"param\":{\"event_name\":\"Phone\",\"phone_number\":\"13910000000\"},\"mode\":2}]"
        },
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "crid":{"mode":"regex", "value":"[0-9A-Fa-f]{24}"},
            "revisions":{"mode":"regex", "value":"[0-9]{10}"},
            "update_time":{"mode":"array", "value":""}
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    }
	]
}

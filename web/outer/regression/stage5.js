var s5=
{
	"cases":[
	{
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Adding group (invalid)",
        "uri":"/add_group?user=regusert&group=test0",        
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":3},
            "version":{"mode":"match", "value":"1.0"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },      
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Adding group",
        "uri":"/add_group?user=regusert&group=_can_publish_template_",        
        "user":"regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "version":{"mode":"match", "value":"1.0"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Showing group (by self)",
        "uri":"/show_group?user=regusert",        
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "version":{"mode":"match", "value":"1.0"},
            "groups": {"mode":"regex", "value":"_admin"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Showing group (by admin)",
        "uri":"/show_group?user=regusert", 
        "user": "regusert",        

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "version":{"mode":"match", "value":"1.0"},
            "groups": {"mode":"regex", "value":"_admin"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Removing group",
        "uri":"/remove_group?user=regusert&group=_can_publish_template_",       
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"},
            "version":{"mode":"match", "value":"1.0"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    },   
    
    {
        "_dividor":"==================================================================================================",
        "_comments":"",
        "description":"Removing group(invalid)",
        "uri":"/remove_group?user=regusert&group=test0",       
        "user": "regusert",

        "expected_json":{
            "status":{"mode":"match", "value":3},
            "version":{"mode":"match", "value":"1.0"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }
	]
}

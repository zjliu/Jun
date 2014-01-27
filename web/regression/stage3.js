var s3=
{
	"cases":[
	{
        "_dividor":"==================================================================================================",
        "description": "Removing animation (with _id)",
        "uri":"/works/delete/##LOCAL_CRID#",
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
        "description": "Removing template (with _id)",
        "uri":"/template/delete/##LOCAL_TRID#",
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
        "description": "Removing page (with _id)",
        "uri":"/works/delete/##LOCAL_PRID#",
        "user":"regusert",
        
        "expected_json":{
            "status":{"mode":"match", "value":0},
            "error":{"mode":"match", "value":"Ok"}
        },
        
        "expected_headers":{
            "content-type":"application/json"
        }
    }
	]
}

var s4=
{
	"cases":[
	{
        "_dividor":"**************************************************************************************************",
        "_comments":"",
        "type":"anchor",
        "description":"--Atmio API--"
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, CSS3, Banner, TRID",
        "uri":"/template/customize/50d2c5a64dcb68865d0000c6?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, CSS3, Banner, CRID",
        "uri":"/template/customize/5125ed07405620b47f000065?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, CSS3, 320x416, TRID",
        "uri":"/template/customize/50af0e77508f3b8b0b00001b?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, CSS3, 320x416, CRID",
        "uri":"/template/customize/5125ed48405620cf7f000084?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, CSS3, 320x480, TRID",
        "uri":"/template/customize/50d94ea1405620807a00004a?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, CSS3, 320x480, CRID",
        "uri":"/template/customize/5125ed64405620af7f000076?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, Non-CSS3, TRID",
        "uri":"/template/customize/50b719c3508f3b6e2700005c?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access, Non-CSS3, CRID",
        "uri":"/template/customize/5125ee25405620a97f000086?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914ce6&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"changeImg"},
            {"mode":"regex","value":"_save"},
            {"mode":"regex","value":"template_ani_replay"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio API Access (Wrong Signature)",
        "uri":"/template/customize/50d2c5a64dcb68865d0000c6?domain=mugeda&openid=reguser&signature=d51f3181696b53e6add445afc8914c6c&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump",
        
        "expected_body":[
            {"mode":"regex","value":"submitAccessForm()"},
            {"mode":"regex","value":"openVideoPopup"},
            {"mode":"regex","value":"©"}
        ],
        "expected_headers":{
            "content-type":"text/html; charset=utf-8"
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., CSS3 (Session Reserved)",
        "uri":"/template/customize/50d2c5a64dcb68865d0000c6?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/savecss3.txt",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"RTestSaveCSS3"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., Non-CSS3 (Session Reserved)",
        "uri":"/template/customize/50b719c3508f3b6e2700005c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/savenoncss3.txt",
        "count2":"9",
        
        "expected_json":{
            "title":{"mode":"match", "value":"RTestSaveNonCSS3"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"2"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0001 (Session Reserved)",
        "uri":"/template/customize/50af0e77508f3b8b0b00001b?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0001RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0001RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0002 (Session Reserved)",
        "uri":"/template/customize/50af10ce508f3b9d0b000010?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0002RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0002RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0003 (Session Reserved)",
        "uri":"/template/customize/50af11ae508f3ba30b00001f?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0003RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0003RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0004 (Session Reserved)",
        "uri":"/template/customize/50af0fd2508f3bb60b000017?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0004RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0004RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0005 (Session Reserved)",
        "uri":"/template/customize/50af0964508f3b4815000005?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0005RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0005RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0006 (Session Reserved)",
        "uri":"/template/customize/50af0568508f3b960b000014?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0006RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0006RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0007 (Session Reserved)",
        "uri":"/template/customize/50af06a7508f3b9e0b000010?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0007RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0007RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0008 (Session Reserved)",
        "uri":"/template/customize/50af0800508f3bbc0b000012?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0008RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0008RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0009 (Session Reserved)",
        "uri":"/template/customize/50af1266508f3b481500000c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0009RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0009RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0010 (Session Reserved)",
        "uri":"/template/customize/50af1505508f3baa0b00001d?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0010RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0010RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0011 (Session Reserved)",
        "uri":"/template/customize/50af1779508f3b960b00002c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0011RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0011RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0012 (Session Reserved)",
        "uri":"/template/customize/50af195d508f3bbb0b000033?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0012RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0012RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0013 (Session Reserved)",
        "uri":"/template/customize/50af0d4f508f3b9c0b000017?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0013RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0013RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0014 (Session Reserved)",
        "uri":"/template/customize/50af0c76508f3b910b00002b?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0014RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0014RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0015 (Session Reserved)",
        "uri":"/template/customize/50af0b81508f3bb90b000026?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0015RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0015RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0016 (Session Reserved)",
        "uri":"/template/customize/50af0a4e508f3ba30b000017?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0016RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0016RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0017 (Session Reserved)",
        "uri":"/template/customize/50aef8c7508f3b4715000007?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0017RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0017RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0018 (Session Reserved)",
        "uri":"/template/customize/50aef95d508f3ba50b00001c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0018RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0018RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0019 (Session Reserved)",
        "uri":"/template/customize/50aef73e508f3b9a0b00001b?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0019RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0019RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., ET0020 (Session Reserved)",
        "uri":"/template/customize/50aef805508f3b910b00001d?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/ET0020RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"ET0020RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0001 (Session Reserved)",
        "uri":"/template/customize/50b719c3508f3b6e2700005c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0001RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0001RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"2"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0002 (Session Reserved)",
        "uri":"/template/customize/50b71a58508f3b2a2e000060?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0002RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0002RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"2"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0003 (Session Reserved)",
        "uri":"/template/customize/50b719a5508f3bb00b0000bb?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0003RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0003RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"2"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0004 (Session Reserved)",
        "uri":"/template/customize/50f904e74dcb683d4a000040?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0004RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0004RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"2"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0005 (Session Reserved)",
        "uri":"/template/customize/50f8e8614dcb68294a000056?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0005RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0005RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0006 (Session Reserved)",
        "uri":"/template/customize/50f8fa4f4dcb68294a00005f?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0006RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0006RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0007 (Session Reserved)",
        "uri":"/template/customize/50f8fee54dcb682f4a00004a?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0007RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0007RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0008 (Session Reserved)",
        "uri":"/template/customize/50b71942508f3b5727000070?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0008RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0008RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EI0009 (Session Reserved)",
        "uri":"/template/customize/50b71dd5508f3bfe3300004a?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EI0009RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EI0009RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0001 (Session Reserved)",
        "uri":"/template/customize/50d2c5a64dcb68865d0000c6?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0001RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0001RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0002 (Session Reserved)",
        "uri":"/template/customize/50b4381b4dcb683d3100001c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0002RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0002RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"3"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0003 (Session Reserved)",
        "uri":"/template/customize/50d177b2508f3b2864000016?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0003RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0003RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0004 (Session Reserved)",
        "uri":"/template/customize/50d1328b508f3b136400001a?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0004RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0004RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0005 (Session Reserved)",
        "uri":"/template/customize/50d1854a508f3b8c7600000a?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0005RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0005RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0006 (Session Reserved)",
        "uri":"/template/customize/50d020144dcb68f55e000059?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0006RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0006RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"2"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0007 (Session Reserved)",
        "uri":"/template/customize/50b42c6b4dcb684433000006?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0007RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0007RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"8"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0008 (Session Reserved)",
        "uri":"/template/customize/50b736e0508f3b532700007e?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0008RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0008RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0009 (Session Reserved)",
        "uri":"/template/customize/50b73d10508f3bfc33000061?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0009RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0009RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0010 (Session Reserved)",
        "uri":"/template/customize/50af4c944056203774000040?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0010RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0010RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0011 (Session Reserved)",
        "uri":"/template/customize/50af4cb2405620d773000052?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0011RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0011RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EA0012 (Session Reserved)",
        "uri":"/template/customize/50d2b1e24dcb68295b0000c3?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EA0012RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EA0012RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"3"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EB0001 (Session Reserved)",
        "uri":"/template/customize/50f8bd474dcb682a4a000031?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EB0001RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EB0001RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"7"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EB0002 (Session Reserved)",
        "uri":"/template/customize/50f8bdea4dcb68264a00003e?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EB0002RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EB0002RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"6"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EB0003 (Session Reserved)",
        "uri":"/template/customize/50f8bed24dcb68244a000040?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EB0003RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EB0003RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EB0004 (Session Reserved)",
        "uri":"/template/customize/50f8bee44dcb68284a00003d?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EB0004RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EB0004RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EB0005 (Session Reserved)",
        "uri":"/template/customize/50f8bef84dcb68344a00001c?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EB0005RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EB0005RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"6"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EB0006 (Session Reserved)",
        "uri":"/template/customize/50f8bf074dcb68204a00001b?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EB0006RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EB0006RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"6"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EF0001 (Session Reserved)",
        "uri":"/template/customize/50ee612e4dcb68e1330000bd?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EF0001RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EF0001RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"7"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EF0002 (Session Reserved)",
        "uri":"/template/customize/50ee8d5d4dcb68e6330000b7?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EF0002RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EF0002RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"6"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EF0003 (Session Reserved)",
        "uri":"/template/customize/50d94ea1405620807a00004a?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EF0003RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EF0003RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EF0004 (Session Reserved)",
        "uri":"/template/customize/50efe37c4dcb68d433000107?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EF0004RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EF0004RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"5"},
            {"mode":"count", "value":"\\.js", "count":"4"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EF0005 (Session Reserved)",
        "uri":"/template/customize/50f3731f4dcb68f1330000ec?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EF0005RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EF0005RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"6"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    },

    {
        "_dividor":"==================================================================================================",
        "description": "Atmio S.E.P., EF0006 (Session Reserved)",
        "uri":"/template/customize/50f3d3d04dcb68da330000cc?domain=atmio&openid=reguser&signature=e4f2987fefd9e31ecd82d18dff926f22&userdata={\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\"}&dump=testdump;/myani/save",
        "session":"session",

        "data2":"resource/template/EF0006RT",
        "count2":"9", 
        
        "expected_json":{
            "title":{"mode":"match", "value":"EF0006RT"},
            "openid":{"mode":"match", "value":"reguser"},
            "userdata":{"mode":"regex", "value":"\"UserId\":\"1047\",\"RequestId\":\"f510311a-32ee-4d56-8658-ebbf9425d28e\",\"ApiUsed\":\"T\""},
            "signature":{"mode":"match", "value":"e4f2987fefd9e31ecd82d18dff926f22"},
            "zip":[{"mode":"count", "value":"(\\.png)|(\\.jpg)|(\\.gif)", "count":"6"},
            {"mode":"count", "value":"\\.css", "count":"4"},
            {"mode":"count", "value":"\\.js", "count":"2"},
            {"mode":"regex", "value":"mraid.js"},
            {"mode":"regex", "value":"index.html"},
            {"mode":"regex", "value":"css3_webkit"},
            {"mode":"regexnot", "value":"Help.pdf"}]
        },
        
        "expected_headers":{
            "content-type":["application/json", "text/plain"]
        }
    }
	]
}

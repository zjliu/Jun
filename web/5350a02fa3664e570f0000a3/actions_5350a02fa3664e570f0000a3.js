Mugeda.script.push(function (mugeda) {
var gamedata = {};

    var upload_score = function (gameid, score, redirecturl) {
        gamedata["score"] = score;
        gamedata["gameid"] = gameid;
        gamedata["redirecturl"] = redirecturl;
        gamedata["urlhasparams"] = (redirecturl.indexOf("?") !== -1) ? true : false;


        var auth_url = "https://mugeda-mobile.mugeda.com/upload_score.php?gamedata=" + encodeURIComponent(JSON.stringify(gamedata));

        window.open(auth_url, '_self');
    };


    var userTriggered = false;
    var timerStart = 0;
    var timeBonus = 0;
    var prevMovingStatus = '';
    var finalScore = 0;
    var minIdleTime = 200;
    var mugeda = Mugeda.getMugedaObject();
    mugeda.addEventListener("renderReady", function () {
        
        var setUserTrigger = function (set) {
            userTriggered = set;
            if (userTriggered && timerStart > 0) {
                var spent = ((new Date()).getTime() - timerStart);
                timeBonus = Math.max(0, Math.floor((3000 - spent) * 0.01));
            }

            else
                timeBonus = 0;
        }


        var scene = mugeda.scene;
        var objMask = scene.getObjectByName('mask');

        // chk browser
        var agent = navigator.userAgent;
        var isAndroid = agent.match(/android/i);
        var androidVersion = parseFloat(agent.slice(agent.indexOf('android') + 8));

        /*

        if (isAndroid) {
            if (agent.match(/micromessenger/i)) {
                return scene.gotoAndPause(45)
            }
            else if (agent.match(/sq.*yyb/i)) {
                return scene.gotoAndPause(46)
            }
            else if (agent.match(/KuaiPai/i)) {
                return scene.gotoAndPause(47)
            }
        }
        */

        var control = scene.getObjectByName("control");
        var slot = scene.getObjectByName("slot");
        var time = scene.getObjectByName('time');
        var mobile1 = scene.getObjectByName("phone_1");
        var successObj = scene.getObjectByName("successObj");
        var successPhone = successObj.scene.getObjectByName('successPhone');
        var successScore = successObj.scene.getObjectByName('successScore');
        var successRank = successObj.scene.getObjectByName('rank');
        var failObj = scene.getObjectByName('failObj');
        var failPhone = failObj.scene.getObjectByName('failPhone');
        var failScore = failObj.scene.getObjectByName('failScore');
        var fenshujieguo = scene.getObjectByName('分数结果');
        var submitsSc = scene.getObjectByName('submit');
        var errorObj = scene.getObjectByName("errorObj");
        var error = errorObj.scene.getObjectByName('error');
        var disableMouse = function (event) { event.preventDefault() };
        var stoneArray = [];//石头数组
        var xiaoTime = 0;//消失计时
        var isxiao = false;//消失状态
        var xiaoAllTime = 3;//消失总时间
        var ishuan = false;//换位置状态
        var clickItem;//第一个石头
        var clickNum = -1;
        var clickTwoItem;//第二个石头
        var clickTwoNum = -1;
        var huanTime = 0;//换位置计时
        var hang = 7;
        var stoneTypeNum = 7;
        var bian = 320;
        var kuan = bian / hang;
        var offset = 3;//-7;
        var haloOffset = -11;
        var offsetY = 53;
        var isjing = false;//静态标志
        var v0 = 20;
        var scoreUnit = 200;
        var g = 25;//重力系数
        var xiaoArray = [];
        var xiaohaxi = [];
        var dui = [0, 0, 0, 0, 0, 0, 0];//新生成石头队列
        var startX = 0;
        var srartY = 0;
        var menkan = 0;//滑动输入灵敏度
        var score = 0;
        var fraction = scene.getObjectByName("fraction");
        var timeIsStart = false;
        var multiple = 1;
        var totalTime = 10 * multiple;
        var totaltime = 0;
        var gameFrame = 17;
        var successFrame = 18;
        var failFrame = 33;
        var errorFrame = 44;
        var fid = 0;
        var t;
        var randomArray = [];
        var randomIndex = 0;
        var randomArrayMax = 100;
        var randomArray0 = [];
        var randomIndex0 = 0;
        var isPlayed = false;
        var goldenEggRow = 0;
        var goldenEggColumn = 0;
        var isResetBlocks = false;
        var lastResetTime = 0;
        var resetMaxCount = 3;
        var resetCount = 0;
        var moveSteps = 0;
        var isInited = false;
        var isEnd = false;
        var start = scene.getObjectByName("start");
        var reset = scene.getObjectByName("reset");
        var countdown = scene.getObjectByName("countdown");
        var resetHint = scene.getObjectByName("resetHit");
        var countdownMaxFrame = 36;
        
        submitsSc.visible = false;

        scene.getObjectByName('submitScore').addEventListener('inputend', function () {
            submitsSc.visible = true;
            upload_score('534f810aa3664ea9740004aa', finalScore, window.location.href)
        });


        if ((function () {
            
            var getParam = function (name) {
                var url = decodeURIComponent(window.location.search);
                var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
                var arr = url.match(reg);
                if (arr) return arr[2];
        }

            var username = getParam('username');
            var score = getParam('score');
            var rankdata = getParam('rankdata');

            try {
                    rankdata = JSON.parse(decodeURI(rankdata))
        } catch (ex) {
            //alert(ex.message);
                    return false;
        }

        if (!(username && score && rankdata)) return false;

        scene.getObjectByName('ruser').text = username;
        scene.getObjectByName('rscore').text = score
        var pdom = scene.getObjectByName('排行版').dom;




        var html = '<style>table td{border-top:rgb(204,24,0) solid 1px;background: #960f00;}</style><table border="0" width="100%" cellspacing="0" cellpadding="0">';
            var list = rankdata;
            if (list.sort) {
                list.sort(function (a, b) {
                    return b.score - a.score;
                });
            }
            for (var i = 0; i < list.length; i++) {
                var rankItem = list[i];
                html += ('<tr><td style="border-radius: 5px 0 0 5px;padding-left:8px;">' + (i + 1) + '</td><td>' + rankItem.name + '</td><td style="border-radius: 0 5px 5px 0;">' + rankItem.score + '</td></tr>');
        //if(i!= rankdata.length -1) html += '<br />';
        }
        html += '</table>';

        pdom.innerHTML = html;
        scene.gotoAndPause(50);
           

        scene.getObjectByName('restartGame').addEventListener('inputend', function () {
            loadSound()
            game.init();
            scene.gotoAndPlay(gameFrame - 1);
        });
            
            return true;

        })()) {
        } else {
            setTimeout(function () {
                loadSound()
                game.init();
                scene.gotoAndPlay(gameFrame - 1);
            }, 0);
        };

        if (typeof WeixinJSBridge != 'undefined') WeixinJSBridge.call('showOptionMenu');


        countdown.scene.setSegment("static", countdownMaxFrame, countdownMaxFrame, false);
        countdown.scene.setSegment("run", 0, countdownMaxFrame, false);
        countdown.scene.playSegment("static");
        countdown.scene.addEventListener("enterframe", function () {
            if (this.currentId == countdownMaxFrame - 1) {
                countdown.left = -700;
                countdown.top = -700;
                timeIsStart = true;
                totaltime = totalTime;
                var frame = (totalTime - totaltime);
                slot.scene.setSegment("p", frame, frame, true);
                slot.scene.playSegment("p");
                objMask.visible = false;
                time.alpha = 1;
                slot.alpha = 1;

                resetHint.visible = false;
            }
        });
        var stoneSource = [];
        for (var i = 1; i <= stoneTypeNum + 1; i++) {
            stoneSource[i] = scene.getObjectByName('stone' + i);
        }
        var haloArray = [];
        if (androidVersion < 3) {
        }
        else {
            for (var i = 0; i < 5; i++) {
                haloArray[i] = mugeda.createInstanceOfSymbol("halo");
                scene.appendChild(haloArray[i], stoneSource[stoneTypeNum + 1]);
                haloArray[i].scene.setSegment("static", 3, 3, false);
                haloArray[i].scene.setSegment("run", 0, 2, true);
                haloArray[i].scene.playSegment("static");
            }
        }

        var addScore = scene.getObjectByName("addScore");
        var addScoreMaxFrame = 8;
        addScore.scene.setSegment("show", 0, addScoreMaxFrame, false);
        var addScoreText = addScore.scene.getObjectByName("addScoreText");
        addScore.scene.addEventListener("enterframe", function () {
            if (this.currentId == addScoreMaxFrame - 1) {
                addScore.left = -400;
                addScore.top = -400;
            }
        });


        var createRandom = function () {
            randomArray = [];
            for (var i = 0; i < randomArrayMax; i++) {
                var random = Math.floor(Math.random() * 10000000) % stoneTypeNum;
                randomArray.push(random);
                // 备用的方块数组
            }

            randomIndex = 0;
            var h = Math.floor(Math.random() * 10000000) % hang;
            for (j = 0; j < hang; j++) {
                for (i = 0; i < hang; i++) {
                    var a = [];//[0,1,2,3,4,5,6];
                    for (var k = 0; k < stoneTypeNum; k++) {
                        a.push(k);
                    }
                    if (i >= 2) {
                        if (randomArray0[j * hang + i - 1] == randomArray0[j * hang + i - 2]) {
                            var n = randomArray0[j * hang + i - 1] % stoneTypeNum;
                            for (m = 0; m < a.length; m++) {
                                if (a[m] == n)
                                    a.splice(m, 1);
                            }
                        }
                    }
                    if (j >= 2) {
                        if (randomArray0[(j - 1) * hang + i] == randomArray0[(j - 2) * hang + i]) {
                            var n = randomArray0[(j - 1) * hang + i] % stoneTypeNum;
                            for (m = 0; m < a.length; m++) {
                                if (a[m] == n)
                                    a.splice(m, 1);
                            }
                        }
                    }
                    var wei = 0 - kuan * 1.5 * (hang - j);
                    var f = Math.floor(Math.random() * 10000000) % a.length;
                    var ff = a[f];
                    // 最初生成的49个方块
                    if (j == 0 && i == 3) {
                        ff = stoneTypeNum + 1;
                        goldenEggColumn = i;
                    }
                    randomArray0.push(ff);
                }
            }
        }
        createRandom();



        loadSound = function () {
            //audioBk = loadAudio('https://cn.mugeda.com/udata/516ce6ece8ad7eea65000013/529ab6cde8ad7e5d790000c3.mp3');
            //audioHit = loadAudio('https://cn.mugeda.com/udata/516ce6ece8ad7eea65000013/529ab7a4e8ad7e66790000d4.mp3');
            //audioStart = loadAudio('https://cn.mugeda.com/udata/516ce6ece8ad7eea65000013/529ab7cee8ad7e5c790000ce.mp3');
            //audioError = loadAudio('https://cn.mugeda.com/udata/516ce6ece8ad7eea65000013/529ac34fe8ad7e4d790000cf.mp3');
        }

        window.resetBlocks = function () {
            //alert('这里添加重置块的操作');
            var now = (new Date()).getTime();
            var waitSpan = 3000;
            if (!ishuan && isjing && !isxiao && !isResetBlocks && resetCount < resetMaxCount && (now - lastResetTime) > waitSpan) {

                isResetBlocks = true;
                resetCount++;

                var tempArray = [];
                for (var i = 1; i < 6; i++) {
                    if (goldenEggColumn != i) {
                        tempArray.push(i);
                    }
                }
                var tempIndex = Math.floor(Math.random() * 10000000) % tempArray.length;
                var disappearColumn = tempArray[tempIndex];

                //socket.send('resetBlocks', "" + disappearColumn);
                console.log('reset: ' + resetCount);
                lastResetTime = now;

                for (var j = 0; j < hang; j++) {
                    xiaoArray.push(j * hang + disappearColumn);
                }
                if (resetCount >= resetMaxCount) {
                    reset.left = -400;
                    reset.top = -400;
                }
            }
        }
        window.startGame = function () {
            countdown.left = 108;
            countdown.top = 176;
            start.left = -700;
            start.top = -700;
            finalScore = 0;
            moveSteps = 0;
            //socket.send('start', "");
            countdown.scene.playSegment("run");

            try {
                //audioBk.loop = true;
                //audioBk.play(0);
            } catch (e) { }
        }

        Game = function () {
            var Game = this;
            var isClickStart = false;
            Game.init = function () {
                if (isInited) {
                    return;
                }
                isInited = true;
                control.addEventListener("inputstart", onStart);
                control.addEventListener("inputend", onClick);
                main = function () {
                    totaltime--;
                    time.text = Math.max(0, totaltime);
                    if (totaltime >= 0) {
                        var frame = (totalTime - totaltime);
                        slot.scene.setSegment("p", frame, frame, true);
                        slot.scene.playSegment("p");
                    }
                    if (totaltime == 0 && fid == gameFrame && timeIsStart) {
                        var goldenEggScore = 0;
                        if (goldenEggRow < 4) {
                            goldenEggScore = goldenEggRow * scoreUnit;
                        }
                        else if (goldenEggRow < 6) {
                            goldenEggScore = (goldenEggRow - 3) * 2 * scoreUnit + 3 * scoreUnit;
                        }
                        else if (goldenEggRow == 6) {
                            goldenEggScore = 10 * scoreUnit;
                        }
                        score += goldenEggScore;
                        fraction.text = "" + score;
                        addScoreText.text = "+" + goldenEggScore;
                        addScore.left = 115;
                        addScore.top = 61;
                        addScore.scene.playSegment("show");
                        finalScore = Math.max(1, score);
                        console.log('final score: ' + score);
                        fenshujieguo.text = score;

                        game.end();
                        scene.gotoAndPause(49);
                        //socket.send('final', score);
                    }
                };
                t = setInterval(main, 1000 / multiple);
            };

            Game.play = function () {
                // reset.left = 9;
                // reset.top = 371;
                isEnd = false;
                countdown.left = -700;
                countdown.top = -700;
                time.alpha = 0;
                slot.alpha = 0;
                timeIsStart = false;
                goldenEggRow = 0;
                addScore.left = -400;
                addScore.top = -400;
                ishuan = false;
                xiaoArray = [];
                xiaohaxi = [];
                fraction.text = "0";
                score = 0;
                totaltime = totalTime;
                var frame = (totalTime - totaltime);
                slot.scene.setSegment("p", frame, frame, true);
                slot.scene.playSegment("p");
                isClickStart = false;
                clickNum = -1;
                isjing = false;
                stoneArray = [];

                for (j = 0; j < hang; j++) {
                    for (i = 0; i < hang; i++) {
                        var wei = 0 - kuan * 1.5 * (hang - j);
                        var ff = randomArray0[randomIndex0];
                        randomIndex0++;
                        if (ff === 0)
                            ff = stoneTypeNum;
                        var instance = Game.createStone(ff, (j * hang + i), wei);
                        stoneArray.push({ obj: instance, type: ff, v: v0 });
                    }
                }

                /*
                scene.tellPcCallback({
					mobile: mobileNum
				});
                */

            };
            Game.end = function () {
                isEnd = true;
                if (stoneArray.length > 0) {
                    for (j = 0; j < hang; j++) {
                        for (i = 0; i < hang; i++) {
                            if (stoneArray[hang * j + i]) {
                                if (stoneArray[hang * j + i].obj)
                                    scene.removeChild(stoneArray[hang * j + i].obj);
                            }
                        }
                    }
                }
                for (var i = 0; i < haloArray.length; i++) {
                    haloArray[i].left = -700;
                    haloArray[i].top = -700;
                }
                stoneArray = [];
                successScore.text = score;
                failScore.text = score;
            };
            Game.createStone = function (ff, num, wei) {
                var j = Math.floor(num / hang);
                var i = num - hang * j;
                //var instance = mugeda.createInstanceOfSymbol('stone' + ff);
                var instance = stoneSource[ff].clone();

                scene.appendChild(instance, control);
                instance.left = (kuan * i) + offset;
                instance.top = wei;
                //instance.scene.setSegment("jing", 0,0,false);
                //instance.scene.setSegment("dong", 1,5,true);
                //instance.scene.playSegment("jing");

                return instance;
            };
            function onStart(event) {
                if (isEnd) {
                    return;
                }
                var i = Math.floor(event.inputX / kuan);
                var j = Math.floor((event.inputY - offsetY) / kuan);
                startX = event.inputX;
                startY = event.inputY;
                if (xiaoArray.length > 0) {
                    for (k = 0; k < xiaoArray.length; k++) {
                        if (xiaoArray[k] == (j * hang + i)) {
                            return;
                        }
                    }
                }
                var now = (new Date()).getTime();
                if (isjing && !xiaoTime && (now - timerStart) > minIdleTime) {
                    if (!isClickStart) {
                        isClickStart = true;
                        clickNum = j * hang + i;
                        clickItem = stoneArray[clickNum];
                        if (clickItem)
                            clickItem.obj.alpha = 0.5;
                    }
                    else {
                        isClickStart = false;
                        clickItem.obj.alpha = 1;
                        if ((i == clickNum % hang) && Math.abs(j - Math.floor(clickNum / hang)) == 1 || (j == Math.floor(clickNum / hang)) && Math.abs(i - clickNum % hang) == 1) {
                            clickTwoNum = j * hang + i;
                            Game.clickProcess(clickNum, clickTwoNum);
                        }
                    }
                }
                event.preventDefault();
            };

            function onClick(event) {
                if (isEnd) {
                    return;
                }
                var i = Math.floor(event.inputX / kuan);
                var j = Math.floor((event.inputY - offsetY) / kuan);
                if (xiaoArray.length > 0) {
                    for (k = 0; k < xiaoArray.length; k++) {
                        if (xiaoArray[k] == (j * hang + i)) {
                            return;
                        }
                    }
                }
                var now = (new Date()).getTime();
                if (isjing && !xiaoTime && (now - timerStart) > minIdleTime) {
                    var isNeedProcess = false;
                    if (isClickStart) {
                        if (Math.abs(event.inputX - startX) > Math.abs(event.inputY - startY)) {
                            if (Math.abs(event.inputX - startX) > menkan) {
                                if (event.inputX > startX) {
                                    if ((clickNum % hang) < hang - 1) {
                                        clickTwoNum = clickNum + 1;
                                        isNeedProcess = true;
                                    }
                                }
                                else if ((clickNum % hang) > 0) {
                                    clickTwoNum = clickNum - 1;
                                    isNeedProcess = true;
                                }
                            }
                        }
                        else if (Math.abs(event.inputY - startY) > menkan) {
                            if (event.inputY > startY) {
                                if (Math.floor(clickNum / hang) < hang - 1) {
                                    clickTwoNum = clickNum + hang;
                                    isNeedProcess = true;
                                }
                            }
                            else if (Math.floor(clickNum / hang) > 0) {
                                clickTwoNum = clickNum - hang;
                                isNeedProcess = true;
                            }
                        }
                    }
                    if (isNeedProcess) {
                        Game.clickProcess(clickNum, clickTwoNum);
                    }
                }
                event.preventDefault();
            };
            Game.clickProcess = function (Num, TwoNum) {
                var checksum = 0
                for (var i = 0; i < hang * hang ; i++) {
                    checksum += stoneArray[i].type;
                }
                isClickStart = false;
                clickItem.obj.alpha = 1;
                ishuan = true;
                huanTime = 4;
                clickTwoItem = stoneArray[clickTwoNum];
                stoneArray[TwoNum] = clickItem;
                stoneArray[Num] = clickTwoItem;
                setUserTrigger(true);
                //socket.send('action', "" + clickNum + "," + clickTwoNum + "_" + totaltime+'_'+timeBonus+'_'+score+'_'+(moveSteps)+'_'+checksum);
                console.log(clickNum + "," + clickTwoNum + "_" + totaltime + '_' + timeBonus + '_' + score + '_' + (moveSteps) + ', DateTime:' + (new Date()).getTime());
                moveSteps++;
                // 手机发给PC的块交换信息。
                // clickNum和clickTwoNum是要交换的两个块儿的下标。0~48(从左到右从上到下)
            }
            Game.runCheck = function () {
                if (isEnd) {
                    return;
                }
                var preType = -1;//扫描时用的前一个方块的类型
                var sameCount = 1;//相同石头计数
                for (var i = 0; i < hang; i++) {
                    dui[i] = 0;
                }
                for (j = 0; j < hang; j++)//行扫描
                {
                    preType = -1;
                    sameCount = 1;
                    for (i = 0; i < hang; i++) {
                        if (stoneArray[j * hang + i].type == (stoneTypeNum + 1)) {
                            goldenEggRow = j;
                            goldenEggColumn = i;
                        }
                        if ((preType == stoneArray[j * hang + i].type) && (stoneArray[j * hang + i].type > 0)) {
                            sameCount++;
                        }
                        else {
                            if (sameCount >= 3) {
                                for (k = sameCount; k >= 1; k--) {
                                    if (xiaohaxi[j * hang + i - k] === undefined) {
                                        xiaohaxi[j * hang + i - k] = 1;
                                        xiaoArray.push(j * hang + i - k);
                                    }
                                }
                            }
                            preType = stoneArray[j * hang + i].type;
                            sameCount = 1;
                        }
                    }
                    if (sameCount >= 3) {
                        for (k = sameCount; k >= 1; k--) {
                            if (xiaohaxi[j * hang + i - k] === undefined) {
                                xiaohaxi[j * hang + i - k] = 1;
                                xiaoArray.push(j * hang + i - k);
                            }
                        }
                    }
                }
                for (i = 0; i < hang; i++)//列扫描
                {
                    preType = -1;
                    sameCount = 1;
                    for (j = 0; j < hang; j++) {
                        if ((preType == stoneArray[j * hang + i].type) && (stoneArray[j * hang + i].type > 0)) {
                            sameCount++;
                        }
                        else {
                            if (sameCount >= 3) {
                                for (k = sameCount; k >= 1; k--) {
                                    if (xiaohaxi[(j - k) * hang + i] === undefined) {
                                        xiaohaxi[(j - k) * hang + i] = 1;
                                        xiaoArray.push((j - k) * hang + i);
                                    }
                                }
                            }
                            preType = stoneArray[j * hang + i].type;
                            sameCount = 1;
                        }
                    }
                    if (sameCount >= 3) {
                        for (k = sameCount; k >= 1; k--) {
                            if (xiaohaxi[(j - k) * hang + i] === undefined) {
                                xiaohaxi[(j - k) * hang + i] = 1;
                                xiaoArray.push((j - k) * hang + i);
                            }
                        }
                    }
                }
                if (xiaoArray.length > 0)//消除操作
                {
                    ishuan = false;
                    if (isjing) {
                        if (!isxiao) {
                            isxiao = true;
                            xiaoTime = xiaoAllTime;
                        }
                        else {
                            if (xiaoTime > 0) {
                                if (xiaoTime == xiaoAllTime && !finalScore && !isResetBlocks) {
                                    var incremental = 0;
                                    if (xiaoArray.length == 3) {
                                        incremental = scoreUnit;
                                    }
                                    else {
                                        incremental = scoreUnit + (xiaoArray.length - 3) * scoreUnit;
                                        addScoreText.text = "+" + (userTriggered ? incremental : Math.floor(incremental / 2));
                                        addScore.left = 115;
                                        addScore.top = 202;
                                        addScore.scene.playSegment("show");
                                    }

                                    if (!userTriggered) {
                                        incremental = Math.floor(incremental / 2);
                                    }

                                    score += incremental;
                                    score += timeBonus;
                                    setUserTrigger(false);

                                    fraction.text = "" + score;

                                    /* for(var x = 0; x < xiaoArray.length; x++)
                                     {
                                         if(stoneArray[xiaoArray[x]].obj)
                                         {
                                             //stoneArray[xiaoArray[x]].obj.scene.playSegment("dong");
                                         }
                                     }
                                     
                                     try{
                                         //audioHit.play(1);
                                     }catch(e){}
                                     */
                                }

                                if (androidVersion < 3) {
                                    for (var x = 0; x < xiaoArray.length; x++) {
                                        if (stoneArray[xiaoArray[x]].obj) {
                                            var p = xiaoTime % 4;
                                            switch (p) {
                                                case 0:
                                                    stoneArray[xiaoArray[x]].obj.alpha = 0;
                                                    break;
                                                case 1:
                                                    stoneArray[xiaoArray[x]].obj.alpha = 0.5;
                                                    break;
                                                case 2:
                                                    stoneArray[xiaoArray[x]].obj.alpha = 1;
                                                    break;
                                                case 3:
                                                    stoneArray[xiaoArray[x]].obj.alpha = 0.5;
                                                    break;
                                                default:
                                                    stoneArray[xiaoArray[x]].obj.alpha = 0.5;
                                                    break;
                                            }

                                        }
                                    }
                                }
                                else if (xiaoTime == xiaoAllTime) {
                                    for (var x = 0; x < xiaoArray.length; x++) {
                                        if (x >= haloArray.length) {
                                            haloArray[x] = mugeda.createInstanceOfSymbol('halo');
                                            scene.appendChild(haloArray[x], stoneSource[stoneTypeNum + 1]);
                                        }
                                        haloArray[x].left = stoneArray[xiaoArray[x]].obj.left + haloOffset;
                                        haloArray[x].top = stoneArray[xiaoArray[x]].obj.top + haloOffset;
                                        haloArray[x].scene.playSegment("run");
                                    }
                                }
                                xiaoTime--;
                            }
                            else {
                                for (var x = 0; x < xiaoArray.length; x++) {
                                    if (stoneArray[xiaoArray[x]].obj) {
                                        //scene.removeChild(stoneArray[xiaoArray[x]].obj);
                                        //stoneArray[xiaoArray[x]].obj = null;
                                        stoneArray[xiaoArray[x]].type = 0;
                                        dui[xiaoArray[x] % hang]++;
                                        if (androidVersion < 3) {
                                            stoneArray[xiaoArray[x]].obj.alpha = 1;
                                        }
                                        else {
                                            haloArray[x].left = -700;
                                            haloArray[x].top = -700;
                                        }

                                    }
                                }
                                xiaoArray = [];
                                xiaohaxi = [];
                                isxiao = false;
                            }
                        }
                    }
                }
                var isyidong = false;

                for (i = hang * hang - 1; i >= 0; i--)//生成新的方块操作
                {
                    var k = Math.floor(i / hang);
                    if (stoneArray[i].type === 0) {
                        for (j = 1; j <= k; j++) {
                            if (stoneArray[i - j * hang].type > 0) {
                                break;
                            }
                        }
                        for (var x = 0; x < k + 1; x++) {
                            if (i - (j + x) * hang >= 0) {
                                var tempItem = stoneArray[i - x * hang];
                                stoneArray[i - x * hang] = stoneArray[i - (j + x) * hang];
                                stoneArray[i - (j + x) * hang] = tempItem;
                            }
                            else {
                                var ff = randomArray[randomIndex];
                                if (ff === 0)
                                    ff = stoneTypeNum;
                                if (isResetBlocks) {
                                    var currentNum = i - x * hang;
                                    var isSame = false;
                                    do {

                                        isSame = false;
                                        ff = randomArray[randomIndex];
                                        if (ff === 0)
                                            ff = stoneTypeNum;
                                        // console.log(x+','+randomIndex + ',' + ff);
                                        if (currentNum % hang > 0) {
                                            if (ff == stoneArray[currentNum - 1].type)
                                                isSame = true;
                                        }
                                        if (currentNum % hang < hang - 1) {
                                            if (ff == stoneArray[currentNum + 1].type)
                                                isSame = true;
                                        }
                                        if (Math.floor(currentNum / hang) > 0) {
                                            if (ff == stoneArray[currentNum - hang].type)
                                                isSame = true;
                                        }
                                        if (Math.floor(currentNum / hang) < hang - 1) {
                                            if (ff == stoneArray[currentNum + hang].type)
                                                isSame = true;
                                        }
                                        if (isSame) {
                                            randomIndex++;
                                            if (randomIndex >= randomArrayMax) {
                                                randomIndex = 0;
                                            }
                                        }
                                    } while (isSame);
                                }
                                randomIndex++;
                                if (randomIndex >= randomArrayMax) {
                                    randomIndex = 0;
                                }
                                var wei = 0 - kuan * 1.5 * (dui[i % hang] - (k - x)) + 70;
                                //var instance = game.createStone(ff,(i - x * hang),wei);
                                var instance = stoneArray[i - x * hang].obj;
                                // instance.src = stoneSource[ff].src;
                                // instance.dom.innerHTML = "<img src='"+stoneSource[ff].src+"' width="+instance.width+" height="+instance.height+"/>";
                                instance.dom.src = stoneSource[ff].src;

                                var num = i - x * hang;
                                var i0 = num - hang * Math.floor(num / hang);
                                instance.left = (kuan * i0) + offset;
                                instance.top = wei;
                                stoneArray[i - x * hang].type = ff;
                            }
                        }
                        isResetBlocks = false;
                    }
                    var desleft = (kuan * (i - hang * k)) + offset;
                    var destop = offsetY + (kuan * k) + offset;
                    if (Math.abs(stoneArray[i].obj.left - desleft) > 0.001) {
                        isyidong = true;
                        if (Math.abs(stoneArray[i].obj.left - desleft) <= stoneArray[i].v) {
                            stoneArray[i].obj.left = desleft;
                            stoneArray[i].v = 0;
                        }
                        else if (stoneArray[i].obj.left < desleft) {
                            if (ishuan) {
                                stoneArray[i].obj.left += 20;
                            }
                            else {
                                stoneArray[i].obj.left += stoneArray[i].v;
                            }
                            stoneArray[i].v += g;
                        }
                        else {
                            if (ishuan) {
                                stoneArray[i].obj.left -= 20;
                            }
                            else {
                                stoneArray[i].obj.left -= stoneArray[i].v;
                            }
                            stoneArray[i].v += g;
                        }
                    }
                    if (Math.abs(stoneArray[i].obj.top - destop) > 0.001) {
                        var h = stoneArray[i].obj.top;
                        isyidong = true;
                        if (Math.abs(stoneArray[i].obj.top - destop) <= stoneArray[i].v) {
                            stoneArray[i].obj.top = destop;
                            stoneArray[i].v = 0;
                        }
                        else if (stoneArray[i].obj.top < destop) {
                            if (ishuan) {
                                stoneArray[i].obj.top += 20;
                            }
                            else {
                                stoneArray[i].obj.top += stoneArray[i].v;
                            }
                            stoneArray[i].v += g;
                        }
                        else {
                            if (ishuan) {
                                stoneArray[i].obj.top -= 20;
                            }
                            else {
                                stoneArray[i].obj.top -= stoneArray[i].v;
                            }
                            stoneArray[i].v += g;
                        }
                    }
                }

                isjing = !isyidong;
                if (!isxiao && ishuan && isjing && clickNum >= 0 && clickTwoNum >= 0)//无效动作复位操作
                {
                    var tempItem = stoneArray[clickNum];
                    stoneArray[clickNum] = stoneArray[clickTwoNum];
                    stoneArray[clickTwoNum] = tempItem;
                    ishuan = false;
                    isyidong = true;
                    isjing = false;
                }


                if (prevMovingStatus == 'moving' && isjing) {

                    timerStart = (new Date()).getTime();
                }

                prevMovingStatus = isjing ? "static" : 'moving';
            };
        };
        var game = new Game();
        // startPoint
        
        scene.getObjectByName('restartGame_1').addEventListener('inputend', function () {
            objMask.visible = true;
            createRandom();
            game.play();
            startGame()
            scene.gotoAndPlay(gameFrame - 1);
        });


        scene.addEventListener("enterframe", function () {
            fid = this.currentId;
            console.log(fid)
            if (fid == 1) {
                //Mugeda.log(Mugeda.log() + "|进入第一帧");
                game.init();
            }
            if (fid == gameFrame - 1) {
                if (!isPlayed) {
                    isPlayed = true;
                    start.left = 0;
                    start.top = 121;
                    slot.alpha = 0;
                    if (stoneArray.length > 0)
                        game.end();
                    game.play();
                }
            }
            if (fid == gameFrame) {
                game.runCheck();
            }
            if (fid == successFrame || fid == failFrame) {
                game.end();
            }
        });
    });
});

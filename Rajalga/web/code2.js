gdjs.info1Code = {};
gdjs.info1Code.localVariables = [];
gdjs.info1Code.idToCallbackMap = new Map();
gdjs.info1Code.GDinfo1Objects1= [];
gdjs.info1Code.GDinfo1Objects2= [];
gdjs.info1Code.GDinfo2Objects1= [];
gdjs.info1Code.GDinfo2Objects2= [];
gdjs.info1Code.GDinfo3Objects1= [];
gdjs.info1Code.GDinfo3Objects2= [];
gdjs.info1Code.GDinfo4Objects1= [];
gdjs.info1Code.GDinfo4Objects2= [];
gdjs.info1Code.GDinfo5Objects1= [];
gdjs.info1Code.GDinfo5Objects2= [];
gdjs.info1Code.GDinfo6Objects1= [];
gdjs.info1Code.GDinfo6Objects2= [];
gdjs.info1Code.GDinfo7Objects1= [];
gdjs.info1Code.GDinfo7Objects2= [];


gdjs.info1Code.eventsList0 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "r");
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Start scene", false);
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "z");
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 150);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15076564);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide();
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 300);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14962732);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide();
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 450);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14897028);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide();
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 600);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14924020);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide();
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 750);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15001772);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide();
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 800);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(13129700);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide();
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 950);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15162844);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("info1"), gdjs.info1Code.GDinfo1Objects1);
gdjs.copyArray(runtimeScene.getObjects("info2"), gdjs.info1Code.GDinfo2Objects1);
gdjs.copyArray(runtimeScene.getObjects("info3"), gdjs.info1Code.GDinfo3Objects1);
gdjs.copyArray(runtimeScene.getObjects("info4"), gdjs.info1Code.GDinfo4Objects1);
gdjs.copyArray(runtimeScene.getObjects("info5"), gdjs.info1Code.GDinfo5Objects1);
gdjs.copyArray(runtimeScene.getObjects("info6"), gdjs.info1Code.GDinfo6Objects1);
gdjs.copyArray(runtimeScene.getObjects("info7"), gdjs.info1Code.GDinfo7Objects1);
{for(var i = 0, len = gdjs.info1Code.GDinfo1Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo2Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo3Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo4Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo4Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo5Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo5Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo6Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo6Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.info1Code.GDinfo7Objects1.length ;i < len;++i) {
    gdjs.info1Code.GDinfo7Objects1[i].hide(false);
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
{
elseEventsChainSatisfied = true;
}

}


};

gdjs.info1Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.info1Code.GDinfo1Objects1.length = 0;
gdjs.info1Code.GDinfo1Objects2.length = 0;
gdjs.info1Code.GDinfo2Objects1.length = 0;
gdjs.info1Code.GDinfo2Objects2.length = 0;
gdjs.info1Code.GDinfo3Objects1.length = 0;
gdjs.info1Code.GDinfo3Objects2.length = 0;
gdjs.info1Code.GDinfo4Objects1.length = 0;
gdjs.info1Code.GDinfo4Objects2.length = 0;
gdjs.info1Code.GDinfo5Objects1.length = 0;
gdjs.info1Code.GDinfo5Objects2.length = 0;
gdjs.info1Code.GDinfo6Objects1.length = 0;
gdjs.info1Code.GDinfo6Objects2.length = 0;
gdjs.info1Code.GDinfo7Objects1.length = 0;
gdjs.info1Code.GDinfo7Objects2.length = 0;

gdjs.info1Code.eventsList0(runtimeScene);
gdjs.info1Code.GDinfo1Objects1.length = 0;
gdjs.info1Code.GDinfo1Objects2.length = 0;
gdjs.info1Code.GDinfo2Objects1.length = 0;
gdjs.info1Code.GDinfo2Objects2.length = 0;
gdjs.info1Code.GDinfo3Objects1.length = 0;
gdjs.info1Code.GDinfo3Objects2.length = 0;
gdjs.info1Code.GDinfo4Objects1.length = 0;
gdjs.info1Code.GDinfo4Objects2.length = 0;
gdjs.info1Code.GDinfo5Objects1.length = 0;
gdjs.info1Code.GDinfo5Objects2.length = 0;
gdjs.info1Code.GDinfo6Objects1.length = 0;
gdjs.info1Code.GDinfo6Objects2.length = 0;
gdjs.info1Code.GDinfo7Objects1.length = 0;
gdjs.info1Code.GDinfo7Objects2.length = 0;


return;

}

gdjs['info1Code'] = gdjs.info1Code;

gdjs.finCode = {};
gdjs.finCode.localVariables = [];
gdjs.finCode.idToCallbackMap = new Map();
gdjs.finCode.GDfin1Objects1= [];
gdjs.finCode.GDfin1Objects2= [];
gdjs.finCode.GDfin2Objects1= [];
gdjs.finCode.GDfin2Objects2= [];
gdjs.finCode.GDfin3Objects1= [];
gdjs.finCode.GDfin3Objects2= [];
gdjs.finCode.GDfin4Objects1= [];
gdjs.finCode.GDfin4Objects2= [];


gdjs.finCode.eventsList0 = function(runtimeScene) {

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
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("fin1"), gdjs.finCode.GDfin1Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin2"), gdjs.finCode.GDfin2Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin3"), gdjs.finCode.GDfin3Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin4"), gdjs.finCode.GDfin4Objects1);
{for(var i = 0, len = gdjs.finCode.GDfin1Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin1Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.finCode.GDfin2Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin3Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin4Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin4Objects1[i].hide();
}
}
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(0);
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "w");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() == 0);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(11871980);
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("fin1"), gdjs.finCode.GDfin1Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin2"), gdjs.finCode.GDfin2Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin3"), gdjs.finCode.GDfin3Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin4"), gdjs.finCode.GDfin4Objects1);
{for(var i = 0, len = gdjs.finCode.GDfin1Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin2Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin2Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.finCode.GDfin3Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin4Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin4Objects1[i].hide();
}
}
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(1);
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "s");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() == 1);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(12216956);
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("fin1"), gdjs.finCode.GDfin1Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin2"), gdjs.finCode.GDfin2Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin3"), gdjs.finCode.GDfin3Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin4"), gdjs.finCode.GDfin4Objects1);
{for(var i = 0, len = gdjs.finCode.GDfin1Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin2Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin3Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin3Objects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.finCode.GDfin4Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin4Objects1[i].hide();
}
}
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(2);
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "a");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() == 2);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(7639828);
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("fin1"), gdjs.finCode.GDfin1Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin2"), gdjs.finCode.GDfin2Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin3"), gdjs.finCode.GDfin3Objects1);
gdjs.copyArray(runtimeScene.getObjects("fin4"), gdjs.finCode.GDfin4Objects1);
{for(var i = 0, len = gdjs.finCode.GDfin1Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin1Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin2Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin2Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin3Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin3Objects1[i].hide();
}
}
{for(var i = 0, len = gdjs.finCode.GDfin4Objects1.length ;i < len;++i) {
    gdjs.finCode.GDfin4Objects1[i].hide(false);
}
}
elseEventsChainSatisfied = true;
}

}


};

gdjs.finCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.finCode.GDfin1Objects1.length = 0;
gdjs.finCode.GDfin1Objects2.length = 0;
gdjs.finCode.GDfin2Objects1.length = 0;
gdjs.finCode.GDfin2Objects2.length = 0;
gdjs.finCode.GDfin3Objects1.length = 0;
gdjs.finCode.GDfin3Objects2.length = 0;
gdjs.finCode.GDfin4Objects1.length = 0;
gdjs.finCode.GDfin4Objects2.length = 0;

gdjs.finCode.eventsList0(runtimeScene);
gdjs.finCode.GDfin1Objects1.length = 0;
gdjs.finCode.GDfin1Objects2.length = 0;
gdjs.finCode.GDfin2Objects1.length = 0;
gdjs.finCode.GDfin2Objects2.length = 0;
gdjs.finCode.GDfin3Objects1.length = 0;
gdjs.finCode.GDfin3Objects2.length = 0;
gdjs.finCode.GDfin4Objects1.length = 0;
gdjs.finCode.GDfin4Objects2.length = 0;


return;

}

gdjs['finCode'] = gdjs.finCode;

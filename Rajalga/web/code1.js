gdjs.Game_32SceneCode = {};
gdjs.Game_32SceneCode.localVariables = [];
gdjs.Game_32SceneCode.idToCallbackMap = new Map();
gdjs.Game_32SceneCode.GDPlayerObjects1= [];
gdjs.Game_32SceneCode.GDPlayerObjects2= [];
gdjs.Game_32SceneCode.GDbaseObjects1= [];
gdjs.Game_32SceneCode.GDbaseObjects2= [];
gdjs.Game_32SceneCode.GDalgueObjects1= [];
gdjs.Game_32SceneCode.GDalgueObjects2= [];
gdjs.Game_32SceneCode.GDbordObjects1= [];
gdjs.Game_32SceneCode.GDbordObjects2= [];
gdjs.Game_32SceneCode.GDaffichageObjects1= [];
gdjs.Game_32SceneCode.GDaffichageObjects2= [];
gdjs.Game_32SceneCode.GDfondObjects1= [];
gdjs.Game_32SceneCode.GDfondObjects2= [];
gdjs.Game_32SceneCode.GDeolienneObjects1= [];
gdjs.Game_32SceneCode.GDeolienneObjects2= [];
gdjs.Game_32SceneCode.GDaffFinObjects1= [];
gdjs.Game_32SceneCode.GDaffFinObjects2= [];
gdjs.Game_32SceneCode.GDbaseFinObjects1= [];
gdjs.Game_32SceneCode.GDbaseFinObjects2= [];
gdjs.Game_32SceneCode.GDalgueMorteObjects1= [];
gdjs.Game_32SceneCode.GDalgueMorteObjects2= [];


gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects2Objects = Hashtable.newFrom({"algue": gdjs.Game_32SceneCode.GDalgueObjects2});
gdjs.Game_32SceneCode.eventsList0 = function(runtimeScene) {

};gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Game_32SceneCode.GDPlayerObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects = Hashtable.newFrom({"algue": gdjs.Game_32SceneCode.GDalgueObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects = Hashtable.newFrom({"algue": gdjs.Game_32SceneCode.GDalgueObjects1});
gdjs.Game_32SceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() < 1000);
}
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDalgueObjects1 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDalgueObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDalgueObjects1[i].deleteFromScene(runtimeScene);
}
}
{gdjs.evtTools.object.createObjectOnScene(runtimeScene, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects, 50, gdjs.random(990), "");
}
{runtimeScene.getGame().getVariables().getFromIndex(0).add(50);
}
elseEventsChainSatisfied = true;
}

}


};gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Game_32SceneCode.GDPlayerObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDbordObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDeolienneObjects1Objects = Hashtable.newFrom({"base": gdjs.Game_32SceneCode.GDbaseObjects1, "bord": gdjs.Game_32SceneCode.GDbordObjects1, "eolienne": gdjs.Game_32SceneCode.GDeolienneObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDbordObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDeolienneObjects1Objects = Hashtable.newFrom({"base": gdjs.Game_32SceneCode.GDbaseObjects1, "bord": gdjs.Game_32SceneCode.GDbordObjects1, "eolienne": gdjs.Game_32SceneCode.GDeolienneObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects = Hashtable.newFrom({"algue": gdjs.Game_32SceneCode.GDalgueObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDbordObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDeolienneObjects1Objects = Hashtable.newFrom({"base": gdjs.Game_32SceneCode.GDbaseObjects1, "bord": gdjs.Game_32SceneCode.GDbordObjects1, "eolienne": gdjs.Game_32SceneCode.GDeolienneObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects = Hashtable.newFrom({"algue": gdjs.Game_32SceneCode.GDalgueObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Game_32SceneCode.GDPlayerObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseFinObjects1Objects = Hashtable.newFrom({"baseFin": gdjs.Game_32SceneCode.GDbaseFinObjects1});
gdjs.Game_32SceneCode.eventsList2 = function(runtimeScene) {

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


const repeatCount2 = 15;
for (let repeatIndex2 = 0;repeatIndex2 < repeatCount2;++repeatIndex2) {
gdjs.copyArray(runtimeScene.getObjects("affFin"), gdjs.Game_32SceneCode.GDaffFinObjects2);
gdjs.copyArray(runtimeScene.getObjects("base"), gdjs.Game_32SceneCode.GDbaseObjects2);
gdjs.copyArray(runtimeScene.getObjects("baseFin"), gdjs.Game_32SceneCode.GDbaseFinObjects2);
gdjs.copyArray(runtimeScene.getObjects("bord"), gdjs.Game_32SceneCode.GDbordObjects2);
gdjs.Game_32SceneCode.GDalgueObjects2.length = 0;


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0)
{
{gdjs.evtTools.object.createObjectOnScene(runtimeScene, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects2Objects, gdjs.random(2000), gdjs.random(1675), "");
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDbordObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDbordObjects2[i].hide();
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDbaseFinObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDbaseFinObjects2[i].hide();
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDbaseObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDbaseObjects2[i].hide(false);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDaffFinObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDaffFinObjects2[i].hide();
}
}
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("algue"), gdjs.Game_32SceneCode.GDalgueObjects1);
{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(0);
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDalgueObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDalgueObjects1[i].resetTimer("Direction");
}
}
elseEventsChainSatisfied = true;
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("algue"), gdjs.Game_32SceneCode.GDalgueObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {

{ //Subevents
gdjs.Game_32SceneCode.eventsList1(runtimeScene);} //End of subevents
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("affichage"), gdjs.Game_32SceneCode.GDaffichageObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDaffichageObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDaffichageObjects1[i].getBehavior("Text").setText("Récupéré : " + gdjs.evtTools.common.toString(runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber()) + "kg");
}
}
elseEventsChainSatisfied = true;
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("base"), gdjs.Game_32SceneCode.GDbaseObjects1);
gdjs.copyArray(runtimeScene.getObjects("bord"), gdjs.Game_32SceneCode.GDbordObjects1);
gdjs.copyArray(runtimeScene.getObjects("eolienne"), gdjs.Game_32SceneCode.GDeolienneObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDbordObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDeolienneObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDPlayerObjects1 */
/* Reuse gdjs.Game_32SceneCode.GDbaseObjects1 */
/* Reuse gdjs.Game_32SceneCode.GDbordObjects1 */
/* Reuse gdjs.Game_32SceneCode.GDeolienneObjects1 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerObjects1[i].rotateTowardAngle((gdjs.Game_32SceneCode.GDPlayerObjects1[i].getAngle()) + 180, 1, runtimeScene);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerObjects1[i].separateFromObjectsList(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDbordObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDeolienneObjects1Objects, false);
}
}
elseEventsChainSatisfied = true;
}

}


{

gdjs.copyArray(runtimeScene.getObjects("algue"), gdjs.Game_32SceneCode.GDalgueObjects1);
gdjs.copyArray(runtimeScene.getObjects("base"), gdjs.Game_32SceneCode.GDbaseObjects1);
gdjs.copyArray(runtimeScene.getObjects("bord"), gdjs.Game_32SceneCode.GDbordObjects1);
gdjs.copyArray(runtimeScene.getObjects("eolienne"), gdjs.Game_32SceneCode.GDeolienneObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDbordObjects1ObjectsGDgdjs_9546Game_959532SceneCode_9546GDeolienneObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDalgueObjects1 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDalgueObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDalgueObjects1[i].deleteFromScene(runtimeScene);
}
}
{gdjs.evtTools.object.createObjectOnScene(runtimeScene, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDalgueObjects1Objects, 50, gdjs.random(990), "");
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDalgueObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDalgueObjects1[i].resetTimer("Direction");
}
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() == 1000);
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("affFin"), gdjs.Game_32SceneCode.GDaffFinObjects1);
gdjs.copyArray(runtimeScene.getObjects("base"), gdjs.Game_32SceneCode.GDbaseObjects1);
gdjs.copyArray(runtimeScene.getObjects("baseFin"), gdjs.Game_32SceneCode.GDbaseFinObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDaffFinObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDaffFinObjects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDbaseObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDbaseObjects1[i].hide();
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDbaseFinObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDbaseFinObjects1[i].hide(false);
}
}
elseEventsChainSatisfied = true;
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);
gdjs.copyArray(runtimeScene.getObjects("baseFin"), gdjs.Game_32SceneCode.GDbaseFinObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDbaseFinObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber() >= 1000);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "fin", false);
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15238860);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(8424468);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(12877692);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(12877852);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(8388244);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(15015460);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
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
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14887404);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "info1");
}
elseEventsChainSatisfied = true;
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("algue"), gdjs.Game_32SceneCode.GDalgueObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDalgueObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDalgueObjects1[i].addForce(50, 0, 0);
}
}
elseEventsChainSatisfied = true;
}

}


};

gdjs.Game_32SceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32SceneCode.GDPlayerObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects2.length = 0;
gdjs.Game_32SceneCode.GDbaseObjects1.length = 0;
gdjs.Game_32SceneCode.GDbaseObjects2.length = 0;
gdjs.Game_32SceneCode.GDalgueObjects1.length = 0;
gdjs.Game_32SceneCode.GDalgueObjects2.length = 0;
gdjs.Game_32SceneCode.GDbordObjects1.length = 0;
gdjs.Game_32SceneCode.GDbordObjects2.length = 0;
gdjs.Game_32SceneCode.GDaffichageObjects1.length = 0;
gdjs.Game_32SceneCode.GDaffichageObjects2.length = 0;
gdjs.Game_32SceneCode.GDfondObjects1.length = 0;
gdjs.Game_32SceneCode.GDfondObjects2.length = 0;
gdjs.Game_32SceneCode.GDeolienneObjects1.length = 0;
gdjs.Game_32SceneCode.GDeolienneObjects2.length = 0;
gdjs.Game_32SceneCode.GDaffFinObjects1.length = 0;
gdjs.Game_32SceneCode.GDaffFinObjects2.length = 0;
gdjs.Game_32SceneCode.GDbaseFinObjects1.length = 0;
gdjs.Game_32SceneCode.GDbaseFinObjects2.length = 0;
gdjs.Game_32SceneCode.GDalgueMorteObjects1.length = 0;
gdjs.Game_32SceneCode.GDalgueMorteObjects2.length = 0;

gdjs.Game_32SceneCode.eventsList2(runtimeScene);
gdjs.Game_32SceneCode.GDPlayerObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects2.length = 0;
gdjs.Game_32SceneCode.GDbaseObjects1.length = 0;
gdjs.Game_32SceneCode.GDbaseObjects2.length = 0;
gdjs.Game_32SceneCode.GDalgueObjects1.length = 0;
gdjs.Game_32SceneCode.GDalgueObjects2.length = 0;
gdjs.Game_32SceneCode.GDbordObjects1.length = 0;
gdjs.Game_32SceneCode.GDbordObjects2.length = 0;
gdjs.Game_32SceneCode.GDaffichageObjects1.length = 0;
gdjs.Game_32SceneCode.GDaffichageObjects2.length = 0;
gdjs.Game_32SceneCode.GDfondObjects1.length = 0;
gdjs.Game_32SceneCode.GDfondObjects2.length = 0;
gdjs.Game_32SceneCode.GDeolienneObjects1.length = 0;
gdjs.Game_32SceneCode.GDeolienneObjects2.length = 0;
gdjs.Game_32SceneCode.GDaffFinObjects1.length = 0;
gdjs.Game_32SceneCode.GDaffFinObjects2.length = 0;
gdjs.Game_32SceneCode.GDbaseFinObjects1.length = 0;
gdjs.Game_32SceneCode.GDbaseFinObjects2.length = 0;
gdjs.Game_32SceneCode.GDalgueMorteObjects1.length = 0;
gdjs.Game_32SceneCode.GDalgueMorteObjects2.length = 0;


return;

}

gdjs['Game_32SceneCode'] = gdjs.Game_32SceneCode;

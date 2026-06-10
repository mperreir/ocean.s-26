gdjs.Start_32sceneCode = {};
gdjs.Start_32sceneCode.localVariables = [];
gdjs.Start_32sceneCode.idToCallbackMap = new Map();
gdjs.Start_32sceneCode.GDStart_9595pushedObjects1= [];
gdjs.Start_32sceneCode.GDStart_9595pushedObjects2= [];
gdjs.Start_32sceneCode.GDStart_9595pushedObjects3= [];
gdjs.Start_32sceneCode.GDstartObjects1= [];
gdjs.Start_32sceneCode.GDstartObjects2= [];
gdjs.Start_32sceneCode.GDstartObjects3= [];


gdjs.Start_32sceneCode.asyncCallback15217548 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Start_32sceneCode.localVariables);
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game Scene", false);
}
gdjs.Start_32sceneCode.localVariables.length = 0;
}
gdjs.Start_32sceneCode.idToCallbackMap.set(15217548, gdjs.Start_32sceneCode.asyncCallback15217548);
gdjs.Start_32sceneCode.eventsList0 = function(runtimeScene, asyncObjectsList) {

{


{
const parentAsyncObjectsList = asyncObjectsList;
{
const asyncObjectsList = gdjs.LongLivedObjectsList.from(parentAsyncObjectsList);
asyncObjectsList.backupLocalVariablesContainers(gdjs.Start_32sceneCode.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.Start_32sceneCode.asyncCallback15217548(runtimeScene, asyncObjectsList)), 15217548, asyncObjectsList);
}
}

}


};gdjs.Start_32sceneCode.asyncCallback15217332 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Start_32sceneCode.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Start_pushed"), gdjs.Start_32sceneCode.GDStart_9595pushedObjects2);

gdjs.copyArray(asyncObjectsList.getObjects("start"), gdjs.Start_32sceneCode.GDstartObjects2);

{for(var i = 0, len = gdjs.Start_32sceneCode.GDStart_9595pushedObjects2.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDStart_9595pushedObjects2[i].hide();
}
}
{for(var i = 0, len = gdjs.Start_32sceneCode.GDstartObjects2.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDstartObjects2[i].hide(false);
}
}

{ //Subevents
gdjs.Start_32sceneCode.eventsList0(runtimeScene, asyncObjectsList);} //End of subevents
gdjs.Start_32sceneCode.localVariables.length = 0;
}
gdjs.Start_32sceneCode.idToCallbackMap.set(15217332, gdjs.Start_32sceneCode.asyncCallback15217332);
gdjs.Start_32sceneCode.eventsList1 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.Start_32sceneCode.localVariables);
for (const obj of gdjs.Start_32sceneCode.GDStart_9595pushedObjects1) asyncObjectsList.addObject("Start_pushed", obj);
for (const obj of gdjs.Start_32sceneCode.GDstartObjects1) asyncObjectsList.addObject("start", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.Start_32sceneCode.asyncCallback15217332(runtimeScene, asyncObjectsList)), 15217332, asyncObjectsList);
}
}

}


};gdjs.Start_32sceneCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Start_pushed"), gdjs.Start_32sceneCode.GDStart_9595pushedObjects1);
gdjs.copyArray(runtimeScene.getObjects("start"), gdjs.Start_32sceneCode.GDstartObjects1);
{for(var i = 0, len = gdjs.Start_32sceneCode.GDStart_9595pushedObjects1.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDStart_9595pushedObjects1[i].hide();
}
}
{for(var i = 0, len = gdjs.Start_32sceneCode.GDstartObjects1.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDstartObjects1[i].hide(false);
}
}
{for(var i = 0, len = gdjs.Start_32sceneCode.GDstartObjects1.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDstartObjects1[i].resetTimer("start");
}
}
elseEventsChainSatisfied = true;
}

}


{

gdjs.copyArray(runtimeScene.getObjects("start"), gdjs.Start_32sceneCode.GDstartObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "r");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Start_32sceneCode.GDstartObjects1.length;i<l;++i) {
    if ( gdjs.Start_32sceneCode.GDstartObjects1[i].getTimerElapsedTimeInSecondsOrNaN("start") >= 2 ) {
        isConditionTrue_0 = true;
        gdjs.Start_32sceneCode.GDstartObjects1[k] = gdjs.Start_32sceneCode.GDstartObjects1[i];
        ++k;
    }
}
gdjs.Start_32sceneCode.GDstartObjects1.length = k;
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Start_pushed"), gdjs.Start_32sceneCode.GDStart_9595pushedObjects1);
/* Reuse gdjs.Start_32sceneCode.GDstartObjects1 */
{for(var i = 0, len = gdjs.Start_32sceneCode.GDstartObjects1.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDstartObjects1[i].hide();
}
}
{for(var i = 0, len = gdjs.Start_32sceneCode.GDStart_9595pushedObjects1.length ;i < len;++i) {
    gdjs.Start_32sceneCode.GDStart_9595pushedObjects1[i].hide(false);
}
}

{ //Subevents
gdjs.Start_32sceneCode.eventsList1(runtimeScene);} //End of subevents
elseEventsChainSatisfied = true;
}

}


};

gdjs.Start_32sceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Start_32sceneCode.GDStart_9595pushedObjects1.length = 0;
gdjs.Start_32sceneCode.GDStart_9595pushedObjects2.length = 0;
gdjs.Start_32sceneCode.GDStart_9595pushedObjects3.length = 0;
gdjs.Start_32sceneCode.GDstartObjects1.length = 0;
gdjs.Start_32sceneCode.GDstartObjects2.length = 0;
gdjs.Start_32sceneCode.GDstartObjects3.length = 0;

gdjs.Start_32sceneCode.eventsList2(runtimeScene);
gdjs.Start_32sceneCode.GDStart_9595pushedObjects1.length = 0;
gdjs.Start_32sceneCode.GDStart_9595pushedObjects2.length = 0;
gdjs.Start_32sceneCode.GDStart_9595pushedObjects3.length = 0;
gdjs.Start_32sceneCode.GDstartObjects1.length = 0;
gdjs.Start_32sceneCode.GDstartObjects2.length = 0;
gdjs.Start_32sceneCode.GDstartObjects3.length = 0;


return;

}

gdjs['Start_32sceneCode'] = gdjs.Start_32sceneCode;

import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import './style.css'

const canvas = document.getElementById('canvas');

// 创建引擎， 第二个参数为抗锯齿
const engine = new BABYLON.Engine(canvas, true)

// 创建场景
const scene = new BABYLON.Scene(engine)

/**
 * 创建相机
 * @name 名字
 * @alpha 相机的 alpha 值，水平旋转角度
 * @beta  相机的 bata 值，垂直旋转角度
 * @radius 相机的半径
 * @target 相机的目标点
 * @scene 相机所在的场景
 */
// const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 0, BABYLON.Vector3.Zero(), scene)
const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, -5, 0), scene)

camera.lowerRadiusLimit = 4;
camera.upperRadiusLimit = 32;
camera.wheelDeltaPercentage = 0.01;

// 设置相机的位置
camera.setPosition(new BABYLON.Vector3(0, 5, 10))

// zoom 速度
camera.wheelPrecision = 1.8;

// 将相机的目标指向场景的原点
camera.setTarget(BABYLON.Vector3.Zero());

// 把相机附加到画布上, true 阻止默认操作
camera.attachControl(canvas, true)

const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.6;
light.specular = BABYLON.Color3.Black();

const light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
light2.position = new BABYLON.Vector3(0, 5, 5);

const light3 = new BABYLON.HemisphericLight(
    'light',  //光源的名称
    new BABYLON.Vector3(0, -1, 0),  //光源的方向
    scene //光源所在的场景
)
light3.intensity = 0.36

// // 去掉默认的背景颜色
// // scene.clearColor = new BABYLON.Color4(1, 0, 0, 0);

const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("models/b", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

const ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, scene);
const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("models/wood.jpg", scene);
groundMaterial.diffuseTexture.uScale = 30;
groundMaterial.diffuseTexture.vScale = 30;
groundMaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
ground.material = groundMaterial;

// 隐藏 loading 画面
BABYLON.SceneLoader.ShowLoadingScreen = false

BABYLON.SceneLoader.Append('models/', 'yizi.glb', scene, (glb) => {
    console.log(glb)
}, null)

// 渲染场景
engine.runRenderLoop(() => {
    scene.render()
})

// 监听尺寸更改
window.addEventListener('resize', function() {
    engine.resize()
})
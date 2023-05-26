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
const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 0, BABYLON.Vector3.Zero(), scene)

// 设置相机的位置
camera.setPosition(new BABYLON.Vector3(0, 5, 10))

// 将相机的目标指向场景的原点
camera.setTarget(BABYLON.Vector3.Zero());

// 把相机附加到画布上, true 阻止默认操作
camera.attachControl(canvas, true)

// 顶部球形光
const hemisphericLight1 = new BABYLON.HemisphericLight(
    'light',  //光源的名称
    new BABYLON.Vector3(1, 1, 0),  //光源的方向
    scene //光源所在的场景
)

// 底部球形光
const hemisphericLight2 = new BABYLON.HemisphericLight(
    'light',  //光源的名称
    new BABYLON.Vector3(1, -1, 0),  //光源的方向
    scene //光源所在的场景
)
hemisphericLight2.intensity = 0.72

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
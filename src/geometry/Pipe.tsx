import {useEffect, useState} from 'react'
import * as THREE from 'three'
import {render} from 'react-dom';
import {func} from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {
    BufferAttribute,
    BufferGeometry,
    CatmullRomCurve3,
    CircleGeometry, DoubleSide,
    FrontSide,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial, MeshLambertMaterial, TubeGeometry, Vector3
} from 'three';

function Pipe() {
    useEffect(() => {
        const scene = new THREE.Scene();
        /** 相机设置 */
        const width = window.innerWidth; //窗口宽度
        const height = window.innerHeight; //窗口高度
        const k = width / height; //窗口宽高比
        const s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
        const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(0, 0, 500); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /** 创建渲染器对象 */
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
// renderer.setClearColor(0x888888, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
// 创建光源
// 环境光，没有特定的方向
        const ambientLight = new THREE.AmbientLight(0x444444)
        scene.add(ambientLight)
// 平行光，类似于生活中的太阳光
        const directionalLight = new THREE.DirectionalLight(0xabcdef, 1)
        directionalLight.position.set(400, 300, 500)
        scene.add(directionalLight)

        function render(){
            renderer.render(scene, camera); //执行渲染操作
        }
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.addEventListener("change", () => {
            render()
        }); //监听鼠标、键盘事件


// 从一系列的点中，创建一个平滑的三维样条曲线
        const curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -40, 0 ),
            new THREE.Vector3( -10, 10 ),
            new THREE.Vector3( 0, 0 ),
            new THREE.Vector3( 10, -10 ),
            new THREE.Vector3( 40, 0 )
        ] );
        const geometry = new THREE.TubeGeometry( curve, 30, 20, 30, true );
        const material = new THREE.MeshLambertMaterial( {
            color: 0xabcd33,
            side:THREE.DoubleSide
        } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        const points = curve.getPoints( 50 );
        // 创建一个顶点缓冲几何体
        const geometry2 = new THREE.BufferGeometry().setFromPoints( points );
        // 线条渲染模式
        const material2 = new THREE.LineBasicMaterial({
            color: 0xff0000, //线条颜色
        });
        const line = new THREE.Line( geometry2, material2 );
        scene.add(line)

        render()
    }, [])

    return (<div className="App"></div>)
}

export default Pipe

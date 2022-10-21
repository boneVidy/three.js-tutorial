import {useEffect, useState} from 'react'
import * as THREE from 'three'
import {render} from 'react-dom';
import {func} from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {
    AmbientLight,
    BufferAttribute,
    BufferGeometry,
    CircleGeometry, CylinderGeometry,
    DirectionalLight, DoubleSide,
    FrontSide,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial, MeshLambertMaterial
} from 'three';

function Cylinder() {
    useEffect(() => {
        /** 创建场景 */
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


        function render() {
            renderer.render(scene, camera); //执行渲染操作
        }

        const ambientLight = new AmbientLight(0x444444);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0xabcdef, 1);
        directionalLight.position.set(400,300,500);
        scene.add(directionalLight);
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.addEventListener('change', () => {
            render()
        }); //监听鼠标、键盘事件

        const cylinderGeometry = new CylinderGeometry(0,100,150,600);
        const meshLambertMaterial = new MeshLambertMaterial({
            color: 0xabcd33,
            side: DoubleSide
        });
        const cube = new Mesh(cylinderGeometry, meshLambertMaterial);
        cube.position.x = 100;
        cube.position.y = 3;
        scene.add(cube);

        render()
    }, [])

    return (<div className="App"></div>)
}

export default Cylinder

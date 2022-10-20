import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { render } from 'react-dom';
import { func } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
    BufferAttribute, BufferGeometry, CircleGeometry, FrontSide, Line, LineBasicMaterial, Mesh, MeshBasicMaterial
} from 'three';

function LineApp() {
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

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.addEventListener('change', () => {
            render()
        }); //监听鼠标、键盘事件

// 创建一个顶点缓冲几何体
        const geometry = new THREE.BufferGeometry()
        const vertices = new Float32Array([50, 50, 0, // 第一个点坐标
            50, -50, 0, // 第二个点坐标
            -50, -50, 0, // 第三个点坐标
            -50, 50, 0 // 第四个点坐标
        ])
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 线条渲染模式
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff, //线条颜色
        });
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
        const cube = new THREE.Line(geometry, material);
// 把物体添加进场景中
        scene.add(cube);


        const circleGeometry = new CircleGeometry(100,99);
        const circleMaterial = new MeshBasicMaterial({
            color: 0xffffff,
            // side: FrontSide
        })
        const circle = new Mesh(circleGeometry, circleMaterial);
        scene.add(circle);

        render()
    }, [])

    return (<div className="App"></div>)
}

export default LineApp

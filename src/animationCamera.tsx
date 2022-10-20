import {useEffect, useState} from 'react'
import * as THREE from 'three'
import { render } from 'react-dom';
import { func } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';

function AnimationCamera() {
  useEffect(() => {
      /** 创建场景 */
      const scene = new THREE.Scene();

      // 创建一个立方缓冲几何体
      const geometry = new THREE.BoxGeometry(100,100,100);
      // 创建材质
      const material = new THREE.MeshLambertMaterial({color: 0xffffff});
      // 生成带有材质的物体
      const cube = new THREE.Mesh(geometry, material);
      // 把物体添加进场景中
      scene.add(cube);

      //创建光源
      // 环境光
      const ambientLight = new THREE.AmbientLight(0x4444);
      scene.add(ambientLight);

      // 平行光
      const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
      directionalLight.position.set(400, 200, 300);
      scene.add(directionalLight);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const k = width/height;//窗口宽高比
      const s = 200;//三维场景显示范围控制系数，系数越大，显示的范围越大

      /** 相机设置 */
      //创建相机对象
      const camera = new THREE.OrthographicCamera(-s*k,s*k, s, -s, 1, 1000);
      //设置相机位置
      // camera.position.set(95,0,-178);
      camera.position.set(0,0,500);
      //设置相机方向(指向的场景对象)
      camera.lookAt(scene.position);

    // 相机的初始位置
      let x = 0
      let z = 0
    // 相机绕半径移动
      const r = 200
      /** 创建渲染器对象 */
      let angle = 0
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      const animation = () => {
          requestAnimationFrame(
              () => {
                  angle --;
                  const cameraX = x+  r* Math.cos(angle * Math.PI/ 180);
                  const cameraZ = z +  r* Math.sin(angle * Math.PI/ 180);
                  camera.position.set(cameraX, 0, cameraZ);
                  camera.lookAt(scene.position);
                  render();
                  animation()
              }
          )
      }

      // 设置一个单位向量,该向量是正y轴方向
      // const axis = new THREE.Vector3(0,1,0);
      // cube.rotateZ(Math.PI / 4)
      // const animation = () => {
      //     requestAnimationFrame(() => {
      //         cube.rotateOnWorldAxis(axis, Math.PI / 180);
      //         // cube.rotateZ(Math.PI / 4)
      //         // cube.rotateOnAxis(axis, Math.PI / 180)
      //         render();
      //         animation();
      //     })
      // }
      document.body.append(renderer.domElement);
      function render () {
          renderer.render(scene, camera);

      }
      animation();
  }, [])

  return (
    <div className="App"></div>
  )
}

export default AnimationCamera

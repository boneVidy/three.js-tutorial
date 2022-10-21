import {useEffect, useState} from 'react'
import * as THREE from 'three'

function App() {
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
      const directinalLight = new THREE.DirectionalLight(0xff0000, 1);
      directinalLight.position.set(400, 200, 300);
      scene.add(directinalLight);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const k = width/height;//窗口宽高比
      const s = 200;//三维场景显示范围控制系数，系数越大，显示的范围越大

      /** 相机设置 */
      //创建相机对象
      const camera = new THREE.OrthographicCamera(-s*k,s*k, s, -s, 1, 1000);
      //设置相机位置
      camera.position.set(400, 200, 300);
      //设置相机方向(指向的场景对象)
      camera.lookAt(scene.position);


      /** 创建渲染器对象 */
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      document.body.append(renderer.domElement);
      renderer.render(scene, camera);
  }, [])

  return (
    <div className="App"></div>
  )
}

export default App

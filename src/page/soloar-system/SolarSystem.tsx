import BK from './assets/天空盒/BK.jpg'
import DN from './assets/天空盒/DN.jpg'
import FR from './assets/天空盒/FR.jpg'
import LF from './assets/天空盒/LF.jpg'
import RT from './assets/天空盒/RT.jpg'
import UP from './assets/天空盒/UP.jpg'

import 太阳 from './assets/太阳.jpeg'
import 水星 from './assets/水星.png'
import 金星 from './assets/金星.png'
import 地球 from './assets/地球.png'
import 月球 from './assets/月球.jpeg'
import 火星 from './assets/火星.png'
import 木星 from './assets/木星.png'
import 土星 from './assets/土星.png'
import 天王星 from './assets/天王星.png'
import 海王星 from './assets/海王星.png'
import {useEffect} from "react";
import {
    CubeTexture,
    CubeTextureLoader,
    Group, Mesh, MeshBasicMaterial, MeshLambertMaterial,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {render} from "react-dom";
function SolarSystem () {
    useEffect(() => {
        const CUBE_FILES = [
            BK, DN, FR, LF,RT, UP
        ];
        const scene = new Scene();
        scene.background = new CubeTextureLoader().load(CUBE_FILES);


        // 相机设置
        const width = window.innerWidth;
        const height = window.innerHeight;
        const k = width/ height;

        const perspectiveCamera = new PerspectiveCamera(60,k, 1, 10000);
        perspectiveCamera.position.set(0,0,5000);
        perspectiveCamera.lookAt(scene.position);

        const webGLRenderer = new WebGLRenderer();
        webGLRenderer.setSize(width, height);
        document.body.appendChild(webGLRenderer.domElement);

        const orbitControls = new OrbitControls(perspectiveCamera, webGLRenderer.domElement);
        orbitControls.addEventListener('change', render);


        const loader = new TextureLoader();

        const sun = new Group();//建立一个组
        const sunParent = new Group();
        scene.add(sunParent) //把组都添加到场景里
        loader.load(太阳, (texture) => {
            const geometry = new SphereGeometry(500, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            sun.add(mesh)//添加到组里
            sunParent.add(sun)
            render()
        });

        const mercury = new Group(); //建立一个组
        const mercuryParent = new Group();
        sunParent.add(mercuryParent)
        loader.load(水星, (texture) => {
            const geometry = new SphereGeometry(25, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            mercury.position.x -= 600
            mercury.add(mesh)//添加到组里
            mercuryParent.add(mercury)
            render()
        })

        const venus = new Group();//建立一个组
        const venusParent = new Group();
        sunParent.add(venusParent)
        loader.load(金星, (texture) => {
            const geometry = new SphereGeometry(100, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            venus.position.x -= 700
            venus.add(mesh)//添加到组里
            venusParent.add(venus)
            render()
        });

        const earth = new Group();
        const earthParent = new Group();
        sunParent.add(earthParent);
        loader.load(地球, texture => {
            const sphereGeometry = new SphereGeometry(100,50,50);
            const meshBasicMaterial = new MeshBasicMaterial({map: texture});
            const mesh = new Mesh(sphereGeometry, meshBasicMaterial);
            earth.position.x -= 900;
            earth.add(mesh);
            earthParent.add(earth);
            render();
        })


        const moon = new Group();//建立一个组
        const moonParent = new Group();
        earth.add(moonParent)
        loader.load(月球, (texture) => {
            const geometry = new SphereGeometry(30, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            moon.position.x -= 150
            moon.add(mesh)//添加到组里
            moonParent.add(moon)
            render()
        })


        const mars = new Group();//建立一个组
        const marsParent = new Group();
        sunParent.add(marsParent)
        loader.load(火星, (texture) => {
            const geometry = new SphereGeometry(85, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            mars.position.x -= 1200
            mars.add(mesh)//添加到组里
            marsParent.add(mars)
            render()
        })


        const jupiter = new Group();//建立一个组
        const jupiterParent = new Group();
        sunParent.add(jupiterParent)
        loader.load(木星, (texture) => {
            const geometry = new SphereGeometry(150, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            jupiter.position.x -= 1500
            jupiter.add(mesh)//添加到组里
            jupiterParent.add(jupiter)
            render()
        })


        const saturn = new Group();//建立一个组
        const saturnParent = new Group();
        sunParent.add(saturnParent)
        loader.load(土星, (texture) => {
            const geometry = new SphereGeometry(120, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            saturn.position.x -= 1800
            saturn.add(mesh)//添加到组里
            saturnParent.add(saturn)
            render()
        })

        const uranus = new Group();
        const uranusParent = new Group();
        sunParent.add(uranusParent)
        loader.load(天王星, (texture) => {
            const geometry = new SphereGeometry(50, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            uranus.position.x -= 2100
            uranus.add(mesh)//添加到组里
            uranusParent.add(uranus)
            render()
        })


        const neptune = new Group();
        const neptuneParent = new Group();
        sunParent.add(neptuneParent)
        loader.load(海王星, (texture) => {
            const geometry = new SphereGeometry(50, 50, 50) //球体模型
            const material = new MeshBasicMaterial({map: texture}) //材质 将图片解构成THREE能理解的材质
            const mesh = new Mesh(geometry, material)  //网孔对象 第一个参数是几何模型(结构),第二参数是材料(外观)
            neptune.position.x -= 2300
            neptune.add(mesh)//添加到组里
            neptuneParent.add(neptune)
            render()
        })


        function render () {
            webGLRenderer.render(scene, perspectiveCamera);
        }
        // 设置公转
        const revolution = () => {
            mercuryParent.rotation.y += 0.015
            venusParent.rotation.y += 0.0065
            earthParent.rotation.y += 0.05
            moonParent.rotation.y += 0.2
            marsParent.rotation.y += 0.03
            jupiterParent.rotation.y += 0.01
            saturnParent.rotation.y += 0.02
            uranusParent.rotation.y += 0.02
            neptuneParent.rotation.y += 0.01
        }

        //设置自转
        const selfRotation = () => {
            sun.rotation.y += 0.004
            mercury.rotation.y += 0.002
            venus.rotation.y += 0.005
            earth.rotation.y += 0.01
            moon.rotation.y += 0.01
            mars.rotation.y += 0.01
            jupiter.rotation.y += 0.08
            saturn.rotation.y += 1.5
            uranus.rotation.y += 1
            neptune.rotation.y += 0.1
        }

        const loop = () => {
            revolution();
            selfRotation();
            render();
            requestAnimationFrame(loop);

        }

        loop();

    }, [])
    return <div className="container"></div>
}


export default SolarSystem;

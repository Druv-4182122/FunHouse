import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import gsap from 'gsap'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

const pane = new Pane({ title: 'GUI Manupulation' });

// pane.registerPlugin(EssentialsPlugin) 
// const gui = new GUI()
// const donutfolder = gui.addFolder('Donut Configuration')
// donutfolder.close()

const donutFolder = pane.addFolder({
  title: 'Donut Configuration',
  expanded: false,
})


const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#EA675E')

const group = new THREE.Group()
scene.add(group)
// console.time('environment')
// const rgbeLoader = new RGBELoader()
// rgbeLoader.load('furstenstein_4k.hdr', (environmentmap) => {
    
//     environmentmap.mapping = THREE.EquirectangularReflectionMapping,
//     // environmentmap.colorSpace = THREE.SRGBColorSpace
//     scene.background = environmentmap,
//     scene.environment = environmentmap
// })
// console.timeEnd('environment')


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 10, 5)
scene.add(directionalLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.set(0, 5, 0)
scene.add(pointLight)
const textureLoader = new THREE.TextureLoader()
// const donutcolorhistory = []

const donuts = []


const torusParams = {
  radius: 0.5,
  tube: 0.1,
  radialSegments: 32,
  paused : false,
  controls: true,
  madnessMode: false,
  tubularSegments: 64,
  arc: Math.PI * 2,
//   madness: () => {
//     this.madnessMode = !this.madnessMode;
//     },

  update: function() {
    donuts.forEach(donut => {
        donut.geometry.dispose();
    
    // Create new geometry
    const newGeometry = new THREE.TorusGeometry(
      this.radius,
      this.tube,
      this.radialSegments,
      this.tubularSegments,
      this.arc
    );

    donut.geometry = newGeometry;
    
    })
  },
  randomize:() => {
    donuts.forEach(donut => {
        donut.position.x = (Math.random() - 0.5) * 10
        donut.position.y = (Math.random() - 0.5) * 10
        donut.position.z = (Math.random() - 0.5) * 10
        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI 

        const scale = Math.random() *0.5 + 0.4
        donut.scale.set(scale, scale, scale)
    })
  },
  coolers: () => {
    donuts.forEach(donut => {
        const color = new THREE.Color(Math.random(), Math.random(), Math.random());
        donut.material.color = color;
    })
  },

};

// donutfolder.add(torusParams, 'radius', 0.1, 1).step(0.01).onChange(() => torusParams.update())
// donutfolder.add(torusParams, 'tube', 0.05, 0.5).step(0.01).onChange(() => torusParams.update())
// donutfolder.add(torusParams, 'radialSegments', 3, 64).step(1).onChange(() => torusParams.update())
// donutfolder.add(torusParams, 'tubularSegments', 3, 128).step(1).onChange(() => torusParams.update())
// donutfolder.add(torusParams, 'arc', 0.1, Math.PI * 2).onChange(() => torusParams.update())

donutFolder.addBinding(torusParams, 'radius', { min: 0.1, max: 1, step: 0.01, label: 'Radius' })
    .on('change', () => {
        torusParams.update()
    });
donutFolder.addBinding(torusParams, 'tube', { min: 0.05, max: 0.5, step: 0.01, label: 'Tube' })
    .on('change', () => {
        torusParams.update()
    });
donutFolder.addBinding(torusParams, 'radialSegments', { min: 3, max: 64, step: 1, label: 'Radial Segments' })
    .on('change', () => {
        torusParams.update()
    });
donutFolder.addBinding(torusParams, 'tubularSegments', { min: 3, max: 128, step: 1, label: 'Tubular Segments' })
    .on('change', () => {
        torusParams.update()
    });
donutFolder.addBinding(torusParams, 'arc', { min: 0.1, max: Math.PI * 2, step: 0.01, label: 'Arc' })
    .on('change', () => {
        torusParams.update()
    });

// donutFolder.addBinding(torusParams, 'radius', { min: 0.1, max: 1 }).on('change', torusParams.update)
// donutFolder.addBinding(torusParams, 'tube', { min: 0.01, max: 0.4 }).on('change', torusParams.update)
// donutFolder.addBinding(torusParams, 'radialSegments', { min: 2, max: 32, step: 1 }).on('change', torusParams.update)
// donutFolder.addBinding(torusParams, 'tubularSegments', { min: 3, max: 64, step: 1 }).on('change', torusParams.update)
// donutFolder.addBinding(torusParams, 'arc', { min: 0.1, max: Math.PI * 2 }).on('change', torusParams.update)

// donutfolder.add(torusParams, 'randomize').name('Randomize Position and Rotation')
// donutfolder.add(torusParams, 'coolers').name('Randomize Color')
// donutfolder.add(torusParams, 'madness').name('Madness Mode')

donutFolder.addButton({ title: 'Randomize Donuts' }).on('click', () => {
  torusParams.randomize()
})

donutFolder.addButton({ title: 'Randomize Color' }).on('click', () => {
  torusParams.coolers()
})

donutFolder.addBinding(torusParams, 'madnessMode', { label: 'Madness Mode' })
    // .on('change', (ev) => {
    //     torusParams.madness()
    // })

// donutfolder.add(torusParams, 'paused')
//     .onChange((value) => {
//         if (value) {
//             clock.stop() 
//         } else {
//             clock.start()
//         }
//     })
//     .name('Pause Animation')

donutFolder.addBinding(torusParams, 'paused', { label: 'Pause Animation' })
    .on('change', (ev) => {
        if (ev.value) {
            clock.stop && clock.stop(); // Only call if method exists
        } else {
            clock.start && clock.start();
        }
    });

const donutSettings = { shininess: 100,
    flatShading: false,
    wireframe: false
 }
// donutfolder.add(donutSettings, 'shininess', 0, 200).name('Shininess')
//     .onChange(value => {
//         materials.forEach(mat => {
//             mat.shininess = value
//         })
//     })
// donutfolder.add(donutSettings, 'wireframe').name('Wireframe')
// .onChange(value => {
//     materials.forEach(mat => {
//         mat.wireframe = value
//     })
// })
// donutfolder.add(donutSettings, 'flatShading').name('Flat Shading')
// .onChange(value => {
//     materials.forEach(mat => {
//         mat.flatShading = value
//     })
// })
// donutfolder.add(torusParams, 'controls')
//     .onChange((value) => {
//         // Toggle orbit controls
//         controls.enabled = value
//     })
//     .name('Orbit Controls')

donutFolder.addBinding(donutSettings, 'shininess', { min: 0, max: 100, step: 1, label: 'Shininess' })
    .on('change', (ev) => {
        materials.forEach(mat => {
            mat.shininess = ev.value
        })
    })

donutFolder.addBinding(donutSettings, 'wireframe', { label: 'Wireframe' })
    .on('change', (ev) => {
        materials.forEach(mat => {
        mat.wireframe = ev.value
        })
    })

donutFolder.addBinding(donutSettings, 'flatShading', { label: 'Flat Shading' })
    .on('change', (ev) => {
        materials.forEach(mat => {
            mat.flatShading = ev.value
            mat.needsUpdate = true
        })
    })

donutFolder.addBinding(torusParams, 'controls', { label: 'Orbit Controls' })
    .on('change', (ev) => {
        controls.enabled = ev.value
    })

const donutgeometry = new THREE.TorusGeometry(
    torusParams.radius,
    torusParams.tube,
    torusParams.radialSegments,
    torusParams.tubularSegments,
    torusParams.arc
)

const materials = []

for(let i = 0; i < 100; i++) {
    const material = new THREE.MeshPhongMaterial()
    material.side = THREE.DoubleSide
    material.shininess = 100
    material.specular = new THREE.Color(0x1188ff)
    material.color = new THREE.Color(Math.random(), Math.random(), Math.random())
    
    const donut = new THREE.Mesh(donutgeometry, material)
    scene.add(donut)
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI 

    const scale = Math.random() *0.5 + 0.4
    donut.scale.set(scale, scale, scale)
    donuts.push(donut);
    materials.push(material)
    group.add(donut)
}

let textt = []
const fontloader = new FontLoader()
fontloader.load(
    'fonts/helvetiker_regular.typeface.json',
     (font) => {
        const textgeometry = new TextGeometry(
            'Fun House',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5             
            }
        )
        const matcap = textureLoader.load('textures/matcaps/3.png')
        matcap.colorSpace = THREE.SRGBColorSpace
        const textmaterial = new THREE.MeshMatcapMaterial()
        const text = new THREE.Mesh(textgeometry, textmaterial)
        // textmaterial.wireframe = true
        textmaterial.matcap = matcap
        // gsap.from(text.position, { y: 3, duration: 1, ease: 'bounce.out' });
        // gsap.from(text.scale, { x: 0, y: 0, z: 0, duration: 1.5 });

        scene.add(text)
        textt.push(text)
        textgeometry.center() // Center the text geometry
        group.add(text)
     }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2.5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()
let manualElapsedTime = 0
const tick = () =>
{
    // Update controls
    controls.update()
    if (!torusParams.paused) {
        const delta = clock.getDelta()
        manualElapsedTime += delta
        // Update donuts rotation
        group.rotation.y = manualElapsedTime * 0.4// Adjust speed as needed
        group.rotation.x = -(Math.sin(manualElapsedTime * 0.2)) * 0.2
        // group.rotation.z = Math.sin(elapsedTime * 0.5) * 0.5
        textt.forEach((text, i) => {
            const scalee = 0.5 + Math.sin(manualElapsedTime * 5) * 0.3 // Adjust speed and intensity
            // text.scale.x = scalee
            // text.scale.y = scalee
            text.scale.z = scalee
        })
        donuts.forEach((donut,i) => {
                donut.rotation.x += 0.0045
                donut.rotation.y += 0.0045
                if(i<25){
                    donut.rotation.x += 0.05
                    donut.rotation.y += 0.05
                }
                if(i<80){
                    const scale = 0.5 + Math.sin(manualElapsedTime * 5 + i) * 0.2 // Adjust speed and intensity
                donut.scale.set(scale, scale, scale)
                }
        })
        if(torusParams.madnessMode) {
            donuts.forEach((donut, i) => {
                donut.position.x = (Math.random() - 0.5) * 10
                donut.position.y = (Math.random() - 0.5) * 10
                donut.position.z = (Math.random() - 0.5) * 10
                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI 
            })
        }

    }
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarfield from './src/getStarfield.js';
import { getFresnelMat } from './src/getFresnelMat.js';

const EarthAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zoom for better UX in signup
    controls.enablePan = false; // Disable pan

    const detail = 12;
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const earthTexture = loader.load("/textures/00_earthmap1k.jpg");
    const specularTexture = loader.load("/textures/02_earthspec1k.jpg");
    const bumpTexture = loader.load("/textures/01_earthbump1k.jpg");

    // Prevent texture repetition on the sphere
    earthTexture.wrapS = THREE.ClampToEdgeWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    specularTexture.wrapS = THREE.ClampToEdgeWrapping;
    specularTexture.wrapT = THREE.ClampToEdgeWrapping;
    bumpTexture.wrapS = THREE.ClampToEdgeWrapping;
    bumpTexture.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specularMap: specularTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.04,
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    const lightsTexture = loader.load("/textures/03_earthlights1k.jpg");
    lightsTexture.wrapS = THREE.ClampToEdgeWrapping;
    lightsTexture.wrapT = THREE.ClampToEdgeWrapping;

    const lightsMat = new THREE.MeshBasicMaterial({
      map: lightsTexture,
      blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    const cloudsTexture = loader.load("/textures/04_earthcloudmap.jpg");
    const cloudsAlphaTexture = loader.load('/textures/05_earthcloudmaptrans.jpg');

    cloudsTexture.wrapS = THREE.ClampToEdgeWrapping;
    cloudsTexture.wrapT = THREE.ClampToEdgeWrapping;
    cloudsAlphaTexture.wrapS = THREE.ClampToEdgeWrapping;
    cloudsAlphaTexture.wrapT = THREE.ClampToEdgeWrapping;

    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      alphaMap: cloudsAlphaTexture,
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    const fresnelMat = getFresnelMat();
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    const animate = () => {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.002;
      lightsMesh.rotation.y += 0.002;
      cloudsMesh.rotation.y += 0.0023;
      glowMesh.rotation.y += 0.002;
      stars.rotation.y -= 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full  h-full" />;
};

export default EarthAnimation;

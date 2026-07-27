"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Globe() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.z = 5.5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(0.18, 0, -0.08);
    scene.add(group);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 38, 38), new THREE.MeshBasicMaterial({ color: 0x071426, transparent: true, opacity: 0.65 }));
    const wire = new THREE.Mesh(new THREE.SphereGeometry(2.01, 26, 26), new THREE.MeshBasicMaterial({ color: 0x2876ff, transparent: true, opacity: 0.14, wireframe: true }));
    group.add(sphere, wire);

    const pointGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    for (let i = 0; i < 110; i++) {
      const phi = Math.acos(-1 + (2 * i) / 110);
      const theta = Math.sqrt(110 * Math.PI) * phi;
      positions.push(2.04 * Math.cos(theta) * Math.sin(phi), 2.04 * Math.sin(theta) * Math.sin(phi), 2.04 * Math.cos(phi));
    }
    pointGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    group.add(new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0x6ea8ff, size: 0.035, transparent: true, opacity: 0.9 })));

    let frame = 0;
    const resize = () => {
      const { clientWidth: width, clientHeight: height } = host;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    const animate = () => {
      group.rotation.y += 0.0008;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      pointGeometry.dispose();
      host.replaceChildren();
    };
  }, []);

  return <div ref={mount} className="globe" aria-label="Animated global intelligence network"><div className="globe-orbit globe-orbit-one" /><div className="globe-orbit globe-orbit-two" /></div>;
}

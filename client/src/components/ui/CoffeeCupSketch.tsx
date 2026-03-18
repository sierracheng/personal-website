import { useRef, useEffect } from 'react';
import p5 from 'p5';

export function CoffeeCupSketch() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let disp: p5.Vector;
      let vel:  p5.Vector;

      p.setup = () => {
        const cnv = p.createCanvas(360, 360, p.WEBGL);
        cnv.style('background', 'transparent');
        disp = p.createVector(0, 0, 0);
        vel  = p.createVector(0, 0, 0);
      };

      const drawCup = () => {
        p.noStroke();

        // Lights — reset every frame to avoid bleed
        p.ambientLight(70, 62, 56);
        p.pointLight(230, 200, 165,  180, -200, 150);
        p.pointLight(80,  70,  65,  -140, -80,  200);
        p.directionalLight(140, 128, 115,  0.4, 1.0, -0.6);

        // ── Cup body ──────────────────────────────────────────
        p.push();
        p.fill(248, 243, 236);
        p.specularMaterial(220, 215, 208);
        p.shininess(100);
        p.cylinder(42, 68, 32, 1, true, true);
        p.pop();

        // ── Coffee surface (dark disc, flush with top rim) ────
        p.push();
        p.translate(0, -31, 0);
        p.rotateX(p.HALF_PI);
        p.fill(35, 16, 4);
        p.specularMaterial(12, 6, 2);
        p.shininess(6);
        p.cylinder(39, 2, 32, 1, true, false);
        p.pop();

        // ── Handle (D-shape torus on right side) ─────────────
        p.push();
        p.translate(55, 0, 0);
        p.rotateX(p.HALF_PI);  // stand ring upright in XY plane
        p.scale(1, 0.22, 1.35);
        p.fill(240, 234, 224);
        p.specularMaterial(210, 205, 196);
        p.shininess(85);
        p.torus(20, 8, 8, 18);
        p.pop();

        // ── Saucer ────────────────────────────────────────────
        p.push();
        p.translate(0, 41, 0);
        p.rotateX(p.HALF_PI);
        p.fill(190, 155, 112);
        p.specularMaterial(150, 118, 82);
        p.shininess(30);
        p.cylinder(56, 9, 32, 1, true, true);
        p.pop();

        // ── Saucer top rim (slight lip) ───────────────────────
        p.push();
        p.translate(0, 36, 0);
        p.rotateX(p.HALF_PI);
        p.fill(175, 140, 98);
        p.specularMaterial(140, 108, 72);
        p.shininess(25);
        p.cylinder(60, 4, 32, 1, false, false);
        p.pop();
      };

      p.draw = () => {
        p.clear();

        const dt = p.deltaTime / 1000;
        if (dt > 0 && dt < 0.5) {
          const dMouse = p.createVector(
            p.mouseX - p.pmouseX,
            p.mouseY - p.pmouseY,
          ).div(dt).mult(0.2);

          const k_spring = 250;
          const c_damper = 5;
          const mass     = 1;
          const force    = disp.copy().mult(-k_spring)
            .add(vel.copy().mult(-c_damper))
            .add(dMouse.copy().mult(10));
          vel.add(force.copy().div(mass).mult(dt));
          disp.add(vel.copy().mult(dt));
        }

        const tangent   = disp.magSq() < 1e-4
          ? p.createVector(1, 0, 0)
          : disp.copy().normalize();
        const biTangent = p.createVector(0, 0, 1);
        const normal    = tangent.cross(biTangent);

        const toTangentSpace = new DOMMatrixReadOnly([
          tangent.x,   tangent.y,   tangent.z,   0,
          normal.x,    normal.y,    normal.z,    0,
          biTangent.x, biTangent.y, biTangent.z, 0,
          0, 0, 0, 1,
        ]);
        const tm = 1 + disp.mag() * 0.0025;
        const scaleMatrix = new DOMMatrixReadOnly([
          tm, 0,    0, 0,
          0,  1/tm, 0, 0,
          0,  0,    1, 0,
          0,  0,    0, 1,
        ]);
        const T = new DOMMatrixReadOnly()
          .multiply(toTangentSpace)
          .multiply(scaleMatrix)
          .multiply(toTangentSpace.inverse())
          .translate(disp.x, disp.y, disp.z);

        const [m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15]
          = Array.from(T.toFloat32Array());

        p.push();
        p.applyMatrix(m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15);
        p.rotateY(p.PI * 0.22);   // show handle
        p.rotateX(p.PI * -0.08);  // slight forward tilt
        drawCup();
        p.pop();
      };
    };

    const inst = new p5(sketch, containerRef.current);
    return () => inst.remove();
  }, []);

  return (
    <div ref={containerRef} style={{ flexShrink: 0 }} />
  );
}

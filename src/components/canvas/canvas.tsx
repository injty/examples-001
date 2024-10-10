import { FC, useEffect, useRef } from "react";

interface CanvasProps {
  className?: string;
}

export const Canvas: FC<CanvasProps> = ({ className }) => {
  const cvs = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;

    function init() {
      if (canvas) {
        const ctx = canvas.getContext("2d")!;
        const x = 135;
        const y = -55;
        const w = 50;
        const h = 50;
        const r = 0;
        const velocity = 0.01;
        const gravity = 0.3;
        const angle = 0;

        class Sprite {
          x: number;
          y: number;
          w: number;
          h: number;
          r: number;
          velocity: number;
          gravity: number;
          angle: number;

          constructor({ x, y, w, h, r, velocity, gravity }: { x: number; y: number; w: number; h: number; r: number; velocity: number; gravity: number }) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.r = r;
            this.velocity = velocity;
            this.gravity = gravity;
            this.angle = angle;
          }

          draw() {
            if (canvas !== null) {
              ctx.save();
              ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
              ctx.rotate(this.angle);

              ctx.strokeStyle = "#fff";
              ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
              ctx.restore();
            }
          }

          update() {
            if (canvas !== null) {
              ctx.clearRect(0, 0, this.w, this.h);

              if (this.velocity) this.velocity += gravity;
              this.y += this.velocity;
              if (this.y > canvas.height + 55) {
                this.angle = angle;
                this.y = -55;
                // this.gravity = gravity;
                // this.velocity = velocity;
                this.velocity = 0;
                this.gravity = 0;
                this.x = x;
              }

              if (b.y >= a.y - a.h - 10) {
                this.x += 0.2 * this.velocity * 2;
                this.angle += 0.3;
              }

              this.draw();
            }
          }
        }

        const a = new Sprite({ x: 0, y: 200, w: 150, h: 50, r, velocity, gravity });
        const b = new Sprite({ x, y, w, h, r, velocity, gravity });

        async function animate() {
          requestAnimationFrame(animate);
          ctx.clearRect(0, 0, canvas!.width, canvas!.height);

          a.draw();
          b.update();
        }

        animate();
      }
    }

    window.addEventListener("load", init);
    canvas.addEventListener("click", init);
    return () => {
      canvas.removeEventListener("click", init);
      window.removeEventListener("load", init);
    };
  }, [cvs]);

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <div>1/100</div>
      <canvas ref={cvs} className="border border-white cursor-pointer" height={320} width={320}></canvas>
    </div>
  );
};

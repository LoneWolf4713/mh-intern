'use client';

import React, { useRef, useEffect } from 'react';

interface RipplesOptions {
  imageUrl?: string;
  resolution?: number;
  dropRadius?: number;
  perturbance?: number;
  interactive?: boolean;
  crossOrigin?: string;
}

const WaterRipples: React.FC<RipplesOptions & { children?: React.ReactNode; className?: string }> = ({
  imageUrl,
  resolution = 512,
  dropRadius = 37,
  perturbance = 0.25,
  interactive = true,
  crossOrigin = '',
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const el = containerRef.current;
    let gl: WebGLRenderingContext | null;

    // --- Helpers ---
    const getStyle = (element: HTMLElement, prop: string) => 
      window.getComputedStyle(element).getPropertyValue(prop).trim();

    const css = (element: HTMLElement, styles: Record<string, string>) => {
      for (const key in styles) {
        (element.style as any)[key] = styles[key];
      }
    };

    const offset = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset
      };
    };

    const translateBackgroundPosition = (value: string) => {
      const parts = value.split(' ');
      if (parts.length === 1) {
        switch (value) {
          case 'center': return ['50%', '50%'];
          case 'top':    return ['50%', '0'];
          case 'bottom': return ['50%', '100%'];
          case 'left':   return ['0', '50%'];
          case 'right':  return ['100%', '50%'];
          default:       return [value, '50%'];
        }
      }
      return parts.map(part => {
        switch (part) {
          case 'center': return '50%';
          case 'top': case 'left':   return '0';
          case 'right': case 'bottom': return '100%';
          default: return part;
        }
      });
    };

    // --- WebGL Setup ---
    const loadConfig = () => {
      const canvas = document.createElement('canvas');
      gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext);
      if (!gl) return null;

      const extensions: Record<string, any> = {};
      ['OES_texture_float', 'OES_texture_half_float', 'OES_texture_float_linear', 'OES_texture_half_float_linear']
        .forEach(name => {
          const ext = gl!.getExtension(name);
          if (ext) extensions[name] = ext;
        });

      if (!extensions.OES_texture_float) return null;

      const createConfig = (type: string, glType: number, arrayType: any) => {
        const name = 'OES_texture_' + type;
        const linearSupport = (name + '_linear') in extensions;
        return {
          type: glType,
          arrayType,
          linearSupport,
          extensions: linearSupport ? [name, name + '_linear'] : [name]
        };
      };

      const configs = [createConfig('float', gl.FLOAT, Float32Array)];
      if (extensions.OES_texture_half_float) {
        configs.push(createConfig('half_float', extensions.OES_texture_half_float.HALF_FLOAT_OES, null));
      }

      const texture = gl.createTexture();
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      for (let i = 0; i < configs.length; i++) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 32, 32, 0, gl.RGBA, configs[i].type, null);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) return configs[i];
      }
      return null;
    };

    const config = loadConfig();
    if (!config) {
      console.warn('WebGL Floating Point Textures not supported.');
      return;
    }

    class Ripples {
      el: HTMLElement;
      canvas: HTMLCanvasElement;
      wrapper: HTMLDivElement;
      context: WebGLRenderingContext;
      textures: WebGLTexture[] = [];
      framebuffers: WebGLFramebuffer[] = [];
      bufferWriteIndex = 0;
      bufferReadIndex = 1;
      quad: WebGLBuffer | null = null;
      
      dropProgram: any;
      updateProgram: any;
      renderProgram: any;
      backgroundTexture: WebGLTexture | null = null;
      
      resolution: number;
      perturbance: number;
      dropRadius: number;
      interactive: boolean;
      imageUrl?: string;
      crossOrigin: string;

      mousePosition = new Float32Array([0.5, 0.5]);
      currentPointer: any = null;
      hoverInterval: any = null;
      lastTime = Date.now();
      startTime = Date.now() / 1000;
      currentTilt = { x: 0, y: 0 };
      targetTilt = { x: 0, y: 0 };
      velocity = { x: 0, y: 0 };
      destroyed = false;
      visible = true;
      running = true;

      backgroundWidth = 0;
      backgroundHeight = 0;
      imageSource: string | null = null;
      originalInlineCss = '';
      originalCssBackgroundImage = '';

      constructor(el: HTMLElement, options: RipplesOptions) {
        this.el = el;
        this.resolution = options.resolution || 512;
        this.perturbance = options.perturbance || 0.25;
        this.dropRadius = options.dropRadius || 37;
        this.interactive = options.interactive !== false;
        this.imageUrl = options.imageUrl;
        this.crossOrigin = options.crossOrigin || '';

        const canvas = document.createElement('canvas');
        canvas.width = el.clientWidth || 300;
        canvas.height = el.clientHeight || 300;
        this.canvas = canvas;

        css(canvas, {
          position: 'absolute', left: '0', top: '0', right: '0', bottom: '0',
          zIndex: '-1', transform: 'scale(1.15)', transformOrigin: 'center center',
          pointerEvents: 'none'
        });

        const wrapper = document.createElement('div');
        css(wrapper, {
          position: 'absolute', left: '0', top: '0', right: '0', bottom: '0',
          zIndex: '-1', perspective: '2000px', transformStyle: 'preserve-3d',
          pointerEvents: 'none'
        });
        this.wrapper = wrapper;

        el.classList.add('ripples');
        if (getStyle(el, 'position') === 'static') el.style.position = 'relative';
        wrapper.appendChild(canvas);
        el.appendChild(wrapper);

        this.context = gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext);
        config!.extensions.forEach(name => gl!.getExtension(name));

        const textureData = config!.arrayType ? new config!.arrayType(this.resolution * this.resolution * 4) : null;
        for (let i = 0; i < 2; i++) {
          const tex = gl.createTexture()!;
          const fb = gl.createFramebuffer()!;
          gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, config!.linearSupport ? gl.LINEAR : gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, config!.linearSupport ? gl.LINEAR : gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.resolution, this.resolution, 0, gl.RGBA, config!.type, textureData);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
          this.textures.push(tex);
          this.framebuffers.push(fb);
        }

        this.quad = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);

        this.initShaders();
        this.initTexture();
        this.loadImage();

        gl.clearColor(0, 0, 0, 0);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.setupEvents();
        
        const step = () => {
          if (!this.destroyed) {
            this.step();
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);

        if (this.interactive) {
          const updatePhysics = () => {
            if (this.destroyed) return;
            const now = Date.now();
            const dt = (now - this.lastTime) / 1000;
            this.lastTime = now;

            const spring = 11.0;
            const friction = 0.9;
            const dx = this.targetTilt.x - this.currentTilt.x;
            const dy = this.targetTilt.y - this.currentTilt.y;

            this.velocity.x += dx * spring * dt;
            this.velocity.y += dy * spring * dt;
            this.velocity.x *= Math.pow(friction, dt * 60);
            this.velocity.y *= Math.pow(friction, dt * 60);

            this.currentTilt.x += this.velocity.x * dt;
            this.currentTilt.y += this.velocity.y * dt;

            this.wrapper.style.transform = `rotateX(${this.currentTilt.y}deg) rotateY(${this.currentTilt.x}deg)`;
            requestAnimationFrame(updatePhysics);
          };
          updatePhysics();
        }
      }

      setupEvents() {
        const dropAtPointer = (pointer: any, big = false) => {
          if (this.visible && this.running && this.interactive) {
            const borderLeft = parseInt(getStyle(this.el, 'border-left-width')) || 0;
            const borderTop = parseInt(getStyle(this.el, 'border-top-width')) || 0;
            const off = offset(this.el);
            this.drop(
              pointer.pageX - off.left - borderLeft,
              pointer.pageY - off.top - borderTop,
              this.dropRadius * (big ? 1.5 : 1),
              big ? 0.14 : 0.01
            );
          }
        };

        const onMouseMove = (e: MouseEvent) => {
          this.currentPointer = e;
          const rect = this.el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = 1.0 - (e.clientY - rect.top) / rect.height;
          this.mousePosition[0] = x;
          this.mousePosition[1] = y;
          this.targetTilt.x = (x - 0.5) * 30;
          this.targetTilt.y = (y - 0.5) * -30;
          dropAtPointer(e);
        };

        const onMouseEnter = (e: MouseEvent) => {
          if (this.hoverInterval) return;
          this.hoverInterval = setInterval(() => {
            if (this.currentPointer && this.visible && this.running && this.interactive) {
              dropAtPointer(this.currentPointer);
            }
          }, 50);
        };

        const onMouseLeave = () => {
          clearInterval(this.hoverInterval);
          this.hoverInterval = null;
          this.targetTilt.x = 0;
          this.targetTilt.y = 0;
        };

        this.el.addEventListener('mousemove', onMouseMove);
        this.el.addEventListener('mouseenter', onMouseEnter);
        this.el.addEventListener('mouseleave', onMouseLeave);
        this.el.addEventListener('mousedown', (e) => dropAtPointer(e, true));
        
        // Save refs for cleanup
        (this as any)._handlers = { onMouseMove, onMouseEnter, onMouseLeave };

        window.addEventListener('resize', this.updateSize.bind(this));
      }

      initShaders() {
        const createProg = (v: string, f: string) => {
          const compile = (type: number, source: string) => {
            const s = gl!.createShader(type)!;
            gl!.shaderSource(s, source);
            gl!.compileShader(s);
            if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) throw new Error(gl!.getShaderInfoLog(s)!);
            return s;
          };
          const p: any = { id: gl!.createProgram()! };
          gl!.attachShader(p.id, compile(gl!.VERTEX_SHADER, v));
          gl!.attachShader(p.id, compile(gl!.FRAGMENT_SHADER, f));
          gl!.linkProgram(p.id);
          p.locations = {};
          gl!.useProgram(p.id);
          gl!.enableVertexAttribArray(0);
          const regex = /uniform (\w+) (\w+)/g;
          let match;
          while ((match = regex.exec(v + f)) !== null) p.locations[match[2]] = gl!.getUniformLocation(p.id, match[2]);
          return p;
        };

        const vSource = `attribute vec2 vertex; varying vec2 coord; void main() { coord = vertex * 0.5 + 0.5; gl_Position = vec4(vertex, 0.0, 1.0); }`;

        this.dropProgram = createProg(vSource, `
          precision highp float; const float PI = 3.141592653589793;
          uniform sampler2D texture; uniform vec2 center; uniform float radius; uniform float strength;
          varying vec2 coord;
          void main() {
            vec4 info = texture2D(texture, coord);
            float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);
            drop = pow(drop, 2.5); drop = 0.5 - cos(drop * PI) * 0.5;
            info.r += drop * strength; gl_FragColor = info;
          }
        `);

        this.updateProgram = createProg(vSource, `
          precision highp float; uniform sampler2D texture; uniform vec2 delta; varying vec2 coord;
          void main() {
            vec4 info = texture2D(texture, coord);
            vec2 dx = vec2(delta.x, 0.0); vec2 dy = vec2(0.0, delta.y);
            float average = (texture2D(texture, coord - dx).r + texture2D(texture, coord - dy).r + texture2D(texture, coord + dx).r + texture2D(texture, coord + dy).r) * 0.25;
            info.g += (average - info.r) * 1.95; info.g *= 0.998; info.r += info.g; info.r *= 0.995;
            gl_FragColor = info;
          }
        `);

        this.renderProgram = createProg(`
          precision highp float; attribute vec2 vertex; uniform vec2 topLeft; uniform vec2 bottomRight; uniform vec2 containerRatio;
          varying vec2 ripplesCoord; varying vec2 backgroundCoord;
          void main() {
            backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5); backgroundCoord.y = 1.0 - backgroundCoord.y;
            ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;
            gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);
          }
        `, `
          precision highp float; uniform sampler2D samplerBackground; uniform sampler2D samplerRipples;
          uniform vec2 delta; uniform float perturbance; uniform float time; uniform vec2 u_mouse; uniform vec2 textureSize;
          varying vec2 ripplesCoord; varying vec2 backgroundCoord;
          const float PI = 3.141592653589793;

          vec3 getLightDir() { return normalize(vec3(0.8, -2.4, tan(65.0 * PI / 180.0))); }
          void main() {
            float height = texture2D(samplerRipples, ripplesCoord).r;
            float hX1 = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;
            float hX2 = texture2D(samplerRipples, vec2(ripplesCoord.x - delta.x, ripplesCoord.y)).r;
            float hY1 = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;
            float hY2 = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y - delta.y)).r;
            vec3 normal = normalize(cross(vec3(delta.x*2.0, (hX1-hX2)*0.4, 0.0), vec3(0.0, (hY1-hY2)*0.4, delta.y*2.0)));
            vec4 base = texture2D(samplerBackground, backgroundCoord);
            float lum = dot(base.rgb, vec3(0.2126, 0.7152, 0.0722));
            vec2 mOff = (ripplesCoord - u_mouse) * 0.015 * pow(max(0.0, 1.0 - length(ripplesCoord - u_mouse)*3.0), 2.0);
            vec2 offset = -normal.xz * 0.7 * (1.0 - lum * 0.3) + mOff * 0.7;
            
            float roughness = 0.04;
            vec3 lightDir = getLightDir();
            vec3 halfDir = normalize(vec3(-0.6, 1.0, 1.0) + lightDir);
            float D = (roughness * roughness) / max(PI * pow(max(dot(normal, halfDir), 0.0) * max(dot(normal, halfDir), 0.0) * (roughness * roughness - 1.0) + 1.0, 2.0), 0.001);
            vec3 specular = vec3(0.9, 1.0, 1.2) * D * 1.2;

            vec4 final = texture2D(samplerBackground, backgroundCoord + offset * perturbance * 0.8);
            float fresnel = pow(1.0 - max(0.0, dot(offset, vec2(-0.6, 1.0))), 120.0);
            final.rgb = mix(final.rgb, final.rgb * 1.4, fresnel * 0.5);
            final.rgb += specular * (1.0 - lum * 0.25);
            gl_FragColor = vec4(clamp(final.rgb, 0.0, 1.0), 1.0);
          }
        `);
      }

      initTexture() {
        this.backgroundTexture = gl!.createTexture();
        gl!.bindTexture(gl!.TEXTURE_2D, this.backgroundTexture);
        gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, 1);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      }

      loadImage() {
        const src = this.imageUrl || (getStyle(this.el, 'background-image').match(/url\(["']?([^"']*)["']?\)/) || [])[1];
        if (!src || src === this.imageSource) return;
        this.imageSource = src;
        const img = new Image();
        img.crossOrigin = src.startsWith('data:') ? null : this.crossOrigin;
        img.onload = () => {
          gl!.bindTexture(gl!.TEXTURE_2D, this.backgroundTexture);
          const pot = (x: number) => (x & (x - 1)) === 0;
          const wrap = pot(img.width) && pot(img.height) ? gl!.REPEAT : gl!.CLAMP_TO_EDGE;
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, wrap);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, wrap);
          gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img);
          this.backgroundWidth = img.width; this.backgroundHeight = img.height;
          this.hideCssBackground();
        };
        img.src = src;
      }

      hideCssBackground() {
        this.originalInlineCss = this.el.style.backgroundImage;
        this.originalCssBackgroundImage = getStyle(this.el, 'background-image');
        this.el.style.backgroundImage = 'none';
      }

      step() {
        if (!this.visible) return;
        this.computeBoundaries();
        if (this.running) {
          gl!.viewport(0, 0, this.resolution, this.resolution);
          gl!.bindFramebuffer(gl!.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]);
          gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, this.textures[this.bufferReadIndex]);
          gl!.useProgram(this.updateProgram.id);
          gl!.uniform2fv(this.updateProgram.locations.delta, new Float32Array([1/this.resolution, 1/this.resolution]));
          gl!.bindBuffer(gl!.ARRAY_BUFFER, this.quad);
          gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
          gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
          this.bufferWriteIndex = 1 - this.bufferWriteIndex; this.bufferReadIndex = 1 - this.bufferReadIndex;
        }
        this.render();
      }

      render() {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl!.enable(gl!.BLEND); gl!.clear(gl!.COLOR_BUFFER_BIT);
        gl!.useProgram(this.renderProgram.id);
        gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, this.backgroundTexture);
        gl!.activeTexture(gl!.TEXTURE1); gl!.bindTexture(gl!.TEXTURE_2D, this.textures[0]);
        gl!.uniform1f(this.renderProgram.locations.perturbance, this.perturbance);
        gl!.uniform2fv(this.renderProgram.locations.topLeft, (this as any)._topLeft);
        gl!.uniform2fv(this.renderProgram.locations.bottomRight, (this as any)._bottomRight);
        gl!.uniform2fv(this.renderProgram.locations.containerRatio, (this as any)._ratio);
        gl!.uniform1i(this.renderProgram.locations.samplerBackground, 0);
        gl!.uniform1i(this.renderProgram.locations.samplerRipples, 1);
        gl!.uniform2fv(this.renderProgram.locations.u_mouse, this.mousePosition);
        gl!.bindBuffer(gl!.ARRAY_BUFFER, this.quad);
        gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
        gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
      }

      computeBoundaries() {
        const bgSize = getStyle(this.el, 'background-size');
        const bgPos = translateBackgroundPosition(getStyle(this.el, 'background-position'));
        const off = offset(this.el);
        const w = this.el.clientWidth, h = this.el.clientHeight;
        const imgW = this.backgroundWidth || w, imgH = this.backgroundHeight || h;
        let bW, bH, s;
        if (bgSize === 'cover') { s = Math.max(w/imgW, h/imgH); bW = imgW*s; bH = imgH*s; }
        else if (bgSize === 'contain') { s = Math.min(w/imgW, h/imgH); bW = imgW*s; bH = imgH*s; }
        else { bW = imgW; bH = imgH; }

        const bX = off.left + (w - bW) * parseFloat(bgPos[0]) / 100;
        const bY = off.top + (h - bH) * parseFloat(bgPos[1]) / 100;

        (this as any)._topLeft = new Float32Array([(off.left - bX)/bW, (off.top - bY)/bH]);
        (this as any)._bottomRight = new Float32Array([(this as any)._topLeft[0] + w/bW, (this as any)._topLeft[1] + h/bH]);
        const max = Math.max(w, h);
        (this as any)._ratio = new Float32Array([w/max, h/max]);
      }

      drop(x: number, y: number, r: number, s: number) {
        const w = this.el.clientWidth, h = this.el.clientHeight;
        const max = Math.max(w, h);
        gl!.viewport(0, 0, this.resolution, this.resolution);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]);
        gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, this.textures[this.bufferReadIndex]);
        gl!.useProgram(this.dropProgram.id);
        gl!.uniform2fv(this.dropProgram.locations.center, new Float32Array([(2*x-w)/max, (h-2*y)/max]));
        gl!.uniform1f(this.dropProgram.locations.radius, r/max);
        gl!.uniform1f(this.dropProgram.locations.strength, s);
        gl!.bindBuffer(gl!.ARRAY_BUFFER, this.quad);
        gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
        gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
        this.bufferWriteIndex = 1 - this.bufferWriteIndex; this.bufferReadIndex = 1 - this.bufferReadIndex;
      }

      updateSize() {
        this.canvas.width = this.el.clientWidth;
        this.canvas.height = this.el.clientHeight;
      }

      destroy() {
        this.destroyed = true;
        clearInterval(this.hoverInterval);
        const { onMouseMove, onMouseEnter, onMouseLeave } = (this as any)._handlers;
        this.el.removeEventListener('mousemove', onMouseMove);
        this.el.removeEventListener('mouseenter', onMouseEnter);
        this.el.removeEventListener('mouseleave', onMouseLeave);
        this.wrapper.remove();
        this.canvas.remove();
        this.el.style.backgroundImage = this.originalInlineCss;
      }
    }

    const ripples = new Ripples(el, { imageUrl, resolution, dropRadius, perturbance, interactive, crossOrigin });

    return () => {
      ripples.destroy();
    };
  }, [imageUrl, resolution, dropRadius, perturbance, interactive, crossOrigin]);

  return (
    <div ref={containerRef} className={`water-ripples-container ${className}`} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default WaterRipples;

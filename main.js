function main() {
  
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  var vertices= [ 0.5, 0.5, 1.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0, 0.0,
    -0.5, 0.5, 0.0, 0.0 ,1.0,
    0.0, 1.0, 5.0, 6.0, 0.2,];

 

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var vertexShaderCode = `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform float uTheta;
  varying vec3 vColor;
  void main () {
    gl_PointSize = 30.0;  // adding size of point
    vec2 position = vec2(aPosition);
    position.x = -sin(uTheta) * aPosition.y + cos(uTheta) * aPosition.x;
    position.y = sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.y;
    gl_Position = vec4(position, 0.0, 1.0);
    vColor = aColor;
  }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode); 
  gl.compileShader(vertexShader);

  var fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        void main () {
          gl_FragColor = vec4(vColor, 1.0);
        }
  `;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader); 
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  var theta = 0.0;
  // ! all qualifire
  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");

  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(aPosition);

  //add color
  var aColor = gl.getAttribLocation(shaderProgram,"aColor");
  gl.vertexAttribPointer (aColor, 3, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

  function render() {
  gl.clearColor(1.0, 0.75, 0.79, 1.0); 
  
  gl.clear(gl.COLOR_BUFFER_BIT);

  theta += 0.05;
  gl.uniform1f(uTheta, theta);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  requestAnimationFrame(render);
  
  }
  requestAnimationFrame(render);

}
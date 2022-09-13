function main() {
  
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  var vertices= [0.5, 0.5, 0.0, 0.0, -0.5, 0.5, 0.0, 1.0];

 

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var vertexShaderCode = `
  attribute vec2 aPosition;
  void main () {
    gl_PointSize = 30.0;  // adding size of point
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode); 
  gl.compileShader(vertexShader);

  var fragmentShaderCode = `
        void main () {
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
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

  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(1.0, 0.75, 0.79, 1.0); 

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
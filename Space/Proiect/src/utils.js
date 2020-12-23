import vsSource from './shaders/vertex.glsl';
import fsSource from './shaders/fragment.glsl';

export default class Utils {

  static toRadians(degrees) {
    return (degrees * 2.0 * Math.PI) / 360.0
  }

  static createVertexShader(gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    
    gl.shaderSource(vertexShader, vsSource)
    gl.compileShader(vertexShader)

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert('vertex compilation failed: ' + gl.getShaderInfoLog(vertexShader));
      gl.deleteShader(vertexShader);
      return null;
    }

    return vertexShader
  }

  static createFragmentShader(gl) {
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert('fragment compilation failed: ' + gl.getShaderInfoLog(fragmentShader));
      gl.deleteShader(fragmentShader);
      return null;
    }

    return fragmentShader
  }

  static createShaderProgram(gl) {

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, Utils.createVertexShader(gl));
    gl.attachShader(shaderProgram, Utils.createFragmentShader(gl));
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to link the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  // GOLD material - ambient, diffuse, specular, and shininess
  static goldAmbient() { return [0.2473, 0.1995, 0.0745, 1] }
  static goldDiffuse() { return [0.7516, 0.6065, 0.2265, 1] }
  static goldSpecular() { return [0.6283, 0.5559, 0.3661, 1] }
  static goldShininess() { return 51.2 }
  // SILVER material - ambient, diffuse, specular, and shininess
  static silverAmbient() { return [0.1923, 0.1923, 0.1923, 1] }
  static silverDiffuse() { return [0.5075, 0.5075, 0.5075, 1] }
  static silverSpecular() { return [0.5083, 0.5083, 0.5083, 1] }
  static silverShininess() { return 51.2 }
  // BRONZE material - ambient, diffuse, specular, and shininess
  static bronzeAmbient() { return [0.2125, 0.1275, 0.0540, 1] }
  static bronzeDiffuse() { return [0.7140, 0.4284, 0.1814, 1] }
  static bronzeSpecular() { return [0.3936, 0.2719, 0.1667, 1] }
  static bronzeShininess() { return 25.6 }
}
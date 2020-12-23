import Utils from './utils.js'
import Sphere from './sphere.js'
import Camera from './camera.js'
import texure_jpg_earth from './../earth.jpg'
import texure_jpg_moon from './../moon.jpg'
import texture_png_sat from './models/satellite_texture.png'
import texture_png_space from './../space.jpg'
import texture_png_shuttle from './models/spstob_1.png'
import { mat4 } from 'gl-matrix'
import ImportedModel from "./importedModel";
import raw_object from "./models/Satellite3.obj";
import raw_object2 from "./models/Satellite3.obj";

main()

var gl
var renderingProgram

var VBO_vertex_position_earth, VBO_texture_coordinates_earth
var VBO_vertex_position_space, VBO_texture_coordinates_space
var VBO_vertex_position_moon, VBO_texture_coordinates_moon
var VBO_vertex_position_sat, VBO_texture_coordinates_sat
var VBO_vertex_position_sat2, VBO_texture_coordinates_sat2
var VBO_vertex_position_sat3, VBO_texture_coordinates_sat3
var vertex_position_Loc, texture_coordinates_Loc

var myCamera
var earth, moon, satellite, satellite2, satellite3, space

var pMat, mvMat, mMat, vMat, mvMatMoon, mvMatSat1, mvMatSat2, mSpaceMat, vSpaceMat
var pMatLoc, mvMatLoc

var texture_Loc_Earth, texture_Loc_Moon, texture_Loc_Sat, texture_Loc_Sat2, texture_Loc_Sat3, texture_Loc_Space
var earth_image, moon_image, satellite_image, satellite_image2, space_image

function setupVertices() {

  space = new Sphere([0.0, 0.0, 0.0], 300)
  earth = new Sphere([0.5, 0.5, 0.5], 1)
  moon = new Sphere([1.5, 0.5, 0.5],0.25)
  satellite = new ImportedModel(raw_object)
  satellite.init()
  satellite2 = new ImportedModel(raw_object2)
  satellite2.init()

  VBO_vertex_position_space = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_space)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(space.getVertexCoordinatesValues()), gl.STATIC_DRAW)

  VBO_texture_coordinates_space = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_space)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(space.getTextureCoordinatesValues()), gl.STATIC_DRAW)

  VBO_vertex_position_earth = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_earth)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(earth.getVertexCoordinatesValues()), gl.STATIC_DRAW)

  VBO_texture_coordinates_earth = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_earth)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(earth.getTextureCoordinatesValues()), gl.STATIC_DRAW)


  VBO_vertex_position_moon = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_moon)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(moon.getVertexCoordinatesValues()), gl.STATIC_DRAW)

  VBO_texture_coordinates_moon = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_moon)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(moon.getTextureCoordinatesValues()), gl.STATIC_DRAW)

  //Satelit 1
  VBO_vertex_position_sat = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_sat)
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporter.triangleVerts), gl.STATIC_DRAW)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(satellite.getVertexCoordinatesValues()), gl.STATIC_DRAW)

  VBO_texture_coordinates_sat = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_sat)
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporter.textureCoords), gl.STATIC_DRAW)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(satellite.getTextureCoordinatesValues()), gl.STATIC_DRAW)


  //Satelit 2
  VBO_vertex_position_sat2 = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_sat2)
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporter.triangleVerts), gl.STATIC_DRAW)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(satellite2.getVertexCoordinatesValues()), gl.STATIC_DRAW)

  VBO_texture_coordinates_sat2 = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_sat2)
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporter.textureCoords), gl.STATIC_DRAW)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(satellite2.getTextureCoordinatesValues()), gl.STATIC_DRAW)

}



function init() {
  renderingProgram = Utils.createShaderProgram(gl)

  vertex_position_Loc = gl.getAttribLocation(renderingProgram, 'pos')
  texture_coordinates_Loc = gl.getAttribLocation(renderingProgram, 'textureCoord')
  texture_coordinates_Loc = 1
  mvMatLoc = gl.getUniformLocation(renderingProgram, 'mv_matrix')
  pMatLoc = gl.getUniformLocation(renderingProgram, 'proj_matrix')

  gl.useProgram(renderingProgram)

  setupVertices()

  myCamera = new Camera()
  myCamera.setAspect(gl.canvas.clientWidth, gl.canvas.clientHeight)

  earth_image = new Image()
  earth_image.src = texure_jpg_earth
  texture_Loc_Earth = gl.createTexture()

  moon_image = new Image()
  moon_image.src = texure_jpg_moon
  texture_Loc_Moon = gl.createTexture()

  satellite_image = new Image()
  satellite_image.src = texture_png_sat
  texture_Loc_Sat = gl.createTexture()

  satellite_image2 = new Image()
  satellite_image2.src = texture_png_sat
  texture_Loc_Sat2 = gl.createTexture()

  space_image = new Image()
  space_image.src = texture_png_space
  texture_Loc_Space = gl.createTexture()

}

function display(currentTime) {
  currentTime *= 0.0005 // în secunde
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.clear(gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  // matricea de perspectivă
  pMat = mat4.create()
  mat4.perspective(pMat, myCamera.fovy, myCamera.aspect, myCamera.zNear, myCamera.zFar)

  // matricea de view
  vMat = mat4.create()
  mat4.translate(vMat, vMat, myCamera.location)

  //SPACE
  mSpaceMat = mat4.create()
  mat4.translate(mSpaceMat, mSpaceMat, earth.location)

  //SPACE - matricea de model-view
  mvMat = mat4.create()
  mat4.multiply(mvMat, vMat, mSpaceMat)


  // copiază matricile model-view, projection în variabilele uniforme corespunzătoare
  gl.uniformMatrix4fv(pMatLoc, false, pMat)
  gl.uniformMatrix4fv(mvMatLoc, false, mvMat)

  // transmite vârfurile sferei
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_space)
  gl.enableVertexAttribArray(vertex_position_Loc)
  gl.vertexAttribPointer(vertex_position_Loc, 3, gl.FLOAT, false, 0, 0)

  // transmite coordonatele de textură
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_space)
  gl.enableVertexAttribArray(texture_coordinates_Loc)
  gl.vertexAttribPointer(texture_coordinates_Loc, 2, gl.FLOAT, false, 0, 0)

  // activează prima unitate de textură (texture unit 0)
  gl.activeTexture(gl.TEXTURE0 + 0)
  // preia punctul de legătură în variabila texture_Loc
  gl.bindTexture(gl.TEXTURE_2D, texture_Loc_Space)
  // trimite imaginea
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, space_image)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  var ext = (
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
  );
  if (ext){
    var max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }
  gl.generateMipmap(gl.TEXTURE_2D)

  gl.drawArrays(gl.TRIANGLES, 0, earth.numIndices)


  /////////////////////////////////////////////////////////////
  //EARTH
  //EARTH - matricea de model
  mMat = mat4.create()

  mat4.translate(mMat, mMat, earth.location)
  mat4.rotate(mMat, mMat, Utils.toRadians(30), [1, 0, 0]);
  mat4.rotate(mMat, mMat, -Utils.toRadians(100), [0, 1, 0]);
  mat4.rotate(mMat,mMat,currentTime,[0,1,0]);

  //EARTH - matricea de model-view
  mvMat = mat4.create()
  mat4.multiply(mvMat, vMat, mMat)


  // copiază matricile model-view, projection în variabilele uniforme corespunzătoare
  gl.uniformMatrix4fv(pMatLoc, false, pMat)
  gl.uniformMatrix4fv(mvMatLoc, false, mvMat)

  // transmite vârfurile sferei
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_earth)
  gl.enableVertexAttribArray(vertex_position_Loc)
  gl.vertexAttribPointer(vertex_position_Loc, 3, gl.FLOAT, false, 0, 0)

  // transmite coordonatele de textură
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_earth)
  gl.enableVertexAttribArray(texture_coordinates_Loc)
  gl.vertexAttribPointer(texture_coordinates_Loc, 2, gl.FLOAT, false, 0, 0)

  // activează prima unitate de textură (texture unit 0)
  gl.activeTexture(gl.TEXTURE0 + 0)
  // preia punctul de legătură în variabila texture_Loc
  gl.bindTexture(gl.TEXTURE_2D, texture_Loc_Earth)
  // trimite imaginea
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, earth_image)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  var ext = (
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
  );
  if (ext){
    var max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }
  gl.generateMipmap(gl.TEXTURE_2D)

  gl.drawArrays(gl.TRIANGLES, 0, earth.numIndices)



  //MOON
  //MOON - model
  //mat4.rotate(mMat,mMat,currentTime*2,[0,1,0]);
  mat4.translate(mMat, mMat, moon.location);
  //mat4.translate(mMat, mMat, [-1.0, 0, 0])
  mat4.translate(mMat, mMat, [1.0, 0, 0])

  //MOON - model view
  mvMatMoon = mat4.create()
  mat4.multiply(mvMatMoon, vMat, mMat)

  gl.uniformMatrix4fv(pMatLoc, false, pMat)
  gl.uniformMatrix4fv(mvMatLoc, false, mvMatMoon)

  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_moon)
  gl.enableVertexAttribArray(vertex_position_Loc)
  gl.vertexAttribPointer(vertex_position_Loc, 3, gl.FLOAT, false, 0, 0)

  // transmite coordonatele de textură
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_moon)
  gl.enableVertexAttribArray(texture_coordinates_Loc)
  gl.vertexAttribPointer(texture_coordinates_Loc, 2, gl.FLOAT, false, 0, 0)

  // activează prima unitate de textură (texture unit 0)
  gl.activeTexture(gl.TEXTURE0 + 0)
  // preia punctul de legătură în variabila texture_Loc
  gl.bindTexture(gl.TEXTURE_2D, texture_Loc_Moon)
  // trimite imaginea
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, moon_image)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  var ext = (
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
  );
  if (ext){
    var max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }
  gl.generateMipmap(gl.TEXTURE_2D)
  gl.drawArrays(gl.TRIANGLES, 0, moon.numIndices)

  ///////////////////////////////////////////////////////////////
  //Satelit 2
  mat4.translate(mMat, mMat, [-1.0, -0.3, 1.0])
  //mat4.rotate(mMat, mMat, Utils.toRadians(15), [0, -1, 0]);
  mat4.rotate(mMat, mMat, Utils.toRadians(180), [0, -1, 0]);
  mat4.scale(mMat, mMat, [0.02, 0.02, 0.02])

  // matricea de model-view
  mvMatSat2 = mat4.create()
  mat4.multiply(mvMatSat2, vMat, mMat)

  // copiază matricile model-view, projection în variabilele uniforme corespunzătoare
  gl.uniformMatrix4fv(pMatLoc, false, pMat)
  gl.uniformMatrix4fv(mvMatLoc, false, mvMatSat2)

  // transmite vârfurile piramidei
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_sat2)
  gl.enableVertexAttribArray(vertex_position_Loc)
  gl.vertexAttribPointer(vertex_position_Loc, 3, gl.FLOAT, false, 0, 0)

  // transmite coordonatele de textură
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_sat2)
  gl.enableVertexAttribArray(texture_coordinates_Loc)
  gl.vertexAttribPointer(texture_coordinates_Loc, 2, gl.FLOAT, false, 0, 0)

  // activează prima unitate de textură (texture unit 0)
  gl.activeTexture(gl.TEXTURE0 + 0)
  // preia punctul de legătură în variabila texture_Loc
  gl.bindTexture(gl.TEXTURE_2D, texture_Loc_Sat2)
  // trimite imaginea
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, satellite_image2)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  var ext = (
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
  );
  if (ext){
    var max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }
  gl.generateMipmap(gl.TEXTURE_2D)

  //gl.drawArrays(gl.TRIANGLES, 0, myImporter.getNumVertices())
  gl.drawArrays(gl.TRIANGLES, 0, satellite2.numVertices)

  ///////////////////////////////////////////////////////////////////////
  //Satelit

  mat4.translate(mMat, mMat, [90.0, 13.0, -25.0])
  //mat4.rotate(mMat, mMat, Utils.toRadians(15), [0, -1, 0]);
  mat4.rotate(mMat, mMat, Utils.toRadians(90), [0, -1, 0]);
  //mat4.scale(mMat, mMat, [1,1,1])

  // matricea de model-view
  mvMatSat1 = mat4.create()
  mat4.multiply(mvMatSat1, vMat, mMat)

  // copiază matricile model-view, projection în variabilele uniforme corespunzătoare
  gl.uniformMatrix4fv(pMatLoc, false, pMat)
  gl.uniformMatrix4fv(mvMatLoc, false, mvMatSat1)

  // transmite vârfurile piramidei
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position_sat)
  gl.enableVertexAttribArray(vertex_position_Loc)
  gl.vertexAttribPointer(vertex_position_Loc, 3, gl.FLOAT, false, 0, 0)

  // transmite coordonatele de textură
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates_sat)
  gl.enableVertexAttribArray(texture_coordinates_Loc)
  gl.vertexAttribPointer(texture_coordinates_Loc, 2, gl.FLOAT, false, 0, 0)

  // activează prima unitate de textură (texture unit 0)
  gl.activeTexture(gl.TEXTURE0 + 0)
  // preia punctul de legătură în variabila texture_Loc
  gl.bindTexture(gl.TEXTURE_2D, texture_Loc_Sat)
  // trimite imaginea
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, satellite_image)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  var ext = (
      gl.getExtension('EXT_texture_filter_anisotropic') ||
      gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
      gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
  );
  if (ext){
    var max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
  }
  gl.generateMipmap(gl.TEXTURE_2D)

  //gl.drawArrays(gl.TRIANGLES, 0, myImporter.getNumVertices())
  gl.drawArrays(gl.TRIANGLES, 0, satellite.numVertices)






  requestAnimationFrame(display)
}

function main() {
  const canvas = document.querySelector('#glcanvas')

  gl = canvas.getContext('webgl2')

  if (!gl) {
    alert('Inițializare WebGL eșuată.')
    return
  }

  init()
  display()
}



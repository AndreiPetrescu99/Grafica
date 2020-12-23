#version 300 es

in vec3 pos;
in vec2 textureCoord;

uniform mat4 mv_matrix;
uniform mat4 proj_matrix;

out vec2 tc;

void main() {
  gl_Position = proj_matrix*mv_matrix * vec4(pos,1.0);
  tc = textureCoord;
}
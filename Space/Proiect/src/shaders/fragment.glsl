#version 300 es
precision mediump float;

out vec4 color;

uniform sampler2D samp;
in vec2 tc;
void main(void)
{
    //color = vec4(1.0,1.0,1.0,1.0);
    color = texture(samp, tc);
}
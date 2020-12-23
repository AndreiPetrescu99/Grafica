import Utils from './utils.js'

export default class Sphere {

    constructor(location, rad) {
        this.location = location
        this.init(48,rad)
    }

    init(prec, rad) {
        this.numVertices = (prec+1) * (prec+1)
        this.numIndices = prec * prec * 6

        this.vertices = []
        this.texCoords = []
        this.normals = []
        this.indices = []

        var i, j
        for (i = 0; i <= prec; i++) {
            const v = i / prec;
            for (j = 0; j <= prec; j++) {
                const u = j / prec;

                const x = Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v);
                const y = Math.sin( - Math.PI / 2  + Math.PI * v);
                const z = Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v);

                this.vertices.push([x*rad, y*rad, z*rad]);
                this.normals.push([x,y,z]);

                this.texCoords.push([1 - u, 1 - v]);
            }
        }

        const vertsPerSlice = prec + 1;
        for (i = 0; i < prec; i++) {
            let v1 = i * vertsPerSlice;
            let v2 = v1 + vertsPerSlice;
            for (j = 0; j < prec; j++) {
                this.indices.push(v1);
                this.indices.push(v1 + 1);
                this.indices.push(v2);

                this.indices.push(v2);
                this.indices.push(v1 + 1);
                this.indices.push(v2 + 1);

                v1 += 1;
                v2 += 1;
            }
        }
    }

    getVertexCoordinatesValues() {
        var pvalues = []

        var i
        for (i = 0; i < this.numIndices; i++) {
            pvalues.push(this.vertices[this.indices[i]][0]);
            pvalues.push(this.vertices[this.indices[i]][1]);
            pvalues.push(this.vertices[this.indices[i]][2]);
        }

        return pvalues;
    }

    getTextureCoordinatesValues() {
        var tvalues = []

        var i
        for (i = 0; i < this.numIndices; i++) {
            tvalues.push(this.texCoords[this.indices[i]][0]);
            tvalues.push(this.texCoords[this.indices[i]][1]);
        }

        return tvalues;
    }

    getNormalsCoordinatesValues() {
        var nvalues = []

        var i
        for (i = 0; i < this.numIndices; i++) {
            nvalues.push(this.normals[this.indices[i]][0]);
            nvalues.push(this.normals[this.indices[i]][1]);
            nvalues.push(this.normals[this.indices[i]][2]);
        }

        return nvalues;
    }
}
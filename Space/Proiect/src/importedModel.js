import Utils from './utils.js'

export default class ImportedModel {

    constructor(raw_object) {
        this.raw_object = raw_object
        // values as read in from OBJ file
        this.vertVals = []
        this.stVals = []
        this.normVals = []
        // values stored for later use as vertex attributes
        this.triangleVerts = []
        this.textureCoords = []
        this.normals = []
        this.indices = []
        this.numIndices = 0
        this.init()
    }

    init() {
        var lines = this.raw_object.split("\n")

        var i, content
        for (i = 0; i < lines.length; i++) {
            content = lines[i].split(" ")

            if (!content[0].localeCompare("v")) {
                this.vertVals.push(parseFloat(content[1]))
                this.vertVals.push(parseFloat(content[2]))
                this.vertVals.push(parseFloat(content[3]))
            }

            if (!content[0].localeCompare("vt")) {
                this.stVals.push(parseFloat(content[1]))
                this.stVals.push(parseFloat(content[2]))
            }

            if (!content[0].localeCompare("vn")) {
                this.normVals.push(parseFloat(content[1]))
                this.normVals.push(parseFloat(content[2]))
                this.normVals.push(parseFloat(content[3]))
            }

            if (!content[0].localeCompare("f")) {
                var j, oneCorner;
                for (j = 1; j <= 3; j++) {
                    oneCorner = content[j].split("/")
                    this.numIndices++
                    this.indices.push(oneCorner)
                }
            }
        }
        this.numVertices = this.numIndices;
    }

    getVertexCoordinatesValues() {
        var pvalues = []

        var i
        for (i = 0; i < this.numIndices; i++) {
            var v, vertRef
            v = parseInt(this.indices[i][0])
            vertRef = (v - 1) * 3


            // listă de vârfuri
            pvalues.push(this.vertVals[vertRef]);
            pvalues.push(this.vertVals[vertRef + 1]);
            pvalues.push(this.vertVals[vertRef + 2]);
        }

        return pvalues;
    }

    getTextureCoordinatesValues() {
        var tvalues = []

        var i
        for (i = 0; i < this.numIndices; i++) {
            var t, tcRef
            t = parseInt(this.indices[i][1])

            tcRef = (t - 1) * 2

            // listă de texturi de coordonate
            tvalues.push(this.stVals[tcRef])
            tvalues.push(1.0 - this.stVals[tcRef + 1])
        }

        return tvalues;
    }

    getNormalsCoordinatesValues() {
        var nvalues = []

        var i
        for (i = 0; i < this.numIndices; i++) {
            var n,normRef
            n = parseInt(this.indices[i][2])

            normRef = (n - 1) * 3

            // listă de normale
            nvalues.push(this.normVals[normRef])
            nvalues.push(this.normVals[normRef + 1])
            nvalues.push(this.normVals[normRef + 2])
        }

        return nvalues;
    }
}
class Square {
    constructor(x, y, pieceOnThisSquare, canvasCoord) {
        this.x = x // Int 0 < x < 7
        this.y = y // Int 0 < y < 7 
        this.canvasCoord = canvasCoord
        this.pieceOnThisSquare = pieceOnThisSquare // ChessPiece || null
    }

    setPiece(newPiece) {
        if (newPiece === null && this.pieceOnThisSquare === null) {
            return
        } else if (newPiece === null) {
            // caso en el que la persona que llama a la función quiere quitar la pieza que está en este cuadrado.
            this.pieceOnThisSquare.setSquare(undefined)
            this.pieceOnThisSquare = null
        } else if (this.pieceOnThisSquare === null) {
            // caso en el que la persona que llama a la función quiere asignar una nueva pieza en este cuadrado
            this.pieceOnThisSquare = newPiece
            newPiece.setSquare(this)
        } else if (this.getPieceIdOnThisSquare() != newPiece.id && this.pieceOnThisSquare.color != newPiece.color) {
            // caso en el que la persona que llama a la función quiere cambiar la pieza en este cuadrado. (solo se permite un color diferente)
            console.log("capture!")
            this.pieceOnThisSquare = newPiece
            newPiece.setSquare(this)
        } else {
            return "user tried to capture their own piece"
        }
    }

    removePiece() {
        this.pieceOnThisSquare = null
    }

    getPiece() {
        return this.pieceOnThisSquare 
    }

    getPieceIdOnThisSquare() {
        if (this.pieceOnThisSquare === null) {
            return "empty"
        }
        return this.pieceOnThisSquare.id
    }

    isOccupied() {
        return this.pieceOnThisSquare != null
    }

    getCoord() {
        return [this.x, this.y]
    }

    getCanvasCoord() {
        return this.canvasCoord
    }
}

export default Square
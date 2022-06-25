class ChessPiece {
    constructor(name, isAttacked, color, id) {
        this.name = name // string
        this.isAttacked = isAttacked // boolean
        this.color = color // string
        this.id = id // string
    }
    
    setSquare(newSquare) {
       // establece el cuadrado sobre el que se asienta esta pieza.
        // en cualquier pieza dada (en el tablero), siempre habrá una pieza encima.
        // console.log(newSquare)
        if (newSquare === undefined) {
            this.squareThisPieceIsOn = newSquare
            return 
        }

        if (this.squareThisPieceIsOn === undefined) {
            this.squareThisPieceIsOn = newSquare
            newSquare.setPiece(this)
        }

        const isNewSquareDifferent = this.squareThisPieceIsOn.x != newSquare.x || this.squareThisPieceIsOn.y != newSquare.y

        if (isNewSquareDifferent) {
            // console.log("set")
            this.squareThisPieceIsOn = newSquare
            newSquare.setPiece(this)
        }
    }

    getSquare() {
        return this.squareThisPieceIsOn
    }
}
export default ChessPiece
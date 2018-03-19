//const SHA256 = require("crypto-js/sha256")
//	let AES = CryptoJS.AES();
    let SHA256 = CryptoJS.SHA256;
	
class Block {
    
    constructor(index, timeStamp, data, previousHash = '') {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }
    
    calculateHash() {
        return SHA256(this.index+this.previousHash+this.timeStamp+JSON.stringify(this.data)).toString();
    }
};

class Blockchain {

//Genesis block creation
    constructor() { 
        this.chain = [this.createGenesisBlock()]; 
    } 

    createGenesisBlock() {
        let date = new Date();
        return new Block(0, date, "Genesis block", "0"); 
    } 

//adding new blocks
    getLatestBlock() { 
        return this.chain[this.chain.length - 1]; 
    } 


    addBlock(newBlock) { 
        newBlock.previousHash = this.getLatestBlock().hash; 
        newBlock.hash = newBlock.calculateHash(); 
        this.chain.push(newBlock); 
    } 

//validating the chain

    isChainValid() { 
        for (let index = 1; index < this.chain.length; index++) { 
            const currentBlock = this.chain[index]; 
            const previousBlock = this.chain[index - 1]; 
            if (currentBlock.hash !== currentBlock.calculateHash()) { 
                return false; 
            } 
            if (currentBlock.previousHash !== previousBlock.hash) { 
                return false; 
            } 
        } 
        return true; 
    } 

}

const maxValueCoin = 100;
let randomIndex = Math.floor(Math.random()*maxValueCoin);
let date = new Date();

let blockCoin = new Blockchain();
for(let index = 1; index < maxValueCoin; index++) {
	blockCoin.addBlock(new Block(index, date, {amount: Math.floor(Math.random()*maxValueCoin)}));
}



console.log(blockCoin.chain[1]);
console.log(blockCoin.chain[2]);

const sha256 = require('sha256');

function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100,null,'00008517d7cc03b5393359046478733dd29cd59e9e589ff74847984fbb24430d');
}

//블록체인 프로토타입 함수 정의
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    //새 블록 객체
    const newBlock = {
        index : this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce:nonce,
        hash:hash,
        previousBlockHash:previousBlockHash
    };

    //다음 거래를 위한 거래내역 배열 비워주고 새로운 블록을 chain 배열에 추가
    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

// 마지막 블록 얻기 - chain 배열에는 블록데이터가 들어간다. 맨 마지막 블록 가져오기.
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

//새로운 트랜잭션(거래)가 발생했을 때 작동되는 함수
//인자값으로, 총액수, 보내는사람, 받는 사람이 들어간다.
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransactions = {
        amount : amount,
        sender : sender,
        recipient : recipient
    }
    //맨위 트랜잭션 배열에 값을 넣어준다.
    this.pendingTransactions.push(newTransactions);

    //마지막 블록의 index 에서 + 1
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    console.log("첫 해쉬"+ hash);
    while(hash.substring(0,4) != '1234'){
    nonce++;
    hash = this.hashBlock(previousBlockHash,currentBlockData,nonce)
    }
    console.log( nonce +"해쉬"+ hash);
    return nonce;
}


// const bitcoin = new Blockchain();
// const previousBlockHash = "abcdedferefa"
// const currentBlockData = [
// {
// amount: 10,
// sender: 'BACKadffaaf',
// recipient: 'HONGllalflks'

// },
// {
// amount: 20,
// sender: 'PACKadffaaf',
// recipient: 'HONGllalflks'

// },
// {
// amount: 30,
// sender: 'PACKadffaaf',
// recipient: 'HONGllalflks'

// }
// ]
// console.log(bitcoin.proofOfWork(previousBlockHash,currentBlockData));
// bitcoin.createNewBlock(3333,"ccccccc","3c3c3c3c3c3c");

// bitcoin.createNewBlock(100,"0","0");
// bitcoin.createNewTransaction(100,'PACKadffaaf','HONGllalflks')
// console.log(bitcoin);

module.exports = Blockchain;
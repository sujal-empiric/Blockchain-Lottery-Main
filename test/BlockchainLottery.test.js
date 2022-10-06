const { assert } = require("chai");

require("chai").should();
const BlockchainLottery = artifacts.require("BlockchainLottery");
const USDT = artifacts.require("USDT");
const USDC = artifacts.require("USDC")
const accountNum = 10
contract("BlockchainLottery", (accounts) => {
    beforeEach(async () => {
        this.usdt = await USDT.new();
        this.usdc = await USDC.new()
        this.blockchainlottery = await BlockchainLottery.new();
        for (var i = 0; i < accountNum; i++) {
            await this.usdt.mint(1000000, { from: accounts[i] });
        }
        for (var i = 0; i < accountNum; i++) {
            await this.usdt.approve(this.blockchainlottery.address, 10000000000, {from: accounts[i]});
        }
        for (var i = 0; i < accountNum; i++) {
            await this.usdc.mint(1000000, { from: accounts[i] });
        }
        for (var i = 0; i < accountNum; i++) {
            await this.usdc.approve(this.blockchainlottery.address, 10000000000, {from: accounts[i]});
        }
    });


    it("Check if All Prime users are getting the lottery", async ()=>{
        for(var i=0;i<5;i++){
            await this.blockchainlottery.primeUserBuyTicket(1500000,5,this.usdt.address,{from:accounts[i]})
        }
        for(var i=5;i<10;i++){
            await this.blockchainlottery.primeUserBuyTicket(1500000,10,this.usdc.address,{from:accounts[i]})
        }
        for(i=0;i<10;i++){
            console.log("Iteration Number",i+1)
            const primeUser = await this.blockchainlottery.getAllPrimeUsers()
            console.log("PRIME USERS")
            console.log(primeUser)
            const tokens = await this.blockchainlottery.getAllTokens()
            console.log("TOKENS")
            console.log(tokens)
            const participants = await this.blockchainlottery.getAllParticipants()
            console.log("PARTICIPANTS")
            console.log(participants)
            await this.blockchainlottery.assignTicket({from:accounts[0]})
            await this.blockchainlottery.getLottery({from:accounts[0], gasLimit:3000000})
            console.log("#############################################")
        }
        const primeUser = await this.blockchainlottery.getAllPrimeUsers()
            console.log("PRIME USERS")
            console.log(primeUser)
            const tokens = await this.blockchainlottery.getAllTokens()
            console.log("TOKENS")
            console.log(tokens)
            const participants = await this.blockchainlottery.getAllParticipants()
            console.log("PARTICIPANTS")
            console.log(participants)
    })






    // it("Check if All Prime users are getting the lottery", async ()=>{
    //     // await this.blockchainlottery.primeUserBuyTicket(1500000,5,this.usdt.address,{from: accounts[9]})
    //     for (var i = 0; i < accountNum; i++) {
    //         await this.blockchainlottery.primeUserBuyTicket(1500000,i+1,this.usdt.address,{from: accounts[i]})
    //         const primeusertickets = await this.blockchainlottery.primeUserTickets(accounts[i])
    //         console.log(primeusertickets.toString())
    //     }
    //     const number= await this.blockchainlottery.getTokensLen()
    //     console.log("\tToken Length Before 1st Lottery: "+number.toString())
    //     const primeUsers = await this.blockchainlottery.getAllPrimeUsers()
    //     console.log(primeUsers)
    //     for(i=0;i<10;i++){
    //         console.log("Iteration Number",i+1)
    //         await this.blockchainlottery.assignTicket({from:accounts[0]})
    //         await this.blockchainlottery.getLottery({from:accounts[0], gasLimit:3000000})
    //         const _primeusers = await this.blockchainlottery.getAllPrimeUsers()
    //         console.log("Prime User ",_primeusers.length)
    //         const _participants = await this.blockchainlottery.getAllParticipants()
    //         console.log("Participants ",_participants.length)
    //         const totalAmount = await this.usdt.balanceOf(this.blockchainlottery.address)
    //         console.log("TOTAL AMOUNT HELD IN SIDE THE CONTRACT : "+totalAmount.toString())
    //         const lotteryAmount = await this.blockchainlottery.totalTokenPrize(this.usdt.address)
    //         console.log("THIS IS THE CURRENT LOTTERY PRIZE: "+lotteryAmount.toString())
    //         for(var j=1;j<accountNum;j++){
    //             const primeusertickets = await this.blockchainlottery.primeUserTickets(accounts[j])
    //             console.log(primeusertickets.toString())
    //         }
    //     }
    //     console.log("AMOUNT AFTER TEST")
    //     const _primeusers = await this.blockchainlottery.getAllPrimeUsers()
    //     console.log("Prime User ",_primeusers.length)
    //     const _participants = await this.blockchainlottery.getAllParticipants()
    //     console.log("Participants ",_participants.length)
    //     for(var i=0;i<_primeusers.length;i++){
    //         const primeusertickets = await this.blockchainlottery.primeUserTickets(accounts[i])
    //         console.log(primeusertickets.toString())
    //     }
    //     var prime = await this.blockchainlottery.getAllPrimeUsers()
    //     console.log("all prime users after lottery run")
    //     console.log(prime)
    // })




    // it("Check the token number", async ()=>{
    //     for (var i = 1; i <= accountNum; i++) {
    //         await this.blockchainlottery.primeUserBuyTicket(1500000,i,this.usdt.address,{from: accounts[i]})
    //     }
    //     const number= await this.blockchainlottery.getTokensLen()
    //     console.log("\tToken Length Before 1st Lottery: "+number.toString())
    //     // const primeuser = await this.blockchainlottery.primeUser()
    //     await this.blockchainlottery.assignTicket({from:accounts[0]})
    //     await this.blockchainlottery.getLottery({from:accounts[0]})
    //     let num= await this.blockchainlottery.getTokensLen()
    //     console.log("\tToken Length After 1st Lottery: "+num.toString())
    //     await this.blockchainlottery.assignTicket({from:accounts[0]})
    //     await this.blockchainlottery.getLottery({from:accounts[0]})
    //     let a2= await this.blockchainlottery.getTokensLen()
    //     console.log("\tToken Length After 2nd Lottery: "+a2.toString())
    //     assert(number.toNumber()==1&&num.toNumber()==1&&a2.toNumber())
    // })






    // it("Assign a Ticket numbers", async ()=>{
    //     for (var i = 1; i <= accountNum; i++) {
    //         await this.blockchainlottery.depositeUSDT(10000000, {
    //             from: accounts[i],
    //         });
    //     }
    //     let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
    //     let tickets = await this.blockchainlottery.getAllTickets({from:accounts[0]})
    //     tickets.map((ticket)=>{
    //         console.log(ticket.toNumber())
    //     })
    // })  
    // it("Open Lottery", async ()=>{
    //     for (var i = 1; i <= accountNum; i++) {
    //         await this.blockchainlottery.depositeUSDT(10000000, {
    //             from: accounts[i],
    //         });
    //     }
    //     let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
    //     await this.blockchainlottery.getLottery({from:accounts[0]})
    //     let balance = await this.usdt.balanceOf(this.blockchainlottery.address, {from:accounts[0]})
    //     console.log(balance.toNumber())
    //     let lastWinner = await this.blockchainlottery.lastWinner({from:accounts[0]})
    //     console.log(lastWinner)
    //     balance = await this.usdt.balanceOf(lastWinner, {from:accounts[0]})
    //     console.log(balance.toNumber()/1000000)
    //     balance = await this.usdt.balanceOf(accounts[0], {from:accounts[0]})
    //     console.log(balance.toNumber()/1000000)
    // })


    // it("Open Single Lottery", async ()=>{
    //     await this.blockchainlottery.depositeUSDT(10000000, {from: accounts[1]});
        
    //     let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
        
    //     await this.blockchainlottery.getLottery({from:accounts[0]})
        
    //     let balance = await this.usdt.balanceOf(this.blockchainlottery.address, {from:accounts[0]})
    //     console.log(balance.toNumber())

    //     let lastWinner = await this.blockchainlottery.lastWinner({from:accounts[0]})
    //     console.log(lastWinner)
        
    //     balance = await this.usdt.balanceOf(lastWinner, {from:accounts[0]})
    //     console.log(balance.toNumber()/1000000)
        
    //     balance = await this.usdt.balanceOf(accounts[0], {from:accounts[0]})
    //     console.log(balance.toNumber()/1000000)
    // })
    
    // it("Randomness Test", async ()=>{
    //     for(var j=0;j<10;j++){
    //         for (var i = 1; i <= accountNum; i++) {
    //             await this.usdt.mint(10, { from: accounts[i] });
    //         }
    //         for (var i = 1; i <= accountNum; i++) {
    //             await this.usdt.approve(this.blockchainlottery.address, 1000000000, {
    //                 from: accounts[i],
    //             });
    //         }
    //         for (var i = 1; i <= accountNum; i++) {
    //             await this.blockchainlottery.depositeUSDT(10000000, {
    //                 from: accounts[i],
    //             });
    //         }
    //         let tx = await this.blockchainlottery.assignTicket({from:accounts[0]})
    //         await this.blockchainlottery.getLottery({from:accounts[0]})
    //         let balance = await this.usdt.balanceOf(this.blockchainlottery.address, {from:accounts[0]})
    //         console.log(balance.toNumber())
    //         let lastWinner = await this.blockchainlottery.lastWinner({from:accounts[0]})
    //         console.log(lastWinner)
    //         balance = await this.usdt.balanceOf(lastWinner, {from:accounts[0]})
    //         console.log(balance.toNumber()/1000000)
    //         balance = await this.usdt.balanceOf(accounts[0], {from:accounts[0]})
    //         console.log(balance.toNumber()/1000000)
    //     }
    // })
    
});

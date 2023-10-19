const nav_options = document.getElementsByClassName("underline");
const getaway_options = document.querySelectorAll(".getaway-options>div");
function highlightOption(idx){
    getaway_options[idx].style.textDecoration="underline";
   
    
}
function unhighlightOption(idx){
    getaway_options[idx].style.textDecoration="none";
    
}


function showUnderline(idx){
    nav_options[idx].style.width="25px"

}
function removeUnderline(idx){
    nav_options[idx].style.width="0px"

}


// function addMoney(){
//     return 1;
// }
// addMoney.__proto__.getMoney = 1;
// console.log(addMoney.prototype);
function Customer(name,branch,balance){
    this.name=name;
    this.branch=branch;
    this.balance=balance;
}
const c1 = new Customer("Naveen","sbi",50000);
const c2 = new Customer("Jeevan","hsbc",100000);
Customer.prototype.reduce = function(amount){
    this.balance-=amount;
}
function abc(){
    
}
console.log(Customer.prototype);
console.log(abc.prototype)
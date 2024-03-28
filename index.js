// let name;
// console.log(name);

// const interestRate="1"
// interestRate="5"
// console.log(interestRate)

// let name="Sivuyile" string
// let age = 30, number literal
// let isApproved = false; boolean literal

// let name = "Sivuyile"
// let name = 1

// let student={
// //     name:"Sivuyile",
// //     surname: "Mtwetwe",
// //     age: 23,
// //     gender: "M"

// // }

// // // // student.name="Siphenathi"
// // student["name"]= "Siphenthi"

// // console.log(student.name)

// let selectedColors = ["Red","Blue"]
// selectedColors[2]= 1

// console.log(selectedColors.length)

// function geet(){
//     console.log("Sivuyile")
// }

let x= 0;
let y= 0;

let direction =1

const stepSize =1

function draw(){
    while(true){
        x += stepSize*direction
        y += stepSize,
        if( x>= Canvas.width ||x<=0){
            y=0
            x=0
        }
    }
}
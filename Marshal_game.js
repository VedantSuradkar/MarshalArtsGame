let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");



let loadImg = (src,callback) =>{
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imgpath = (frameno,animation)=>{
    return "images/"+ animation +"/"+ frameno +".png";
};

let frames = {
    idle: [1,2,3,4,5,6,7,8],
    kick: [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
    forward: [1,2,3,4,5,6],
    backward: [1,2,3,4,5,6],
    block: [1,2,3,4,5,6,7,8,9]

};

let loadimages =(callback)=>{
    let images = {idle:[],kick:[],punch:[],forward:[],backward:[],block:[]};
    let imagestoload = 0;
    ["idle","kick","punch","forward","backward","block"].forEach((animation) => {
        let animationframes = frames[animation];
        imagestoload = imagestoload + animationframes.length;
     
        animationframes.forEach((frameno)=> {
            let path = imgpath(frameno,animation);
            loadImg(path,(image)=>{
                images[animation][frameno-1]= image;
                imagestoload=imagestoload-1;
               
                if (imagestoload===0){
                    callback(images);
                };
            })
        });
    
    });


};

let animate = (ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,1500,700)
            ctx.drawImage(image,0,200,500,500)
        },index*100);
    });
    setTimeout(callback,images[animation].length*100)
};

loadimages((images)=>{
    let queueanim =[];
    let aux =()=>{
        let selectedanim;
        if (queueanim.length==0){
            selectedanim = "idle";
        }
        else{
            selectedanim = queueanim.shift();
        }
        animate(ctx,images,selectedanim,aux);

    };
 aux();
 document.getElementById("kick").onclick=()=>{
     queueanim.push("kick");
 };
 document.getElementById("punch").onclick=()=>{
     queueanim.push("punch");

};
document.getElementById("forward").onclick=()=>{
    queueanim.push("forward");
    
};
document.getElementById("backward").onclick=()=>{
    queueanim.push("backward");
   
};
document.getElementById("block").onclick=()=>{
    queueanim.push("block");

};
document.addEventListener("keyup",(event)=>{
    const key = event.key;
    if (key ==="ArrowLeft"){
        queueanim.push("backward");
    }
    else if(key ==="ArrowRight"){
        queueanim.push("forward");
    }
    else if (key ==="Enter"){
        queueanim.push("kick");
    }
    else if (key ==="Shift"){
        queueanim.push("punch");
    }
    else if (key ==="0"){
        queueanim.push("block");
    }
})

    
});


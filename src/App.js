import './App.css';
import { useEffect, useState } from 'react';





function App() {
 const [color,setColor]=useState([]);
 const [leftColor,setLeftColor]=useState([]);
 const [loading,setLoading]=useState(true);
 const [colorCopy,setColorCopy]=useState([]);
 const [num,setNum]=useState("");





  function generateRandomColor(){
    let maxVal = 0xFFFFFF;
    let randomNumber = Math. random() * maxVal;
    randomNumber = Math. floor(randomNumber);
    randomNumber = randomNumber. toString(16);
    let randColor = randomNumber. padStart(6, 0);
    return `#${randColor. toUpperCase()}`
    }

  


const handleClick=()=>{
   let num1=Number(num);
   setNum("");
  if(num1<6 || num1!=0){
      
     let c=colorCopy[Number(num1)-1];

      
    let temp=[...color]
    
    temp=temp.map(el=>{if(el.color===c){
     if(!leftColor.includes(el.color)){
         setLeftColor([...leftColor,el.color])
     }
     el.flag=true;
     
      
    } return el})

    let temp2=[...colorCopy];
      temp2=temp2.filter((el)=> {return el!==c})
    setColor(temp);
    setColorCopy(temp2);
   
  }
  
}

const handleLeftClick=(id)=>{
  console.log(id)
  let temp=[...leftColor];
  temp=temp.filter(el=> {return el!=id}) 
  setLeftColor(temp);
  
  let temp2=[...color];

  temp2=temp2.map(el=>{
       if(el.color===id){
         el.flag=false;
       }
    return el;
  })
 
  setColor(temp2);

  let temp3=[];

  color.forEach((el)=> {if(el.flag===false){temp3.push(el.color)}} )
  setColorCopy(temp3);
  console.log(colorCopy)
}

function first(){
  let i=1;
    let arr=[];
    let arr1=[];
   
  while(i<6){
  
    let colorCode=generateRandomColor();
     let obj={};
     

       if(!arr1.includes(colorCode)){
          obj.flag=false;
           obj.color=colorCode;
           obj.id=i;
            arr.push(obj);
            arr1.push(colorCode);
            i++;
       }
         

  }
  setColor(arr)
  setColorCopy(arr1);
  setLoading(false)

}






  useEffect(()=>{
   first()    

  },[])


  return (
    <div className="App">

     {  (loading)?<h1>LOADING...</h1>:<div className='mainDiv'> 
      <div className="leftDiv">

          {leftColor.map((el,i) => {
          
          {return <div className='divCircle' id={el} style={{backgroundColor:el}} key={i} onClick={()=>handleLeftClick(el)}></div>} 
          })}  
             

      </div>

      <div className='rightDiv'>
      {color.map((el,i) => {
          return  <div className='divCircle' id={el.color} style={{backgroundColor:el.color, display:(el.flag)?"none":"block"}} key={i}></div>
          })} 

      </div>
      
      <div className='inputDiv'>
              <input className='inputBox' type='text' onChange={(e)=> setNum(e.target.value)} value={num} />
              <button onClick={handleClick}><h1>SHOOT</h1></button>
      </div>



    </div>
  }
       
    </div>
  );
}

export default App;

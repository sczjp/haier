define(function(){
    function range(inowNum,minNum,maxNum){
        if(inowNum >= maxNum){
            return maxNum;
        }else if(inowNum <= minNum){
            return minNum;
        }else{
            return inowNum;
        }
    } 
    
    return {
        range:range,
    }
});
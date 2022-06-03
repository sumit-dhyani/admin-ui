import React from "react";
import Cardlist from "./Cardlist";

const Card = ({data,checkboxchange,loading,onDelete,updateuser,setupdate,setupdateuser}) => {
        
        

        if(loading){
            return <h1 className="text-center font-monospace">Loading items.....</h1>
        }

        else if(data.length<1){
            return <h1 className="text-center align-items-center font-monospace">No records left</h1>
        }

        else{
        return(
            

        data&&data.map((arr)=>{
            return(
                <Cardlist 
                user={arr}
                key={arr.id}
                name={arr.name}
                email={arr.email}
                role={arr.role}
                onDelete={onDelete}
                updateuser={updateuser}
                checkboxchange={checkboxchange}
                setupdate={setupdate}
                setupdateuser={setupdateuser}
                />
            );
        })
        
        )}
        
    }


export default Card;
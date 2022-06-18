import React from 'react';

const Pagination = ({pages,paginate,selected}) => {
    // console.log("pages",pages)
    var list=[]
    for(var i=1;i<=pages;i++){
        list.push(i)
    }

    return (
        list?.map((count)=>{
    return (
            
            <li key={count} onClick={()=>paginate(count)} className={selected===count?'page-item link active':'page-item link'}>
                <button className={selected===count?'page-link rounded-circle mx-2 bg-dark text-white':'page-link rounded-circle mx-2 bg-info text-white' }>
                {count}
                </button>
            </li>
            
    )
    }
    ))
    
};

export default Pagination;
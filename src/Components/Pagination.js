import React, { useState } from 'react';

const Pagination = ({totalPosts,postsPerPage,paginate}) => {
    const [Current,setCurrent]=useState(1);
    const pageNumbers=[]
    for (let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    return (
        <footer className=''>
            <ul className='pagination d-flex justify-content-center'>
                <li className='page-item mx-1 '>
                    <a href='!#' onClick={()=>{paginate(Current-1)
                    setCurrent(Current-1)}} className='page-link rounded-circle'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                  </svg></a>
                </li>
                {
                    pageNumbers.map(item=>(
                        <li key={item} className='page-item mx-3  '>
                            <a  onClick={()=>{paginate(item)
                            setCurrent(item)
                            }}
                            href='!#' className='page-link rounded-circle'>{item}</a>
                        </li>
                    ))
                }
                <li className='page-item mx-3 rounded-circle'>
                    <a href='!#' onClick={()=>{paginate(Current+1,5)
                    setCurrent(Current+1)}} className='page-link rounded-circle'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg></a>
                </li>

            </ul>
        </footer>
    );
};

export default Pagination;
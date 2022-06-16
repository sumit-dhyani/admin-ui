import React from 'react';

const Cardlist = ({checkboxchange,user,name,email,role,onDelete,setupdate,setupdateuser}) => {
    
    return (
        <div className='container '  >
                    <div  className={user.isChecked===true?'row bd p-2 bg-success text-white':'row bd p-2'}>
                        <div className ="col-2">
                            <input className='form-check-input h5' 
                            name={name} 
                            onChange={(e)=>checkboxchange(e)} 
                            checked={user?.isChecked || false}  
                            type="checkbox" />
                        </div>
                        <label className ="col-2">{name}</label>
                        <div className ="col-4 wrap">{email}</div>
                        <label className ="col-2 capitalize-me">{role}</label>
                        <label className='col-2'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            
                                        <span title='Update User' onClick={()=>{setupdateuser(user)
                                            setupdate(true)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-down-left mr link" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M9.636 2.5a.5.5 0 0 0-.5-.5H2.5A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5V6.864a.5.5 0 0 0-1 0V13.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fillRule="evenodd" d="M5 10.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H6.707l8.147-8.146a.5.5 0 0 0-.708-.708L6 9.293V5.5a.5.5 0 0 0-1 0v5z"/>
                                            </svg>
                                        </span>
                                        <span title='Delete User' onClick={()=>onDelete(email)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive-fill link" viewBox="0 0 16 16">
                                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                                            </svg>
                                        </span>

                                        </div>
                                    </div>
                                </div>
                            </label>
                             
                    </div>
                    
        </div>
    );
};

export default Cardlist;
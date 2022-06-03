import React from 'react';

const Header = ({data,loading,setsearchField,checkboxchange}) => {

    if(loading){
        return <h2>Please wait while loading</h2>
    }
    else{
    return (
        
        <div className="Appsd">
                    <div className="container mt-5">
                        <div className='row'>
                        <input type="text" onChange={(e)=>setsearchField(e.target.value)} className="form-control col "  placeholder="Search by name, email or role" aria-label="Username">
                        </input>
                        </div>
                    </div>
                    <div className='container title' >
                    <div className="row bd p-2">
                        <div className ="col">
                            <input  className="form-check-input h5 "
                             name='allselect' 
                             type="checkbox" 
                             onChange={checkboxchange}
                             checked={data.filter(user=>user?.isChecked!==true).length<1}
                             
                             /></div> 
                        <label className ="col" >Name</label>
                        <label className ="col">Email</label>
                        <label className ="col">Role</label>
                        <label className='col'>Action</label>
                          
                    </div>
                    </div>
        </div>
                    
        
    );
    }
}


export default Header;
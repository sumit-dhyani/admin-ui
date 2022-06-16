import React from 'react';

const Header = ({data,loading,setsearchField,checkboxchange}) => {
    const checkfnc=()=>{
        if(data.length!==0){
            return data.filter(user=>user?.isChecked!==true).length<1
        }
        else{
            return false
        }
    }
    if(loading){
        return <h2>Please wait while loading</h2>
    }
    else{
    return (
        
        <div className="Appsd">
                    <div className="container mt-5">
                        <div className='row'>
                        <input type="text" onChange={(e)=>setsearchField(e.target.value)} className="form-control col-12 "  placeholder="Search by name, email or role" aria-label="Username">
                        </input>
                        </div>
                    </div>
                
                    <div className='container title' >
                    <div className="row bd p-2">
                        <div className ="col-2">
                            <input  className="form-check-input h5 "
                             name='allselect' 
                             type="checkbox" 
                             onChange={checkboxchange}
                             checked={checkfnc()|| false}
                             />
                        </div> 
                        <label className ="col-2" >Name</label>
                        <label className ="col-4">Email</label>
                        <label className ="col-2">Role</label>
                        <label className='col-2'>Action</label>
                    </div>
                    </div>
        </div>
                    
        
    );
    }
}


export default Header;
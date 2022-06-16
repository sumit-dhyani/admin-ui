
import React, { useEffect, useState } from 'react';

const Update = ({setupdate,setUsers,setfilteredUsers,filteredUsers,updateuser}) => {
    const [name,setname]=useState()
    const [emailnew,setemailnew]=useState()
    const [rolenew,setrolenew]=useState()
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    useEffect(()=>{
        setname(updateuser.name)
        setemailnew(updateuser.email)
        setrolenew(updateuser.role)
        
        //eslint-disable-next-line
    },[])

    const submit=()=>{

       
        if(!name||!emailnew||!rolenew){
            alert("All fields are required")
        }
        else if(!emailnew.match(emailRegex)){
             
            alert("Email format is invalid. Please enter a correct one")
        }
        
        else{
            const changed=filteredUsers.map((user)=>{
                if(user.email===updateuser.email){
                    return {...user,email:emailnew,name:name,role:rolenew}
                } 
                else{
                    return user
                }}
                )
            setfilteredUsers(changed)
            setUsers(changed)
            setupdate(false)
        }
    }
    const onchange=(e)=>{
        //to set role to role new variable when a checkbox is selected.
        setrolenew(e.target.name)
    }

    return (
        <div className="bg-light">
        
            <div className="container ">
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-4'>
                <span className="navbar-brand mb-2 h1 fw-bold font-monospace fs-1 text" >Update User Details</span></div>
                <div className='col-4'></div>
                </div>
            </div>
        

            <div className='container p-3 mt-2  shadow p-3 mb-5 bg-body rounded ' style={{height:'70vh', width:'110vh'}}>
        
                <div className='row mt-5'>
                    <div className='col-4'></div>
                    <div className='col-8 align-items-center justify-content-center'>
                        <div className="row mb-3">
                            <label  className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-6">
                            <input type="text" onChange={(e)=>setname(e.target.value)} className="form-control " id="inputEmail3" value={name||""}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label  className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-7">
                            <input type="text" onChange={(e)=>setemailnew(e.target.value)}  className="form-control" value={emailnew||""} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Role</label>
                            <div className="col-sm-1">
                            <input type="checkbox" name='member' onChange={(e)=>onchange(e)} checked={rolenew==='member'||false} className="form-check-input"  />
                            </div>
                            <label className="col form-label">Member</label>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-1">
                            <input type="checkbox" name='admin' onChange={(e)=>onchange(e)} checked={rolenew==='admin'||false} className="form-check-input"  />
                            </div>
                            <label className="col form-label justify-content-left">Admin</label>
                        </div>
                        
                        <div className='row '>
                            <div className='col'>
                        <button onClick={()=>{submit()}} className="btn btn-primary">Update Changes</button>
                        </div>
                                <div className='col-4'></div>
                        </div>
                        </div>
            
                    </div>
                </div>
            </div> 
    );
};

export default Update;